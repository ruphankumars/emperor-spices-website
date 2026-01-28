import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ThumbsUp, ThumbsDown, MessageCircle, Share2, Facebook, Twitter, Linkedin, Copy, Send, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';

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

const RecipesSection = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showAllRecipes, setShowAllRecipes] = useState(false);
    const [likes, setLikes] = useState({});


    const allRecipes = [
        {
            id: 1,
            title: 'Arabic Coffee (Qahwa)',
            region: 'Middle East',
            image: '/images/cardamom-content/cardamom_usage_arabic.png',
            prepTime: '15 min',
            difficulty: 'Easy',
            description: 'The quintessential Middle Eastern coffee, where cardamom is the star. This ritual beverage symbolizes hospitality across the Gulf.',
            fullContent: `
**Arabic Coffee (Qahwa)**

A symbol of hospitality in the Middle East, this lightly roasted coffee gets its distinctive flavor from generous amounts of cardamom.

**Ingredients:**
- 3 cups water
- 3 tbsp Arabic coffee (lightly roasted)
- 1 tbsp crushed Emperor Cardamom pods (ESJ grade)
- A few saffron strands (optional)
- Rose water (optional)

**Instructions:**
1. Bring water to boil in a dallah (Arabic coffee pot).
2. Add coffee and cardamom, reduce heat.
3. Simmer for 10-15 minutes.
4. Add saffron and rose water if desired.
5. Let settle, then pour into small cups.

**Tip:** The cardamom should be crushed but not powdered to release oils gradually.
            `
        },
        {
            id: 2,
            title: 'Swedish Cardamom Buns',
            region: 'Scandinavia',
            image: '/images/cardamom-content/cardamom_usage_english.png',
            prepTime: '2 hours',
            difficulty: 'Medium',
            description: 'Sweden\'s most beloved pastry, featuring the warm, aromatic embrace of green cardamom in every tender bite.',
            fullContent: `
**Swedish Cardamom Buns (Kardemummabullar)**

Sweden's answer to the cinnamon roll, these buns showcase cardamom as the main spice.

**Ingredients:**
- 500g flour
- 250ml warm milk
- 100g butter
- 75g sugar
- 7g dry yeast
- 2 tsp ground Emperor Cardamom
- Filling: butter, sugar, more cardamom

**Instructions:**
1. Activate yeast in warm milk with a pinch of sugar.
2. Mix flour, sugar, and cardamom.
3. Add yeast mixture and melted butter.
4. Knead until smooth, let rise 1 hour.
5. Roll, spread filling, cut and twist into knots.
6. Bake at 220°C for 10-12 minutes.
            `
        },
        {
            id: 3,
            title: 'Masala Chai',
            region: 'India',
            image: '/images/cardamom-content/cardamom_usage_indian.png',
            prepTime: '10 min',
            difficulty: 'Easy',
            description: 'India\'s beloved spiced tea where cardamom plays a leading role. A warming embrace in every cup.',
            fullContent: `
**Masala Chai**

India's gift to the world - a spiced tea where cardamom is essential.

**Ingredients:**
- 2 cups water
- 1 cup milk
- 2 tbsp loose black tea
- 4 Emperor Cardamom pods, crushed
- 1 small cinnamon stick
- 4 cloves
- 1 inch ginger, sliced
- Sugar to taste

**Instructions:**
1. Crush cardamom pods and other spices.
2. Boil water with spices for 3-4 minutes.
3. Add tea leaves, simmer 2 minutes.
4. Add milk, bring to boil.
5. Strain into cups, add sugar.
            `
        },
        {
            id: 4,
            title: 'Kheer (Rice Pudding)',
            region: 'South Asia',
            image: '/images/cardamom-content/cardamom_dessert.png',
            prepTime: '45 min',
            difficulty: 'Easy',
            description: 'A creamy rice pudding perfumed with cardamom, a festive favorite across the Indian subcontinent.',
            fullContent: `
**Kheer (Indian Rice Pudding)**

A beloved festive dessert where cardamom is the defining flavor.

**Ingredients:**
- 1/4 cup basmati rice
- 1 liter full-fat milk
- 1/2 cup sugar
- 1/4 tsp ground Emperor Cardamom
- Slivered almonds and pistachios
- Saffron strands (optional)

**Instructions:**
1. Soak rice 30 minutes, drain.
2. Simmer milk until reduced by half.
3. Add rice, cook until very soft.
4. Add sugar and cardamom.
5. Garnish with nuts and saffron.
            `
        },
        {
            id: 5,
            title: 'Cardamom Cheesecake Bars',
            region: 'Fusion',
            image: '/images/recipes/emperor_cardamom_shutterstock_652405729_1024x1024.jpg',
            prepTime: '1 hour',
            difficulty: 'Medium',
            description: 'A creamy cheesecake infused with cardamom, combining Western technique with Eastern aromatics.',
            fullContent: `
**Cardamom Cheesecake Bars**

A fusion dessert that marries creamy cheesecake with aromatic cardamom.

**Ingredients:**
- 200g digestive biscuits
- 100g butter
- 500g cream cheese
- 150g sugar
- 2 eggs
- 1.5 tsp ground Emperor Cardamom
- 1 tsp vanilla

**Instructions:**
1. Crush biscuits, mix with melted butter for base.
2. Press into pan, chill.
3. Beat cream cheese with sugar until smooth.
4. Add eggs, cardamom, and vanilla.
5. Pour over base, bake at 160°C for 40 minutes.
6. Cool gradually in oven to prevent cracks.
            `
        },
        {
            id: 6,
            title: 'Luqaimat',
            region: 'Middle East',
            image: '/images/recipes/emperor_cardamom_Moroccan_Orange_and_Cardamom_Cake_480x480.png',
            prepTime: '30 min',
            difficulty: 'Easy',
            description: 'Sweet fried dumplings drizzled with date syrup and cardamom, a traditional Emirati treat.',
            fullContent: `
**Luqaimat (Arabic Dumplings)**

Crispy on the outside, fluffy inside, drizzled with cardamom-infused syrup.

**Ingredients:**
- 2 cups flour
- 1 tbsp yeast
- Warm water
- Pinch of salt
- Oil for frying
- For syrup: date molasses, cardamom, saffron

**Instructions:**
1. Mix flour, yeast, salt with warm water to form batter.
2. Rest for 1 hour until bubbly.
3. Drop spoonfuls into hot oil.
4. Fry until golden.
5. Drizzle with cardamom date syrup.
            `
        },
        {
            id: 7,
            title: 'Greek Melomakarona Cookies',
            region: 'Mediterranean',
            image: '/images/recipes/emperor_cardamom_Finnish_Mulled_Wine_1024x1024.jpg',
            prepTime: '1 hour',
            difficulty: 'Medium',
            description: 'Honey-soaked Greek Christmas cookies enhanced with cardamom and walnuts.',
            fullContent: `
**Greek Cardamom Melomakarona**

Traditional honey-soaked cookies with a Middle Eastern twist.

**Ingredients:**
- 2 cups olive oil
- 1 cup sugar
- Orange juice and zest
- 4 cups flour
- 1 tsp ground cardamom
- Honey syrup
- Crushed walnuts

**Instructions:**
1. Mix oil with sugar until combined.
2. Add orange juice, zest, and spices.
3. Gradually add flour to form soft dough.
4. Shape into ovals, bake until golden.
5. Dip hot cookies in honey syrup.
6. Top with crushed walnuts.
            `
        },
        {
            id: 8,
            title: 'Bastani Sundae',
            region: 'Persian',
            image: '/images/recipes/emperor_cardamom_Cardamom_Vatrushki_480x480.png',
            prepTime: '4 hours',
            difficulty: 'Hard',
            description: 'Persian ice cream with saffron, rose water, and cardamom, a royal treat.',
            fullContent: `
**Traditional Persian Bastani Sundae**

Saffron ice cream with rose and cardamom - Iran's most elegant dessert.

**Ingredients:**
- 4 cups heavy cream
- 1 cup sugar
- 1/4 tsp saffron
- 1 tbsp rose water
- 1/2 tsp ground cardamom
- Pistachios
- Frozen cream pieces (katak)

**Instructions:**
1. Steep saffron in warm cream.
2. Mix cream, sugar, saffron mixture.
3. Add rose water and cardamom.
4. Churn in ice cream maker.
5. Fold in pistachios and cream pieces.
6. Freeze until firm.
            `
        },
        {
            id: 9,
            title: 'Cardamom Biryani',
            region: 'India',
            image: '/images/cardamom-content/cardamom_usage_indian.png',
            prepTime: '1.5 hours',
            difficulty: 'Hard',
            description: 'The king of Indian rice dishes, where whole cardamom pods impart their aromatic magic.',
            fullContent: `
**Cardamom-Infused Biryani**

India's most celebrated rice dish, layered with whole spices.

**Ingredients:**
- 2 cups basmati rice
- 500g meat of choice
- 6-8 whole Emperor Cardamom pods
- Whole spices (bay leaf, cinnamon, cloves)
- Saffron milk
- Fried onions, ginger-garlic paste
- Yogurt marinade

**Instructions:**
1. Marinate meat in yogurt and spices.
2. Parboil rice with whole cardamom.
3. Layer meat and rice in pot.
4. Drizzle saffron milk.
5. Seal and cook on low heat (dum).
            `
        },
        {
            id: 10,
            title: 'Cardamom Kulfi',
            region: 'India',
            image: '/images/cardamom-content/cardamom_dessert.png',
            prepTime: '5 hours',
            difficulty: 'Medium',
            description: 'Dense, creamy Indian ice cream where cardamom is the star flavor.',
            fullContent: `
**Cardamom Kulfi**

India's traditional frozen dessert, denser and creamier than regular ice cream.

**Ingredients:**
- 1 liter full-fat milk
- 1/2 cup sugar
- 2 tbsp cream
- 1/2 tsp ground Emperor Cardamom
- Pistachios for garnish

**Instructions:**
1. Simmer milk until reduced to 1/3.
2. Add sugar and stir until dissolved.
3. Cool slightly, add cardamom.
4. Pour into molds.
5. Freeze overnight.
6. Unmold and slice to serve.
            `
        },
        {
            id: 11,
            title: 'Turkish Cardamom Coffee',
            region: 'Turkey',
            image: '/images/cardamom-content/cardamom_usage_arabic.png',
            prepTime: '10 min',
            difficulty: 'Easy',
            description: 'Rich, thick coffee enhanced with the aromatic embrace of cardamom.',
            fullContent: `
**Turkish Cardamom Coffee**

A variation of Turkish coffee with cardamom for added depth.

**Ingredients:**
- 1 cup cold water
- 2 tbsp finely ground Turkish coffee
- 3-4 crushed cardamom pods
- Sugar to taste
- Cezve (Turkish coffee pot)

**Instructions:**
1. Add water, coffee, cardamom, and sugar to cezve.
2. Stir to combine.
3. Heat slowly until foam rises.
4. Remove from heat when foam rises.
5. Repeat rising 2-3 times.
6. Pour into cups with foam on top.
            `
        },
        {
            id: 12,
            title: 'Jalebi with Cardamom',
            region: 'India',
            image: '/images/recipes/emperor_cardamom_shutterstock_652405729_1024x1024.jpg',
            prepTime: '1 hour',
            difficulty: 'Medium',
            description: 'Crispy, spiral-shaped sweets soaked in cardamom-infused sugar syrup.',
            fullContent: `
**Cardamom Jalebi**

Crispy, pretzel-shaped sweets dipped in fragrant syrup.

**Ingredients:**
- 1 cup all-purpose flour
- 2 tbsp besan (gram flour)
- Pinch of turmeric
- Yogurt and water for batter
- For syrup: sugar, water, cardamom, saffron

**Instructions:**
1. Make batter with flour, besan, yogurt.
2. Ferment for 8-12 hours.
3. Prepare sugar syrup with cardamom and saffron.
4. Pipe batter in spirals into hot oil.
5. Fry until crispy and golden.
6. Dip immediately in warm syrup.
            `
        },
    ];

    const displayRecipes = allRecipes.slice(0, 4);

    const handleLike = (id, isLike) => {
        setLikes(prev => ({
            ...prev,
            [id]: isLike ? 'liked' : 'disliked'
        }));
    };

    const SocialFeatures = ({ recipe }) => {
        const { isAdmin } = useAuth();
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {comments.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--color-stone-500)', fontStyle: 'italic' }}>
                                No comments yet. Be the first to share your thoughts!
                            </p>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} style={{
                                    background: 'white', padding: '1rem', borderRadius: '12px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)', position: 'relative'
                                }}>
                                    {isAdmin && (
                                        <button
                                            onClick={() => {
                                                const newComments = comments.filter(c => c.id !== comment.id);
                                                setComments(newComments);
                                                localStorage.setItem(`recipe_comments_${recipe.id}`, JSON.stringify(newComments));
                                            }}
                                            style={{
                                                position: 'absolute', top: '10px', right: '10px',
                                                background: '#fee2e2', color: '#dc2626', border: 'none',
                                                borderRadius: '4px', padding: '4px', cursor: 'pointer'
                                            }}
                                            title="Delete Comment (Admin)"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingRight: '20px' }}>
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
        <React.Fragment>
            <section id="recipes" className="section section-white section-center" style={{ position: 'relative', overflow: 'hidden' }}>
                <div className="container">
                    <div className="scroll-indicator mx-auto mb-4" style={{ justifyContent: 'center' }}>
                        Scroll to explore <ArrowRight size={16} />
                    </div>

                    <span className="section-label">Culinary Uses</span>
                    <h2 className="section-title">
                        Recipes with <span className="script">Cardamom</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        From Arabic coffee to Scandinavian buns, discover how cardamom enhances flavors worldwide
                    </p>

                    {/* Recipe Grid */}
                    <div className="grid-4" style={{ marginTop: '3rem' }}>
                        {displayRecipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="card"
                                style={{ overflow: 'hidden', cursor: 'pointer' }}
                                onClick={() => setSelectedRecipe(recipe)}
                            >
                                <div style={{ height: '180px', overflow: 'hidden' }}>
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    />
                                </div>
                                <div className="card-content">
                                    <span style={{ fontSize: '0.7rem', color: 'var(--color-sage-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {recipe.region}
                                    </span>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600' }}>
                                        {recipe.title}
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-stone-600)', marginTop: '0.5rem' }}>
                                        {recipe.prepTime} • {recipe.difficulty}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <button
                            onClick={() => setShowAllRecipes(true)}
                            className="btn btn-outline"
                            style={{ color: 'var(--color-forest)', borderColor: 'var(--color-forest)' }}
                        >
                            Explore All Recipes <ArrowRight size={16} />
                        </button>
                    </div>
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
                                    height: '280px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    marginBottom: '1.5rem'
                                }}
                            />

                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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

                            <p style={{ color: 'var(--color-stone-600)', lineHeight: '1.7', marginBottom: '1rem' }}>
                                {selectedRecipe.description}
                            </p>

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

                {/* All Recipes Modal */}
                <Modal
                    isOpen={showAllRecipes}
                    onClose={() => setShowAllRecipes(false)}
                    title="All Cardamom Recipes"
                    size="xlarge"
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {allRecipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                onClick={() => { setShowAllRecipes(false); setSelectedRecipe(recipe); }}
                                style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                                }}
                            >
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '1rem' }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--color-sage-dark)', textTransform: 'uppercase' }}>
                                        {recipe.region}
                                    </span>
                                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: '600', margin: '0.25rem 0' }}>
                                        {recipe.title}
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-stone-500)' }}>
                                        {recipe.prepTime} • {recipe.difficulty}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal>
            </section>
        </React.Fragment>
    );
};

export default RecipesSection;
