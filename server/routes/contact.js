const express = require('express');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const router = express.Router();

// Initialize AWS SES Client
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Email template generator
const generateEmailHTML = (data) => {
    const { fullName, lastName, phone, email, subject, message } = data;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
            <td style="background: linear-gradient(135deg, #2D4A3E 0%, #1a4030 100%); padding: 32px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                    🌿 Emperor Spices
                </h1>
                <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">
                    New Contact Form Submission
                </p>
            </td>
        </tr>
        
        <!-- Alert Badge -->
        <tr>
            <td style="padding: 24px 32px 0;">
                <div style="background: #e8f5e9; border-left: 4px solid #2D4A3E; padding: 12px 16px; border-radius: 4px;">
                    <strong style="color: #2D4A3E;">📬 New Inquiry Received</strong>
                    <p style="margin: 4px 0 0; color: #666; font-size: 13px;">
                        ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                    </p>
                </div>
            </td>
        </tr>
        
        <!-- Contact Details -->
        <tr>
            <td style="padding: 24px 32px;">
                <h2 style="color: #2D4A3E; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px;">
                    📧 Contact Details
                </h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 14px;">
                    <tr>
                        <td style="color: #888; width: 100px;">Name:</td>
                        <td style="color: #333; font-weight: 600;">${fullName} ${lastName}</td>
                    </tr>
                    <tr>
                        <td style="color: #888;">Phone:</td>
                        <td style="color: #333;"><a href="tel:${phone}" style="color: #2D4A3E; text-decoration: none;">${phone}</a></td>
                    </tr>
                    <tr>
                        <td style="color: #888;">Email:</td>
                        <td style="color: #333;"><a href="mailto:${email}" style="color: #2D4A3E; text-decoration: none;">${email}</a></td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Inquiry Details -->
        <tr>
            <td style="padding: 0 32px 24px;">
                <h2 style="color: #2D4A3E; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px;">
                    📝 Inquiry Details
                </h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="font-size: 14px;">
                    <tr>
                        <td style="color: #888; width: 100px;">Subject:</td>
                        <td style="color: #333; font-weight: 600;">${subject}</td>
                    </tr>
                </table>
                <div style="background: #fafafa; padding: 16px; border-radius: 8px; margin-top: 16px;">
                    <p style="color: #888; font-size: 12px; text-transform: uppercase; margin: 0 0 8px; letter-spacing: 0.5px;">Message:</p>
                    <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
            </td>
        </tr>
        
        <!-- Quick Actions -->
        <tr>
            <td style="padding: 0 32px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="text-align: center;">
                            <a href="mailto:${email}?subject=Re: ${subject}" style="
                                display: inline-block;
                                background: #2D4A3E;
                                color: #ffffff;
                                padding: 12px 24px;
                                border-radius: 100px;
                                text-decoration: none;
                                font-weight: 600;
                                font-size: 14px;
                            ">
                                ✉️ Reply to ${fullName}
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="background: #f5f5f5; padding: 24px 32px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="color: #888; font-size: 12px; margin: 0;">
                    This email was sent from the Emperor Spices website contact form.
                </p>
                <p style="color: #aaa; font-size: 11px; margin: 8px 0 0;">
                    © ${new Date().getFullYear()} Emperor Spices Pvt Ltd. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

// Plain text version for email clients that don't support HTML
const generateEmailText = (data) => {
    const { fullName, lastName, phone, email, subject, message } = data;

    return `
EMPEROR SPICES - NEW CONTACT FORM SUBMISSION
=============================================

📬 Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

CONTACT DETAILS
---------------
Name: ${fullName} ${lastName}
Phone: ${phone}
Email: ${email}

INQUIRY DETAILS
---------------
Subject: ${subject}

Message:
${message}

=============================================
This email was sent from the Emperor Spices website contact form.
    `.trim();
};

// POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { fullName, lastName, phone, email, subject, message } = req.body;

        // Validation
        if (!fullName || !lastName || !phone || !email || !subject || !message) {
            return res.status(400).json({
                error: 'All fields are required',
                missing: ['fullName', 'lastName', 'phone', 'email', 'subject', 'message'].filter(f => !req.body[f])
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Prepare recipients
        const toEmails = (process.env.SES_TO_EMAILS || 'ruphankumars@emperorspices.com').split(',').map(e => e.trim());

        // Send email via AWS SES
        const command = new SendEmailCommand({
            Source: process.env.SES_FROM_EMAIL || 'noreply@emperorspices.com',
            Destination: {
                ToAddresses: toEmails
            },
            Message: {
                Subject: {
                    Data: `🌿 Emperor Spices Inquiry: ${subject}`,
                    Charset: 'UTF-8'
                },
                Body: {
                    Html: {
                        Data: generateEmailHTML(req.body),
                        Charset: 'UTF-8'
                    },
                    Text: {
                        Data: generateEmailText(req.body),
                        Charset: 'UTF-8'
                    }
                }
            },
            ReplyToAddresses: [email]
        });

        const response = await sesClient.send(command);

        console.log(`✅ Email sent successfully. MessageId: ${response.MessageId}`);

        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.',
            messageId: response.MessageId
        });

    } catch (error) {
        console.error('❌ Email sending failed:', error);

        // Handle specific AWS errors
        if (error.name === 'MessageRejected') {
            return res.status(400).json({
                error: 'Email was rejected by the server. Please try again later.'
            });
        }

        if (error.name === 'MailFromDomainNotVerified' || error.name === 'EmailNotVerified') {
            return res.status(500).json({
                error: 'Email configuration error. Please contact support.'
            });
        }

        res.status(500).json({
            error: 'Failed to send email. Please try again later.'
        });
    }
});

module.exports = router;
