import React from 'react';
import OptimizedImg from '../components/OptimizedImg';

const CategoryGallery = () => {
    const categories = [
        {
            name: "The Perfect Pod",
            items: [
                { src: "/landing_page_images/generated/section_cardamom_closeup_1769454434966.png", title: "The Open Pod", desc: "Vibrant green with black seeds" },
                { src: "/images/cardamom-content/cardamom_sample.png", title: "Texture Contrast", desc: "Premium grading detail" },
                { src: "/images/cardamom-pods.png", title: "Harvest Fresh", desc: "Naturally dried pods" },
                { src: "/images/cardamom-hero.png", title: "Perfect Gradient", desc: "Size and color perfection" }
            ]
        },
        {
            name: "Culinary & Savory",
            items: [
                { src: "/landing_page_images/generated/section_indian_biryani_1769454570012.png", title: "Biryani Garnish", desc: "Royal saffron infusion" },
                { src: "/landing_page_images/generated/section_chef_culinary_1769454503006.png", title: "Chef's Touch", desc: "Professional seasoning" },
                { src: "/images/indian-biryani.png", title: "Savory Tradition", desc: "Aromatic rice perfection" },
                { src: "/images/cardamom-content/cardamom_biryani.png", title: "Spice Blend", desc: "The soul of cuisine" }
            ]
        },
        {
            name: "Brewed Heritage",
            items: [
                { src: "/landing_page_images/generated/section_arabic_coffee_1769454416868.png", title: "Arabic Coffee", desc: "The desert's hospitality" },
                { src: "/images/arabic-coffee-pouch.png", title: "Masala Chai", desc: "Warmth in every sip" },
                { src: "/images/cardamom-content/cardamom_usage_arabic.png", title: "Gahwa Ritual", desc: "Traditional brewing" },
                { src: "/images/recipes/emperor_cardamom_Finnish_Mulled_Wine_1024x1024.jpg", title: "Finnish Glögi", desc: "Festive mulled wine" }
            ]
        },
        {
            name: "Sweet Indulgence",
            items: [
                { src: "/images/recipes/emperor_cardamom_Moroccan_Orange_and_Cardamom_Cake_480x480.png", title: "Moroccan Cake", desc: "Citrus & floral spice" },
                { src: "/images/recipes/emperor_cardamom_Cardamom_Vatrushki_480x480.png", title: "Vatrushki Pastry", desc: "Eastern European fusion" },
                { src: "/images/scandinavian-buns.png", title: "Kardemummabullar", desc: "Authentic spice baking" },
                { src: "/images/cardamom-content/cardamom_dessert.png", title: "Royal Kheer", desc: "Classic Indian sweets" }
            ]
        }
    ];

    return (
        <section className="py-24 bg-cream">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-sage font-bold tracking-widest uppercase text-sm">Visual Discovery</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">
                        A World of <span className="text-gold italic font-handwritten">Cardamom</span>
                    </h2>
                </div>

                <div className="v5-masonry-wrapper">
                    {categories.flatMap(cat => cat.items).map((item, i) => (
                        <div key={i} className="v5-masonry-item v5-visual-tile">
                            <OptimizedImg
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="v5-visual-overlay">
                                <span className="v5-visual-title">{item.title}</span>
                                <span className="v5-visual-desc">{item.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGallery;
