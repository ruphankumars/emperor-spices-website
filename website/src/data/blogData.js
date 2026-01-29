// Blog Database - Emperor Spices Original Content
// All content is original and rephrased for uniqueness

export const BLOG_CATEGORIES = {
    ARTICLES: 'articles',
    RECIPES: 'recipes'
};

export const BLOG_TAGS = {
    HEALTH: 'Health & Wellness',
    SUSTAINABILITY: 'Sustainability',
    RECIPES: 'Recipes',
    EXPORT: 'Export & Trade',
    QUALITY: 'Quality',
    CULTURE: 'Culture & Heritage',
    TIPS: 'Tips & Guide',
    FESTIVE: 'Festive',
    DESSERT: 'Dessert',
    BEVERAGES: 'Beverages'
};

// Full blog database with ORIGINAL rephrased content
export const blogDatabase = [
    // ===== ARTICLES =====
    {
        id: 'health-benefits-cardamom',
        slug: 'unlocking-cardamom-wellness-secrets',
        title: 'Unlocking the Wellness Secrets of Green Cardamom',
        excerpt: 'Explore the remarkable therapeutic properties of green cardamom, treasured in Ayurvedic medicine for thousands of years.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.HEALTH],
        image: '/images/generated/wellness_secrets.png',
        author: 'Emperor Spices Wellness Team',
        date: '2024-10-15',
        readTime: '5 min read',
        featured: true,
        content: `
            <p>Green cardamom isn't just a culinary delight—it's a powerhouse of wellness benefits that ancient healers recognized centuries ago. Modern research now validates what Ayurvedic practitioners have known all along.</p>
            
            <h3>9 Remarkable Wellness Benefits</h3>
            
            <ol>
                <li><strong>Digestive Harmony:</strong> The volatile oils in cardamom stimulate gastric enzymes, promoting smooth digestion and relieving discomfort from bloating.</li>
                <li><strong>Natural Breath Freshener:</strong> Cardamom's antibacterial compounds combat oral pathogens while leaving a pleasant, lasting freshness.</li>
                <li><strong>Anti-Inflammatory Power:</strong> Rich in antioxidants like cineole and limonene, cardamom helps calm systemic inflammation.</li>
                <li><strong>Cardiovascular Support:</strong> Studies indicate cardamom may help maintain healthy blood pressure levels naturally.</li>
                <li><strong>Gentle Detoxification:</strong> The diuretic properties of cardamom support kidney function and natural body cleansing.</li>
                <li><strong>Respiratory Relief:</strong> Eucalyptol in cardamom opens airways and soothes respiratory passages during seasonal changes.</li>
                <li><strong>Blood Sugar Balance:</strong> Emerging research suggests cardamom may help maintain glucose levels within healthy ranges.</li>
                <li><strong>Mood Enhancement:</strong> The aromatic compounds have shown calming effects, helping reduce everyday stress.</li>
                <li><strong>Metabolic Boost:</strong> Cardamom may support thermogenesis, aiding natural metabolic processes.</li>
            </ol>
            
            <h3>Why Quality Matters</h3>
            <p>The therapeutic potency of cardamom depends entirely on its quality. Premium GI-tagged Alleppey Green Cardamom, like Emperor Spices, contains up to 8% essential oils—double that of ordinary varieties.</p>
            
            <p>Embrace these ancient wellness secrets with the finest cardamom nature offers.</p>
        `
    },
    {
        id: 'art-of-selecting-cardamom',
        slug: 'mastering-cardamom-selection',
        title: 'Mastering the Art of Cardamom Selection',
        excerpt: 'A comprehensive guide to identifying premium cardamom and understanding why superior quality delivers better value.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.TIPS, BLOG_TAGS.QUALITY],
        image: '/images/cardamom_content/cardamom_sorting.png',
        author: 'Emperor Spices Quality Team',
        date: '2024-09-20',
        readTime: '6 min read',
        featured: true,
        content: `
            <h3>Understanding Potency</h3>
            <p>While cardamom doesn't spoil easily, it gradually loses its aromatic intensity over time. Once those precious volatile oils dissipate, the spice loses its ability to transform your dishes.</p>
            
            <p>The journey from plantation to your kitchen matters immensely. Proper harvesting, immediate processing, and airtight packaging preserve the aromatics that make cardamom special.</p>
            
            <p>Here's a simple principle: larger pods contain more seeds, which means more essential oils and therefore more intense flavor and aroma.</p>
            
            <h3>Visual and Aromatic Assessment</h3>
            <p>How can you evaluate cardamom quality at a glance? Examine the pod color—vibrant green indicates freshness, while faded or brownish pods suggest age. Inside, fresh seeds appear dark brown to black; pale tan seeds have lost their vitality.</p>
            
            <p>The ultimate test: cup the pods in your hand and inhale deeply. Your senses will immediately tell you whether the natural freshness remains intact.</p>
            
            <h3>The Premium Advantage</h3>
            <p>GI-certified Alleppey Green Cardamom represents the pinnacle of quality. Emperor Spices maintains rigorous standards across the entire supply chain, from harvest to packaging.</p>
            
            <h3>True Value Proposition</h3>
            <p>Budget options often prove costly in disguise. When lesser cardamom requires triple the quantity to achieve adequate flavor, premium varieties become the economical choice. One pod of exceptional quality outperforms three of mediocre grade.</p>
        `
    },
    {
        id: 'alleppey-cardamom-distinction',
        slug: 'alleppey-green-cardamom-distinction',
        title: 'The Alleppey Green Cardamom Distinction',
        excerpt: 'Discover what makes cardamom from Kerala\'s Western Ghats the most sought-after variety globally.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.QUALITY, BLOG_TAGS.CULTURE],
        image: '/images/cardamom_content/cardamom_plantation.png',
        author: 'Emperor Spices Heritage Team',
        date: '2024-08-25',
        readTime: '7 min read',
        featured: true,
        content: `
            <p>Named after the enchanting backwaters region of Kerala, Alleppey Green Cardamom has earned legendary status among spice connoisseurs worldwide.</p>
            
            <h3>Nature's Perfect Laboratory</h3>
            <p>The Western Ghats create an irreplaceable microclimate—consistent monsoons, cool mountain temperatures, and mineral-rich volcanic soils combine to produce cardamom with unparalleled characteristics.</p>
            
            <h3>Exceptional Essential Oil Concentration</h3>
            <p>The defining feature of Alleppey cardamom is its remarkable essential oil content—typically 6-8% compared to merely 2-4% in other origins. This translates directly to superior flavor depth and aromatic intensity.</p>
            
            <h3>Protected Origin Status</h3>
            <p>The Geographical Indication certification ensures authenticity and protects centuries of cultivation expertise. Emperor Spices proudly holds this prestigious certification.</p>
            
            <h3>Signature Characteristics</h3>
            <ul>
                <li>Luminous emerald-green coloration signifying optimal freshness</li>
                <li>Complex aroma profile—eucalyptus notes with sweet, floral undertones</li>
                <li>Generously sized pods packed with aromatic seeds</li>
                <li>Persistent flavor that maintains intensity through cooking</li>
            </ul>
        `
    },
    {
        id: 'kerala-spice-heritage',
        slug: 'kerala-global-spice-gateway',
        title: 'Kerala: Gateway to the Global Spice Trade',
        excerpt: 'How Kerala emerged as the world\'s premier destination for premium cardamom and the exporters maintaining this legacy.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.EXPORT, BLOG_TAGS.CULTURE],
        image: '/images/generated/kerala_spice_trade.png',
        author: 'Emperor Spices Trade Team',
        date: '2024-08-10',
        readTime: '5 min read',
        featured: false,
        content: `
            <p>For millennia, Kerala has stood at the crossroads of global spice commerce. Ancient mariners traversed treacherous seas seeking the aromatic treasures of the Malabar Coast, establishing trade routes that shaped world history.</p>
            
            <h3>Centuries of Cultivation Excellence</h3>
            <p>The misty Cardamom Hills have hosted commercial cultivation for generations. Traditional knowledge passed through centuries combines with modern techniques to produce consistently exceptional harvests.</p>
            
            <h3>Contemporary Export Standards</h3>
            <p>Today's leading exporters maintain international certifications including FSSAI compliance, ISO standards, and organic verification. These credentials ensure every shipment meets the exacting requirements of global markets.</p>
            
            <h3>Emperor Spices: Continuing the Tradition</h3>
            <p>With headquarters in Bodinayakanur—the beating heart of cardamom country—Emperor Spices serves customers across 40+ nations on six continents, carrying forward a proud legacy of excellence.</p>
        `
    },
    {
        id: 'sustainable-quality',
        slug: 'sustainable-excellence-commitment',
        title: 'Our Commitment to Sustainable Excellence',
        excerpt: 'How Emperor Spices balances premium quality with environmental responsibility and community support.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.SUSTAINABILITY, BLOG_TAGS.QUALITY],
        image: '/images/generated/sustainable_excellence.png',
        author: 'Emperor Spices Sustainability Team',
        date: '2024-07-30',
        readTime: '6 min read',
        featured: false,
        content: `
            <p>True quality extends beyond the product—it encompasses responsibility toward our planet, our farmers, and coming generations.</p>
            
            <h3>Renewable Energy Operations</h3>
            <p>Our processing facilities harness solar power, dramatically reducing our environmental footprint while maintaining impeccable processing standards.</p>
            
            <h3>Natural Cultivation Methods</h3>
            <p>We collaborate closely with farming partners to promote organic and chemical-free practices, ensuring our cardamom remains pure from soil to packaging.</p>
            
            <h3>Community Partnership</h3>
            <p>Direct relationships with farming families ensure fair compensation and sustainable livelihoods for communities who have cultivated these lands for generations.</p>
            
            <h3>Responsible Packaging</h3>
            <p>Our innovative aroma-lock packaging maintains freshness while using recyclable materials—protecting both quality and the environment.</p>
        `
    },
    {
        id: 'cardamom-culinary-heritage',
        slug: 'cardamom-indian-culinary-soul',
        title: 'Cardamom: The Soul of Indian Cuisine',
        excerpt: 'A journey through the essential role of cardamom in shaping India\'s rich culinary traditions.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.CULTURE, BLOG_TAGS.RECIPES],
        image: '/images/generated/kerala_heritage.png',
        author: 'Emperor Spices Culinary Team',
        date: '2024-07-15',
        readTime: '4 min read',
        featured: false,
        content: `
            <p>In Indian gastronomy, cardamom transcends mere spice status—it's an essential soul of countless cherished recipes. From royal Mughal kitchens to modern household cooking, its presence is irreplaceable.</p>
            
            <h3>Remarkable Versatility</h3>
            <p>Few spices demonstrate such range—cardamom enhances savory curries and sweet desserts with equal grace, adding sophisticated depth to every preparation.</p>
            
            <h3>Timeless Preparations</h3>
            <ul>
                <li><strong>Biryani:</strong> The layered rice masterpiece gains its signature aroma from whole cardamom pods</li>
                <li><strong>Masala Chai:</strong> India's beloved spiced tea depends on cardamom for its warming character</li>
                <li><strong>Kheer:</strong> This creamy rice pudding showcases freshly ground cardamom perfectly</li>
                <li><strong>Garam Masala:</strong> The essential spice blend features cardamom as a foundational ingredient</li>
            </ul>
            
            <h3>Culinary Wisdom</h3>
            <p>Lightly crush pods just before use to release maximum fragrance. Those freshly liberated oils will transform your cooking.</p>
        `
    },
    {
        id: 'brand-heritage-story',
        slug: 'emperor-spices-heritage-journey',
        title: 'The Emperor Spices Heritage Journey',
        excerpt: 'Tracing our brand\'s evolution from local roots to becoming a trusted name in premium global spice trade.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.CULTURE],
        image: '/images/generated/heritage_journey.png',
        author: 'Emperor Spices Heritage Team',
        date: '2024-06-25',
        readTime: '5 min read',
        featured: false,
        content: `
            <p>Our story intertwines with India's magnificent spice trade heritage. Named to evoke the grandeur of Mughal appreciation for fine aromatics, Emperor Spices carries forward an illustrious tradition.</p>
            
            <h3>Royal Roots</h3>
            <p>The Mughal courts celebrated cardamom in cuisine and traditional medicine alike. This spirit of quality appreciation guides our standards today.</p>
            
            <h3>Over 25 Years of Excellence</h3>
            <p>Established in Bodinayakanur, the heartland of Indian cardamom, our enterprise has grown from a family operation to an international presence while preserving core quality values.</p>
            
            <h3>Our Enduring Promise</h3>
            <p>Every Emperor Spices product carries our commitment to authenticity, premium quality, and the proud heritage of Indian spice mastery.</p>
        `
    },
    {
        id: 'wellness-rituals-guide',
        slug: 'five-day-cardamom-wellness-rituals',
        title: 'Five-Day Cardamom Wellness Transformation',
        excerpt: 'A structured wellness program incorporating cardamom into daily routines based on time-tested Ayurvedic principles.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.HEALTH, BLOG_TAGS.TIPS],
        image: '/images/generated/transformation.png',
        author: 'Emperor Spices Wellness Team',
        date: '2024-06-10',
        readTime: '8 min read',
        featured: false,
        content: `
            <p>Begin a transformative wellness journey with cardamom as your guide. These daily practices draw from ancient Ayurvedic wisdom to enhance digestion, boost immunity, and promote overall vitality.</p>
            
            <h3>Day One: Morning Infusion</h3>
            <p>Start each morning with warm water infused with lightly crushed cardamom. This gentle ritual awakens your digestive system and prepares your body for the day ahead.</p>
            
            <h3>Day Two: Natural Oral Care</h3>
            <p>Following meals, gently chew a cardamom pod. The natural antibacterial properties cleanse your palate while freshening breath naturally.</p>
            
            <h3>Day Three: Culinary Integration</h3>
            <p>Incorporate freshly crushed cardamom into your midday meal. Whether in rice, curries, or beverages, let the spice work its digestive magic.</p>
            
            <h3>Day Four: Evening Relaxation</h3>
            <p>One hour before sleep, enjoy warm milk with cardamom powder. This calming combination promotes restful sleep and overnight cellular renewal.</p>
            
            <h3>Day Five: Complete Integration</h3>
            <p>Combine all previous practices for a complete cardamom wellness experience. Notice increased energy and improved digestive comfort.</p>
        `
    },
    {
        id: 'grading-system-explained',
        slug: 'understanding-cardamom-grades',
        title: 'Understanding Cardamom Grades: A Visual Guide',
        excerpt: 'Decode the Emperor Spices color-coded grading system to select the perfect cardamom for every occasion.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.TIPS, BLOG_TAGS.QUALITY],
        image: '/images/cardamom_content/cardamom_grading.png',
        author: 'Emperor Spices Quality Team',
        date: '2024-05-20',
        readTime: '4 min read',
        featured: false,
        content: `
            <p>Emperor Spices pioneered an intuitive color-coded grading system that simplifies quality selection for every customer.</p>
            
            <h3>Grade Classifications</h3>
            
            <h4>Royal Purple — Super Premium</h4>
            <p>The largest, most aromatic pods with maximum essential oil concentration. Reserved for special occasions when only extraordinary will suffice.</p>
            
            <h4>Rose Pink — Premium</h4>
            <p>Excellent size and intense aroma, perfect for daily use when quality matters in beverages and cooking.</p>
            
            <h4>Emerald Green — Standard</h4>
            <p>Outstanding value with authentic Alleppey character, suitable for most culinary applications.</p>
            
            <h4>Sunset Orange & Ruby Red</h4>
            <p>Economical options maintaining genuine Alleppey Green Cardamom quality for everyday cooking.</p>
            
            <h3>Selection Guidance</h3>
            <p>For beverages and desserts where cardamom takes center stage, choose Purple or Pink grades. For cooking within spice blends, Green provides excellent value without compromising quality.</p>
        `
    },
    {
        id: 'global-supply-leader',
        slug: 'emperor-spices-global-leadership',
        title: 'Leading India\'s Premium Cardamom Supply',
        excerpt: 'How Emperor Spices established leadership in the premium green cardamom supply chain from India to the world.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.EXPORT],
        image: '/images/generated/supply_leadership.png',
        author: 'Emperor Spices Trade Team',
        date: '2024-05-05',
        readTime: '5 min read',
        featured: false,
        content: `
            <p>From modest beginnings in Bodinayakanur to supplying premium cardamom across continents, Emperor Spices' journey exemplifies unwavering quality commitment.</p>
            
            <h3>Operational Scale</h3>
            <p>Our facilities process thousands of metric tons annually, serving customers across 40+ countries spanning six continents.</p>
            
            <h3>Modern Infrastructure</h3>
            <p>Advanced processing facilities blend traditional expertise with contemporary technology, ensuring consistent quality across every shipment.</p>
            
            <h3>International Partnerships</h3>
            <p>We collaborate with leading importers, food manufacturers, and retailers worldwide, bringing authentic Alleppey Green Cardamom to global markets.</p>
            
            <h3>The Emperor Distinction</h3>
            <p>Complete supply chain control—from farmer partnerships through processing, grading, and export—enables uncompromising quality at every stage.</p>
        `
    },
    {
        id: 'perfect-gifting-choice',
        slug: 'cardamom-gifting-traditions',
        title: 'Cardamom: The Perfect Gift of Wellbeing',
        excerpt: 'Why premium cardamom makes a meaningful, health-conscious gift for any celebration.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.CULTURE, BLOG_TAGS.TIPS],
        image: '/images/generated/perfect_gift.png',
        author: 'Emperor Spices Team',
        date: '2024-04-20',
        readTime: '4 min read',
        featured: false,
        content: `
            <p>In Indian culture, gifting spices—especially precious cardamom—carries deep significance. It's a gesture that wishes prosperity, health, and sweetness upon the recipient.</p>
            
            <h3>Auspicious Symbolism</h3>
            <p>Cardamom represents warmth, hospitality, and good fortune. Its presence in any home signifies welcome and celebration.</p>
            
            <h3>Health-Conscious Choice</h3>
            <p>Unlike sweets or processed gifts, premium cardamom offers genuine wellness benefits—digestive support, natural breath freshening, and antioxidant properties.</p>
            
            <h3>Enduring Value</h3>
            <p>Properly stored cardamom maintains its aromatic properties for months, providing lasting enjoyment long after the gifting occasion.</p>
            
            <h3>Perfect for Every Occasion</h3>
            <p>Weddings, festivals, housewarmings, corporate gifting—premium cardamom suits every celebration with elegance and thoughtfulness.</p>
        `
    },
    {
        id: 'celebrating-moments',
        slug: 'aromatic-celebrations',
        title: 'Celebrating Life\'s Moments with Aromatic Traditions',
        excerpt: 'How cardamom elevates special occasions and creates lasting memories through fragrance and flavor.',
        category: BLOG_CATEGORIES.ARTICLES,
        tags: [BLOG_TAGS.CULTURE, BLOG_TAGS.FESTIVE],
        image: '/images/cardamom_content/cardamom_dessert.png',
        author: 'Emperor Spices Team',
        date: '2024-04-05',
        readTime: '4 min read',
        featured: false,
        content: `
            <p>Every celebration deserves aromatic enhancement. Cardamom has graced special occasions across cultures for centuries, adding sensory richness to memorable moments.</p>
            
            <h3>Birthday Traditions</h3>
            <p>Cardamom-infused sweets and beverages transform birthday celebrations, creating distinctive flavors that guests remember.</p>
            
            <h3>Festival Preparations</h3>
            <p>From Diwali sweets to Eid delicacies, cardamom forms the aromatic foundation of festive cooking across traditions.</p>
            
            <h3>Creating Family Memories</h3>
            <p>The distinctive aroma of cardamom becomes associated with family gatherings, creating powerful sensory memories that last lifetimes.</p>
            
            <h3>Elevating Everyday Moments</h3>
            <p>Even ordinary days become special when touched by cardamom's transformative fragrance—morning tea, afternoon coffee, evening dessert.</p>
        `
    },

    // ===== RECIPES =====
    {
        id: 'cardamom-cheesecake-bars',
        slug: 'aromatic-cardamom-cheesecake-bars',
        title: 'Aromatic Cardamom Cheesecake Bars',
        excerpt: 'Velvety cream cheese filling on a graham cracker base, perfumed with warm cardamom and crowned with almond streusel.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/content/cardamom_hero_v2.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-10-01',
        readTime: '45 min prep',
        featured: true,
        content: `
            <h3>What You'll Need</h3>
            <ul>
                <li>190g digestive biscuit crumbs (crushed fine)</li>
                <li>30g unsalted butter, melted</li>
                <li>450g cream cheese, at room temperature</li>
                <li>100g caster sugar</li>
                <li>2 teaspoons ground cardamom (divided)</li>
                <li>1 teaspoon pure vanilla extract</li>
                <li>2 large eggs, room temperature</li>
                <li>75g plain flour</li>
                <li>75g rolled oats</li>
                <li>75g light brown sugar</li>
                <li>60g cold butter, cubed</li>
                <li>50g sliced almonds</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Prepare the Base:</strong> Combine biscuit crumbs with melted butter. Press firmly into a greased 23cm square tin. Refrigerate while preparing filling.</li>
                <li><strong>Create the Filling:</strong> Beat cream cheese until smooth. Add sugar, 1 teaspoon cardamom, and vanilla; beat until fluffy. Add eggs one at a time, mixing gently.</li>
                <li><strong>Make the Streusel:</strong> Combine flour, oats, brown sugar, and remaining cardamom. Rub in cold butter until crumbly. Fold in almonds.</li>
                <li><strong>Assemble:</strong> Pour filling over base. Scatter streusel evenly across the top.</li>
                <li><strong>Bake:</strong> Place in preheated oven at 175°C for 35-40 minutes until center barely jiggles.</li>
                <li><strong>Cool and Serve:</strong> Cool completely, then refrigerate minimum 2 hours. Slice into 16 bars.</li>
            </ol>
            
            <p><em>Chef's Note: For maximum cardamom flavor, grind whole pods fresh just before using.</em></p>
        `
    },
    {
        id: 'swedish-cardamom-buns',
        slug: 'scandinavian-cardamom-knots',
        title: 'Scandinavian Cardamom Knots',
        excerpt: 'Buttery, aromatic twisted buns inspired by Swedish "Kardemummabullar"—the beloved fika essential.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/generated/nordic_buns.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-09-15',
        readTime: '90 min total',
        featured: true,
        content: `
            <h3>The Tradition</h3>
            <p>These aromatic buns are central to Swedish fika culture—the cherished practice of pausing for coffee and connection. The fragrant cardamom dough twisted into elegant knots creates an irresistible treat.</p>
            
            <h3>Enriched Dough</h3>
            <ul>
                <li>240ml whole milk, warmed</li>
                <li>7g instant yeast</li>
                <li>100g caster sugar</li>
                <li>500g strong bread flour</li>
                <li>1½ teaspoons ground cardamom (freshly ground preferred)</li>
                <li>½ teaspoon fine salt</li>
                <li>115g butter, softened</li>
                <li>1 large egg</li>
            </ul>
            
            <h3>Spiced Butter Filling</h3>
            <ul>
                <li>115g butter, very soft</li>
                <li>100g caster sugar</li>
                <li>2 teaspoons ground cardamom</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Activate:</strong> Dissolve yeast in warm milk with a pinch of sugar. Rest 5 minutes until foamy.</li>
                <li><strong>Mix Dough:</strong> Combine flour, cardamom, salt, and sugar. Add yeast mixture, butter, and egg. Knead 8-10 minutes until smooth and elastic.</li>
                <li><strong>First Rise:</strong> Cover and rest in warm place for 1 hour until doubled.</li>
                <li><strong>Shape:</strong> Roll dough into rectangle, spread filling, fold in thirds, cut into strips. Twist each strip and tie into knot.</li>
                <li><strong>Second Rise:</strong> Place on lined trays, cover, and rise 30 minutes.</li>
                <li><strong>Finish:</strong> Brush with egg wash, sprinkle with pearl sugar. Bake at 200°C for 12-15 minutes until golden.</li>
            </ol>
        `
    },
    {
        id: 'golden-cardamom-dumplings',
        slug: 'golden-cardamom-dumplings-luqaimat',
        title: 'Golden Cardamom Dumplings (Luqaimat)',
        excerpt: 'Crispy fried dough balls drenched in fragrant date syrup—a cherished Middle Eastern Ramadan tradition.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.FESTIVE, BLOG_TAGS.DESSERT],
        image: '/images/cardamom_content/cardamom_usage_arabic.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-09-01',
        readTime: '40 min prep',
        featured: false,
        content: `
            <h3>About This Recipe</h3>
            <p>These beloved dumplings appear throughout Ramadan across the Gulf region. The contrast of crispy exterior, pillowy interior, and aromatic syrup creates an addictive combination.</p>
            
            <h3>Yeasted Dough</h3>
            <ul>
                <li>240ml lukewarm water</li>
                <li>250g all-purpose flour, sifted</li>
                <li>1 tablespoon instant yeast</li>
                <li>1 large egg</li>
                <li>1 tablespoon sugar</li>
                <li>Pinch of salt</li>
                <li>Vegetable oil for deep frying</li>
            </ul>

            <h3>Aromatic Syrup</h3>
            <ul>
                <li>400g sugar</li>
                <li>480ml water</li>
                <li>1 tablespoon fresh lemon juice</li>
                <li>4 cardamom pods, lightly crushed</li>
            </ul>
            
            <h3>Preparation</h3>
            <ol>
                <li><strong>Make Syrup First:</strong> Combine sugar and water in saucepan. Bring to boil, then simmer 15 minutes until slightly thickened. Add lemon juice and cardamom, simmer 5 more minutes. Cool completely.</li>
                <li><strong>Prepare Batter:</strong> Combine lukewarm water, sugar, and yeast. Add to sifted flour and mix. Add egg and salt, beat to smooth batter (thicker than cake batter). Cover and rest 1 hour until doubled.</li>
                <li><strong>Fry:</strong> Heat oil to 180°C. Squeeze small portions of batter through your fist, scoop with oiled spoon, drop into hot oil. Fry until deep golden, about 1-2 minutes.</li>
                <li><strong>Finish:</strong> Transfer immediately to cold syrup. Soak briefly, then serve warm.</li>
            </ol>
        `
    },
    {
        id: 'festive-honey-cookies',
        slug: 'festive-greek-cardamom-cookies',
        title: 'Festive Greek Cardamom Honey Cookies',
        excerpt: 'Traditional Melomakarona cookies infused with orange and cardamom, dipped in aromatic honey syrup and dark chocolate.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.FESTIVE, BLOG_TAGS.DESSERT],
        image: '/images/recipes/emperor_cardamom_shutterstock_652405729_1024x1024.jpg',
        author: 'Emperor Spices Kitchen',
        date: '2024-08-20',
        readTime: '60 min total',
        featured: false,
        content: `
            <h3>A Holiday Essential</h3>
            <p>These olive oil cookies, fragrant with orange and cardamom, are a Greek Christmas tradition. Dipped in honey syrup and coated in chocolate, they're impossibly delicious.</p>
            
            <h3>Cookie Dough</h3>
            <ul>
                <li>150ml extra virgin olive oil</li>
                <li>100ml fresh orange juice</li>
                <li>15g caster sugar</li>
                <li>200g all-purpose flour</li>
                <li>50g fine semolina</li>
                <li>¼ teaspoon baking soda</li>
                <li>½ teaspoon ground cardamom</li>
            </ul>

            <h3>Spiced Honey Syrup</h3>
            <ul>
                <li>200g caster sugar</li>
                <li>150ml water</li>
                <li>½ orange, roughly chopped</li>
                <li>4 cardamom pods, cracked</li>
                <li>3 tablespoons quality honey</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Mix Dough:</strong> Whisk olive oil, orange juice, and sugar. Add dry ingredients to form soft dough.</li>
                <li><strong>Shape:</strong> Form into oval shapes. Place on parchment-lined trays.</li>
                <li><strong>Bake:</strong> Place in preheated oven at 180°C for 20-25 minutes until golden.</li>
                <li><strong>Make Syrup:</strong> Simmer all syrup ingredients 5 minutes. Remove from heat, cool slightly.</li>
                <li><strong>Dip:</strong> While cookies are still warm, dip in syrup for 10-15 seconds.</li>
                <li><strong>Finish:</strong> Optionally dip in melted dark chocolate. Cool completely before serving.</li>
            </ol>
        `
    },
    {
        id: 'persian-rose-sundae',
        slug: 'persian-rose-cardamom-sundae',
        title: 'Persian Rose & Cardamom Ice Cream Sundae',
        excerpt: 'Layers of saffron-cardamom ice cream, vanilla cake, and rose-scented milk—a luxurious fusion dessert.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/content/cardamom_scoop_v2.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-08-05',
        readTime: '30 min prep',
        featured: false,
        content: `
            <h3>Persian Inspiration</h3>
            <p>This elegant sundae draws from traditional Iranian Bastani ice cream, layered with cake and fragrant milk for an extraordinary dessert experience.</p>
            
            <h3>Aromatic Ice Cream Base</h3>
            <ul>
                <li>60ml warm whole milk</li>
                <li>Generous pinch of saffron threads</li>
                <li>500ml quality vanilla ice cream, softened</li>
                <li>200g sweetened condensed milk</li>
                <li>60ml rose water</li>
                <li>2 tablespoons chopped pistachios</li>
                <li>1 teaspoon freshly ground cardamom</li>
            </ul>

            <h3>For Assembly</h3>
            <ul>
                <li>120ml whole milk</li>
                <li>Vanilla sponge cake, cubed</li>
                <li>Mixed nuts for garnish</li>
                <li>Edible silver leaf (optional)</li>
            </ul>
            
            <h3>Assembly</h3>
            <ol>
                <li><strong>Infuse Saffron:</strong> Steep saffron in warm milk 10 minutes until deeply golden.</li>
                <li><strong>Create Ice Cream Mixture:</strong> Combine softened ice cream, condensed milk, rose water, saffron milk, pistachios, and cardamom. Freeze until semi-set.</li>
                <li><strong>Prepare Soaking Milk:</strong> Mix condensed milk, plain milk, and remaining saffron milk.</li>
                <li><strong>Layer:</strong> In tall glasses, layer cake pieces, soak with flavored milk, add ice cream mixture, sprinkle nuts. Repeat layers.</li>
                <li><strong>Finish:</strong> Top with silver leaf if using. Serve immediately.</li>
            </ol>
        `
    },
    {
        id: 'silky-cardamom-shrikhand',
        slug: 'silky-cardamom-saffron-shrikhand',
        title: 'Silky Cardamom Saffron Shrikhand',
        excerpt: 'Velvety strained yogurt dessert perfumed with cardamom and saffron—a Gujarati classic reimagined.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.CULTURE, BLOG_TAGS.DESSERT],
        image: '/images/cardamom_content/cardamom_usage_indian.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-07-25',
        readTime: '4 hours total',
        featured: false,
        content: `
            <h3>A Regional Treasure</h3>
            <p>This beloved dessert from Gujarat and Maharashtra showcases how simple ingredients—yogurt, sugar, cardamom—can create extraordinary results when handled with care.</p>
            
            <h3>Components</h3>
            <ul>
                <li>1 litre full-fat natural yogurt</li>
                <li>200g powdered sugar (adjust to taste)</li>
                <li>½ teaspoon freshly ground cardamom</li>
                <li>Large pinch saffron threads</li>
                <li>2 tablespoons warm milk</li>
                <li>Sliced almonds and pistachios for garnish</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Strain Yogurt:</strong> Line a fine sieve with muslin cloth. Pour in yogurt and suspend over a bowl. Refrigerate 3-4 hours or overnight until thick and all whey has drained.</li>
                <li><strong>Bloom Saffron:</strong> Soak threads in warm milk for 10 minutes until fragrant and deeply colored.</li>
                <li><strong>Combine:</strong> Transfer hung yogurt to large bowl. Add powdered sugar gradually, whisking until smooth and fluffy.</li>
                <li><strong>Flavor:</strong> Fold in cardamom and saffron milk gently.</li>
                <li><strong>Chill:</strong> Refrigerate minimum 1 hour to allow flavors to meld.</li>
                <li><strong>Serve:</strong> Portion into small bowls, garnish generously with sliced nuts.</li>
            </ol>
            
            <p><em>Tip: The quality of yogurt matters—use thick, creamy full-fat variety for best results.</em></p>
        `
    },
    {
        id: 'rich-cardamom-caramel',
        slug: 'rich-cardamom-vanilla-caramel',
        title: 'Rich Cardamom Vanilla Caramel Sauce',
        excerpt: 'Buttery caramel infused with warm cardamom and vanilla—perfect for drizzling, gifting, or sneaking spoonfuls.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/generated/caramel_sauce.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-07-10',
        readTime: '25 min',
        featured: false,
        content: `
            <h3>A Versatile Indulgence</h3>
            <p>This aromatic caramel transforms ice cream, apple pie, coffee, or pancakes. Make a double batch—it disappears quickly.</p>
            
            <h3>Components</h3>
            <ul>
                <li>200g granulated sugar</li>
                <li>85g unsalted butter, cubed</li>
                <li>120ml heavy cream, at room temperature</li>
                <li>1 teaspoon pure vanilla extract</li>
                <li>½ teaspoon freshly ground cardamom</li>
                <li>¼ teaspoon flaky sea salt</li>
            </ul>
            
            <h3>Technique</h3>
            <ol>
                <li><strong>Caramelize Sugar:</strong> Place sugar in heavy-bottomed pan over medium heat. Stir constantly with wooden spoon as sugar melts and turns deep amber.</li>
                <li><strong>Add Butter:</strong> Remove from heat. Carefully add butter (mixture will bubble vigorously). Stir until butter melts completely.</li>
                <li><strong>Stream in Cream:</strong> Slowly pour cream while stirring. Return to heat if needed to smooth out any seized bits.</li>
                <li><strong>Simmer:</strong> Boil 1 minute for desired consistency.</li>
                <li><strong>Flavor:</strong> Remove from heat. Stir in vanilla, cardamom, and salt.</li>
                <li><strong>Store:</strong> Cool before transferring to jar. Refrigerate up to 2 weeks. Rewarm gently before serving.</li>
            </ol>
        `
    },
    {
        id: 'nordic-mulled-wine',
        slug: 'nordic-cardamom-mulled-wine',
        title: 'Nordic Cardamom Mulled Wine (Glögi)',
        excerpt: 'A warming Scandinavian winter tradition—spiced wine with cardamom, cinnamon, and citrus.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.BEVERAGES, BLOG_TAGS.FESTIVE],
        image: '/images/generated/finnish_glogi.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-06-20',
        readTime: '25 min',
        featured: false,
        content: `
            <h3>Winter Comfort</h3>
            <p>This Finnish version of mulled wine features cardamom prominently—the spice that gives Nordic baking its distinctive character also transforms this warming beverage.</p>
            
            <h3>Components</h3>
            <ul>
                <li>750ml fruity red wine</li>
                <li>100g caster sugar</li>
                <li>8 cardamom pods, lightly crushed</li>
                <li>4 whole cloves</li>
                <li>2 cinnamon sticks</li>
                <li>Strip of orange peel</li>
                <li>60g raisins</li>
                <li>60g blanched almonds</li>
            </ul>
            
            <h3>Preparation</h3>
            <ol>
                <li><strong>Combine:</strong> Pour wine into large pot. Add sugar and all spices.</li>
                <li><strong>Heat Gently:</strong> Warm over medium-low heat for 20 minutes—never allow to boil or alcohol will evaporate.</li>
                <li><strong>Infuse:</strong> Let stand off heat 10 minutes for flavors to deepen.</li>
                <li><strong>Strain:</strong> Remove spices and orange peel.</li>
                <li><strong>Serve:</strong> Ladle into heatproof glasses. Add a few raisins and almonds to each serving.</li>
            </ol>
            
            <p><em>Tradition: Guests eat the wine-soaked raisins and almonds from the bottom of the glass.</em></p>
        `
    },
    {
        id: 'festive-sheer-khurma',
        slug: 'festive-vermicelli-sheer-khurma',
        title: 'Festive Vermicelli Milk Dessert (Sheer Khurma)',
        excerpt: 'A luxurious Eid celebration centerpiece—vermicelli in saffron milk with dates, nuts, and fragrant cardamom.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.FESTIVE, BLOG_TAGS.DESSERT],
        image: '/images/generated/turkish_coffee.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-06-10',
        readTime: '40 min',
        featured: false,
        content: `
            <h3>Eid Tradition</h3>
            <p>This opulent dessert, whose name means "milk with dates" in Persian, appears on breakfast tables across South Asia every Eid morning. The cardamom-scented milk and jeweled nuts create a truly celebratory dish.</p>
            
            <h3>Components</h3>
            <ul>
                <li>2 litres whole milk</li>
                <li>100g thin vermicelli (seviyan)</li>
                <li>100g ghee</li>
                <li>150g sugar</li>
                <li>100g pitted dates, sliced</li>
                <li>50g blanched almonds, slivered</li>
                <li>50g pistachios, slivered</li>
                <li>50g cashews, halved</li>
                <li>50g golden raisins</li>
                <li>6-8 cardamom pods, seeds ground</li>
                <li>Large pinch saffron (optional)</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Toast Vermicelli:</strong> Fry vermicelli in half the ghee until deep golden. Remove and set aside.</li>
                <li><strong>Fry Nuts:</strong> In remaining ghee, lightly toast all nuts and raisins until fragrant. Reserve half for garnish.</li>
                <li><strong>Reduce Milk:</strong> Bring milk to boil in heavy pot. Simmer until reduced by one-third, stirring occasionally.</li>
                <li><strong>Season:</strong> Add sugar, cardamom, and saffron. Stir until dissolved.</li>
                <li><strong>Combine:</strong> Add vermicelli, dates, and half the nut mixture. Cook 5-10 minutes until vermicelli is soft.</li>
                <li><strong>Serve:</strong> Ladle into bowls, garnish with reserved nuts. Serve warm or chilled.</li>
            </ol>
        `
    },
    {
        id: 'rustic-cardamom-galette',
        slug: 'rustic-cardamom-pear-galette',
        title: 'Rustic Cardamom Pear Galette',
        excerpt: 'A free-form French tart featuring tender spiced pears in buttery pastry—elegantly imperfect.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/generated/pear_galette.png',
        author: 'Emperor Spices Kitchen',
        date: '2024-05-20',
        readTime: '75 min total',
        featured: false,
        content: `
            <h3>Rustic Elegance</h3>
            <p>This free-form tart celebrates imperfection. The cardamom-spiced pears nestled in flaky pastry prove that sometimes the simplest approach yields the most beautiful results.</p>
            
            <h3>Flaky Pastry</h3>
            <ul>
                <li>160g all-purpose flour</li>
                <li>1 tablespoon sugar</li>
                <li>¼ teaspoon salt</li>
                <li>115g very cold butter, cubed</li>
                <li>45-60ml ice water</li>
            </ul>

            <h3>Spiced Pear Filling</h3>
            <ul>
                <li>3 ripe but firm pears, cored and sliced</li>
                <li>50g sugar</li>
                <li>1 teaspoon ground cardamom</li>
                <li>1 tablespoon cornstarch</li>
                <li>30g butter, cubed</li>
                <li>Egg wash and demerara sugar for finishing</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Make Pastry:</strong> Pulse flour, sugar, salt in processor. Add butter, pulse until pea-sized. Add water tablespoon at a time until dough just holds together.</li>
                <li><strong>Chill:</strong> Form into disc, wrap, refrigerate 30 minutes.</li>
                <li><strong>Roll:</strong> Roll pastry to 30cm rough circle on floured surface.</li>
                <li><strong>Fill:</strong> Toss pears with sugar, cardamom, cornstarch. Arrange on pastry, leaving 5cm border.</li>
                <li><strong>Fold:</strong> Fold edges over fruit, pleating naturally. Dot fruit with butter.</li>
                <li><strong>Brush and Sprinkle:</strong> Brush crust with egg wash, scatter demerara sugar.</li>
                <li><strong>Bake:</strong> Place on lined tray. Bake at 200°C for 40-45 minutes until pastry is golden and fruit bubbling.</li>
            </ol>
        `
    },
    {
        id: 'citrus-cardamom-cheesecake',
        slug: 'no-bake-citrus-cardamom-cheesecake',
        title: 'No-Bake Citrus Cardamom Cheesecake',
        excerpt: 'Light, creamy cheesecake with bright orange and warm cardamom notes—no oven required.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/recipes/emperor_cardamom_shutterstock_1929055886_1024x1024.jpg',
        author: 'Emperor Spices Kitchen',
        date: '2024-05-05',
        readTime: '20 min + chilling',
        featured: false,
        content: `
            <h3>Summer Simplicity</h3>
            <p>This effortless no-bake cheesecake combines zesty orange with aromatic cardamom for a refreshing dessert that requires only refrigeration—perfect for warm weather.</p>
            
            <h3>Components</h3>
            <ul>
                <li>75g butter</li>
                <li>150g digestive biscuits, crushed fine</li>
                <li>200g full-fat cream cheese</li>
                <li>125g condensed milk</li>
                <li>1 teaspoon ground cardamom</li>
                <li>2 tablespoons muscovado sugar</li>
                <li>Zest and juice of 1 large orange</li>
                <li>Whipped cream and orange segments for serving</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Prepare Base:</strong> Melt butter. Combine with biscuit crumbs. Press firmly into 15cm loose-bottom tin. Refrigerate.</li>
                <li><strong>Make Filling:</strong> Beat cream cheese until smooth. Add condensed milk, cardamom, sugar, orange zest and juice. Beat until combined.</li>
                <li><strong>Assemble:</strong> Pour filling over chilled base. Smooth top.</li>
                <li><strong>Set:</strong> Refrigerate minimum 4 hours, preferably overnight.</li>
                <li><strong>Serve:</strong> Remove from tin. Top with whipped cream and orange segments.</li>
            </ol>
            
            <p><em>Make Ahead: This cheesecake improves after overnight refrigeration as flavors meld.</em></p>
        `
    },
    {
        id: 'ramadan-apricot-drink',
        slug: 'ramadan-cardamom-apricot-drink',
        title: 'Cardamom Apricot Drink (Qamar Al Din)',
        excerpt: 'A traditional Middle Eastern Ramadan beverage—refreshing, nourishing apricot nectar with cardamom.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.BEVERAGES, BLOG_TAGS.FESTIVE],
        image: '/images/recipes/emperor_cardamom_shutterstock_732483724_1024x1024.jpg',
        author: 'Emperor Spices Kitchen',
        date: '2024-04-20',
        readTime: '15 min + soaking',
        featured: false,
        content: `
            <h3>Breaking the Fast</h3>
            <p>This beloved Ramadan beverage, named "Moon of the Faith" in Arabic, offers gentle nutrition after fasting. The cardamom adds an aromatic dimension to the sweet apricot.</p>
            
            <h3>Components</h3>
            <ul>
                <li>400g dried apricot leather (Qamar Al Din sheets)</li>
                <li>1 litre water</li>
                <li>100g sugar (adjust to taste)</li>
                <li>3-4 cardamom pods, lightly crushed</li>
                <li>Rose water (optional)</li>
                <li>Ice cubes for serving</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Soak:</strong> Cut apricot sheets into pieces. Place in bowl with 500ml warm water. Soak several hours or overnight until completely soft.</li>
                <li><strong>Blend:</strong> Transfer softened apricot and soaking liquid to blender. Process until smooth.</li>
                <li><strong>Dilute:</strong> Add remaining water. Blend again. Strain through fine sieve if desired.</li>
                <li><strong>Season:</strong> Add sugar and crushed cardamom. Stir until sugar dissolves.</li>
                <li><strong>Chill:</strong> Refrigerate until very cold.</li>
                <li><strong>Serve:</strong> Pour over ice. Add splash of rose water if using.</li>
            </ol>
            
            <p><em>Cultural Note: This drink is traditionally served to break the Ramadan fast, providing natural sugars and hydration.</em></p>
        `
    },
    {
        id: 'saffron-dates-granola',
        slug: 'cardamom-saffron-dates-granola',
        title: 'Cardamom Saffron Dates Granola',
        excerpt: 'A Middle Eastern-inspired breakfast granola with dates, nuts, and warming spices.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.HEALTH],
        image: '/images/recipes/emperor_cardamom_shutterstock_1457867012_1024x1024.jpg',
        author: 'Emperor Spices Kitchen',
        date: '2024-04-05',
        readTime: '45 min',
        featured: false,
        content: `
            <h3>Breakfast Transformed</h3>
            <p>This aromatic granola brings Middle Eastern flavors to your morning routine. The cardamom, saffron, and dates create clusters that perfume your entire kitchen.</p>
            
            <h3>Components</h3>
            <ul>
                <li>300g rolled oats</li>
                <li>100g mixed nuts (almonds, pistachios, cashews), roughly chopped</li>
                <li>100g dates, pitted and chopped</li>
                <li>80ml honey or maple syrup</li>
                <li>60ml coconut oil, melted</li>
                <li>1 teaspoon ground cardamom</li>
                <li>Large pinch saffron, steeped in 1 tbsp warm milk</li>
                <li>½ teaspoon salt</li>
                <li>50g unsweetened coconut flakes</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Preheat:</strong> Set oven to 160°C. Line large baking tray.</li>
                <li><strong>Combine Wet:</strong> Mix honey, coconut oil, saffron milk, cardamom, and salt.</li>
                <li><strong>Combine Dry:</strong> Toss oats and nuts in large bowl.</li>
                <li><strong>Mix:</strong> Pour wet over dry, stir until evenly coated.</li>
                <li><strong>Bake:</strong> Spread on tray. Bake 30-35 minutes, stirring halfway, until golden.</li>
                <li><strong>Add Extras:</strong> Fold in dates and coconut while still warm.</li>
                <li><strong>Cool:</strong> Cool completely on tray for clusters to form.</li>
                <li><strong>Store:</strong> Keep in airtight container up to 2 weeks.</li>
            </ol>
        `
    },
    {
        id: 'coconut-cardamom-basbousa',
        slug: 'coconut-cardamom-semolina-cake',
        title: 'Coconut Cardamom Semolina Cake (Basbousa)',
        excerpt: 'A beloved Middle Eastern dessert—moist, syrup-soaked semolina cake fragrant with cardamom and coconut.',
        category: BLOG_CATEGORIES.RECIPES,
        tags: [BLOG_TAGS.RECIPES, BLOG_TAGS.DESSERT],
        image: '/images/recipes/emperor_cardamom_123_1024x1024.jpg',
        author: 'Emperor Spices Kitchen',
        date: '2024-03-20',
        readTime: '50 min',
        featured: false,
        content: `
            <h3>A Regional Favorite</h3>
            <p>This simple yet spectacular cake appears at celebrations across the Middle East. The semolina creates unique texture while cardamom and coconut add aromatic depth.</p>
            
            <h3>Cake</h3>
            <ul>
                <li>250g fine semolina</li>
                <li>100g desiccated coconut</li>
                <li>150g sugar</li>
                <li>125g butter, melted</li>
                <li>200ml yogurt</li>
                <li>1 teaspoon ground cardamom</li>
                <li>1 teaspoon baking powder</li>
                <li>Blanched almonds for decoration</li>
            </ul>

            <h3>Cardamom Syrup</h3>
            <ul>
                <li>200g sugar</li>
                <li>150ml water</li>
                <li>1 tablespoon lemon juice</li>
                <li>4 cardamom pods, cracked</li>
            </ul>
            
            <h3>Method</h3>
            <ol>
                <li><strong>Make Syrup First:</strong> Combine all syrup ingredients. Boil 5 minutes. Cool completely.</li>
                <li><strong>Make Batter:</strong> Mix semolina, coconut, sugar, baking powder, and cardamom. Add melted butter and yogurt. Stir until combined. Rest 15 minutes.</li>
                <li><strong>Bake:</strong> Pour into greased 23cm square tin. Smooth top, score diamond pattern, place almond on each piece. Bake at 180°C for 30-35 minutes until golden.</li>
                <li><strong>Soak:</strong> Pour cold syrup over hot cake immediately. Let absorb completely before serving.</li>
            </ol>
        `
    }
];

// Helper functions
export const getFeaturedBlogs = () => blogDatabase.filter(blog => blog.featured);
export const getBlogsByCategory = (category) => blogDatabase.filter(blog => blog.category === category);
export const getBlogBySlug = (slug) => blogDatabase.find(blog => blog.slug === slug);
export const getBlogById = (id) => blogDatabase.find(blog => blog.id === id);
export const getRelatedBlogs = (currentBlog, limit = 3) => {
    return blogDatabase
        .filter(blog => blog.id !== currentBlog.id &&
            (blog.category === currentBlog.category || blog.tags.some(tag => currentBlog.tags.includes(tag))))
        .slice(0, limit);
};
export const searchBlogs = (query) => {
    const q = query.toLowerCase();
    return blogDatabase.filter(blog =>
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.tags.some(tag => tag.toLowerCase().includes(q))
    );
};

export default blogDatabase;
