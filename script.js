// ข้อมูลศิลปิน
const artists = [
{ name: "TRAPMEEN!", image: "image/TRAPMEEN.jpg", url: "artist/trapmeen.html" },
    { name: "N4", image: "image/N4.jpg", url: "artist/n4.html" },
    { name: "SRY4LATE", image: "image/SRY4LATE.jpg", url: "artist/SRY4LATE.html" },
    { name: "B$TN", image: "image/B$TN.jpg", url: "artist/B$TN.html" },
    { name: "T4NN", image: "image/T4NN.jpg", url: "artist/T4NN.html" },
    { name: "AKITO†", image: "image/AKITO.jpg", url: "artist/AKITO.html" },
    { name: "CASHTY", image: "image/CASHTY.jpg", url: "artist/CASHTY.html" },
];

// ข้อมูลสินค้า Merch
const merchItems = [
    { name: "NV Official TEE", price: "1,290.-", image: "image/merch1.jpg", link: "https://line.me/R/ti/p/@yourid" },

];

// ข้อมูลตารางงาน
const events = [
    { 
        date: "24 พฤษภาคม 2026, 19:00", 
        title: "Source.wav vol3", 
        location: "Redhotmoon Livehouse", 
        artists: "Line up: AKITO, TRAPMEEN!, N4, T4NN",
        poster: "image/event1.jpg", 
        status: "Get Tickets", 
        url: "https://www.ticketmelon.com/th/sourcewavteam/Sourcewavvol3" 

    }
];
// ข้อมูลวิดีโอ (เปลี่ยนมาใช้ IG Reels)
// วิธีเอา ID: ในลิงก์ https://www.instagram.com/reel/C1234567890/ ให้เอาแค่ C1234567890 มาใส่ตรง reelId
const videos = [
    { title: "Melt Livehouse 🔥🎤", reelId: "DXO-21LkZmw" }, 
    { title: "NV NV NV 👁️", reelId: "DWJQwSlCgY9" },
    //{ title: "กางเกงกูหลุดตูด👖", reelId: "DWTyIWRkUfS" }
];

// ฟังก์ชันแสดงผลวิดีโอ (อัปเดตเป็น iframe ของ Instagram)
function displayVideos() {
    const container = document.getElementById('videoContainer');
    if (!container) return;
    container.innerHTML = ''; // เคลียร์ของเก่าก่อน

    videos.forEach(vid => {
        const item = document.createElement('div');
        item.classList.add('video-item');
        
        // ใช้ iframe ของ Instagram Embed
        item.innerHTML = `
            <iframe 
                src="https://www.instagram.com/reel/${vid.reelId}/embed" 
                frameborder="0" 
                scrolling="no" 
                allowtransparency="true"
                allow="encrypted-media">
            </iframe>
            <h3>${vid.title}</h3>
        `;
        container.appendChild(item);
    });
}
// ฟังก์ชันแสดงผล Artists
function displayArtists() {
    const container = document.getElementById('artistContainer');
    if (!container) return;
    artists.forEach(item => {
        const card = document.createElement('a');
        card.href = item.url;
        card.classList.add('artist-card');
        card.innerHTML = `
            <img src="${item.image || 'image/image_1a66db.jpg'}" alt="${item.name}">
            <div class="artist-name">${item.name}</div>
        `;
        container.appendChild(card);
    });
}



// ฟังก์ชันแสดงผล Merch
function displayMerch() {
    const container = document.getElementById('merchContainer');
    if (!container) return;
    merchItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('merch-card');
        card.innerHTML = `
            <div class="merch-img"><img src="${item.image || 'https://via.placeholder.com/300x400/111/fff?text=Coming+Soon'}" alt="${item.name}"></div>
            <div class="merch-info">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <a href="${item.link}" target="_blank" class="buy-btn">ORDER NOW</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// ฟังก์ชันแสดงผล Events (ชุดเดิม)
function displayEvents() {
    const container = document.getElementById('eventContainer');
    if (!container) return;
    events.forEach(ev => {
        const item = document.createElement('div');
        item.classList.add('event-item');
        item.innerHTML = `
            <div class="event-poster"><img src="${ev.poster}"></div>
            <div class="event-date">${ev.date}</div>
            <div class="event-detail">
                <h3>${ev.title}</h3>
                <p>${ev.location}</p>
                <p class="event-artists">${ev.artists}</p>
            </div>
            <div class="event-action">
                <a href="${ev.url}" target="_blank" class="ticket-btn">${ev.status}</a>
            </div>
        `;
        container.appendChild(item);
    });
}

// ฟังก์ชันแสดงผล Releases (ชุดเดิม)
function displayReleases() {
    const container = document.getElementById('releaseContainer');
    if (!container) return;
    const releaseData = [
        { title: "ตอนสุดท้าย", artist: "N4", cover: "image/cover2.png", url: "https://www.youtube.com/watch?v=HAeyvYY0rmE" },
        { title: "Collëge", artist: "B$TN", cover: "image/cover3.png", url: "https://www.youtube.com/watch?v=DCzdwjOfl1A" }
    ];
    releaseData.forEach(rel => {
        const card = document.createElement('a');
        card.href = rel.url;
        card.target = "_blank";
        card.classList.add('release-card');
        card.innerHTML = `
            <img src="${rel.cover}">
            <div class="release-info">
                <h3>${rel.title}</h3>
                <p>${rel.artist}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize ทุกอย่าง
document.addEventListener('DOMContentLoaded', () => {
    displayArtists();
    displayEvents();
    displayVideos();
    displayMerch();
    displayReleases();

    // Booking Form Submit (ตัวอย่างการแจ้งเตือน)
    document.getElementById('bookingForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('ส่งข้อมูลการจ้างงานเรียบร้อยแล้ว! ทีมงานจะติดต่อกลับโดยเร็วที่สุดครับ');
    });

    // Smooth Scroll สำหรับเมนู Nav
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});