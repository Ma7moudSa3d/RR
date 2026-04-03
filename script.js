window.toggleCaption = function(index) {
    const captions = document.querySelectorAll('.gallery-caption');
    const items = document.querySelectorAll('.gallery-item');
    const caption = document.getElementById(`caption-${index}`);
    const item = caption ? caption.closest('.gallery-item') : null;
    const isOpen = caption?.classList.contains('active');

    captions.forEach(c => c.classList.remove('active'));
    items.forEach(i => i.classList.remove('active'));

    if (!isOpen && caption) {
        caption.classList.add('active');
        if (item) item.classList.add('active');
    }
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pauseAllVideos();
            closeAllCaptions();
    
            const targetSection = btn.dataset.section;
    
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
    
            btn.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    loadGallery();
    loadVideos();
    loadMessages();
    loadBirthdayMessage();
    loadApologyMessage();
    loadgetwell();
    loadTimeline();
    loadDateGallery();
    
    console.log('✅ كل الـ loaders اتنادوا');
    
    // Initialize Love Survey if ready
    if (typeof LS !== 'undefined' && LS.init) {
        LS.init();
    }
});

function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    const images = [
        {
            filename: 'WhatsAppImage2025-07-26at12.30.16PM.jpeg',
            caption: 'Like butterflies dancing around our love, this moment captures the magic we create together. Every time I look at this photo, I remember how your smile lights up my entire world.'
        },
        {
            filename: 'WhatsAppImage2025-08-08at11.56.24PM.jpeg',
            caption: 'In your eyes, I see my forever. In your smile, I find my home. This shadow silhouette represents how we are always connected, even in the simplest moments.'
        },
        {
            filename: 'WhatsAppImage2025-08-08at11.49.34PM.jpeg',
            caption: 'Every selfie with you is a treasure, a moment frozen in time of our beautiful love. Your gentle touch on your face shows the tenderness that fills my heart.'
        },
        {
            filename: 'WhatsAppImage2025-08-08at11.49.33PM.jpeg',
            caption: 'Your gentle touch and loving gaze make every ordinary moment extraordinary. The way you look at me in this photo makes me believe in forever.'
        },
        {
            filename: 'WhatsAppImage2025-08-08at11.49.32PM.jpeg',
            caption: 'Together we shine brighter than any star in the sky. This close-up captures the intimacy and deep connection we share in every moment.'
        },
        {
            filename: 'WhatsAppImage2025-08-08at11.49.31PM.jpeg',
            caption: 'The way you look at me makes me believe in fairy tales and forever love. Your beautiful smile in this photo is my daily dose of happiness.'
        },
        {
            filename: 'WhatsAppImage2025-07-26at12.40.55PM.jpeg',
            caption: 'Our cartoon selves represent the playful, joyful love we share every day. Even in animated form, our love story shines through beautifully.'
        },
        {
            filename: 'WhatsAppImage2025-08-01at10.02.26PM.jpeg',
            caption: 'Every adventure with you becomes a beautiful memory etched in my heart. This moment shows how we find joy in the simplest things together.'
        },
        {
            filename: 'WhatsAppImage2025-06-06at2.10.24AM.jpeg',
            caption: 'In quiet moments like these, I fall in love with you all over again. Your peaceful expression reminds me of the serenity you bring to my life.'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.46PM.jpeg',
            caption: 'With you, even the simplest moments by the water feel like forever in paradise ❤️🌊✨'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.46PM(1).jpeg',
            caption: 'Two hands, one heart, endless memories 💙✨'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.50PM.jpeg',
            caption: 'Simple moments, endless love. 🌿❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.51PM.jpeg',
            caption: 'Still falling for you in every frame. 📸💘'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.48PM.jpeg',
            caption: 'Dinner dates with my favorite person 🍝🍕❤️ Every bite tastes better with you by my side'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.49PM.jpeg',
            caption: 'Sweet moments, sweeter with you 💕🥰 Even a simple drink feels special when it’s with you'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.47PM.jpeg',
            caption: 'Just me and the love of my life 💞 My heart feels at home whenever I’m with you.'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.61PM.jpeg',
            caption: 'Having U with me is the most priceless gift i have got , stay with me my love ❤️💞'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.65PM.jpeg',
            caption: 'no one can have that eye look from me , i love you being too close to me and i adore your eyes 👀❤️ '
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.62PM.jpeg',
            caption: 'night moments with you is something that i fall into , i love night also i love you ..... know that iam being lucky to have a beautiful girl like you 😘❤️❤️ '
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.66PM.jpeg',
            caption: 'U got me loving your handmade cooks from that small cute hands that i love , u r a special ❤️❤️ '
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.67PM.jpeg',
            caption: 'Elegant beautiful gift from my princess , loved that 😘❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.69PM.jpeg',
            caption: 'THX for making my birthday special , my angel you are my birthday gift 💕🥰'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.70PM.jpeg',
            caption: 'Adorable Eyes 👀 ,Iam in love with them 😘❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.73PM.jpeg',
            caption: 'Our first celebration together at my best friend’s engagement, with the love of my life by my side 💍❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.75PM.jpeg',
            caption: 'With my fiancée, my peace, my always 💍✨❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.74PM.jpeg',
            caption: 'It’s not just pictures that bring us together but our hearts that beat as one, I love you ❤️📸💞'
        }
    ];
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="images/${image.filename}" alt="Our Memory" loading="lazy" onclick="toggleCaption(${index})">
            <div class="gallery-caption" id="caption-${index}">${image.caption}</div>
            `;
        galleryGrid.appendChild(galleryItem);
    });
}

function loadVideos() {
    const videosContainer = document.getElementById('videos-container');
    if (!videosContainer) {
        console.error('Videos container not found');
        return;
    }
    
    const videos = [
        {
            title: 'Our Adventure',
            filename: 'WhatsAppVideo2025-08-08at11.56.24PM.mp4',
            caption: 'Every adventure with you feels like a beautiful dream come true'
        },
        {
            title: 'Sweet Moments Together',
            filename: 'WhatsAppVideo2025-09-01at9.37.15PM.mp4',
            caption: 'In your smile, I find my happiness. In your laughter, I find my peace. These precious moments with you are treasures I hold close to my heart.'
        },
        {
            title: 'Our Love Story',
            filename: 'WhatsAppVideo2025-09-01at9.35.43PM.mp4',
            caption: 'Every second spent with you writes another beautiful chapter in our love story. You are my forever and always, my dearest RonRon.'
        },
        {
            title: 'Tender Moments',
            filename: '698e7b97d5411e33cc883a530f2b8697.mp4',
            caption: 'In the quiet moments we share, I find the deepest connection. Your presence alone fills my heart with endless warmth and love.'
        },
        {
            title: 'Our Beautiful Journey',
            filename: 'WhatsAppVideo2025-08-08at11.50.49PM.mp4',
            caption: 'Every step of our journey together has been a blessing. These memories we create are the foundation of our eternal love.'
        },
        {
            title: 'Forever Us',
            filename: 'WhatsAppVideo2025-08-08at11.50.49PM(1).mp4',
            caption: 'Through every laugh, every glance, every shared moment, we build something beautiful that will last forever. This is us, this is our love.'
        },
        {
            title: 'U r my fav',
            filename: 'WhatsAppVideo2025-08-08at11.50.60PM(1).mp4',
            caption: '😘'
        },
        {
            title: 'Engaged',
            filename: 'WhatsAppVideo2025-08-08at11.50.61PM(1).mp4',
            caption: 'Totally Engaged 💍✨❤️'
        },
        {
            title: 'Engaged',
            filename: 'WhatsAppVideo2025-08-08at11.50.62PM(1).mp4',
            caption: 'Part 2 💍❤️'
        },
        {
            title: 'jealous',
            filename: 'WhatsAppVideo2025-08-08at11.50.63PM(1).mp4',
            caption: 'لمي نفسك 🤨'
        }
    ];
    
    videosContainer.innerHTML = '';
    
    videos.forEach((video, index) => {
        try {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.preload = 'metadata';
            videoElement.style.width = '100%';
            videoElement.style.maxWidth = '100%';
            videoElement.style.height = 'auto';
            
            const source = document.createElement('source');
            source.src = `videos/${video.filename}`;
            source.type = 'video/mp4';
            videoElement.appendChild(source);
            
            videoElement.onerror = function() {
                console.error(`Error loading video: ${video.filename}`);
                this.style.display = 'none';
                const errorMsg = document.createElement('p');
                errorMsg.textContent = `Video "${video.title}" could not be loaded.`;
                errorMsg.style.color = '#666';
                errorMsg.style.fontStyle = 'italic';
                videoItem.appendChild(errorMsg);
            };
            
            const title = document.createElement('h3');
            title.textContent = video.title;
            
            const caption = document.createElement('p');
            caption.className = 'video-caption';
            caption.textContent = video.caption;
            
            videoItem.appendChild(title);
            videoItem.appendChild(videoElement);
            videoItem.appendChild(caption);
            
            videosContainer.appendChild(videoItem);
        } catch (error) {
            console.error(`Error creating video item ${index}:`, error);
        }
    });
}

function pauseAllVideos(except = null) {
    document.querySelectorAll('video').forEach(v => {
        if (v !== except) v.pause();
    });
}

document.addEventListener('play', (e) => {
  if (e.target.tagName === 'VIDEO') {
    pauseAllVideos(e.target);
  }
}, true);

function closeAllCaptions() {
    document.querySelectorAll('.gallery-caption.active').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.gallery-item.active').forEach(i => i.classList.remove('active'));
}

function loadApologyMessage() {
    const apologyContent = document.getElementById('apology-content');
    if (!apologyContent) {
        console.error('Apology content container not found');
        return;
    }
    
    try {
        const apologyText = `My dearest love,

I know I hurt you, and it breaks my heart because the last thing I would ever want is to see you in pain. Yes, I made a mistake, but I swear it was never my intention to hurt you or to risk losing the most precious person in my life. You are not just my girlfriend—you are my home, my safe place, my whole world, and the reason my heart beats every single day.

Since the moment you walked into my life, everything changed. I remember the first time we laughed together, the way your eyes shined when you smiled, and how every little memory we made became a part of me. I think about those memories all the time—the walks, the late-night talks, the jokes only we understand, the quiet moments where words weren't even needed. They are the most beautiful treasures of my life, and I can't imagine losing the chance to create more of them with you.

Without you, my days feel dark and empty, and every moment apart stretches like forever. I don't just miss your presence—I miss us: the way we loved, the way we cared for each other, the way we felt like nothing in the world could come between us.

Please, my love, forgive me. Let me hold you again, let me see that beautiful smile that lights up my entire world, and let me look into those eyes where I see my whole future. I promise I will do whatever it takes to make things right. I will love you harder, hold you closer, and never stop proving that you are the one I want to spend my forever with.

No mistake can ever erase the love we share, and I believe our story is too beautiful to end here. So let's heal, let's forgive, and let's write the next chapter of our love—together.

Forever yours,
7amoody`;

        apologyContent.innerHTML = '';
        
        const apologyCard = document.createElement('div');
        apologyCard.className = 'apology-card';
        apologyCard.innerHTML = `
            <div class="apology-text">${apologyText.replace(/\n/g, '<br><br>')}</div>
        `;
        apologyContent.appendChild(apologyCard);
    } catch (error) {
        console.error('Error loading apology message:', error);
        apologyContent.innerHTML = '<p style="color: #666; font-style: italic;">Error loading apology message.</p>';
    }
}

function loadgetwell() {
    const getwellContent = document.getElementById('getwell-Content');
    if (!getwellContent) {
        console.error('Get Well content container not found');
        return;
    }
    
    try {
        const getwellText = `💌 My dearest love,

It breaks my heart to know that you’re not feeling well 😔💔. I wish I could take away all your pain and make you smile again 🌸✨. You are the most precious part of my life 🌹, my sunshine ☀️, my safe place 🤍, and my happiness 💕.

Please remember to rest, take care of yourself, and let your beautiful body and soul recover 💫. I’m sending you endless love, warm hugs 🤗❤️, and gentle kisses 😘💋 to give you strength. Even when you’re sick, you’re still the most beautiful and amazing person in my world 🌷✨.

Get well soon, my angel 😇💖. I can’t wait to see your smile shining again and hold you close in my arms 🤍🌹. Until then, know that I’m always thinking of you, missing you deeply, and loving you more with every heartbeat 💓.

Forever yours 💍❤️
7amoody`;

        getwellContent.innerHTML = '';
        
        const gwetwellCard = document.createElement('div');
        gwetwellCard.className = 'getwell-card';
        gwetwellCard.innerHTML = `
            <div class="getwell-text">${getwellText.replace(/\n/g, '<br><br>')}</div>
        `;
        getwellContent.appendChild(gwetwellCard);
    } catch (error) {
        console.error('Error loading Get Well message:', error);
        getwellContent.innerHTML = '<p style="color: #666; font-style: italic;">Error loading Get Well message.</p>';
    }
}

function loadMessages() {
    const messagesGrid = document.getElementById('messages-grid');
    const messages = [
        {
            title: 'To My Dearest RonRon',
            content: 'From the moment our paths crossed, I knew there was something special about you. Your smile brightens even my darkest days, and your laughter is the melody that plays in my heart. Every moment spent with you feels like a beautiful dream I never want to wake up from. You are my sunshine, my peace, and my home.'
        },
        {
            title: 'Our Journey Together',
            content: 'Every step we\\'ve taken together has been a blessing. From our first conversations to our shared adventures under palm trees, each memory we\\'ve created is etched in my heart forever. The way your fingers intertwine with mine tells a story of love that words could never fully express. I cherish every second, every glance, and every touch we share.'
        },
        {
            title: 'What You Mean to Me',
            content: 'You are not just my girlfriend, RonRon. You are my confidant, my best friend, and my greatest support. Your strength inspires me, your kindness humbles me, and your love transforms me into a better person each day. When I look into your eyes, I see my present and my future, filled with endless possibilities and boundless love.'
        },
        {
            title: 'Our Special Date',
            content: 'March 30, 2025 marks a special milestone in our journey. A day that reminds us of the beautiful bond we share and the promises we make to each other. Like the verse on our card says, God created us to find comfort in each other, to share affection and mercy between us. This divine connection we share is truly a sign for those who reflect.'
        },
        {
            title: 'My Promise to You',
            content: 'As 7amoody, I promise to stand by your side through every joy and sorrow. To hold your hand when you need strength and to give you space when you need freedom. To cherish your heart as the precious gift that it is and to love you more deeply with each passing day. My love for you grows stronger with every sunrise, and I am eternally grateful that you chose to share your life with me.'
        },
        {
            title: 'The Art of Our Love',
            content: 'Our love is like a masterpiece, painted with the colors of our experiences together. From the artistic photos we\\'ve taken to the cartoon versions of ourselves, each representation captures a different facet of our connection. Just like the butterflies that flutter around our memories, my heart takes flight whenever I think of you.'
        }
    ];
    
    messages.forEach(message => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <h3>${message.title}</h3>
            <p>${message.content}</p>
        `;
        messagesGrid.appendChild(messageCard);
    });
}

function loadBirthdayMessage() {
    const birthdayContent = document.getElementById('birthday-content');
    if (!birthdayContent) {
        console.error('Birthday content container not found');
        return;
    }
    
    try {
        const birthdayMessage = `On this special day, September 2nd, I want you to know that you are the most precious gift life has given me. Every day with you feels like a celebration, but today is extra special because it's the day my beautiful RonRon was born.

You fill my world with colors I never knew existed, with joy I never thought possible. Your love has transformed my life in the most beautiful ways. I am grateful for every laugh we've shared, every tear we've wiped away together, and every dream we've built side by side.

The way you light up a room with your presence, the way your eyes sparkle when you're happy, the way your heart beats in perfect rhythm with mine - these are the treasures I celebrate today. You are not just another year older; you are another year more beautiful, more wise, more incredible.

I wish I could give you the entire universe wrapped in a bow, but since I can't, I give you my heart, my soul, and my promise to love you more deeply with each passing day. You deserve all the happiness this world has to offer, and I want to be the one to give it to you.

Happy birthday to the woman who holds my heart completely. May this new year of your life be filled with all the happiness you bring to others, all the love you deserve, and all the dreams your beautiful heart can hold.

I love you more than words can express, today and always. You are my forever birthday wish come true. ❤️🎂🎉`;

        birthdayContent.innerHTML = '';
        
        const birthdayCard = document.createElement('div');
        birthdayCard.className = 'birthday-card';
        birthdayCard.innerHTML = `
            <div class="birthday-decoration">🎂✨🎉</div>
            <div class="birthday-text">${birthdayMessage.replace(/\n/g, '<br><br>')}</div>
            <div class="birthday-signature">Forever yours,<br>7amoody 💕</div>
        `;
        birthdayContent.appendChild(birthdayCard);
    } catch (error) {
        console.error('Error loading birthday message:', error);
        birthdayContent.innerHTML = '<p style="color: #666; font-style: italic;">Error loading birthday message.</p>';
    }
}

function loadTimeline() {
    const timeline = document.getElementById('timeline');
    const moments = [
        {
            title: 'Our Finger Hearts',
            content: 'Remember when we made those cute finger hearts in the park? The sun was setting, casting a golden glow over everything, and in that moment, I felt our hearts truly connected. Your gentle touch and the way you looked at me made me feel like the luckiest person alive.'
        },
        {
            title: 'Our Special Place',
            content: 'We were lost in our own world. The way you leaned against me, the quiet conversations we shared, and the plans we made for our future—these moments are treasures I hold close to my heart.'
        },
        {
            title: 'Under the Palm Trees',
            content: 'Walking beneath those tall palm trees, hand in hand, sharing our dreams and aspirations. The gentle breeze, the rustling leaves, and your beautiful smile created a perfect moment that I will cherish forever.'
        }
    ];
    
    moments.forEach((moment, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3>${moment.title}</h3>
                <p>${moment.content}</p>
            </div>
            <div class="timeline-dot"></div>
        `;
        timeline.appendChild(timelineItem);
    });
}

function loadDateGallery() {
    const dateGrid = document.getElementById('date-grid');
    
    console.log('dateGrid element:', dateGrid);
    
    if (!dateGrid) {
        console.error('❌ date-grid مش موجود!');
        return;
    }

    const startIndex = 1000;

    const images = [
        {
            filename: 'WhatsAppImage2025-09-07at2.56.90PM.jpeg',
            caption: 'دبلتنا مش دهب وبس… دي وعد عمر 💛💍'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.91PM.jpeg',
            caption: 'ادام الله وجوك معي ... أدام الله فرحتنا معا ✨❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.92PM.jpeg',
            caption: 'لا ينقص عائلتنا الصغيرة الا فرد , وفقنا الله في ضمه الينا 💍'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.93PM.jpeg',
            caption: 'أدام الله فرحة كانت أنتي سببها وهدفها ونهايتها ❤️❤️'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.94PM.jpeg',
            caption: 'كلنا سعداء باقترابك وقربك ... وكأن الله يحفظ لكي مكانا في عائلتنا ❤️🫂'
        },
        {
            filename: 'WhatsAppImage2025-09-07at2.56.95PM.jpeg',
            caption: ' مشوار ورا مشوار… لحد ما نبقى بيت واحد 🤍💍'
        }
    ];

    console.log('عدد الصور:', images.length);

    images.forEach((image, index) => {
        const globalIndex = startIndex + index;
        const item = document.createElement('div');
        item.className = 'date-item';
        item.innerHTML = `
            <img src="images/${image.filename}" alt="Our Engagement Memory" loading="lazy" onclick="toggleCaption(${globalIndex})" onerror="console.error('❌ الصورة مش موجودة:', '${image.filename}')">
            <div class="gallery-caption" id="caption-${globalIndex}">${image.caption}</div>
        `;
        dateGrid.appendChild(item);
        
        console.log('✅ تم إضافة صورة:', image.filename);
    });
    
    console.log('✅ تم تحميل كل الصور');
}

/* ========================================================================= */
/* LOVE SURVEY SYSTEM 💘                                                     */
/* ========================================================================= */

// Generating exactly 200 unique personal-preference questions
const LS_QUESTIONS = [
    // 1-20: Food
    { id: 1, cat: "Food", q: "What's the absolute best comfort food?", a: "A huge cheesy Pizza", b: "Warm Pasta & Sauce", c: "Burger & Fries" },
    { id: 2, cat: "Food", q: "How do you prefer your eggs in the morning?", a: "Scrambled", b: "Sunny-side up", c: "Boiled" },
    { id: 3, cat: "Food", q: "Favorite ice cream flavor?", a: "Classic Vanilla", b: "Rich Chocolate", c: "Strawberry" },
    { id: 4, cat: "Food", q: "If you had to eat one cuisine forever?", a: "Italian", b: "Mexican", c: "Middle Eastern" },
    { id: 5, cat: "Food", q: "Spicy food tolerance?", a: "Bring on the heat!", b: "A little kick is fine", c: "No spice at all!" },
    { id: 6, cat: "Food", q: "Favorite type of snack while watching a movie?", a: "Popcorn", b: "Nachos with cheese", c: "Candy & Sweets" },
    { id: 7, cat: "Food", q: "How do you feel about pineapple on pizza?", a: "I love it!", b: "It's a crime", c: "I can tolerate it" },
    { id: 8, cat: "Food", q: "Favorite fast food chain?", a: "McDonald's", b: "KFC", c: "Burger King" },
    { id: 9, cat: "Food", q: "Preferred meat for dinner?", a: "Chicken", b: "Beef/Steak", c: "Seafood" },
    { id: 10, cat: "Food", q: "Sweet or Savory?", a: "Definitely Sweet", b: "Always Savory", c: "A mix of both" },
    { id: 11, cat: "Food", q: "Favorite cake flavor?", a: "Chocolate Fudge", b: "Red Velvet", c: "Vanilla Sponge" },
    { id: 12, cat: "Food", q: "Best way to cook potatoes?", a: "French Fries", b: "Mashed", c: "Roasted" },
    { id: 13, cat: "Food", q: "Favorite fruit?", a: "Mango", b: "Strawberry", c: "Watermelon" },
    { id: 14, cat: "Food", q: "Breakfast or Dinner person?", a: "I live for Breakfast", b: "Dinner is the best", c: "I love all meals" },
    { id: 15, cat: "Food", q: "Favorite kind of cheese?", a: "Mozzarella", b: "Cheddar", c: "Cream Cheese" },
    { id: 16, cat: "Food", q: "Best dipping sauce?", a: "Ketchup", b: "Mayonnaise", c: "BBQ Sauce" },
    { id: 17, cat: "Food", q: "Favorite type of sandwich?", a: "Turkey & Cheese", b: "Tuna Salad", c: "Grilled Cheese" },
    { id: 18, cat: "Food", q: "Do you like eating salads?", a: "Yes, very healthy", b: "Only with good dressing", c: "No, give me real food" },
    { id: 19, cat: "Food", q: "Favorite nut?", a: "Almonds", b: "Cashews", c: "Pistachios" },
    { id: 20, cat: "Food", q: "Which dessert wins?", a: "Brownies", b: "Cheesecake", c: "Tiramisu" },
    
    // 21-40: Drinks
    { id: 21, cat: "Drinks", q: "Morning necessity?", a: "Hot Coffee", b: "Warm Tea", c: "Fresh Juice" },
    { id: 22, cat: "Drinks", q: "How do you take your coffee?", a: "Black, no sugar", b: "With milk & sugar", c: "Lots of caramel/syrup" },
    { id: 23, cat: "Drinks", q: "Favorite soda?", a: "Coca-Cola / Pepsi", b: "Sprite / 7Up", c: "Fanta / Mirinda" },
    { id: 24, cat: "Drinks", q: "Best cold drink on a hot day?", a: "Iced Tea", b: "Lemonade", c: "Milkshake" },
    { id: 25, cat: "Drinks", q: "Water preference?", a: "Ice cold", b: "Room temperature", c: "Sparkling water" },
    { id: 26, cat: "Drinks", q: "Favorite fresh juice?", a: "Orange juice", b: "Mango juice", c: "Apple juice" },
    { id: 27, cat: "Drinks", q: "Tea flavor?", a: "Classic Black Tea", b: "Green Tea", c: "Mint Tea" },
    { id: 28, cat: "Drinks", q: "Do you like energy drinks?", a: "Yes, need them!", b: "Sometimes", c: "Never, too unhealthy" },
    { id: 29, cat: "Drinks", q: "Favorite milkshake flavor?", a: "Vanilla", b: "Chocolate", c: "Oreo" },
    { id: 30, cat: "Drinks", q: "Hot chocolate with or without marshmallows?", a: "With lots of them!", b: "Without", c: "Doesn't matter" },
    { id: 31, cat: "Drinks", q: "Smoothie base?", a: "Milk/Yogurt", b: "Juice", c: "Water" },
    { id: 32, cat: "Drinks", q: "Favorite winter warm drink?", a: "Hot Cocoa", b: "Sahlab", c: "Warm Apple Cider" },
    { id: 33, cat: "Drinks", q: "Bubble tea or Iced coffee?", a: "Bubble Tea (Boba)", b: "Iced Coffee", c: "Neither" },
    { id: 34, cat: "Drinks", q: "Do you use a straw?", a: "Always", b: "Never", c: "Only for iced drinks" },
    { id: 35, cat: "Drinks", q: "Best fruit for a smoothie?", a: "Banana", b: "Berries", c: "Mango" },
    { id: 36, cat: "Drinks", q: "Do you drink enough water?", a: "Yes, constantly", b: "I try my best", c: "I always forget" },
    { id: 37, cat: "Drinks", q: "Favorite cafe?", a: "Starbucks", b: "Local cozy cafe", c: "I make drinks at home" },
    { id: 38, cat: "Drinks", q: "Frappuccino vs Latte?", a: "Frappuccino", b: "Latte", c: "Espresso shot" },
    { id: 39, cat: "Drinks", q: "Mocktail preference?", a: "Mojito (Mint & Lime)", b: "Pina Colada", c: "Shirley Temple" },
    { id: 40, cat: "Drinks", q: "Your reaction to sparkling water?", a: "Love the bubbles", b: "Tastes like TV static", c: "Only with lemon" },
    
    // 41-60: Time Preferences
    { id: 41, cat: "Time", q: "Are you an early bird or night owl?", a: "Early Bird", b: "Night Owl", c: "Somewhere in between" },
    { id: 42, cat: "Time", q: "Best part of the day?", a: "Morning sunrise", b: "Lazy afternoons", c: "Quiet late nights" },
    { id: 43, cat: "Time", q: "How many alarms do you set?", a: "Just one", b: "2-3 alarms", c: "10+ alarms spaced by 5 mins" },
    { id: 44, cat: "Time", q: "Ideal bedtime?", a: "Before 10 PM", b: "Around midnight", c: "2 AM or later" },
    { id: 45, cat: "Time", q: "Are you usually on time?", a: "Always early", b: "Exactly on time", c: "Usually 5-10 mins late" },
    { id: 46, cat: "Time", q: "Favorite day of the weekend?", a: "Friday", b: "Saturday", c: "Sunday" },
    { id: 47, cat: "Time", q: "How long does it take you to get ready?", a: "15 mins or less", b: "30-45 mins", c: "Over an hour" },
    { id: 48, cat: "Time", q: "Favorite season?", a: "Summer", b: "Winter", c: "Spring/Autumn" },
    { id: 49, cat: "Time", q: "Do you prefer naps?", a: "Love a good nap", b: "Only when sick", c: "Naps make me dizzy" },
    { id: 50, cat: "Time", q: "Best time for a date?", a: "Morning breakfast/coffee", b: "Afternoon lunch/walk", c: "Evening dinner/movie" },
    { id: 51, cat: "Time", q: "How do you spend a rainy day?", a: "Sleeping/Cuddling", b: "Watching movies", c: "Reading a book" },
    { id: 52, cat: "Time", q: "Do you like planning or being spontaneous?", a: "I plan everything", b: "Totally spontaneous", c: "A mix of both" },
    { id: 53, cat: "Time", q: "Best holiday?", a: "Eid", b: "New Year", c: "My Birthday!" },
    { id: 54, cat: "Time", q: "When are you most productive?", a: "First thing in morning", b: "Mid-day", c: "Late at night" },
    { id: 55, cat: "Time", q: "Do you wear a watch?", a: "Yes, everyday", b: "Only for occasions", c: "No, I check my phone" },
    { id: 56, cat: "Time", q: "How long can you stay off your phone?", a: "Hours easily", b: "Maybe 30 mins", c: "I need it constantly" },
    { id: 57, cat: "Time", q: "Favorite time to exercise?", a: "Morning", b: "Evening", c: "I don't exercise" },
    { id: 58, cat: "Time", q: "Sunset or Sunrise?", a: "Romantic Sunset", b: "Fresh Sunrise", c: "Both are beautiful" },
    { id: 59, cat: "Time", q: "How do you feel about waiting in line?", a: "I am patient", b: "I hate it but tolerate it", c: "I will leave immediately" },
    { id: 60, cat: "Time", q: "Ideal length for a movie?", a: "90 minutes", b: "2 hours", c: "2.5+ hours epic" },

    // 61-80: Places
    { id: 61, cat: "Places", q: "Beach or Mountains?", a: "Sunny Beach", b: "Snowy Mountains", c: "Green Forests" },
    { id: 62, cat: "Places", q: "City life or Countryside?", a: "Bustling City", b: "Quiet Countryside", c: "Suburbs" },
    { id: 63, cat: "Places", q: "Favorite place to relax?", a: "In bed", b: "On the couch", c: "In a hot shower" },
    { id: 64, cat: "Places", q: "Dream house location?", a: "By the sea", b: "In the city center", c: "In a quiet village" },
    { id: 65, cat: "Places", q: "Where would you prefer to eat out?", a: "Fancy Restaurant", b: "Cozy local spot", c: "Street food/Casual" },
    { id: 66, cat: "Places", q: "Best vacation type?", a: "Exploring historic sites", b: "Relaxing at a resort", c: "Adventure and hiking" },
    { id: 67, cat: "Places", q: "Favorite room in the house?", a: "Bedroom", b: "Living Room", c: "Kitchen" },
    { id: 68, cat: "Places", q: "Do you like amusement parks?", a: "Love the rollercoasters!", b: "Only for the food/games", c: "Too crowded/scary" },
    { id: 69, cat: "Places", q: "Best place to study/work?", a: "At a desk in silence", b: "In bed", c: "At a noisy cafe" },
    { id: 70, cat: "Places", q: "Museums or Art Galleries?", a: "History Museums", b: "Art Galleries", c: "Neither, too boring" },
    { id: 71, cat: "Places", q: "Favorite shopping location?", a: "Huge Mall", b: "Online Shopping", c: "Local boutiques" },
    { id: 72, cat: "Places", q: "Movie theater preference?", a: "VIP / Recliner seats", b: "Standard seats", c: "I prefer watching at home" },
    { id: 73, cat: "Places", q: "Pool or Ocean?", a: "Clear Pool", b: "Salty Ocean", c: "Neither" },
    { id: 74, cat: "Places", q: "Ideal first date place?", a: "Coffee shop", b: "Nice restaurant", c: "A fun activity (bowling, etc)" },
    { id: 75, cat: "Places", q: "Do you like zoos/aquariums?", a: "Love seeing the animals!", b: "Only aquariums", c: "I feel bad for them" },
    { id: 76, cat: "Places", q: "Where do you get your best ideas?", a: "In the shower", b: "Right before sleeping", c: "While walking" },
    { id: 77, cat: "Places", q: "Camping outdoors?", a: "Yes, I love nature", b: "Glamping only", c: "Absolutely not" },
    { id: 78, cat: "Places", q: "Favorite seat in a car?", a: "Driver", b: "Passenger seat (DJ)", c: "Back seat (relaxing)" },
    { id: 79, cat: "Places", q: "Favorite airplane seat?", a: "Window seat", b: "Aisle seat", c: "Middle seat (psychopath?)" },
    { id: 80, cat: "Places", q: "Best place for a walk?", a: "On the corniche/beach", b: "In a public park", c: "In a mall" },

    // 81-100: Activities
    { id: 81, cat: "Activities", q: "Favorite hobby?", a: "Reading/Writing", b: "Gaming/Watching TV", c: "Sports/Working out" },
    { id: 82, cat: "Activities", q: "Do you like playing video games?", a: "Yes, a lot", b: "Sometimes / Mobile games", c: "Not at all" },
    { id: 83, cat: "Activities", q: "Favorite sport to watch?", a: "Football (Soccer)", b: "Basketball/Tennis", c: "I don't watch sports" },
    { id: 84, cat: "Activities", q: "Can you cook?", a: "I'm a master chef", b: "I survive on basics", c: "I burn water" },
    { id: 85, cat: "Activities", q: "Do you enjoy dancing?", a: "Yes, anywhere!", b: "Only at weddings/parties", c: "I have two left feet" },
    { id: 86, cat: "Activities", q: "How do you listen to music?", a: "Headphones max volume", b: "Speakers in the room", c: "Softly in the background" },
    { id: 87, cat: "Activities", q: "Karaoke night?", a: "I'm the star!", b: "I'll sing in a group", c: "I'll just watch" },
    { id: 88, cat: "Activities", q: "Do you read books?", a: "Voracious reader", b: "Occasionally", c: "I wait for the movie" },
    { id: 89, cat: "Activities", q: "Board games or Card games?", a: "Board games (Monopoly, etc)", b: "Card games (Uno, Poker)", c: "Neither" },
    { id: 90, cat: "Activities", q: "Taking photos?", a: "I take pics of everything", b: "Only on special occasions", c: "I hate taking pictures" },
    { id: 91, cat: "Activities", q: "Do you sing in the shower?", a: "Every time", b: "Sometimes", c: "Never" },
    { id: 92, cat: "Activities", q: "DIY and Crafting?", a: "Love making things", b: "I'll try if it's easy", c: "I prefer buying it" },
    { id: 93, cat: "Activities", q: "How are you at swimming?", a: "Like a fish", b: "I can float and move", c: "I stay in the shallow end" },
    { id: 94, cat: "Activities", q: "Binge-watching TV series?", a: "Can finish a season in a day", b: "1-2 episodes a day", c: "I get bored quickly" },
    { id: 95, cat: "Activities", q: "Doing puzzles?", a: "Love them", b: "If I'm really bored", c: "Too frustrating" },
    { id: 96, cat: "Activities", q: "Do you like shopping for clothes?", a: "Retail therapy is real", b: "Only when I need something", c: "I find it exhausting" },
    { id: 97, cat: "Activities", q: "Are you good at keeping plants alive?", a: "Yes, green thumb!", b: "I try but they die", c: "Fake plants only" },
    { id: 98, cat: "Activities", q: "Do you journal or write a diary?", a: "Yes, regularly", b: "On and off", c: "Never" },
    { id: 99, cat: "Activities", q: "Preferred workout style?", a: "Gym / Weights", b: "Cardio / Running", c: "Yoga / Stretching" },
    { id: 100, cat: "Activities", q: "What's your guilty pleasure activity?", a: "Mindless scrolling on TikTok/Reels", b: "Eating junk food in bed", c: "Stalking people on Instagram" },

    // 101-120: Colors & Style
    { id: 101, cat: "Colors", q: "Favorite primary color?", a: "Red", b: "Blue", c: "Yellow" },
    { id: 102, cat: "Colors", q: "Wardrobe dominant color?", a: "Black / Dark shades", b: "White / Neutrals", c: "Bright / Colorful" },
    { id: 103, cat: "Colors", q: "Gold or Silver jewelry?", a: "Gold", b: "Silver", c: "Rose Gold" },
    { id: 104, cat: "Colors", q: "Favorite pastel color?", a: "Baby Blue", b: "Mint Green", c: "Soft Pink" },
    { id: 105, cat: "Colors", q: "Preferred shoe type?", a: "Sneakers", b: "Formal / Heels", c: "Sandals / Slippers" },
    { id: 106, cat: "Colors", q: "Casual or Formal?", a: "Sweatpants all day", b: "Smart Casual", c: "Dressed to impress" },
    { id: 107, cat: "Colors", q: "Favorite accessory?", a: "Watch", b: "Rings / Necklaces", c: "Hats / Caps" },
    { id: 108, cat: "Colors", q: "Perfume preference?", a: "Sweet / Fruity", b: "Woody / Musky", c: "Fresh / Floral" },
    { id: 109, cat: "Colors", q: "Hair styling?", a: "Lots of effort", b: "Quick brush and go", c: "Messy bun / cap" },
    { id: 110, cat: "Colors", q: "Sunglasses?", a: "Big and dark", b: "Small and trendy", c: "I lose them too often" },
    { id: 111, cat: "Colors", q: "Nail polish?", a: "Always painted", b: "Clear / Natural", c: "Never" },
    { id: 112, cat: "Colors", q: "Favorite fabric to wear?", a: "Soft Cotton", b: "Cozy Fleece", c: "Smooth Silk" },
    { id: 113, cat: "Colors", q: "Matching outfits with partner?", a: "Yes, so cute!", b: "Maybe subtle matching", c: "No, too cringe" },
    { id: 114, cat: "Colors", q: "Bag preference?", a: "Backpack", b: "Handbag / Purse", c: "Pockets only" },
    { id: 115, cat: "Colors", q: "Phone case style?", a: "Clear / Minimalist", b: "Colorful / Patterned", c: "Heavy duty protection" },
    { id: 116, cat: "Colors", q: "Dark mode or Light mode on phone?", a: "Dark mode forever", b: "Light mode", c: "Automatic based on time" },
    { id: 117, cat: "Colors", q: "Favorite flower?", a: "Red Roses", b: "Sunflowers", c: "Lilies / Tulips" },
    { id: 118, cat: "Colors", q: "Interior design preference?", a: "Modern and sleek", b: "Cozy and rustic", c: "Minimalist" },
    { id: 119, cat: "Colors", q: "Lipstick or Lip balm?", a: "Bold Lipstick", b: "Tinted Lip gloss", c: "Just moisturizing Lip balm" },
    { id: 120, cat: "Colors", q: "Bed sheets preference?", a: "Crisp White", b: "Dark Colors", c: "Fun Patterns" },

    // 121-140: Personality & Traits
    { id: 121, cat: "Personality", q: "Introvert or Extrovert?", a: "Introvert (Love my alone time)", b: "Extrovert (Love being around people)", c: "Ambivert (Depends on the day)" },
    { id: 122, cat: "Personality", q: "How do you handle stress?", a: "I panic slightly", b: "I stay calm and solve it", c: "I ignore it until the last minute" },
    { id: 123, cat: "Personality", q: "Are you stubborn?", a: "Very stubborn", b: "I can compromise", c: "I go with the flow" },
    { id: 124, cat: "Personality", q: "Do you forgive easily?", a: "Yes, I hold no grudges", b: "I forgive but don't forget", c: "It takes a lot for me to forgive" },
    { id: 125, cat: "Personality", q: "How do you show love?", a: "Physical touch & Hugs", b: "Words of affirmation", c: "Acts of service & Gifts" },
    { id: 126, cat: "Personality", q: "Are you a good listener?", a: "The best, people confide in me", b: "I try my best", c: "I get distracted sometimes" },
    { id: 127, cat: "Personality", q: "Do you get jealous easily?", a: "Yes, I'm possessive", b: "A little bit, naturally", c: "No, I'm very secure" },
    { id: 128, cat: "Personality", q: "How competitive are you?", a: "I must win everything", b: "Only in games/sports", c: "Not at all, just for fun" },
    { id: 129, cat: "Personality", q: "Are you organized?", a: "Everything has its place", b: "Organized chaos", c: "Very messy" },
    { id: 130, cat: "Personality", q: "Decision making?", a: "Quick and decisive", b: "I weigh all options", c: "I can't decide, you pick!" },
    { id: 131, cat: "Personality", q: "How do you handle arguments?", a: "Discuss it immediately", b: "Need space first, then talk", c: "Avoid conflict at all costs" },
    { id: 132, cat: "Personality", q: "Are you a perfectionist?", a: "Yes, extremely", b: "In certain things", c: "Done is better than perfect" },
    { id: 133, cat: "Personality", q: "Do you overthink?", a: "Always, it's exhausting", b: "Sometimes at night", c: "Rarely, I live in the moment" },
    { id: 134, cat: "Personality", q: "Are you easily scared?", a: "Yes, I jump at everything", b: "Only by horror movies", c: "No, I'm brave" },
    { id: 135, cat: "Personality", q: "How do you feel about surprises?", a: "Love them!", b: "Only if they are good", c: "Hate them, I need to know" },
    { id: 136, cat: "Personality", q: "Do you remember dates/anniversaries?", a: "I remember everything", b: "I need a calendar reminder", c: "I'm terrible with dates" },
    { id: 137, cat: "Personality", q: "Are you talkative?", a: "I can talk to a wall", b: "Only with people I know", c: "I prefer listening" },
    { id: 138, cat: "Personality", q: "How do you react to a compliment?", a: "Smile and say thanks", b: "Get awkward and shy", c: "Compliment them back" },
    { id: 139, cat: "Personality", q: "Do you cry during sad movies?", a: "Every single time", b: "Only if a dog dies", c: "Never, I'm a rock" },
    { id: 140, cat: "Personality", q: "Pessimist or Optimist?", a: "Optimist (Glass half full)", b: "Pessimist (Glass half empty)", c: "Realist (It's just water)" },

    // 141-160: Travel & Vacation
    { id: 141, cat: "Travel", q: "Dream honeymoon destination?", a: "Maldives (Tropical)", b: "Paris/Rome (Romantic City)", c: "Swiss Alps (Snow/Nature)" },
    { id: 142, cat: "Travel", q: "How do you pack for a trip?", a: "Weeks in advance", b: "The night before", c: "Throwing things in a bag 1 hour before" },
    { id: 143, cat: "Travel", q: "Are you a light traveler?", a: "Carry-on only", b: "One checked bag", c: "I pack my entire room" },
    { id: 144, cat: "Travel", q: "Do you use a travel itinerary?", a: "Planned down to the minute", b: "Rough idea of what to do", c: "Wing it completely" },
    { id: 145, cat: "Travel", q: "Road trips?", a: "Love the journey & music", b: "Only if it's under 3 hours", c: "Hate them, I want to fly" },
    { id: 146, cat: "Travel", q: "Do you get motion sickness?", a: "Yes, in cars/boats", b: "Only if I read in the car", c: "Never" },
    { id: 147, cat: "Travel", q: "Hotel or Airbnb?", a: "Luxury Hotel", b: "Cozy Airbnb", c: "Camping/Hostel" },
    { id: 148, cat: "Travel", q: "Taking photos on vacation?", a: "Documentation of every second", b: "A few nice pictures", c: "Prefer to just enjoy the moment" },
    { id: 149, cat: "Travel", q: "Trying local exotic food?", a: "Always down to try", b: "Maybe a small bite", c: "Sticking to what I know (McDonalds)" },
    { id: 150, cat: "Travel", q: "Buying souvenirs?", a: "Magnets for the fridge", b: "Clothes/Local items", c: "I don't buy souvenirs" },
    { id: 151, cat: "Travel", q: "Getting lost in a new city?", a: "A fun adventure!", b: "A little stressful", c: "Full panic mode" },
    { id: 152, cat: "Travel", q: "Do you learn the local language?", a: "Yes, basic phrases", b: "Just 'Hello' and 'Thank you'", c: "I rely on Google Translate" },
    { id: 153, cat: "Travel", q: "Jet lag?", a: "Hits me hard", b: "I recover quickly", c: "I can sleep anywhere so I'm fine" },
    { id: 154, cat: "Travel", q: "Who carries the passports/tickets?", a: "Me, I don't trust anyone else", b: "My partner", c: "We each hold our own" },
    { id: 155, cat: "Travel", q: "Arriving at the airport?", a: "3-4 hours early", b: "2 hours early", c: "Running to the gate" },
    { id: 156, cat: "Travel", q: "Favorite mode of transport?", a: "Airplane", b: "Train", c: "Car" },
    { id: 157, cat: "Travel", q: "Skiing or Snorkeling?", a: "Skiing in the snow", b: "Snorkeling in the coral reef", c: "I'll stay at the lodge/beach" },
    { id: 158, cat: "Travel", q: "Do you like historical tours?", a: "Love learning the history", b: "Only if the guide is fun", c: "Too boring for me" },
    { id: 159, cat: "Travel", q: "Theme park trips?", a: "First in line for rides!", b: "I hold the bags", c: "Eating all the park snacks" },
    { id: 160, cat: "Travel", q: "Returning home from vacation?", a: "Sad it's over", b: "Happy to be in my own bed", c: "Immediately planning the next trip" },

    // 161-180: Habits & Media
    { id: 161, cat: "Habits", q: "First thing you do waking up?", a: "Check phone", b: "Brush teeth", c: "Hit snooze" },
    { id: 162, cat: "Habits", q: "Favorite social media?", a: "Instagram", b: "TikTok", c: "Twitter/X or Facebook" },
    { id: 163, cat: "Habits", q: "Texting or Calling?", a: "Texting always", b: "Calling is faster", c: "Voice notes!" },
    { id: 164, cat: "Habits", q: "How many unread emails do you have?", a: "Zero (Inbox zero)", b: "A few dozen", c: "Thousands (9,999+)" },
    { id: 165, cat: "Habits", q: "Favorite movie genre?", a: "Action / Sci-Fi", b: "Rom-Com / Drama", c: "Horror / Thriller" },
    { id: 166, cat: "Habits", q: "Do you re-watch shows?", a: "Yes, my comfort shows endlessly", b: "Rarely, so much new stuff to see", c: "Never" },
    { id: 167, cat: "Habits", q: "Music genre?", a: "Pop / Hits", b: "Hip-Hop / Rap", c: "Indie / Alternative / Rock" },
    { id: 168, cat: "Habits", q: "Sleeping position?", a: "On my side", b: "On my back", c: "On my stomach" },
    { id: 169, cat: "Habits", q: "Do you talk in your sleep?", a: "Yes, full conversations", b: "Maybe mumble", c: "Nope" },
    { id: 170, cat: "Habits", q: "How do you squeeze the toothpaste?", a: "From the bottom perfectly", b: "From the middle like a monster", c: "Wherever" },
    { id: 171, cat: "Habits", q: "Toilet paper roll direction?", a: "Over", b: "Under", c: "I don't care" },
    { id: 172, cat: "Habits", q: "Do you crack your knuckles?", a: "All the time", b: "Sometimes", c: "Never, it grosses me out" },
    { id: 173, cat: "Habits", q: "Eating pizza crust?", a: "Eat it all", b: "Leave the crust", c: "Dip the crust in sauce" },
    { id: 174, cat: "Habits", q: "Volume numbers on TV?", a: "Must be even or multiples of 5", b: "Doesn't matter", c: "As loud as possible" },
    { id: 175, cat: "Habits", q: "Do you make your bed every day?", a: "First thing in the morning", b: "Only when someone is coming over", c: "Why bother, I'll sleep in it again" },
    { id: 176, cat: "Habits", q: "Listening to podcasts?", a: "Love them", b: "Prefer music", c: "Only true crime" },
    { id: 177, cat: "Habits", q: "Gaming console?", a: "PlayStation", b: "PC Master Race", c: "Xbox / Nintendo" },
    { id: 178, cat: "Habits", q: "Reading subtitles on movies?", a: "Always, even in my language", b: "Only for foreign films", c: "Hate subtitles, they distract me" },
    { id: 179, cat: "Habits", q: "Eating at the cinema?", a: "Eat it all before the movie starts", b: "Pace it through the movie", c: "Sneak in my own snacks" },
    { id: 180, cat: "Habits", q: "Closing doors?", a: "Must be completely closed", b: "Left slightly open", c: "Wide open" },

    // 181-200: Romance & Random
    { id: 181, cat: "Romance", q: "Ideal Valentine's date?", a: "Fancy dinner out", b: "Cozy night in with takeout", c: "A surprise adventure" },
    { id: 182, cat: "Romance", q: "Favorite type of gift to receive?", a: "Jewelry / Perfume", b: "Handmade / Sentimental", c: "Experiences / Travel" },
    { id: 183, cat: "Romance", q: "Do you like PDA (Public Display of Affection)?", a: "Yes, holding hands & kisses", b: "Subtle touch only", c: "Keep it private" },
    { id: 184, cat: "Romance", q: "Best way to apologize?", a: "Sincere talk and apology", b: "Buying a gift/flowers", c: "Giving a big hug" },
    { id: 185, cat: "Romance", q: "Nicknames in a relationship?", a: "Cute cheesy ones (Babe, Honey)", b: "Variations of their real name", c: "Inside joke names" },
    { id: 186, cat: "Romance", q: "Sharing food?", a: "What's mine is yours", b: "You can have a bite", c: "Joey doesn't share food!" },
    { id: 187, cat: "Romance", q: "Matching outfits?", a: "So romantic", b: "Only matching colors", c: "Please no" },
    { id: 188, cat: "Romance", q: "Celebrating anniversaries?", a: "Huge deal, big celebration", b: "Nice dinner and a gift", c: "Just a sweet text/call" },
    { id: 189, cat: "Romance", q: "Who says 'I love you' first after a fight?", a: "Usually me", b: "Usually my partner", c: "We say it together" },
    { id: 190, cat: "Romance", q: "Ideal romantic movie trope?", a: "Enemies to lovers", b: "Friends to lovers", c: "Love at first sight" },
    { id: 191, cat: "Romance", q: "Favorite romantic gesture?", a: "Random forehead kisses", b: "Bringing me food", c: "Writing me a love letter" },
    { id: 192, cat: "Romance", q: "Do you believe in soulmates?", a: "Absolutely", b: "I think we choose to love", c: "Not really" },
    { id: 193, cat: "Romance", q: "How do you sleep next to a partner?", a: "Cuddling all night", b: "Cuddle first, then separate to sleep", c: "Don't touch me, I need space" },
    { id: 194, cat: "Romance", q: "Holding hands?", a: "Fingers interlaced", b: "Just holding palms", c: "Pinky holding" },
    { id: 195, cat: "Random", q: "If you won the lottery, first purchase?", a: "A huge house", b: "A luxury car", c: "A world tour trip" },
    { id: 196, cat: "Random", q: "Superpower choice?", a: "Flying", b: "Invisibility", c: "Teleportation" },
    { id: 197, cat: "Random", q: "Pineapple on pizza?", a: "Masterpiece", b: "Disgusting", c: "I'll eat it if it's there" },
    { id: 198, cat: "Random", q: "If you could only use one app?", a: "WhatsApp", b: "Instagram", c: "YouTube" },
    { id: 199, cat: "Random", q: "Cats or Dogs?", a: "Dogs", b: "Cats", c: "Both / Neither" },
    { id: 200, cat: "Random", q: "How much do you love your partner?", a: "More than anything in the world ❤️", b: "To the moon and back 🌙", c: "Words cannot describe it ✨" }
];

const LS = {
    currentUser: null,
    otherUser: null,
    currentView: 'auth',
    
    // Auth variables
    lockInterval: null,
    dailyInterval: null,
    
    // Quiz variables
    quizQuestions: [],
    quizProgressIndex: 0,
    quizScore: 0,
    
    init() {
        console.log("💘 Love Survey Initialized!");
        this.renderView('auth');
        this.checkExistingSession();
    },

    // --- UTILS ---
    save(key, data) {
        localStorage.setItem(`ls_${key}`, JSON.stringify(data));
    },
    
    get(key) {
        return JSON.parse(localStorage.getItem(`ls_${key}`) || 'null');
    },

    // --- NAVIGATION ---
    renderView(viewId) {
        document.getElementById('ls-auth-view').classList.add('ls-hidden');
        document.getElementById('ls-dashboard-view').classList.add('ls-hidden');
        document.getElementById('ls-setup-view').classList.add('ls-hidden');
        document.getElementById('ls-quiz-view').classList.add('ls-hidden');
        document.getElementById('ls-results-view').classList.add('ls-hidden');
        
        document.getElementById(`ls-${viewId}-view`).classList.remove('ls-hidden');
        this.currentView = viewId;
    },

    // --- AUTHENTICATION ---
    selectUser(user) {
        this.tempUser = user;
        document.getElementById('ls-login-name').innerText = `Hello, ${user}!`;
        document.getElementById('ls-login-form').classList.remove('ls-hidden');
        document.getElementById('ls-pwd').value = '';
        document.getElementById('ls-auth-error').innerText = '';
        
        this.checkLockout();
    },

    checkLockout() {
        if (!this.tempUser) return false;
        const lockTime = this.get(`${this.tempUser}_lockout`);
        
        if (lockTime && Date.now() < lockTime) {
            document.getElementById('ls-pwd').disabled = true;
            document.querySelector('#ls-login-form .ls-btn').disabled = true;
            const timerEl = document.getElementById('ls-lockout-timer');
            timerEl.classList.remove('ls-hidden');
            
            if (this.lockInterval) clearInterval(this.lockInterval);
            
            this.lockInterval = setInterval(() => {
                const diff = lockTime - Date.now();
                if (diff <= 0) {
                    clearInterval(this.lockInterval);
                    this.save(`${this.tempUser}_lockout`, null);
                    this.save(`${this.tempUser}_attempts`, 0);
                    document.getElementById('ls-pwd').disabled = false;
                    document.querySelector('#ls-login-form .ls-btn').disabled = false;
                    timerEl.classList.add('ls-hidden');
                    document.getElementById('ls-auth-error').innerText = "";
                } else {
                    const m = Math.floor(diff / 60000);
                    const s = Math.floor((diff % 60000) / 1000);
                    timerEl.innerText = `Locked! Try again in ${m}m ${s}s`;
                }
            }, 1000);
            return true;
        }
        return false;
    },

    login() {
        if (this.checkLockout()) return;
        
        const pwd = document.getElementById('ls-pwd').value;
        if (!pwd) return;

        let attempts = this.get(`${this.tempUser}_attempts`) || 0;
        const correctPw = this.get(`${this.tempUser}_pwd`) || (this.tempUser === 'Mahmoud' ? 'Sa3doon2711' : 'R551664');
        
        if (pwd === correctPw) {
            this.save(`${this.tempUser}_attempts`, 0);
            this.save('session', this.tempUser);
            this.setSession(this.tempUser);
        } else {
            attempts++;
            this.save(`${this.tempUser}_attempts`, attempts);
            if (attempts >= 5) {
                const unlockAt = Date.now() + 10 * 60 * 1000; // 10 minutes
                this.save(`${this.tempUser}_lockout`, unlockAt);
                document.getElementById('ls-auth-error').innerText = "Too many attempts!";
                this.checkLockout();
            } else {
                document.getElementById('ls-auth-error').innerText = `Incorrect password! ${5 - attempts} attempts left.`;
            }
        }
    },

    setSession(user) {
        this.currentUser = user;
        this.otherUser = user === 'Mahmoud' ? 'Rawan' : 'Mahmoud';
        
        // Check if there is a pending setup
        const pendingSetup = this.get(`${this.currentUser}_setup_pending`);
        
        if (pendingSetup) {
            this.startSetup(true);
        } else {
            this.goDashboard();
        }
    },

    checkExistingSession() {
        const session = this.get('session');
        if (session) {
            this.setSession(session);
        }
    },

    logout() {
        this.save('session', null);
        this.currentUser = null;
        this.otherUser = null;
        if (this.dailyInterval) clearInterval(this.dailyInterval);
        this.renderView('auth');
        document.getElementById('ls-login-form').classList.add('ls-hidden');
        document.getElementById('ls-pwd').value = '';
    },

    // --- PASSWORD CHANGE ---
    showChangePassword() {
        if (!this.tempUser) {
            alert("Please select your name first!");
            return;
        }
        document.getElementById('ls-pw-modal').classList.remove('ls-hidden');
        document.getElementById('ls-ver-code').value = '';
        document.getElementById('ls-new-pwd').value = '';
        document.getElementById('ls-new-pwd-group').classList.add('ls-hidden');
        document.getElementById('ls-modal-msg').innerText = '';
    },

    closeModal() {
        document.getElementById('ls-pw-modal').classList.add('ls-hidden');
    },

    verifyCode() {
        const code = document.getElementById('ls-ver-code').value;
        const msg = document.getElementById('ls-modal-msg');
        if (code === '1212') {
            msg.innerText = "Code accepted!";
            msg.className = "ls-msg success";
            document.getElementById('ls-new-pwd-group').classList.remove('ls-hidden');
        } else {
            msg.innerText = "Invalid verification code!";
            msg.className = "ls-msg error";
        }
    },

    saveNewPassword() {
        const newPw = document.getElementById('ls-new-pwd').value;
        if (newPw.length < 4) {
            document.getElementById('ls-modal-msg').innerText = "Password too short!";
            document.getElementById('ls-modal-msg').className = "ls-msg error";
            return;
        }
        this.save(`${this.tempUser}_pwd`, newPw);
        document.getElementById('ls-modal-msg').innerText = "Password changed successfully!";
        document.getElementById('ls-modal-msg').className = "ls-msg success";
        setTimeout(() => {
            this.closeModal();
            document.getElementById('ls-pwd').value = newPw;
        }, 1500);
    },

    // --- DASHBOARD ---
    goDashboard() {
        document.getElementById('ls-dash-welcome').innerText = `Welcome back, ${this.currentUser}! 💕`;
        this.updateDashboardStats();
        this.renderView('dashboard');
    },

    updateDashboardStats() {
        const mySetup = this.get(`${this.currentUser}_setup`) || {};
        const partnerSetup = this.get(`${this.otherUser}_setup`) || {};
        const mySetupDone = Object.keys(mySetup).length === 200;
        const partnerSetupDone = Object.keys(partnerSetup).length === 200;
        
        document.getElementById('ls-stat-mysetup').innerText = mySetupDone ? 'Complete ✅' : `${Object.keys(mySetup).length}/200 ⏳`;
        document.getElementById('ls-stat-partner').innerText = partnerSetupDone ? 'Complete ✅' : 'Pending ⏳';
        
        const attempts = this.get(`${this.currentUser}_attempts_count`) || 0;
        document.getElementById('ls-stat-attempts').innerText = attempts;
        
        const lastScore = this.get(`${this.currentUser}_last_score`);
        document.getElementById('ls-stat-score').innerText = lastScore !== null ? `${lastScore}/20` : '-';
        document.getElementById('ls-stat-compat').innerText = lastScore !== null ? `${Math.round((lastScore / 20) * 100)}%` : '-';
        
        const streak = this.get(`${this.currentUser}_streak`) || 0;
        document.getElementById('ls-stat-streak').innerText = `${streak} Days 🔥`;

        const btnSetup = document.getElementById('ls-btn-setup');
        const btnQuiz = document.getElementById('ls-btn-quiz');
        
        if (mySetupDone) {
            btnSetup.innerText = "Review My Answers";
            btnSetup.classList.remove('ls-hidden');
            btnSetup.onclick = () => {
                if(confirm("Do you want to review and change your answers?")) {
                    this.startSetup(false);
                }
            };
        } else {
            btnSetup.innerText = "Complete My Answers";
            btnSetup.classList.remove('ls-hidden');
            btnSetup.onclick = () => this.startSetup(false);
        }

        if (mySetupDone && partnerSetupDone) {
            btnQuiz.classList.remove('ls-hidden');
            
            if (!this.canTakeQuiz()) {
                btnQuiz.disabled = true;
                btnQuiz.innerText = "Come back tomorrow 💕";
                this.startDailyTimer();
            } else {
                btnQuiz.disabled = false;
                btnQuiz.innerText = "Take Quiz About Partner";
                document.getElementById('ls-daily-timer').classList.add('ls-hidden');
            }
        } else {
            btnQuiz.classList.add('ls-hidden');
        }

        // Missed questions
        const missed = this.get(`${this.currentUser}_last_missed`);
        const missedBox = document.getElementById('ls-missed-box');
        if (missed && missed.length > 0) {
            missedBox.classList.remove('ls-hidden');
            const ul = document.getElementById('ls-missed-list');
            ul.innerHTML = '';
            missed.slice(0, 3).forEach(m => {
                const li = document.createElement('li');
                li.innerText = m.q + ` (Correct: ${m.correct})`;
                ul.appendChild(li);
            });
        } else {
            missedBox.classList.add('ls-hidden');
        }
    },

    canTakeQuiz() {
        const lastStr = this.get(`${this.currentUser}_last_quiz_date`);
        if (!lastStr) return true;
        const lastD = new Date(lastStr);
        const now = new Date();
        return lastD.toDateString() !== now.toDateString();
    },

    startDailyTimer() {
        const timerEl = document.getElementById('ls-daily-timer');
        timerEl.classList.remove('ls-hidden');
        
        if (this.dailyInterval) clearInterval(this.dailyInterval);
        this.dailyInterval = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setHours(24, 0, 0, 0);
            const diff = tomorrow - now;
            
            if (diff <= 0) {
                clearInterval(this.dailyInterval);
                this.updateDashboardStats(); // Refresh logic
            } else {
                const h = Math.floor(diff / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);
                timerEl.innerText = `Next quiz unlocked in: ${h}h ${m}m ${s}s ⏳`;
            }
        }, 1000);
    },

    // --- SETUP PROCESS ---
    startSetup(isResume = false) {
        this.save(`${this.currentUser}_setup_pending`, true);
        this.currentSetupAnswers = this.get(`${this.currentUser}_setup`) || {};
        
        let startIdx = 0;
        if (isResume || Object.keys(this.currentSetupAnswers).length > 0) {
            // Find first unanswered question
            for (let i = 0; i < LS_QUESTIONS.length; i++) {
                if (!this.currentSetupAnswers[LS_QUESTIONS[i].id]) {
                    startIdx = i;
                    break;
                }
            }
        }
        
        if (startIdx >= LS_QUESTIONS.length) startIdx = 0; // If all answered, start from beginning
        
        this.setupIndex = startIdx;
        this.renderView('setup');
        this.renderSetupQuestion();
    },

    renderSetupQuestion() {
        if (this.setupIndex >= LS_QUESTIONS.length) {
            this.finishSetup();
            return;
        }

        const q = LS_QUESTIONS[this.setupIndex];
        document.getElementById('ls-setup-progress-text').innerText = `${this.setupIndex + 1} / 200`;
        document.getElementById('ls-setup-bar').style.width = `${((this.setupIndex + 1) / 200) * 100}%`;
        
        document.getElementById('ls-setup-q').innerText = `[${q.cat}] ${q.q}`;
        
        const optionsDiv = document.getElementById('ls-setup-options');
        optionsDiv.innerHTML = '';
        
        const currentAnswer = this.currentSetupAnswers[q.id]?.selected;

        ['A', 'B', 'C'].forEach(opt => {
            const key = opt.toLowerCase();
            const btn = document.createElement('button');
            btn.className = `ls-option-btn ${currentAnswer === opt ? 'selected' : ''}`;
            btn.innerText = q[key];
            btn.onclick = () => this.selectSetupOption(q, opt);
            optionsDiv.appendChild(btn);
                });

        document.getElementById('ls-btn-prev').disabled = this.setupIndex === 0;
    },

    selectSetupOption(q, opt) {
        this.currentSetupAnswers[q.id] = {
            questionId: q.id,
            selected: opt,
            text: q[opt.toLowerCase()],
            timestamp: Date.now()
        };
        
        this.save(`${this.currentUser}_setup`, this.currentSetupAnswers);
        
        // Brief delay before next question
        setTimeout(() => {
            this.setupIndex++;
            this.renderSetupQuestion();
        }, 300);
    },

    prevSetup() {
        if (this.setupIndex > 0) {
            this.setupIndex--;
            this.renderSetupQuestion();
        }
    },

    saveAndExitSetup() {
        this.save(`${this.currentUser}_setup_pending`, false);
        this.goDashboard();
    },

    resetSetup() {
        if(confirm("Are you sure you want to delete all your answers?")) {
            this.save(`${this.currentUser}_setup`, {});
            this.currentSetupAnswers = {};
            this.setupIndex = 0;
            this.renderSetupQuestion();
        }
    },

    finishSetup() {
        this.save(`${this.currentUser}_setup_pending`, false);
        alert("🎉 Amazing! You've completed all 200 questions!");
        this.goDashboard();
    },

    // --- QUIZ PROCESS ---
    startQuiz() {
        if (!this.canTakeQuiz()) return;

        const partnerSetup = this.get(`${this.otherUser}_setup`);
        
        // Pick 20 random questions from partner's answers
        const allIds = Object.keys(partnerSetup);
        const shuffled = allIds.sort(() => 0.5 - Math.random());
        const selectedIds = shuffled.slice(0, 20);
        
        this.quizQuestions = selectedIds.map(id => {
            const q = LS_QUESTIONS.find(x => x.id == id);
            return {
                ...q,
                correctAnswer: partnerSetup[id].selected,
                correctText: partnerSetup[id].text
            };
        });
        
        this.quizProgressIndex = 0;
        this.quizScore = 0;
        this.quizMissed = [];
        
        document.getElementById('ls-quiz-target').innerText = this.otherUser;
        this.renderView('quiz');
        this.renderQuizQuestion();
    },

    renderQuizQuestion() {
        if (this.quizProgressIndex >= 20) {
            this.finishQuiz();
            return;
        }

        const q = this.quizQuestions[this.quizProgressIndex];
        document.getElementById('ls-quiz-progress-text').innerText = `${this.quizProgressIndex + 1} / 20`;
        document.getElementById('ls-quiz-score-live').innerText = this.quizScore;
        document.getElementById('ls-quiz-bar').style.width = `${((this.quizProgressIndex) / 20) * 100}%`;
        
        document.getElementById('ls-quiz-q').innerText = q.q;
        
        const optionsDiv = document.getElementById('ls-quiz-options');
        optionsDiv.innerHTML = '';
        
        ['A', 'B', 'C'].forEach(opt => {
            const key = opt.toLowerCase();
            const btn = document.createElement('button');
            btn.className = 'ls-option-btn';
            btn.innerText = q[key];
            btn.onclick = () => this.submitQuizAnswer(btn, opt, q);
            optionsDiv.appendChild(btn);
                });
    },

    submitQuizAnswer(btn, selectedOpt, q) {
        // Disable all buttons immediately
        const buttons = document.querySelectorAll('#ls-quiz-options .ls-option-btn');
        buttons.forEach(b => b.disabled = true);
        
        const isCorrect = selectedOpt === q.correctAnswer;
        
        if (isCorrect) {
            btn.classList.add('correct');
            this.quizScore++;
            document.getElementById('ls-quiz-score-live').innerText = this.quizScore;
        } else {
            btn.classList.add('wrong');
            // Highlight correct one
            const correctIndex = ['A', 'B', 'C'].indexOf(q.correctAnswer);
            buttons[correctIndex].classList.add('correct');
            
            this.quizMissed.push({
                q: q.q,
                correct: q.correctText
            });
        }
        
        setTimeout(() => {
            this.quizProgressIndex++;
            this.renderQuizQuestion();
        }, 1200);
    },

    finishQuiz() {
        // Save stats
        this.save(`${this.currentUser}_last_quiz_date`, new Date().toISOString());
        this.save(`${this.currentUser}_last_score`, this.quizScore);
        this.save(`${this.currentUser}_last_missed`, this.quizMissed);
        
        let attempts = this.get(`${this.currentUser}_attempts_count`) || 0;
        this.save(`${this.currentUser}_attempts_count`, attempts + 1);
        
        // Streak logic
        let streak = this.get(`${this.currentUser}_streak`) || 0;
        let lastQuizDateStr = this.get(`${this.currentUser}_streak_date`);
        let now = new Date();
        if (lastQuizDateStr) {
            let lastD = new Date(lastQuizDateStr);
            let diffDays = Math.floor((now - lastD) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) streak++;
            else if (diffDays > 1) streak = 1;
        } else {
            streak = 1;
        }
        this.save(`${this.currentUser}_streak`, streak);
        this.save(`${this.currentUser}_streak_date`, now.toISOString());

        // Render Results
        document.getElementById('ls-result-score').innerText = this.quizScore;
        
        const meter = document.getElementById('ls-result-meter');
        const percent = (this.quizScore / 20) * 100;
        setTimeout(() => {
            meter.style.width = `${percent}%`;
            if (this.quizScore >= 17) meter.style.background = '#2ecc71';
            else if (this.quizScore >= 11) meter.style.background = '#f1c40f';
            else meter.style.background = '#e74c3c';
        }, 300);

        let msg = "";
        if (this.quizScore === 20) {
            msg = "Perfect! You know me completely! 💕";
            this.triggerParticles('❤️', 30);
            this.triggerParticles('✨', 30);
        } else if (this.quizScore >= 17) {
            msg = "Amazing! You know me so well! 🥰";
            this.triggerParticles('❤️', 20);
        } else if (this.quizScore >= 11) {
            msg = "Not bad! But there's always more to learn about me! 😊";
        } else {
            msg = "Really? Do you even know me? 😏";
            this.triggerParticles('😂', 20);
            this.triggerParticles('🤷', 10);
        }
        document.getElementById('ls-result-msg').innerText = msg;

        this.renderView('results');

        // Trigger WhatsApp
        this.sendWhatsApp(this.quizScore);
    },

    triggerParticles(char, count) {
        for(let i=0; i<count; i++) {
            const el = document.createElement('div');
            el.className = 'ls-floating-emoji';
            el.innerText = char;
            el.style.left = (Math.random() * 90) + 5 + 'vw';
            el.style.animationDuration = (Math.random() * 2 + 2) + 's';
            el.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 4000);
        }
    },

    sendWhatsApp(score) {
        const phone = this.currentUser === 'Mahmoud' ? '201500545584' : '20117576839';
        let text = "";
        
        if (score >= 17) {
            text = `Hey! ❤️ I just scored ${score}/20 on your Love Survey! I know everything about you because you mean the world to me. Every little detail about you matters to me. I love you so much! 💕✨`;
        } else if (score >= 11) {
            text = `Hi! I got ${score}/20 on your survey. You're someone special to me, but I guess I still have more to learn about you! 😊`;
        } else {
            text = `Umm... I scored ${score}/20. I barely know you apparently 😅 Who are you again? We might be strangers! 🤷`;
        }
        
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        
        // Small delay to let user see score first
        setTimeout(() => {
            window.open(url, '_blank');
        }, 2000);
    }
};

// Globalize for HTML onclick
window.LS = LS;
