// =====================
// CERTIFICATES CAROUSEL
// =====================
const wrapper = document.getElementById("certWrapper");
const cards = document.querySelectorAll(".cert-card");
const totalCards = cards.length;
const cardsPerSlide = 3;
let index = 0;

function moveNext() {
  index = (index + cardsPerSlide) % totalCards;
  updateSlide();
}

function movePrev() {
  index = (index - cardsPerSlide + totalCards) % totalCards;
  updateSlide();
}

function updateSlide() {
  const moveX = -(index * (100 / cardsPerSlide));
  wrapper.style.transform = `translateX(${moveX}%)`;
}

document.querySelector(".right-btn").addEventListener("click", moveNext);
document.querySelector(".left-btn").addEventListener("click", movePrev);

// Auto slide every 3 seconds
let autoSlide = setInterval(moveNext, 3000);

// Pause auto-slide on hover
const certContainer = document.querySelector(".cert-container");
certContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
certContainer.addEventListener("mouseleave", () => {
  autoSlide = setInterval(moveNext, 3000);
});

// =====================
// MY DESIGNS CAROUSEL
// =====================
const totalImages = 79;
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");

// Cloudinary base URL
const baseUrl = "https://res.cloudinary.com/db7ossyw6/image/upload/";

// Function to generate image URL
function generateImageUrl(index) {
  // Construct the public ID (assuming the pattern is 'index_randomString')
  const publicId = `${index}_randomString`; // Replace 'randomString' with the actual pattern
  return `${baseUrl}${publicId}.webp`;
}

// Loop to create and append images
for (let i = 1; i <= totalImages; i++) {
  const imgUrl = generateImageUrl(i);

  // Create and append image to row1
  let img1 = document.createElement("img");
  img1.src = imgUrl;
  img1.alt = `Design ${i}`;
  img1.loading = "lazy"; // Enable lazy loading
  row1.appendChild(img1);

  // Create and append image to row2
  let img2 = document.createElement("img");
  img2.src = imgUrl;
  img2.alt = `Design ${i}`;
  img2.loading = "lazy"; // Enable lazy loading
  row2.appendChild(img2);
}


// =====================
// HEADER SHOW/HIDE BASED ON HERO
// =====================
window.addEventListener("scroll", toggleHeaderVisibility);
window.addEventListener("load", toggleHeaderVisibility);

function toggleHeaderVisibility() {
  const header = document.querySelector("header");
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const heroBottom = hero.offsetHeight; // height of hero section

  // Check how far you've scrolled
  if (window.scrollY < heroBottom - 100) {
    // Still in hero section
    header.style.opacity = "1";
    header.style.pointerEvents = "auto";
  } else {
    // Scrolled past hero
    header.style.opacity = "0";
    header.style.pointerEvents = "none";
  }
}

// =====================
// SIDE NAV DOTS
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".side-nav .dot");
  const sections = Array.from(document.querySelectorAll("section[id]"));

  // Click to scroll
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetId = dot.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Function to update active dot
  function updateActiveDot() {
    const scrollY = window.scrollY + window.innerHeight / 2;
    let currentSection = sections[0];

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        currentSection = section;
      }
    });

    dots.forEach((dot) => dot.classList.remove("active"));
    const activeDot = document.querySelector(
      `.dot[data-target="${currentSection.id}"]`
    );
    if (activeDot) activeDot.classList.add("active");
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveDot);

  // Initial check
  updateActiveDot();
});



// =====================
// DARK & LIGHT THEME
// =====================
const toggleBtn = document.getElementById('mode-toggle');

// Set default
document.body.classList.add('dark-mode');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');

  // Toggle icon
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});


