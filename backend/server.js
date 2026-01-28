/**
 * Emperor Spices Backend Server
 * 
 * Express.js server with AWS SES integration for contact form emails.
 * 
 * @author Emperor Spices Development Team
 * @version 1.0.0
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// ============================================
// Configuration
// ============================================

const app = express();
const PORT = process.env.PORT || 3001;

// AWS SES Client
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'ap-southeast-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// ============================================
// Middleware
// ============================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Rate limiting for contact form (prevent spam)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: {
        success: false,
        error: 'Too many contact submissions. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ============================================
// Routes
// ============================================

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Emperor Spices Backend',
    });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { fullName, lastName, phone, email, subject, message } = req.body;

        // Validation
        if (!fullName || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: fullName, email, subject, message',
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email address',
            });
        }

        // Construct email content
        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #2d5016; display: block; margin-bottom: 5px; }
        .field-value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #ddd; }
        .message-box { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #4a7c23; margin-top: 20px; }
        .footer { background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌿 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Emperor Spices Pvt Ltd</p>
        </div>
        <div class="content">
            <div class="field">
                <span class="field-label">📧 Contact Details</span>
            </div>
            <div class="field">
                <span class="field-label">Name</span>
                <div class="field-value">${fullName} ${lastName || ''}</div>
            </div>
            <div class="field">
                <span class="field-label">Email</span>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            ${phone ? `
            <div class="field">
                <span class="field-label">Phone</span>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            ` : ''}
            <div class="field">
                <span class="field-label">Subject</span>
                <div class="field-value">${subject}</div>
            </div>
            <div class="message-box">
                <span class="field-label">💬 Message</span>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the Emperor Spices website contact form.</p>
            <p>© ${new Date().getFullYear()} Emperor Spices Pvt Ltd. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `.trim();

        const textBody = `
New Contact Form Submission
===========================

Name: ${fullName} ${lastName || ''}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}

---
Emperor Spices Pvt Ltd
        `.trim();

        // Parse recipient emails
        const toAddresses = (process.env.TO_EMAIL || 'ruphankumars@emperorspices.com')
            .split(',')
            .map(e => e.trim());

        // Send email via AWS SES
        const sendEmailCommand = new SendEmailCommand({
            Source: process.env.FROM_EMAIL || 'ruphankumars@emperorspices.com',
            Destination: {
                ToAddresses: toAddresses,
            },
            Message: {
                Subject: {
                    Data: `[Emperor Spices Contact] ${subject}`,
                    Charset: 'UTF-8',
                },
                Body: {
                    Text: {
                        Data: textBody,
                        Charset: 'UTF-8',
                    },
                    Html: {
                        Data: htmlBody,
                        Charset: 'UTF-8',
                    },
                },
            },
            ReplyToAddresses: [email],
        });

        const result = await sesClient.send(sendEmailCommand);

        console.log(`✅ Email sent successfully. MessageId: ${result.MessageId}`);

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully!',
            messageId: result.MessageId,
        });

    } catch (error) {
        console.error('❌ Email sending failed:', error);

        // Handle specific SES errors
        if (error.name === 'MessageRejected') {
            return res.status(400).json({
                success: false,
                error: 'Email could not be sent. Please verify the sender email is configured correctly.',
            });
        }

        if (error.name === 'MailFromDomainNotVerified') {
            return res.status(500).json({
                success: false,
                error: 'Email domain not verified. Please contact the administrator.',
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.',
        });
    }
});

// Quote request endpoint
app.post('/api/quote', contactLimiter, async (req, res) => {
    try {
        const { product, quantity, name, email, phone, company, message } = req.body;

        // Validation
        if (!product || !name || !email) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: product, name, email',
            });
        }

        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; }
        .product-highlight { background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #D2691E; margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #8B4513; display: block; margin-bottom: 5px; }
        .field-value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #ddd; }
        .footer { background: #333; color: #999; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📦 New Quote Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Emperor Spices Pvt Ltd</p>
        </div>
        <div class="content">
            <div class="product-highlight">
                <strong>Product:</strong> ${product}<br>
                ${quantity ? `<strong>Quantity:</strong> ${quantity}` : ''}
            </div>
            <div class="field">
                <span class="field-label">Name</span>
                <div class="field-value">${name}</div>
            </div>
            <div class="field">
                <span class="field-label">Email</span>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            ${phone ? `
            <div class="field">
                <span class="field-label">Phone</span>
                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            ` : ''}
            ${company ? `
            <div class="field">
                <span class="field-label">Company</span>
                <div class="field-value">${company}</div>
            </div>
            ` : ''}
            ${message ? `
            <div class="field">
                <span class="field-label">Additional Notes</span>
                <div class="field-value">${message}</div>
            </div>
            ` : ''}
        </div>
        <div class="footer">
            <p>This quote request was sent from the Emperor Spices website.</p>
            <p>© ${new Date().getFullYear()} Emperor Spices Pvt Ltd. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `.trim();

        const textBody = `
New Quote Request
=================

Product: ${product}
${quantity ? `Quantity: ${quantity}` : ''}

Customer Details:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}

${message ? `Additional Notes:\n${message}` : ''}

---
Emperor Spices Pvt Ltd
        `.trim();

        const toAddresses = (process.env.TO_EMAIL || 'ruphankumars@emperorspices.com')
            .split(',')
            .map(e => e.trim());

        const sendEmailCommand = new SendEmailCommand({
            Source: process.env.FROM_EMAIL || 'ruphankumars@emperorspices.com',
            Destination: {
                ToAddresses: toAddresses,
            },
            Message: {
                Subject: {
                    Data: `[Emperor Spices Quote] Request for ${product}`,
                    Charset: 'UTF-8',
                },
                Body: {
                    Text: {
                        Data: textBody,
                        Charset: 'UTF-8',
                    },
                    Html: {
                        Data: htmlBody,
                        Charset: 'UTF-8',
                    },
                },
            },
            ReplyToAddresses: [email],
        });

        const result = await sesClient.send(sendEmailCommand);

        console.log(`✅ Quote request email sent. MessageId: ${result.MessageId}`);

        res.status(200).json({
            success: true,
            message: 'Your quote request has been submitted successfully!',
            messageId: result.MessageId,
        });

    } catch (error) {
        console.error('❌ Quote email failed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit quote request. Please try again later.',
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════╗
║                                                  ║
║   🌿 Emperor Spices Backend Server              ║
║                                                  ║
║   Status: Running                               ║
║   Port: ${PORT}                                    ║
║   Environment: ${process.env.NODE_ENV || 'development'}                     ║
║                                                  ║
║   Endpoints:                                     ║
║   • GET  /health     - Health check             ║
║   • POST /api/contact - Contact form            ║
║   • POST /api/quote   - Quote request           ║
║                                                  ║
╚══════════════════════════════════════════════════╝
    `);
});

module.exports = app;
