import React, { useState, useEffect, useRef } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Facebook, Twitter, Linkedin, Copy, X, Send } from 'lucide-react';
import { FadeInUp, StaggerChildren } from '../../components/ScrollAnimations';
import Modal from '../../components/Modal';

// Social Icons & Branding Colors
const SocialIcons = {
    WhatsApp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
    Instagram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>,
    Snapchat: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.009 2.12c-3.15 0-5.837 2.1-5.962 5.513-.027.675-.407 1-1.071 1.05-.2.012-.416.037-.624.112-.676.226-.78.7-.301 1.25.353.4.385.476.136.964-.323.637-.624.588-1.123 1.037-.614.562-1.206 1.838.301 3 .697.538 1.467.576 1.954 1.15.541.625.541 1.588.084 1.888-1.342.875-1.883 2.175-.707 2.875.52.313 1.248.163 1.768.125.79-.05 1.248-.487 2.454.062 1.06.488 2.214.475 3.338-.05 1.133-.525 1.632-.125 2.443-.062 1.134.087 1.238.225 1.769-.1.52-.313 1.258-1.85 1.019-2.588-.634-.925 0-1.575.603-2.075.686-.55 1.164-.625 1.996-1.188 1.518-1.025 1.03-2.4-.291-3.125-.499-.275-.728-.325-1.05-1.038-.281-.612.021-.6.385-1.012.592-.663.26-.988-.509-1.313-.208-.087-.416-.112-.624-.125-.665-.05-1.05-.362-1.071-1.062-.125-3.388-2.779-5.463-5.912-5.463z" /></svg>,
    TikTok: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
};

// Helper: Comments LocalStorage
const getStoredComments = (recipeId) => {
    try { return JSON.parse(localStorage.getItem(`recipe_comments_${recipeId}`)) || []; } catch { return []; }
};
const saveComment = (recipeId, comment) => {
    const comments = getStoredComments(recipeId);
    comments.unshift({ id: Date.now(), ...comment, timestamp: new Date().toISOString() });
    localStorage.setItem(`recipe_comments_${recipeId}`, JSON.stringify(comments));
    return comments;
};
const timeAgo = (ts) => {
    const diff = Date.now() - new Date(ts);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
};

const ChefRecipesSection = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [likes, setLikes] = useState({});

    const allRecipes = [
        {
            id: 1,
            image: '/images/generated/nordic_buns.png',
            title: 'Nordic Cardamom Buns (Kardemummabullar)',
            description: 'Experience the floral warmth of Kardemummabullar, a Nordic tradition perfected with Emperor Green Cardamom. Our 8mm+ pods infuse each bun with an aromatic richness that has made Scandinavian baking world-renowned.',
            fullContent: `
                **Nordic Cardamom Buns (Kardemummabullar)**
                
                A Swedish classic that showcases cardamom's magical pairing with butter and sugar. These buns are a testament to how Emperor Green Cardamom transforms simple ingredients into extraordinary delights.
                
                **Ingredients:**
                - 500g all-purpose flour
                - 250ml warm milk
                - 100g softened butter
                - 75g sugar
                - 1 packet dry yeast
                - 2 tsp freshly ground Emperor Cardamom (ESJ grade)
                - 1/2 tsp salt
                - Pearl sugar for topping
                
                **Instructions:**
                1. Warm milk to 37°C (98°F). Add yeast and let bloom for 5 minutes.
                2. Mix flour, sugar, ground cardamom, and salt in a large bowl.
                3. Add the yeast mixture and softened butter. Knead for 10 minutes until smooth.
                4. Cover and let rise for 1 hour until doubled.
                5. Roll out dough, spread with butter and cinnamon-cardamom sugar.
                6. Cut into strips, twist into knots, and place on baking sheet.
                7. Let rise 30 minutes. Brush with egg, sprinkle pearl sugar.
                8. Bake at 220°C (425°F) for 10-12 minutes until golden.
                
                **Chef's Tip:** Use freshly ground cardamom from whole ESJ pods for maximum aroma. The larger pods have higher essential oil content.
            `,
            region: 'Scandinavia',
            prepTime: '2 hours',
            difficulty: 'Medium',
        },
        {
            id: 2,
            image: '/images/generated/moroccan_cake.png',
            title: 'Moroccan Orange & Cardamom Cake',
            description: 'Mediterranean citrus meets floral spice in this delightful fusion. Emperor Cardamom brings an exotic depth that elevates this traditional Moroccan favorite.',
            fullContent: `
                **Moroccan Orange & Cardamom Cake**
                
                A moist, intensely aromatic cake where fresh oranges and Emperor Cardamom create a symphony of flavors.
                
                **Ingredients:**
                - 2 large oranges
                - 6 eggs
                - 225g ground almonds
                - 225g sugar
                - 1 tbsp baking powder
                - 1.5 tsp ground Emperor Cardamom
                - Orange blossom water for drizzle
                
                **Instructions:**
                1. Boil whole oranges for 2 hours until completely soft. Cool and blend whole (peel included).
                2. Beat eggs and sugar until light and fluffy.
                3. Fold in ground almonds, baking powder, and cardamom.
                4. Add the orange paste and mix well.
                5. Pour into a greased 9-inch pan.
                6. Bake at 180°C (350°F) for 50-60 minutes.
                7. Drizzle with orange blossom water while warm.
                
                **Chef's Tip:** The bitter orange peel balances perfectly with cardamom's sweetness.
            `,
            region: 'Morocco',
            prepTime: '3 hours',
            difficulty: 'Easy',
        },
        {
            id: 3,
            image: '/images/generated/finnish_glogi.png',
            title: 'Finnish Mulled Wine (Glögi)',
            description: 'Festive warmth in every sip. Our premium pods create the perfect winter aroma for this beloved Scandinavian beverage tradition.',
            fullContent: `
                **Finnish Mulled Wine (Glögi)**
                
                A warming winter beverage that showcases cardamom's affinity for wine and citrus.
                
                **Ingredients:**
                - 1 bottle red wine
                - 200ml water
                - 150g sugar
                - 10 whole Emperor Cardamom pods (crushed)
                - 5 whole cloves
                - 2 cinnamon sticks
                - Orange zest from 1 orange
                - Raisins and almonds for serving
                
                **Instructions:**
                1. Combine water, sugar, and all spices in a pot.
                2. Simmer for 15 minutes to create a spice syrup.
                3. Add wine and heat gently (do not boil).
                4. Strain into cups and serve with raisins and almonds.
                
                **Chef's Tip:** Crush cardamom pods slightly to release essential oils, but don't fully open them.
            `,
            region: 'Finland',
            prepTime: '30 min',
            difficulty: 'Easy',
        },
        {
            id: 4,
            image: '/images/generated/vatrushki.png',
            title: 'Eastern European Cardamom Vatrushki',
            description: 'Delicate pastries enhanced with the aromatic essence of Emperor Green Cardamom. A fusion of Eastern European tradition with Indian spice excellence.',
            fullContent: `
                **Eastern European Cardamom Vatrushki**
                
                These Russian sweet buns with a cardamom-spiced cheese filling are a unique fusion creation.
                
                **Ingredients:**
                - For the dough: Enriched yeast dough
                - 500g farmer's cheese (tvorog)
                - 2 egg yolks
                - 100g sugar
                - 1 tsp vanilla
                - 1 tsp ground Emperor Cardamom
                
                **Instructions:**
                1. Prepare enriched yeast dough and let rise.
                2. Mix cheese with egg yolks, sugar, vanilla, and cardamom.
                3. Shape dough into balls, press centers to create wells.
                4. Fill with cheese mixture.
                5. Bake at 180°C (350°F) for 20-25 minutes.
                
                **Chef's Tip:** Cardamom's floral notes complement the tangy cheese perfectly.
            `,
            region: 'Eastern Europe',
            prepTime: '2.5 hours',
            difficulty: 'Medium',
        },
    ];

    const featuredRecipe = allRecipes[0];
    const sideRecipes = allRecipes.slice(1);

    const handleLike = (id, isLike) => {
        setLikes(prev => ({
            ...prev,
            [id]: isLike ? 'liked' : 'disliked'
        }));
    };

    const SocialFeatures = ({ recipe }) => {
        const [comments, setComments] = useState(getStoredComments(recipe.id));
        const [commentForm, setCommentForm] = useState({ name: '', text: '' });
        const [isPosting, setIsPosting] = useState(false);
        const [showShareMenu, setShowShareMenu] = useState(false);
        const shareMenuRef = useRef(null);

        // Click outside handler for share menu
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
                    setShowShareMenu(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handleCommentSubmit = (e) => {
            e.preventDefault();
            if (!commentForm.name.trim() || !commentForm.text.trim()) return;
            setIsPosting(true);
            setTimeout(() => {
                const newComments = saveComment(recipe.id, commentForm);
                setComments(newComments);
                setCommentForm({ name: '', text: '' });
                setIsPosting(false);
            }, 600);
        };

        const shareLinks = [
            { icon: <Facebook size={18} />, color: '#1877f2', name: 'Facebook' },
            { icon: <Twitter size={18} />, color: '#1da1f2', name: 'Twitter' },
            { icon: <Linkedin size={18} />, color: '#0077b5', name: 'LinkedIn' },
            { icon: <SocialIcons.WhatsApp />, color: '#25d366', name: 'WhatsApp' },
            { icon: <SocialIcons.Instagram />, color: '#E1306C', name: 'Instagram' },
            { icon: <SocialIcons.Snapchat />, color: '#FFFC00', textColor: '#000', name: 'Snapchat' },
            { icon: <SocialIcons.TikTok />, color: '#000000', name: 'TikTok' },
        ];

        return (
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-stone-200)', paddingTop: '1.5rem' }}>
                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => handleLike(recipe.id, true)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: likes[recipe.id] === 'liked' ? 'var(--color-forest)' : 'var(--color-stone-100)',
                            color: likes[recipe.id] === 'liked' ? 'white' : 'var(--color-stone-600)',
                            border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                        <ThumbsUp size={16} /> Like
                    </button>
                    <button onClick={() => handleLike(recipe.id, false)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: likes[recipe.id] === 'disliked' ? '#dc2626' : 'var(--color-stone-100)',
                            color: likes[recipe.id] === 'disliked' ? 'white' : 'var(--color-stone-600)',
                            border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                        <ThumbsDown size={16} /> Dislike
                    </button>

                    <div style={{ position: 'relative' }} ref={shareMenuRef}>
                        <button onClick={() => setShowShareMenu(!showShareMenu)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-stone-100)',
                                color: 'var(--color-stone-600)', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '100px', cursor: 'pointer'
                            }}>
                            <Share2 size={16} /> Share
                        </button>
                        {showShareMenu && (
                            <div style={{
                                position: 'absolute', bottom: '100%', left: 0, background: 'white', borderRadius: '16px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.15)', padding: '12px', display: 'flex', gap: '8px',
                                marginBottom: '12px', width: 'max-content', maxWidth: '300px', flexWrap: 'wrap', zIndex: 50
                            }}>
                                {shareLinks.map((link, i) => (
                                    <button key={i} title={link.name} style={{
                                        background: link.color, color: link.textColor || 'white', border: 'none', borderRadius: '50%',
                                        width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                                        {link.icon}
                                    </button>
                                ))}
                                <button onClick={() => { navigator.clipboard.writeText(window.location.href); setShowShareMenu(false); }}
                                    title="Copy Link"
                                    style={{
                                        background: 'var(--color-stone-200)', color: 'var(--color-stone-600)', border: 'none',
                                        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', cursor: 'pointer'
                                    }}>
                                    <Copy size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comments Section */}
                <div style={{ background: 'var(--color-stone-50)', borderRadius: '16px', padding: '1.5rem' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                        <MessageCircle size={20} /> Comments ({comments.length})
                    </h4>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} style={{ marginBottom: '2rem' }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={commentForm.name}
                            onChange={e => setCommentForm({ ...commentForm, name: e.target.value })}
                            required
                            style={{
                                width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--color-stone-200)',
                                marginBottom: '0.8rem', fontSize: '0.95rem', outline: 'none'
                            }}
                        />
                        <textarea
                            placeholder="Share your thoughts about this recipe..."
                            value={commentForm.text}
                            onChange={e => setCommentForm({ ...commentForm, text: e.target.value })}
                            required
                            rows={3}
                            style={{
                                width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--color-stone-200)',
                                marginBottom: '1rem', fontSize: '0.95rem', minHeight: '80px', fontFamily: 'inherit', resize: 'vertical', outline: 'none'
                            }}
                        />
                        <button type="submit" disabled={isPosting} style={{
                            background: 'var(--color-forest)', color: 'white', border: 'none', padding: '0.8rem 1.5rem',
                            borderRadius: '100px', fontWeight: '600', cursor: isPosting ? 'wait' : 'pointer', display: 'flex',
                            alignItems: 'center', gap: '0.5rem', opacity: isPosting ? 0.7 : 1
                        }}>
                            <Send size={16} /> {isPosting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>

                    {/* Comments List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {comments.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--color-stone-500)', fontStyle: 'italic' }}>
                                No comments yet. Be the first to share your thoughts!
                            </p>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} style={{
                                    background: 'white', padding: '1rem', borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--color-forest)' }}>{comment.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-stone-400)' }}>{timeAgo(comment.timestamp)}</span>
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--color-stone-700)', lineHeight: '1.5' }}>{comment.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="section section-white" id="chef-recipes">
            <div className="container">
                <FadeInUp>
                    <h2 className="section-title section-center" style={{ marginBottom: '2rem' }}>
                        Create Your Own <span className="script">Magic</span>
                    </h2>
                </FadeInUp>

                <div className="chef-recipes-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Featured Recipe */}
                    <FadeInUp>
                        <div
                            className="featured-recipe"
                            onClick={() => setSelectedRecipe(featuredRecipe)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{
                                height: '280px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                marginBottom: '1.5rem',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src={featuredRecipe.image}
                                    alt={featuredRecipe.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <span style={{ background: 'var(--color-forest)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem' }}>
                                    {featuredRecipe.region}
                                </span>
                                <span style={{ background: 'var(--color-stone-100)', color: 'var(--color-stone-600)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem' }}>
                                    {featuredRecipe.prepTime}
                                </span>
                            </div>

                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                marginBottom: '1rem',
                                color: 'var(--color-forest)'
                            }}>
                                {featuredRecipe.title}
                            </h3>

                            <p className="featured-desc" style={{
                                color: 'var(--color-stone-600)',
                                lineHeight: '1.7',
                                marginBottom: '1.5rem'
                            }}>
                                {featuredRecipe.description}
                            </p>

                            <button
                                className="btn btn-primary"
                                style={{ borderRadius: '100px' }}
                            >
                                View Full Recipe
                            </button>
                        </div>
                    </FadeInUp>

                    {/* Side Recipes */}
                    <StaggerChildren stagger={0.1}>
                        <div className="side-recipes" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {sideRecipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className="side-recipe-card"
                                    onClick={() => setSelectedRecipe(recipe)}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '140px 1fr',
                                        gap: '1rem',
                                        alignItems: 'start',
                                        cursor: 'pointer',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        transition: 'background 0.2s',
                                        background: 'transparent'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-stone-50)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div style={{
                                        width: '140px',
                                        height: '110px',
                                        borderRadius: '12px',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--color-sage-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                            {recipe.region}
                                        </span>
                                        <h4 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            marginBottom: '0.5rem',
                                            lineHeight: '1.4'
                                        }}>
                                            {recipe.title}
                                        </h4>

                                        <p className="side-recipe-desc" style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--color-stone-600)',
                                            lineHeight: '1.5'
                                        }}>
                                            {recipe.description.substring(0, 80)}...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </StaggerChildren>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .chef-recipes-grid {
                            grid-template-columns: 1fr !important;
                            gap: 1.5rem !important;
                        }
                        .featured-recipe > div:first-child {
                            height: 200px !important;
                            margin-bottom: 1rem !important;
                        }
                        .featured-recipe h3 {
                            font-size: 1.2rem !important;
                        }
                        .featured-desc {
                            font-size: 0.85rem !important;
                            margin-bottom: 1rem !important;
                        }
                        .side-recipes {
                            gap: 1rem !important;
                        }
                        .side-recipe-card {
                            grid-template-columns: 100px 1fr !important;
                            gap: 0.75rem !important;
                            padding: 0.5rem !important;
                        }
                        .side-recipe-card > div:first-child {
                            width: 100px !important;
                            height: 80px !important;
                        }
                        .side-recipe-card h4 {
                            font-size: 0.85rem !important;
                            margin-bottom: 0.25rem !important;
                        }
                        .side-recipe-desc {
                            display: none !important;
                        }
                    }
                `}</style>
            </div>

            {/* Recipe Detail Modal */}
            <Modal
                isOpen={!!selectedRecipe}
                onClose={() => { setSelectedRecipe(null); setShowShareMenu(false); }}
                title={selectedRecipe?.title || 'Recipe'}
                size="large"
            >
                {selectedRecipe && (
                    <div>
                        <img
                            src={selectedRecipe.image}
                            alt={selectedRecipe.title}
                            style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                marginBottom: '1.5rem'
                            }}
                        />

                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                            <span style={{ background: 'var(--color-forest)', color: 'white', padding: '0.35rem 1rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                                {selectedRecipe.region}
                            </span>
                            <span style={{ background: 'var(--color-stone-100)', padding: '0.35rem 1rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                                ⏱ {selectedRecipe.prepTime}
                            </span>
                            <span style={{ background: 'var(--color-stone-100)', padding: '0.35rem 1rem', borderRadius: '100px', fontSize: '0.8rem' }}>
                                📊 {selectedRecipe.difficulty}
                            </span>
                        </div>

                        <div style={{
                            whiteSpace: 'pre-line',
                            lineHeight: '1.8',
                            color: 'var(--color-stone-600)',
                            fontSize: '0.95rem'
                        }}>
                            {selectedRecipe.fullContent}
                        </div>

                        <SocialFeatures recipe={selectedRecipe} />
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default ChefRecipesSection;
