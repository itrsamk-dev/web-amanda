/* =========================================================
   RSU AMANDA MITRA KELUARGA
   MAIN JAVASCRIPT
========================================================= */

/* =========================================================
   ELEMENT
========================================================= */

const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const searchButton = document.getElementById("searchButton");

const searchBox = document.getElementById("searchBox");

const closeSearch = document.getElementById("closeSearch");

const searchInput = document.getElementById("searchInput");

const backToTop = document.getElementById("backToTop");

const currentTimeElement = document.getElementById("currentTime");

/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    const icon = menuToggle.querySelector("i");

    if (isOpen) {
      icon.classList.remove("fa-bars");

      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");

      icon.classList.add("fa-bars");
    }
  });
}

/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document.querySelectorAll(".nav-links > a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (!navLinks) return;

    navLinks.classList.remove("active");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");
      }
    }
  });
});

/* =========================================================
   NAVBAR SCROLL
========================================================= */

function handleNavbarScroll() {
  if (!navbar) return;

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);

handleNavbarScroll();

/* =========================================================
   SEARCH
========================================================= */

if (searchButton && searchBox) {
  searchButton.addEventListener("click", function () {
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
      setTimeout(function () {
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  });
}

if (closeSearch) {
  closeSearch.addEventListener("click", function () {
    searchBox.classList.remove("active");
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (searchBox) {
      searchBox.classList.remove("active");
    }
  }
});

/* =========================================================
   CLOCK
========================================================= */

function updateClock() {
  if (!currentTimeElement) return;

  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");

  const minutes = String(now.getMinutes()).padStart(2, "0");

  const seconds = String(now.getSeconds()).padStart(2, "0");

  currentTimeElement.textContent = `${hours}.${minutes}.${seconds} WIB`;
}

updateClock();

setInterval(updateClock, 1000);

/* =========================================================
   HERO SLIDER
========================================================= */

const heroSlider = document.getElementById("heroSlider");

const heroSlides = document.querySelectorAll(".hero-slide");

const heroPrev = document.getElementById("heroPrev");

const heroNext = document.getElementById("heroNext");

const heroDotsContainer = document.getElementById("heroDots");

let heroCurrent = 0;

let heroAutoSlide;

/* =========================================================
   CREATE HERO DOTS
========================================================= */

function createHeroDots() {
  if (!heroDotsContainer) return;

  heroDotsContainer.innerHTML = "";

  heroSlides.forEach(function (_, index) {
    const dot = document.createElement("button");

    dot.type = "button";

    dot.className = "hero-dot";

    dot.setAttribute("aria-label", `Buka gambar ${index + 1}`);

    dot.addEventListener("click", function () {
      heroCurrent = index;

      showHeroSlide(heroCurrent);

      resetHeroAutoSlide();
    });

    heroDotsContainer.appendChild(dot);
  });
}

createHeroDots();

/* =========================================================
   SHOW HERO
========================================================= */

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  if (index >= heroSlides.length) {
    heroCurrent = 0;
  }

  if (index < 0) {
    heroCurrent = heroSlides.length - 1;
  }

  heroSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("active", slideIndex === heroCurrent);
  });

  const heroDots = document.querySelectorAll(".hero-dot");

  heroDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("active", dotIndex === heroCurrent);
  });
}

/* =========================================================
   NEXT HERO
========================================================= */

function nextHeroSlide() {
  heroCurrent++;

  if (heroCurrent >= heroSlides.length) {
    heroCurrent = 0;
  }

  showHeroSlide(heroCurrent);

  resetHeroAutoSlide();
}

/* =========================================================
   PREVIOUS HERO
========================================================= */

function previousHeroSlide() {
  heroCurrent--;

  if (heroCurrent < 0) {
    heroCurrent = heroSlides.length - 1;
  }

  showHeroSlide(heroCurrent);

  resetHeroAutoSlide();
}

/* =========================================================
   HERO BUTTON
========================================================= */

if (heroNext) {
  heroNext.addEventListener("click", nextHeroSlide);
}

if (heroPrev) {
  heroPrev.addEventListener("click", previousHeroSlide);
}

/* =========================================================
   HERO AUTO
========================================================= */

function startHeroAutoSlide() {
  clearInterval(heroAutoSlide);

  heroAutoSlide = setInterval(function () {
    heroCurrent++;

    if (heroCurrent >= heroSlides.length) {
      heroCurrent = 0;
    }

    showHeroSlide(heroCurrent);
  }, 5000);
}

function resetHeroAutoSlide() {
  clearInterval(heroAutoSlide);

  startHeroAutoSlide();
}

/* =========================================================
   HERO SWIPE
========================================================= */

let heroTouchStartX = 0;

let heroTouchEndX = 0;

if (heroSlider) {
  heroSlider.addEventListener(
    "touchstart",
    function (event) {
      heroTouchStartX = event.changedTouches[0].screenX;
    },
    {
      passive: true,
    },
  );

  heroSlider.addEventListener(
    "touchend",
    function (event) {
      heroTouchEndX = event.changedTouches[0].screenX;

      const distance = heroTouchEndX - heroTouchStartX;

      if (distance < -50) {
        nextHeroSlide();
      } else if (distance > 50) {
        previousHeroSlide();
      }
    },
    {
      passive: true,
    },
  );
}

/* =========================================================
   PAUSE HERO WHEN MOUSE ENTERS
========================================================= */

if (heroSlider) {
  heroSlider.addEventListener("mouseenter", function () {
    clearInterval(heroAutoSlide);
  });

  heroSlider.addEventListener("mouseleave", function () {
    startHeroAutoSlide();
  });
}

/* =========================================================
   ABOUT SLIDER
========================================================= */

const imageSlider = document.getElementById("imageSlider");

const aboutSlides = document.querySelectorAll(".about-slide");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const sliderDotsContainer = document.getElementById("sliderDots");

let currentSlide = 0;

let aboutAutoSlide;

/* =========================================================
   CREATE ABOUT DOTS
========================================================= */

function createAboutDots() {
  if (!sliderDotsContainer) return;

  sliderDotsContainer.innerHTML = "";

  aboutSlides.forEach(function (_, index) {
    const dot = document.createElement("button");

    dot.type = "button";

    dot.className = "slider-dot";

    dot.setAttribute("aria-label", `Buka foto ${index + 1}`);

    dot.addEventListener("click", function () {
      currentSlide = index;

      showAboutSlide(currentSlide);

      resetAboutAutoSlide();
    });

    sliderDotsContainer.appendChild(dot);
  });
}

createAboutDots();

/* =========================================================
   SHOW ABOUT SLIDE
========================================================= */

function showAboutSlide(index) {
  if (!aboutSlides.length) return;

  if (index >= aboutSlides.length) {
    currentSlide = 0;
  }

  if (index < 0) {
    currentSlide = aboutSlides.length - 1;
  }

  aboutSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  const sliderDots = document.querySelectorAll(".slider-dot");

  sliderDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

/* =========================================================
   NEXT ABOUT
========================================================= */

function nextAboutSlide() {
  currentSlide++;

  if (currentSlide >= aboutSlides.length) {
    currentSlide = 0;
  }

  showAboutSlide(currentSlide);

  resetAboutAutoSlide();
}

/* =========================================================
   PREVIOUS ABOUT
========================================================= */

function previousAboutSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = aboutSlides.length - 1;
  }

  showAboutSlide(currentSlide);

  resetAboutAutoSlide();
}

/* =========================================================
   BUTTON ABOUT
========================================================= */

if (nextBtn) {
  nextBtn.addEventListener("click", nextAboutSlide);
}

if (prevBtn) {
  prevBtn.addEventListener("click", previousAboutSlide);
}

/* =========================================================
   AUTO ABOUT
========================================================= */

function startAboutAutoSlide() {
  clearInterval(aboutAutoSlide);

  aboutAutoSlide = setInterval(function () {
    currentSlide++;

    if (currentSlide >= aboutSlides.length) {
      currentSlide = 0;
    }

    showAboutSlide(currentSlide);
  }, 4500);
}

function resetAboutAutoSlide() {
  clearInterval(aboutAutoSlide);

  startAboutAutoSlide();
}

/* =========================================================
   ABOUT SWIPE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;

if (imageSlider) {
  imageSlider.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
    },
    {
      passive: true,
    },
  );

  imageSlider.addEventListener(
    "touchend",
    function (event) {
      touchEndX = event.changedTouches[0].screenX;

      const distance = touchEndX - touchStartX;

      if (distance < -50) {
        nextAboutSlide();
      } else if (distance > 50) {
        previousAboutSlide();
      }
    },
    {
      passive: true,
    },
  );
}

/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();

    const email = document.getElementById("email").value.trim();

    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !email || !pesan) {
      alert("Mohon lengkapi semua data.");

      return;
    }

    alert(`Terima kasih, ${nama}. Pesan Anda berhasil disiapkan.`);

    contactForm.reset();
  });
}

/* =========================================================
   BACK TO TOP
========================================================= */

function handleBackToTop() {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", handleBackToTop);

if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 160;

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navigationLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

/* =========================================================
   INITIALIZE
========================================================= */

showHeroSlide(heroCurrent);

startHeroAutoSlide();

showAboutSlide(currentSlide);

startAboutAutoSlide();

handleBackToTop();

updateActiveNavigation();
