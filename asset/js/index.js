let isMenuOpen = false;
let hasAnimated = false;

const impactLocations = [
    { name: 'Jakarta', lat: -6.2088, lng: 106.8456, impact: 'Edukasi 5.000+ siswa' },
    { name: 'Surabaya', lat: -7.2575, lng: 112.7521, impact: 'Bank Sampah Aktif' },
    { name: 'Bandung', lat: -6.9175, lng: 107.6191, impact: 'Program Organik' },
    { name: 'Yogyakarta', lat: -7.7956, lng: 110.3695, impact: 'Bank Sampah Aktif' },
    { name: 'Bali', lat: -8.4095, lng: 115.1889, impact: 'Zero Waste Campaign' },
    { name: 'Palangka Raya', lat: -2.216105, lng: 113.913977, impact: 'Edukasi 2.000+ siswa' },
    { name: 'Banjarbaru', lat: -3.457242, lng: 114.810318, impact: 'Recycling Program' },
    { name: 'Samarinda', lat: -0.502106, lng: 117.153709, impact: 'Penanaman Pohon dan Tumbuhan' },
    { name: 'Pekanbaru', lat: 0.51667, lng: 101.442, impact: 'Clean Community Project' },
];

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (isMenuOpen) toggleMenu();
    }
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;

    if (isMenuOpen) {
        mobileMenu.style.transform = 'translateX(0)';
        menuOverlay.style.opacity = '1';
        menuOverlay.style.pointerEvents = 'auto';
        body.style.overflow = 'hidden';
    } else {
        mobileMenu.style.transform = 'translateX(100%)';
        menuOverlay.style.opacity = '0';
        menuOverlay.style.pointerEvents = 'none';
        body.style.overflow = 'unset';
    }
}

document.getElementById('menu-overlay').addEventListener('click', toggleMenu);
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const logoText = document.getElementById('logo-text');
    const navLinks = document.querySelectorAll('#navbar a:not(#menu-button)');

    if (window.scrollY > 50) {
        navbar.classList.remove('bg-white/10', 'backdrop-blur-sm');
        navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
        logoText.classList.remove('text-gray-900');
        logoText.classList.add('text-gray-900');
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-gray-900');
        });

    } else {
        navbar.classList.add('bg-white/10', 'backdrop-blur-sm');
        navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
        logoText.classList.add('text-gray-900');
        logoText.classList.remove('text-gray-900');
        navLinks.forEach(link => {
            link.classList.add('text-gray-900');
            link.classList.remove('text-white');
        });
    }
});

function animateCounter(elementId, start, end, duration, decimals = 0) {
    const element = document.getElementById(elementId);
    const startTime = performance.now();
  
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOut;

        if (elementId === 'counter-banks') {
            element.textContent = Math.floor(current).toLocaleString('id-ID');
        } else {
            element.textContent = current.toFixed(decimals);
        }
        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting && !hasAnimated) {
            animateCounter('counter-waste', 0, 12.90, 1500, 2);
            animateCounter('counter-banks', 0, 120, 1500, 0);
            animateCounter('counter-co2', 0, 2.6, 1800, 1);
            hasAnimated = true;
        }
    });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats-section');

if (statsSection) observer.observe(statsSection);
function initLeaflet() {
    const map = L.map('map', {
        zoomControl: true,
    }).setView([-2.5, 118], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    impactLocations.forEach(loc => {
        L.circleMarker([loc.lat, loc.lng], {
            radius: 8,
            color: "#ffffff",
            fillColor: "#10b981",
            fillOpacity: 0.9,
            weight: 2,
        })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.impact}`);
    });
}
window.addEventListener('load', initLeaflet);