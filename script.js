// =========================================================
// NEVERV!BE - WEB APP & ADMIN CMS SCRIPT (REALTIME DB + IMGBB)
// =========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
    getDatabase, ref, onValue, set, push, remove, update 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// --- 1. CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyDzhrO4lzLfxuZWGWQFMGunIfDfzth7ZWM",
    authDomain: "nevervibe-5e049.firebaseapp.com",
    projectId: "nevervibe-5e049",
    storageBucket: "nevervibe-5e049.firebasestorage.app",
    messagingSenderId: "535721157547",
    appId: "1:535721157547:web:0dff6dbfd63ffff407a8ee",
    measurementId: "G-L4MMSBSMX5",
    databaseURL: "https://nevervibe-5e049-default-rtdb.firebaseio.com" // Realtime Database URL
};

const IMGBB_API_KEY = "1a163cec2c80a29352d2ae9d9694a589";
const ADMIN_PASSCODE = "nv2026";

// Initialize Firebase Realtime Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Local State Store (Auto fallback if DB is empty or offline)
let store = {
    artists: [
        { id: "1", name: "TRAPMEEN!", genre: "#TRAP #MELODIC #UNDERGROUND", image: "image/TRAPMEEN.jpg", bio: "New Wave underground สไตล์เพลงผสมผสาน Rnb, melodic Trap แบบสุดโต่ง", rates: { hook: "500 THB", verse: "700 THB", both: "1000 THB" }, streaming: { spotify: "#", apple: "#", youtube: "#" }, socials: { ig: "https://www.instagram.com/_trapmeen/", tiktok: "https://www.tiktok.com/@_trapmeen" }, embeds: { youtube: "https://www.youtube.com/embed/0EZTTJre62o", soundcloud: "https://w.soundcloud.com/player/?url=https://soundcloud.com/trapmeen/trapmeen-ftyungtarr&color=%23FFD700" } },
        { id: "2", name: "N4", genre: "#MELODIC #R&B #UNDERGROUND", image: "image/N4.jpg", bio: "ศิลปินสาย Melodic จาก NEVERV!BE ที่ดึงอารมณ์คนฟังด้วยเนื้อหาและเสียงร้องที่เป็นเอกลักษณ์", rates: { hook: "700 THB", verse: "700 THB", both: "700 THB" }, streaming: { spotify: "#", apple: "#", youtube: "#" }, socials: { ig: "https://www.instagram.com/3nf0ur/" }, embeds: { youtube: "https://www.youtube.com/embed/HAeyvYY0rmE", soundcloud: "https://w.soundcloud.com/player/?url=https://soundcloud.com/realn4/youre-perfect-n3-prod-by-sakaayumu&color=%23FFD700" } },
        { id: "3", name: "SRY4LATE", genre: "#ALTERNATIVE #HIPHOP #UNDERGROUND", image: "image/SRY4LATE.jpg", bio: "FEARR เน้นเเนวเพลง Rnb เป็นหลัก เนื้อหาฟังง่าย เอาใจสาว ขี้เล่น แต่ตั้งใจทุกผลงาน", rates: { hook: "400 THB", verse: "400 THB", both: "700 THB" }, streaming: { spotify: "#", apple: "#", youtube: "#" }, socials: { ig: "https://www.instagram.com/sryforlatereply/" }, embeds: { youtube: "https://www.youtube.com/embed/hIXoRc0STgk" } },
        { id: "4", name: "B$TN", genre: "#HIPHOP #TRAP #UNDERGROUND", image: "image/B$TN.jpg", bio: "แร็ปเปอร์ผู้มาพร้อมโฟลว์สุดเดือดและเนื้อหาที่เข้มข้น ดุดัน", rates: { hook: "700 THB", verse: "1,400 THB", both: "2,000 THB" }, streaming: { spotify: "#", apple: "#", youtube: "#" }, socials: { ig: "https://www.instagram.com/chuen.arom/" }, embeds: { youtube: "https://www.youtube.com/embed/DCzdwjOfl1A" } },
        { id: "5", name: "T4NN", genre: "#TRAP #RAP #UNDERGROUND", image: "image/T4NN.jpg", bio: "ทรงพลัง ดุดัน และตรงไปตรงมา เขาคือแร็ปเปอร์ที่เปี่ยมไปด้วยสกิล Rhyme อันเฉียบคม", rates: { hook: "500 THB", verse: "700 THB", both: "1,000 THB" }, streaming: { spotify: "#", apple: "#", youtube: "#" }, socials: { ig: "https://www.instagram.com/_tannstfu/" }, embeds: { youtube: "https://www.youtube.com/embed/DibJiyysPyo" } },
        { id: "6", name: "AKITO†", genre: "#TRAP #DRILL #UNDERGROUND", image: "image/AKITO.jpg", bio: "สัญลักษณ์ของความดุดันและมืดหม่น ศิลปินสายแข็งจาก NEVERV!BE", rates: { hook: "700 THB", verse: "700 THB", both: "1,000 THB" }, streaming: { spotify: "#", apple: "#", youtube: "#" }, socials: { ig: "https://www.instagram.com/akitogoboy/" }, embeds: { youtube: "https://www.youtube.com/embed/9aPaEKfOGhU" } },
        { id: "7", name: "CASHTY", genre: "#TRAP #DRILL #UNDERGROUND", image: "image/CASHTY.jpg", bio: "ฉีกทุกกฎของวงการด้วยบีทหนักๆ และโฟลว์สุดเดือดที่พร้อมจะพังทุกสเตจ", rates: { hook: "-", verse: "700 THB", both: "-" }, streaming: { spotify: "#", apple: "#" }, socials: { ig: "https://www.instagram.com/ccasht/" } }
    ],
    events: [
        { id: "1", title: "Source.wav vol3", date: "24 พฤษภาคม 2026, 19:00", location: "Redhotmoon Livehouse", artists: "Line up: AKITO, TRAPMEEN!, N4, T4NN", poster: "image/event1.jpg", status: "Get Tickets", url: "https://www.ticketmelon.com/th/sourcewavteam/Sourcewavvol3" }
    ],
    releases: [
        { id: "1", title: "ตอนสุดท้าย", artist: "N4", cover: "image/cover2.png", url: "https://www.youtube.com/watch?v=HAeyvYY0rmE" },
        { id: "2", title: "Collëge", artist: "B$TN", cover: "image/cover3.png", url: "https://www.youtube.com/watch?v=DCzdwjOfl1A" }
    ],
    videos: [
        { id: "1", title: "Melt Livehouse 🔥🎤", type: "ig", val: "DXO-21LkZmw" },
        { id: "2", title: "NV NV NV 👁️", type: "ig", val: "DWJQwSlCgY9" }
    ],
    merch: [
        { id: "1", name: "NV Official TEE", price: "790 THB", image: "image/merch1.jpg", link: "https://line.me/R/ti/p/@yourid" }
    ],
    about: {
        highlight: '"NV เด็กใต้ดิน?"',
        text: 'ทุกอย่างเริ่มต้นจากแพสชันของเพจ <strong>UNDERGROUND CULTURE TH</strong> ที่คลุกคลีอยู่กับฮิปฮอปใต้ดินมาอย่างยาวนาน เราได้เห็นเพชรเม็ดงามซ่อนตัวอยู่มากมาย แร็ปเปอร์หลายคนมีสไตล์ที่ชัดเจน สกิลเยอะมากๆ แต่กลับยังไม่มีพื้นที่หรือสปอตไลต์ที่ส่องไปถึงพวกเขามากพอ เราจึงตัดสินใจรวบรวมตัวตึงเหล่านั้นมารวมกัน และก่อตั้งโปรเจกต์นี้ขึ้น<br><br>ภายใต้ชื่อ <strong>"NEVERV!BE"</strong> ซึ่งซ่อนความหมายที่โคตรเดือดเอาไว้ว่า <em>"Never Compromise Your Vibe"</em> มันคือคลื่นพลังงานดนตรีที่ไม่มีวันดับ และเป็นบรรยากาศที่โคตรจะเร้าใจ ในแบบที่คุณไม่เคยสัมผัสจากวงการบนดิน เราจะไม่ยอมลดทอนความเป็นตัวเองเพื่อตามกระแสใคร<br><br>เป้าหมายของ NEVERV!BE มีเพียงหนึ่งเดียว: <strong>ผลักดันแร็ปเปอร์ใต้ดินให้กลายเป็นดาว</strong> เราจะรีดความสามารถของทุกคน ทำให้มีชื่อเสียง เงิน และเป็นงานที่หล่อเลี้ยงชีวิตพวกเขาได้อย่างภาคภูมิใจ<br><br><span class="welcome-text">WELCOME TO THE NEW ERA. WELCOME TO NEVERV!BE.</span>'
    },
    bookings: []
};

// --- 2. FIREBASE REALTIME DATABASE LISTENERS ---
function initFirebaseSync() {
    const collections = ['artists', 'events', 'releases', 'videos', 'merch', 'bookings'];
    
    collections.forEach(colName => {
        const dbRef = ref(db, colName);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                store[colName] = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            } else {
                store[colName] = [];
            }
            renderPublicSite();
            renderAdminPanel();
        }, (error) => {
            console.warn(`Realtime DB path [${colName}] error:`, error);
        });
    });

    onValue(ref(db, "settings/about"), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            store.about = data;
            renderPublicSite();
            renderAdminPanel();
        }
    });
}

// --- 3. PUBLIC SITE RENDERING ---
function renderPublicSite() {
    // Render Artists
    const artistContainer = document.getElementById('artistContainer');
    if (artistContainer) {
        artistContainer.innerHTML = store.artists.map(art => `
            <div class="artist-card" onclick="openArtistProfile('${art.id}')">
                <img src="${art.image || 'https://via.placeholder.com/300x400/111/fff?text=NV+Artist'}" alt="${art.name}">
                <div class="artist-name">${art.name}</div>
            </div>
        `).join('');
    }

    // Render Events
    const eventContainer = document.getElementById('eventContainer');
    if (eventContainer) {
        eventContainer.innerHTML = store.events.map(ev => `
            <div class="event-item">
                <div class="event-poster"><img src="${ev.poster}"></div>
                <div class="event-date">${ev.date}</div>
                <div class="event-detail">
                    <h3>${ev.title}</h3>
                    <p>${ev.location}</p>
                    <p class="event-artists">${ev.artists || ''}</p>
                </div>
                <div class="event-action">
                    <a href="${ev.url}" target="_blank" class="ticket-btn">${ev.status || 'Get Tickets'}</a>
                </div>
            </div>
        `).join('');
    }

    // Render Releases
    const releaseContainer = document.getElementById('releaseContainer');
    if (releaseContainer) {
        releaseContainer.innerHTML = store.releases.map(rel => `
            <a href="${rel.url}" target="_blank" class="release-card">
                <img src="${rel.cover}">
                <div class="release-info">
                    <h3>${rel.title}</h3>
                    <p>${rel.artist}</p>
                </div>
            </a>
        `).join('');
    }

    // Render Videos
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.innerHTML = store.videos.map(vid => `
            <div class="video-item">
                ${vid.type === 'ig' ? `
                    <iframe src="https://www.instagram.com/reel/${vid.val}/embed" frameborder="0" scrolling="no" allowtransparency="true" allow="encrypted-media"></iframe>
                ` : `
                    <iframe src="${vid.val}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `}
                <h3>${vid.title}</h3>
            </div>
        `).join('');
    }

    // Render Merch
    const merchContainer = document.getElementById('merchContainer');
    if (merchContainer) {
        merchContainer.innerHTML = store.merch.map(mch => `
            <div class="merch-card">
                <div class="merch-img"><img src="${mch.image}"></div>
                <div class="merch-info">
                    <h3>${mch.name}</h3>
                    <p>${mch.price}</p>
                    <a href="${mch.link}" target="_blank" class="buy-btn">ORDER NOW</a>
                </div>
            </div>
        `).join('');
    }

    // Render About
    const aboutContent = document.getElementById('aboutContent');
    if (aboutContent && store.about) {
        aboutContent.innerHTML = `
            <p class="highlight-text">${store.about.highlight || ''}</p>
            <div>${store.about.text || ''}</div>
        `;
    }
}

// --- 4. PUBLIC ARTIST PROFILE MODAL (FIXED SCROLL & CLOSE BUTTON) ---
window.openArtistProfile = function(id) {
    const art = store.artists.find(a => a.id === id);
    if (!art) return;

    const detailHtml = `
        <button class="modal-close-btn" onclick="closeModal('artistProfileModal')">&times;</button>
        <div style="position: relative; height: 280px;">
            <img src="${art.image}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6);">
            <div style="position: absolute; bottom: 20px; left: 30px; z-index: 2;">
                <div class="genre-tags" style="color: #FFD700; font-weight: 800; font-size: 0.8rem;">${art.genre || ''}</div>
                <h1 style="font-size: 2.8rem; margin: 0; color: #fff; text-align: left;">${art.name}</h1>
            </div>
        </div>
        <div style="padding: 30px;">
            <h3 style="color: #FFD700; border-bottom: 1px solid rgba(255,215,0,0.2); padding-bottom: 8px;">BIOGRAPHY</h3>
            <p style="color: #ccc; line-height: 1.7;">${art.bio || 'ยังไม่มีข้อมูลประวัติ'}</p>

            ${art.rates ? `
                <h3 style="color: #FFD700; border-bottom: 1px solid rgba(255,215,0,0.2); padding-bottom: 8px; margin-top: 25px;">FEATURING RATES</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
                    <div style="background: #181818; padding: 15px; border-radius: 8px; text-align: center;">
                        <span style="color: #888; font-size: 0.8rem;">HOOK</span>
                        <div style="color: #fff; font-weight: 900; font-size: 1.2rem; margin-top: 5px;">${art.rates.hook || '-'}</div>
                    </div>
                    <div style="background: #181818; padding: 15px; border-radius: 8px; text-align: center;">
                        <span style="color: #888; font-size: 0.8rem;">VERSE</span>
                        <div style="color: #fff; font-weight: 900; font-size: 1.2rem; margin-top: 5px;">${art.rates.verse || '-'}</div>
                    </div>
                    <div style="background: #181818; border: 1px solid #FFD700; padding: 15px; border-radius: 8px; text-align: center;">
                        <span style="color: #FFD700; font-size: 0.8rem;">VERSE + HOOK</span>
                        <div style="color: #fff; font-weight: 900; font-size: 1.2rem; margin-top: 5px;">${art.rates.both || '-'}</div>
                    </div>
                </div>
            ` : ''}

            ${art.embeds && art.embeds.youtube ? `
                <h3 style="color: #FFD700; border-bottom: 1px solid rgba(255,215,0,0.2); padding-bottom: 8px; margin-top: 25px;">LATEST WORK</h3>
                <div style="margin-top: 15px; border-radius: 8px; overflow: hidden;">
                    <iframe width="100%" height="240" src="${art.embeds.youtube}" frameborder="0" allowfullscreen></iframe>
                </div>
            ` : ''}

            <div style="display: flex; gap: 15px; margin-top: 30px; justify-content: center; flex-wrap: wrap;">
                ${art.socials && art.socials.ig ? `<a href="${art.socials.ig}" target="_blank" class="btn btn-gold"><i class="fab fa-instagram icon-spacer"></i>DM AT INSTAGRAM</a>` : ''}
                ${art.socials && art.socials.tiktok ? `<a href="${art.socials.tiktok}" target="_blank" class="btn btn-outline"><i class="fab fa-tiktok icon-spacer"></i>TIKTOK</a>` : ''}
            </div>
        </div>
    `;

    const modal = document.getElementById('artistProfileModal');
    document.getElementById('artistProfileDetail').innerHTML = detailHtml;
    modal.style.display = 'flex';

    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal('artistProfileModal');
        }
    };
};

// Handle Booking Form Submit
window.handlePublicBooking = async function(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('bkName').value,
        email: document.getElementById('bkEmail').value,
        artist: document.getElementById('bkArtist').value,
        date: document.getElementById('bkDate').value,
        detail: document.getElementById('bkDetail').value,
        createdAt: new Date().toISOString()
    };

    try {
        const newRef = push(ref(db, "bookings"));
        await set(newRef, data);
    } catch (err) {
        store.bookings.push({ id: Date.now().toString(), ...data });
    }

    alert('ส่งข้อมูลการจ้างงานเรียบร้อยแล้ว! ทีมงาน NEVERV!BE จะติดต่อกลับโดยเร็วที่สุดครับ');
    document.getElementById('bookingForm').reset();
};


// --- 5. ADMIN CMS RENDERING & CRUD ---
window.openAuthModal = function() {
    document.getElementById('authModal').style.display = 'flex';
};

window.verifyAdminPassword = function(e) {
    e.preventDefault();
    const pass = document.getElementById('adminPasscode').value;
    if (pass === ADMIN_PASSCODE) {
        closeModal('authModal');
        document.getElementById('publicSite').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        renderAdminPanel();
    } else {
        alert('รหัสผ่านไม่ถูกต้อง!');
    }
};

window.exitAdmin = function() {
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('publicSite').style.display = 'block';
};

window.logoutAdmin = function() {
    exitAdmin();
    document.getElementById('adminPasscode').value = '';
};

window.switchTab = function(tabName) {
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
};

function renderAdminPanel() {
    // Admin Artists
    document.getElementById('adminArtistList').innerHTML = store.artists.map(art => `
        <div class="cms-card">
            <img src="${art.image}">
            <div class="cms-card-body">
                <h4>${art.name}</h4>
                <p>${art.genre || ''}</p>
            </div>
            <div class="cms-card-actions">
                <button class="btn btn-outline" onclick="editArtist('${art.id}')"><i class="fa-solid fa-pen icon-spacer"></i>แก้ไข</button>
                <button class="btn btn-danger" onclick="deleteItem('artists', '${art.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    // Admin Events
    document.getElementById('adminEventList').innerHTML = store.events.map(ev => `
        <div class="cms-card">
            <img src="${ev.poster}">
            <div class="cms-card-body">
                <h4>${ev.title}</h4>
                <p>${ev.date} @ ${ev.location}</p>
            </div>
            <div class="cms-card-actions">
                <button class="btn btn-outline" onclick="editEvent('${ev.id}')"><i class="fa-solid fa-pen icon-spacer"></i>แก้ไข</button>
                <button class="btn btn-danger" onclick="deleteItem('events', '${ev.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    // Admin Releases
    document.getElementById('adminReleaseList').innerHTML = store.releases.map(rel => `
        <div class="cms-card">
            <img src="${rel.cover}">
            <div class="cms-card-body">
                <h4>${rel.title}</h4>
                <p>By ${rel.artist}</p>
            </div>
            <div class="cms-card-actions">
                <button class="btn btn-outline" onclick="editRelease('${rel.id}')"><i class="fa-solid fa-pen icon-spacer"></i>แก้ไข</button>
                <button class="btn btn-danger" onclick="deleteItem('releases', '${rel.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    // Admin Videos
    document.getElementById('adminVideoList').innerHTML = store.videos.map(vid => `
        <div class="cms-card">
            <div style="background: #000; height: 120px; display: flex; align-items: center; justify-content: center; color: #FFD700;">
                <i class="fa-solid fa-play fa-2x"></i>
            </div>
            <div class="cms-card-body">
                <h4>${vid.title}</h4>
                <p>Type: ${vid.type.toUpperCase()}</p>
            </div>
            <div class="cms-card-actions">
                <button class="btn btn-outline" onclick="editVideo('${vid.id}')"><i class="fa-solid fa-pen icon-spacer"></i>แก้ไข</button>
                <button class="btn btn-danger" onclick="deleteItem('videos', '${vid.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    // Admin Merch
    document.getElementById('adminMerchList').innerHTML = store.merch.map(mch => `
        <div class="cms-card">
            <img src="${mch.image}">
            <div class="cms-card-body">
                <h4>${mch.name}</h4>
                <p style="color: #FFD700;">${mch.price}</p>
            </div>
            <div class="cms-card-actions">
                <button class="btn btn-outline" onclick="editMerch('${mch.id}')"><i class="fa-solid fa-pen icon-spacer"></i>แก้ไข</button>
                <button class="btn btn-danger" onclick="deleteItem('merch', '${mch.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    // Admin About Form
    if (store.about) {
        document.getElementById('editAboutHighlight').value = store.about.highlight || '';
        document.getElementById('editAboutText').value = store.about.text || '';
    }

    // Admin Bookings List
    document.getElementById('adminBookingList').innerHTML = store.bookings.length ? store.bookings.map(bk => `
        <div class="booking-item-card">
            <div class="booking-item-header">
                <h4>${bk.name} (ศิลปิน: ${bk.artist})</h4>
                <span>วันที่ต้องการ: ${bk.date}</span>
            </div>
            <p><strong>Email:</strong> <a href="mailto:${bk.email}" style="color: #FFD700;">${bk.email}</a></p>
            <p style="color: #ccc;">${bk.detail}</p>
            <div style="text-align: right; margin-top: 10px;">
                <button class="btn btn-danger" onclick="deleteItem('bookings', '${bk.id}')"><i class="fa-solid fa-trash icon-spacer"></i>ลบรายการ</button>
            </div>
        </div>
    `).join('') : '<p style="color: #888;">ยังไม่มีรายการแจ้งจ้างงาน</p>';
}


// --- 6. IMGBB DIRECT UPLOAD API ---
window.uploadToImgBB = async function(fileInput, targetUrlId, targetPreviewId, progressId) {
    const file = fileInput.files[0];
    if (!file) return;

    const progressEl = document.getElementById(progressId);
    if (progressEl) progressEl.style.display = 'block';

    const formData = new FormData();
    formData.append("image", file);

    try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData
        });
        const data = await res.json();

        if (data.success) {
            const imageUrl = data.data.url;
            document.getElementById(targetUrlId).value = imageUrl;

            const previewEl = document.getElementById(targetPreviewId);
            if (previewEl) {
                previewEl.src = imageUrl;
                previewEl.style.display = 'block';
            }
            alert('อัปโหลดรูปภาพไปยัง ImgBB สำเร็จ!');
        } else {
            alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ: ' + (data.error ? data.error.message : 'Unknown error'));
        }
    } catch (err) {
        alert('อัปโหลดล้มเหลว กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    } finally {
        if (progressEl) progressEl.style.display = 'none';
    }
};


// --- 7. MODAL HELPERS & FORM SUBMISSIONS ---
window.closeModal = function(modalId) {
    document.getElementById(modalId).style.display = 'none';
};

// ARTIST MODAL ACTIONS
window.openArtistModal = function() {
    document.getElementById('artId').value = '';
    document.getElementById('artName').value = '';
    document.getElementById('artGenre').value = '';
    document.getElementById('artImage').value = '';
    document.getElementById('artBio').value = '';
    document.getElementById('rateHook').value = '';
    document.getElementById('rateVerse').value = '';
    document.getElementById('rateBoth').value = '';
    document.getElementById('artSpotify').value = '';
    document.getElementById('artApple').value = '';
    document.getElementById('artYoutube').value = '';
    document.getElementById('artIg').value = '';
    document.getElementById('artTiktok').value = '';
    document.getElementById('artYtEmbed').value = '';
    document.getElementById('artScEmbed').value = '';
    document.getElementById('artImgPreview').style.display = 'none';
    
    document.getElementById('artistModalTitle').innerText = 'เพิ่มศิลปินใหม่';
    document.getElementById('artistFormModal').style.display = 'flex';
};

window.editArtist = function(id) {
    const art = store.artists.find(a => a.id === id);
    if (!art) return;

    document.getElementById('artId').value = art.id;
    document.getElementById('artName').value = art.name || '';
    document.getElementById('artGenre').value = art.genre || '';
    document.getElementById('artImage').value = art.image || '';
    document.getElementById('artBio').value = art.bio || '';
    document.getElementById('rateHook').value = art.rates ? art.rates.hook || '' : '';
    document.getElementById('rateVerse').value = art.rates ? art.rates.verse || '' : '';
    document.getElementById('rateBoth').value = art.rates ? art.rates.both || '' : '';
    document.getElementById('artSpotify').value = art.streaming ? art.streaming.spotify || '' : '';
    document.getElementById('artApple').value = art.streaming ? art.streaming.apple || '' : '';
    document.getElementById('artYoutube').value = art.streaming ? art.streaming.youtube || '' : '';
    document.getElementById('artIg').value = art.socials ? art.socials.ig || '' : '';
    document.getElementById('artTiktok').value = art.socials ? art.socials.tiktok || '' : '';
    document.getElementById('artYtEmbed').value = art.embeds ? art.embeds.youtube || '' : '';
    document.getElementById('artScEmbed').value = art.embeds ? art.embeds.soundcloud || '' : '';

    if (art.image) {
        document.getElementById('artImgPreview').src = art.image;
        document.getElementById('artImgPreview').style.display = 'block';
    }

    document.getElementById('artistModalTitle').innerText = 'แก้ไขข้อมูลศิลปิน';
    document.getElementById('artistFormModal').style.display = 'flex';
};

window.saveArtistData = async function(e) {
    e.preventDefault();
    const id = document.getElementById('artId').value;
    const data = {
        name: document.getElementById('artName').value,
        genre: document.getElementById('artGenre').value,
        image: document.getElementById('artImage').value,
        bio: document.getElementById('artBio').value,
        rates: {
            hook: document.getElementById('rateHook').value,
            verse: document.getElementById('rateVerse').value,
            both: document.getElementById('rateBoth').value
        },
        streaming: {
            spotify: document.getElementById('artSpotify').value,
            apple: document.getElementById('artApple').value,
            youtube: document.getElementById('artYoutube').value
        },
        socials: {
            ig: document.getElementById('artIg').value,
            tiktok: document.getElementById('artTiktok').value
        },
        embeds: {
            youtube: document.getElementById('artYtEmbed').value,
            soundcloud: document.getElementById('artScEmbed').value
        }
    };

    if (id) {
        try { await update(ref(db, `artists/${id}`), data); }
        catch (err) {
            const idx = store.artists.findIndex(a => a.id === id);
            if (idx !== -1) store.artists[idx] = { id, ...data };
        }
    } else {
        try {
            const newRef = push(ref(db, "artists"));
            await set(newRef, data);
        } catch (err) { 
            store.artists.push({ id: Date.now().toString(), ...data }); 
        }
    }

    closeModal('artistFormModal');
    renderPublicSite();
    renderAdminPanel();
};

// EVENT MODAL ACTIONS
window.openEventModal = function() {
    document.getElementById('evId').value = '';
    document.getElementById('evTitle').value = '';
    document.getElementById('evDate').value = '';
    document.getElementById('evLocation').value = '';
    document.getElementById('evArtists').value = '';
    document.getElementById('evPoster').value = '';
    document.getElementById('evStatus').value = 'Get Tickets';
    document.getElementById('evUrl').value = '';
    document.getElementById('evPosterPreview').style.display = 'none';

    document.getElementById('eventModalTitle').innerText = 'เพิ่ม Event ใหม่';
    document.getElementById('eventFormModal').style.display = 'flex';
};

window.editEvent = function(id) {
    const ev = store.events.find(e => e.id === id);
    if (!ev) return;

    document.getElementById('evId').value = ev.id;
    document.getElementById('evTitle').value = ev.title || '';
    document.getElementById('evDate').value = ev.date || '';
    document.getElementById('evLocation').value = ev.location || '';
    document.getElementById('evArtists').value = ev.artists || '';
    document.getElementById('evPoster').value = ev.poster || '';
    document.getElementById('evStatus').value = ev.status || 'Get Tickets';
    document.getElementById('evUrl').value = ev.url || '';

    if (ev.poster) {
        document.getElementById('evPosterPreview').src = ev.poster;
        document.getElementById('evPosterPreview').style.display = 'block';
    }

    document.getElementById('eventModalTitle').innerText = 'แก้ไขข้อมูล Event';
    document.getElementById('eventFormModal').style.display = 'flex';
};

window.saveEventData = async function(e) {
    e.preventDefault();
    const id = document.getElementById('evId').value;
    const data = {
        title: document.getElementById('evTitle').value,
        date: document.getElementById('evDate').value,
        location: document.getElementById('evLocation').value,
        artists: document.getElementById('evArtists').value,
        poster: document.getElementById('evPoster').value,
        status: document.getElementById('evStatus').value,
        url: document.getElementById('evUrl').value
    };

    if (id) {
        try { await update(ref(db, `events/${id}`), data); }
        catch (err) {
            const idx = store.events.findIndex(e => e.id === id);
            if (idx !== -1) store.events[idx] = { id, ...data };
        }
    } else {
        try {
            const newRef = push(ref(db, "events"));
            await set(newRef, data);
        } catch (err) { 
            store.events.push({ id: Date.now().toString(), ...data }); 
        }
    }

    closeModal('eventFormModal');
    renderPublicSite();
    renderAdminPanel();
};

// RELEASE MODAL ACTIONS
window.openReleaseModal = function() {
    document.getElementById('relId').value = '';
    document.getElementById('relTitle').value = '';
    document.getElementById('relArtist').value = '';
    document.getElementById('relCover').value = '';
    document.getElementById('relUrl').value = '';
    document.getElementById('relCoverPreview').style.display = 'none';

    document.getElementById('releaseModalTitle').innerText = 'เพิ่ม Release ใหม่';
    document.getElementById('releaseFormModal').style.display = 'flex';
};

window.editRelease = function(id) {
    const rel = store.releases.find(r => r.id === id);
    if (!rel) return;

    document.getElementById('relId').value = rel.id;
    document.getElementById('relTitle').value = rel.title || '';
    document.getElementById('relArtist').value = rel.artist || '';
    document.getElementById('relCover').value = rel.cover || '';
    document.getElementById('relUrl').value = rel.url || '';

    if (rel.cover) {
        document.getElementById('relCoverPreview').src = rel.cover;
        document.getElementById('relCoverPreview').style.display = 'block';
    }

    document.getElementById('releaseModalTitle').innerText = 'แก้ไข Release';
    document.getElementById('releaseFormModal').style.display = 'flex';
};

window.saveReleaseData = async function(e) {
    e.preventDefault();
    const id = document.getElementById('relId').value;
    const data = {
        title: document.getElementById('relTitle').value,
        artist: document.getElementById('relArtist').value,
        cover: document.getElementById('relCover').value,
        url: document.getElementById('relUrl').value
    };

    if (id) {
        try { await update(ref(db, `releases/${id}`), data); }
        catch (err) {
            const idx = store.releases.findIndex(r => r.id === id);
            if (idx !== -1) store.releases[idx] = { id, ...data };
        }
    } else {
        try {
            const newRef = push(ref(db, "releases"));
            await set(newRef, data);
        } catch (err) { 
            store.releases.push({ id: Date.now().toString(), ...data }); 
        }
    }

    closeModal('releaseFormModal');
    renderPublicSite();
    renderAdminPanel();
};

// VIDEO MODAL ACTIONS
window.openVideoModal = function() {
    document.getElementById('vidId').value = '';
    document.getElementById('vidTitle').value = '';
    document.getElementById('vidType').value = 'ig';
    document.getElementById('vidVal').value = '';
    toggleVideoTypeInput();

    document.getElementById('videoModalTitle').innerText = 'เพิ่ม Video ใหม่';
    document.getElementById('videoFormModal').style.display = 'flex';
};

window.toggleVideoTypeInput = function() {
    const type = document.getElementById('vidType').value;
    const label = document.getElementById('vidLabel');
    const input = document.getElementById('vidVal');
    if (type === 'ig') {
        label.innerText = 'Instagram Reel ID (เช่น DXO-21LkZmw)';
        input.placeholder = 'DXO-21LkZmw';
    } else {
        label.innerText = 'YouTube Embed URL (เช่น https://www.youtube.com/embed/...)';
        input.placeholder = 'https://www.youtube.com/embed/...';
    }
};

window.editVideo = function(id) {
    const vid = store.videos.find(v => v.id === id);
    if (!vid) return;

    document.getElementById('vidId').value = vid.id;
    document.getElementById('vidTitle').value = vid.title || '';
    document.getElementById('vidType').value = vid.type || 'ig';
    document.getElementById('vidVal').value = vid.val || '';
    toggleVideoTypeInput();

    document.getElementById('videoModalTitle').innerText = 'แก้ไข Video';
    document.getElementById('videoFormModal').style.display = 'flex';
};

window.saveVideoData = async function(e) {
    e.preventDefault();
    const id = document.getElementById('vidId').value;
    const data = {
        title: document.getElementById('vidTitle').value,
        type: document.getElementById('vidType').value,
        val: document.getElementById('vidVal').value
    };

    if (id) {
        try { await update(ref(db, `videos/${id}`), data); }
        catch (err) {
            const idx = store.videos.findIndex(v => v.id === id);
            if (idx !== -1) store.videos[idx] = { id, ...data };
        }
    } else {
        try {
            const newRef = push(ref(db, "videos"));
            await set(newRef, data);
        } catch (err) { 
            store.videos.push({ id: Date.now().toString(), ...data }); 
        }
    }

    closeModal('videoFormModal');
    renderPublicSite();
    renderAdminPanel();
};

// MERCH MODAL ACTIONS
window.openMerchModal = function() {
    document.getElementById('mchId').value = '';
    document.getElementById('mchName').value = '';
    document.getElementById('mchPrice').value = '';
    document.getElementById('mchImage').value = '';
    document.getElementById('mchLink').value = '';
    document.getElementById('mchImagePreview').style.display = 'none';

    document.getElementById('merchModalTitle').innerText = 'เพิ่มสินค้า Merch';
    document.getElementById('merchFormModal').style.display = 'flex';
};

window.editMerch = function(id) {
    const mch = store.merch.find(m => m.id === id);
    if (!mch) return;

    document.getElementById('mchId').value = mch.id;
    document.getElementById('mchName').value = mch.name || '';
    document.getElementById('mchPrice').value = mch.price || '';
    document.getElementById('mchImage').value = mch.image || '';
    document.getElementById('mchLink').value = mch.link || '';

    if (mch.image) {
        document.getElementById('mchImagePreview').src = mch.image;
        document.getElementById('mchImagePreview').style.display = 'block';
    }

    document.getElementById('merchModalTitle').innerText = 'แก้ไขสินค้า Merch';
    document.getElementById('merchFormModal').style.display = 'flex';
};

window.saveMerchData = async function(e) {
    e.preventDefault();
    const id = document.getElementById('mchId').value;
    const data = {
        name: document.getElementById('mchName').value,
        price: document.getElementById('mchPrice').value,
        image: document.getElementById('mchImage').value,
        link: document.getElementById('mchLink').value
    };

    if (id) {
        try { await update(ref(db, `merch/${id}`), data); }
        catch (err) {
            const idx = store.merch.findIndex(m => m.id === id);
            if (idx !== -1) store.merch[idx] = { id, ...data };
        }
    } else {
        try {
            const newRef = push(ref(db, "merch"));
            await set(newRef, data);
        } catch (err) { 
            store.merch.push({ id: Date.now().toString(), ...data }); 
        }
    }

    closeModal('merchFormModal');
    renderPublicSite();
    renderAdminPanel();
};

// SAVE ABOUT CULTURE
window.saveAboutCulture = async function(e) {
    e.preventDefault();
    const data = {
        highlight: document.getElementById('editAboutHighlight').value,
        text: document.getElementById('editAboutText').value
    };

    try {
        await set(ref(db, "settings/about"), data);
    } catch (err) {
        store.about = data;
    }

    alert('บันทึกข้อมูล Our Culture สำเร็จ!');
    renderPublicSite();
};

// DELETE ITEM GENERIC (REALTIME DB REMOVAL)
window.deleteItem = async function(colName, id) {
    if (!confirm('ยืนยันการลบรายการนี้?')) return;

    try {
        await remove(ref(db, `${colName}/${id}`));
    } catch (err) {
        console.warn(`ไม่สามารถลบใน Realtime DB ได้ (ลบใน Local State แทน):`, err);
    }

    if (store[colName]) {
        store[colName] = store[colName].filter(item => item.id !== id);
    }

    renderPublicSite();
    renderAdminPanel();
};

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', () => {
    initFirebaseSync();
    renderPublicSite();
});