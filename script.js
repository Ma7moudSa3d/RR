// Function to toggle caption visibility (global scope)
window.toggleCaption = function(index) {
    const caption = document.getElementById(`caption-${index}`);
    const allCaptions = document.querySelectorAll('.gallery-caption');
    
    if (!caption) {
        console.error(`Caption with id caption-${index} not found`);
        return;
    }
    
    // Hide all other captions
    allCaptions.forEach((cap) => {
        cap.classList.add('hidden');
    });
    
    // Toggle the clicked caption
    caption.classList.toggle('hidden');
};

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and target section
            btn.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // Load content
    loadGallery();
    loadVideos();
    loadMessages();
    loadBirthdayMessage();
    loadApologyMessage();
    loadTimeline();
});

// Gallery data and loader
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
        }
    ];
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="images/${image.filename}" alt="Our Memory" loading="lazy" onclick="toggleCaption(${index})">
            <div class="gallery-caption hidden" id="caption-${index}">${image.caption}</div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Videos data and loader
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
        }
    ];
    
    // Clear existing content
    videosContainer.innerHTML = '';
    
    videos.forEach((video, index) => {
        try {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            
            // Create video element with multiple compatibility options
            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.preload = 'metadata';
            videoElement.style.width = '100%';
            videoElement.style.maxWidth = '100%';
            videoElement.style.height = 'auto';
            
            // Add multiple source formats for better compatibility
            const source = document.createElement('source');
            source.src = `videos/${video.filename}`;
            source.type = 'video/mp4';
            videoElement.appendChild(source);
            
            // Add error handling
            videoElement.onerror = function() {
                console.error(`Error loading video: ${video.filename}`);
                this.style.display = 'none';
                const errorMsg = document.createElement('p');
                errorMsg.textContent = `Video "${video.title}" could not be loaded.`;
                errorMsg.style.color = '#666';
                errorMsg.style.fontStyle = 'italic';
                videoItem.appendChild(errorMsg);
            };
            
            videoItem.innerHTML = `
                <h3>${video.title}</h3>
            `;
            videoItem.appendChild(videoElement);
            videoItem.innerHTML += `
                <p class="video-caption">${video.caption}</p>
            `;
            
            videosContainer.appendChild(videoItem);
        } catch (error) {
            console.error(`Error creating video item ${index}:`, error);
        }
    });
}

// Apology message loader with better error handling
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

        // Clear existing content
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

// Messages data and loader
function loadMessages() {
    const messagesGrid = document.getElementById('messages-grid');
    const messages = [
        {
            title: 'To My Dearest RonRon',
            content: 'From the moment our paths crossed, I knew there was something special about you. Your smile brightens even my darkest days, and your laughter is the melody that plays in my heart. Every moment spent with you feels like a beautiful dream I never want to wake up from. You are my sunshine, my peace, and my home.'
        },
        {
            title: 'Our Journey Together',
            content: 'Every step we\'ve taken together has been a blessing. From our first conversations to our shared adventures under palm trees, each memory we\'ve created is etched in my heart forever. The way your fingers intertwine with mine tells a story of love that words could never fully express. I cherish every second, every glance, and every touch we share.'
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
            content: 'Our love is like a masterpiece, painted with the colors of our experiences together. From the artistic photos we\'ve taken to the cartoon versions of ourselves, each representation captures a different facet of our connection. Just like the butterflies that flutter around our memories, my heart takes flight whenever I think of you.'
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

// Happy Birthday message loader
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

        // Clear existing content
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

// Apology message loader
function loadApologyMessage() {
    const apologyContent = document.getElementById('apology-content');
    const apologyText = `My dearest love,

I know I hurt you, and it breaks my heart because the last thing I would ever want is to see you in pain. Yes, I made a mistake, but I swear it was never my intention to hurt you or to risk losing the most precious person in my life. You are not just my girlfriend—you are my home, my safe place, my whole world, and the reason my heart beats every single day.

Since the moment you walked into my life, everything changed. I remember the first time we laughed together, the way your eyes shined when you smiled, and how every little memory we made became a part of me. I think about those memories all the time—the walks, the late-night talks, the jokes only we understand, the quiet moments where words weren't even needed. They are the most beautiful treasures of my life, and I can't imagine losing the chance to create more of them with you.

Without you, my days feel dark and empty, and every moment apart stretches like forever. I don't just miss your presence—I miss us: the way we loved, the way we cared for each other, the way we felt like nothing in the world could come between us.

Please, my love, forgive me. Let me hold you again, let me see that beautiful smile that lights up my entire world, and let me look into those eyes where I see my whole future. I promise I will do whatever it takes to make things right. I will love you harder, hold you closer, and never stop proving that you are the one I want to spend my forever with.

No mistake can ever erase the love we share, and I believe our story is too beautiful to end here. So let's heal, let's forgive, and let's write the next chapter of our love—together.

Forever yours,
7amoody`;

    const apologyCard = document.createElement('div');
    apologyCard.className = 'apology-card';
    apologyCard.innerHTML = `
        <div class="apology-text">${apologyText.replace(/\n/g, '<br><br>')}</div>
    `;
    apologyContent.appendChild(apologyCard);
}

// Timeline data and loader
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

