import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Compass, Map, Wind, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = ({ isOpen, onClose }) => {
    const menuItems = [
        { title: 'The Origin', icon: <Map className="w-6 h-6" />, desc: 'Journey to the Western Ghats' },
        { title: 'The Science', icon: <Wind className="w-6 h-6" />, desc: 'Essential oils & potency' },
        { title: 'The Collection', icon: <Sprout className="w-6 h-6" />, desc: 'Browse our signature pods' },
        { title: 'The Heritage', icon: <Compass className="w-6 h-6" />, desc: '3 generations of excellence' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[100] bg-cloud/95 backdrop-blur-3xl flex"
                >
                    {/* Exploration Sidebar */}
                    <div className="hidden md:flex flex-col justify-between p-12 w-1/3 border-r border-stone-200">
                        <div>
                            <h2 className="text-4xl font-display font-semibold mb-8 italic">Exploration</h2>
                            <p className="opacity-60 leading-relaxed">
                                We've moved beyond simple menus. Explore the lifecycle of the spice through our interactive journeys.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="text-xs font-bold uppercase tracking-widest opacity-30">Current Location</div>
                            <div className="flex items-center gap-3 text-sage">
                                <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                                Bodinayakanur, India
                            </div>
                        </div>
                    </div>

                    {/* Main Menu Grid */}
                    <div className="flex-1 p-8 md:p-24 relative overflow-y-auto">
                        <button
                            onClick={onClose}
                            className="absolute top-12 right-12 w-12 h-12 glass rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                        >
                            <X size={24} />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20">
                            {menuItems.map((item, i) => (
                                <motion.a
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    href="#"
                                    className="group glass p-10 rounded-[2.5rem] hover:bg-sage hover:text-white transition-all duration-500"
                                >
                                    <div className="bg-stone-100 group-hover:bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-3xl font-display font-semibold mb-3 flex items-center justify-between">
                                        {item.title}
                                        <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                                    </h3>
                                    <p className="opacity-60 group-hover:opacity-80">{item.desc}</p>
                                </motion.a>
                            ))}
                        </div>

                        <div className="mt-20 pt-12 border-t border-stone-100 flex flex-wrap gap-12">
                            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-sage transition-colors">Instagram</a>
                            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-sage transition-colors">LinkedIn</a>
                            <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-sage transition-colors">Direct Contact</a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Navigation;
