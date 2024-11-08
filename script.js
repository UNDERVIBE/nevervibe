const artists = [
    { name: "TRAPMEEN!", image: "image/artist1.jpg", url: "artist/trapmeen.html" },
    { name: "N4", image: "image/artist2.jpg", url: "artist/n4.html" },
    { name: "FEAR", image: "image/artist3.jpg", url: "artist/fear.html" },
    { name: "B$TN", image: "image/artist4.jpg", url: "artist/B$TN.html" },
];

function displayArtists() {
    const container = document.getElementById('artistContainer');
    container.innerHTML = ''; // Clear previous content

    artists.forEach(artist => {
        // สร้างลิงก์หลักสำหรับการ์ดของศิลปิน
        const artistLink = document.createElement('a');
        artistLink.href = artist.url;
        artistLink.target = "_self"; // เปิดในหน้าเดียวกัน
        artistLink.classList.add('artist-card');

        // สร้างการ์ดของศิลปินภายในลิงก์
        const img = document.createElement('img');
        img.src = artist.image;
        img.alt = artist.name;

        const name = document.createElement('div');
        name.classList.add('artist-name');
        name.textContent = artist.name;

        artistLink.appendChild(img);
        artistLink.appendChild(name);
        container.appendChild(artistLink);
    });
}

// Display initial artists
displayArtists();
