const artists = [
    { name: "TRAPMEEN!", image: "image/artist1.jpg", url: "artist/trapmeen.html" },
    { name: "N4", image: "image/artist2.jpg", url: "artist/n4.html" },
    { name: "SRY4LATE", image: "image/artist3.jpg", url: "artist/SRY4LATE.html" },
    { name: "B$TN", image: "image/artist4.jpg", url: "artist/B$TN.html" },
    { name: "MIN4RI", image: "image/artist5.jpg", url: "artist/min4ri.html" },
    { name: "T4NN", image: "image/artist6.jpg", url: "artist/T4NN.html" },
    { name: "AKITO†", image: "image/artist7.jpg", url: "artist/AKITO.html" },
    { name: "PERX", image: "image/artist8.jpg", url: "artist/PERX.html" },
    ///{ name: "T!WLY", image: "image/artist8.png", url: "artist/T!WLY.html" },
];

const producers = [
   /// { name: "REDD0T", image: "image/reddot.jpg", url: "#" },
];

function displayItems(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        const itemLink = document.createElement('a');
        itemLink.href = item.url;
        itemLink.classList.add('artist-card');
        itemLink.dataset.tapped = 'false';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.classList.add('artist-image');

        const name = document.createElement('div');
        name.classList.add('artist-name');
        name.textContent = item.name;

        itemLink.append(img, name);
        container.appendChild(itemLink);

        // ✅ บนมือถือเท่านั้น: แตะครั้งแรกโชว์รูป, แตะอีกครั้งไปหน้า
        itemLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (itemLink.dataset.tapped === 'false') {
                    e.preventDefault();
                    itemLink.dataset.tapped = 'true';
                } else {
                    window.location.href = item.url;
                }
            }
        });
    });
}

// Display Artists & Producers
document.addEventListener('DOMContentLoaded', () => {
    displayItems('artistContainer', artists);
    displayItems('producerContainer', producers);
});
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('artistContainer');
  const cards = container.querySelectorAll('.artist-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      container.classList.add('hovering');
      card.classList.add('active');
    });

    card.addEventListener('mouseleave', () => {
      container.classList.remove('hovering');
      card.classList.remove('active');
    });
  });
});

