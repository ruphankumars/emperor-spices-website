import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartDrawer = () => {
    const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={toggleCart}
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    zIndex: 9998, backdropFilter: 'blur(4px)'
                }}
            />

            {/* Drawer */}
            <div className="cart-drawer" style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: '100%', maxWidth: '400px', background: 'white',
                zIndex: 9999, display: 'flex', flexDirection: 'column',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
                animation: 'slideInRight 0.3s ease-out',
                borderRadius: '24px 0 0 24px'
            }}>
                {/* Header */}
                <div className="cart-drawer-header" style={{
                    padding: '20px', borderBottom: '1px solid rgba(45, 74, 62, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'linear-gradient(145deg, #FAF8F5, #F5F0E8)',
                    borderRadius: '24px 0 0 0'
                }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-forest)' }}>
                        <ShoppingBag size={20} /> Your Cart ({cart.length})
                    </h2>
                    <button onClick={toggleCart} style={{
                        background: 'rgba(45, 74, 62, 0.1)', border: 'none', cursor: 'pointer', padding: '10px',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <X size={20} color="var(--color-forest)" />
                    </button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '60px', color: '#888' }}>
                            <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                            <p>Your cart is empty.</p>
                            <button onClick={toggleCart} style={{
                                marginTop: '16px', background: 'var(--color-forest)', color: 'white',
                                border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'
                            }}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden',
                                        background: '#f8f8f8', flexShrink: 0
                                    }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h4>
                                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>{item.grade} • {item.size}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ fontWeight: '600', color: 'var(--color-forest)' }}>{item.price}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f5f5f5', borderRadius: '6px', padding: '4px' }}>
                                                <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}
                                                    style={{ border: 'none', background: 'white', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Minus size={14} />
                                                </button>
                                                <span style={{ fontSize: '0.9rem', fontWeight: '500', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}
                                                    style={{ border: 'none', background: 'white', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} style={{ alignSelf: 'flex-start', border: 'none', background: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div style={{ padding: '24px', background: 'linear-gradient(145deg, #FAF8F5, #F5F0E8)', borderTop: '1px solid rgba(45, 74, 62, 0.1)', borderRadius: '0 0 0 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-forest)' }}>
                            <span>Total</span>
                            <span>₹ {cartTotal.toLocaleString()}</span>
                        </div>
                        <button style={{
                            width: '100%', padding: '16px', background: 'var(--color-forest)', color: 'white',
                            border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(45, 107, 74, 0.2)'
                        }}>
                            Checkout Now
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888', marginTop: '12px' }}>
                            Shipping & taxes calculated at checkout
                        </p>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                @keyframes slideInUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
                
                @media (max-width: 480px) {
                    .cart-drawer {
                        max-width: calc(100% - 32px) !important;
                        border-radius: 24px !important;
                        top: 16px !important;
                        bottom: 16px !important;
                        right: 16px !important;
                        height: auto !important;
                        animation: slideInUp 0.3s ease-out !important;
                    }
                    .cart-drawer-header {
                        border-radius: 24px 24px 0 0 !important;
                    }
                }
            `}</style>
        </>
    );
};

export default CartDrawer;
