// === SMOOTH SCROLL ===
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// === EMAIL ===
function sendMail() {
    window.location.href = 'mailto:sarthak@example.com';
}

// === TYPING EFFECT ===
const roles = ['Full Stack Developer', 'AI Engineer', 'React Specialist', 'Problem Solver'];
let roleIndex = 0,
    charIndex = 0,
    isDeleting = false;

function type() {
    const current = roles[roleIndex];
    const el = document.getElementById('typing');
    if (isDeleting) charIndex--;
    else charIndex++;
    el.innerText = current.substring(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        return setTimeout(type, 1500);
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        return setTimeout(type, 300);
    }
    setTimeout(type, isDeleting ? 45 : 90);
}
type();

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// === SKILL BAR ANIMATION ON SCROLL ===
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                fill.style.animation = 'none';
                fill.offsetHeight; // reflow
                fill.style.animation = '';
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('#skills').forEach(s => skillObserver.observe(s));

// === AOS ===
AOS.init({ duration: 750, once: true, offset: 60 });

// === FOOTER YEAR ===
document.getElementById('year').textContent = new Date().getFullYear();

// === COUNTER ANIMATION FOR STATS ===
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const isPlus = suffix.includes('+');
    const num = parseInt(target);
    const duration = 1500;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
        start += step;
        if (start >= num) {
            start = num;
            clearInterval(timer);
        }
        el.textContent = start + suffix;
    }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-num');
            nums.forEach(el => {
                const raw = el.textContent;
                if (raw.includes('+')) animateCounter(el, parseInt(raw), '+');
                else if (raw.includes('%')) animateCounter(el, parseInt(raw), '%');
                else if (raw.includes('🏆')) animateCounter(el, parseInt(raw), '🏆');
                else if (!isNaN(parseInt(raw))) animateCounter(el, parseInt(raw), '');
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);


// to open mail client when "Hire Me" button is clicked
function sendMail() {
    window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=yashnandurge09@gmail.com&su=Hello%20Kunal&body=I%20want%20to%20connect%20with%20you",
        "_blank"
    );
}