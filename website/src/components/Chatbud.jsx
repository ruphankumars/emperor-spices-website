import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

// FAQ Knowledge Base
const faqResponses = {
    'price': "Our pricing varies by grade and quantity. AGEB (8mm+) is our premium grade. For bulk orders (500kg+), we offer competitive rates. Would you like a formal quote?",
    'shipping': "We ship worldwide via major shipping lines. Typical transit time to UAE is 10-15 days, Europe 20-25 days, and USA 25-30 days. We offer FOB, CIF, and CFR terms.",
    'quality': "All our cardamom is AGMARK certified and FSSAI approved. We provide Certificate of Analysis with every shipment including oil content, moisture, and size specifications.",
    'grade': "We offer AGEB (8mm+ Extra Bold), AGB (7-8mm Bold), AGS (6-7mm Special), and Cardamom Seeds. Each grade has specific oil content and applications.",
    'sample': "Yes! We send free samples for serious buyers. Please share your company details and requirements, and we'll arrange samples to your location.",
    'minimum': "Our minimum order quantity is 100kg for initial orders. For regular customers, we can accommodate smaller quantities based on requirements.",
    'origin': "Our cardamom is sourced from Bodinayakanur in Tamil Nadu's Western Ghats region - India's premier cardamom-growing area at 900m altitude.",
    'payment': "We accept Wire Transfer (TT), Letter of Credit (LC), and for established clients, flexible payment terms. 30% advance is typical for new orders.",
    'default': "That's a great question! For detailed information, I'd recommend connecting with our export team. Would you like me to help you with pricing, grades, shipping, or quality certifications?"
};

const quickReplies = [
    { label: '💰 Pricing', query: 'price' },
    { label: '📦 Shipping', query: 'shipping' },
    { label: '🏆 Quality', query: 'quality' },
    { label: '📋 Grades', query: 'grade' }
];

const getResponse = (input) => {
    const lowered = input.toLowerCase();
    for (const [key, response] of Object.entries(faqResponses)) {
        if (key !== 'default' && lowered.includes(key)) {
            return response;
        }
    }
    // Check for common variations
    if (lowered.includes('cost') || lowered.includes('how much')) return faqResponses.price;
    if (lowered.includes('deliver') || lowered.includes('ship')) return faqResponses.shipping;
    if (lowered.includes('certif') || lowered.includes('fssai') || lowered.includes('agmark')) return faqResponses.quality;
    if (lowered.includes('ageb') || lowered.includes('agb') || lowered.includes('ags')) return faqResponses.grade;
    if (lowered.includes('try') || lowered.includes('test')) return faqResponses.sample;
    if (lowered.includes('moq') || lowered.includes('minimum')) return faqResponses.minimum;
    if (lowered.includes('where') || lowered.includes('from') || lowered.includes('source')) return faqResponses.origin;
    if (lowered.includes('pay') || lowered.includes('lc') || lowered.includes('transfer')) return faqResponses.payment;

    return faqResponses.default;
};

const Chatbud = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Namaste! 🙏 I am Ela, your spice companion from Emperor Spices. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (query = null) => {
        const text = query || input.trim();
        if (!text) return;

        setMessages(prev => [...prev, { role: 'user', text: query ? quickReplies.find(q => q.query === query)?.label.split(' ')[1] || text : text }]);
        setInput('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: 'ai',
                text: getResponse(text)
            }]);
        }, 1000 + Math.random() * 500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[200]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[380px] h-[520px] bg-white dark:bg-stone-900 overflow-hidden flex flex-col rounded-[2rem] shadow-2xl border border-stone-200 dark:border-stone-700"
                    >
                        {/* Header */}
                        <div className="p-5 bg-gradient-to-r from-sage to-forest text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                                    <Sparkles size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Ela</div>
                                    <div className="text-[10px] uppercase tracking-widest opacity-80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Online • AI Spice Expert
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50 dark:bg-stone-800">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                        ? 'bg-forest text-white rounded-br-md'
                                        : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-100 rounded-bl-md shadow-sm border border-stone-100 dark:border-stone-600'
                                        }`}>
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white dark:bg-stone-700 p-4 rounded-2xl rounded-bl-md shadow-sm border border-stone-100 dark:border-stone-600">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        <div className="px-4 py-2 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700 flex gap-2 overflow-x-auto">
                            {quickReplies.map((qr, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(qr.query)}
                                    className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 hover:bg-sage hover:text-white rounded-full text-xs font-medium whitespace-nowrap transition-colors"
                                >
                                    {qr.label}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about pricing, grades, shipping..."
                                className="flex-1 px-4 py-3 bg-stone-100 dark:bg-stone-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sage dark:text-white"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className="w-12 h-12 bg-sage text-white rounded-full flex items-center justify-center hover:bg-sage-dark active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gradient-to-br from-sage to-forest text-white rounded-full shadow-2xl flex items-center justify-center relative group"
            >
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-30 group-hover:opacity-50" />
                <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[10px] font-bold text-forest">1</span>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbud;
