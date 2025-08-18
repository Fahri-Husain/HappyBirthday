// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar sidebar
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// slide foto
document.addEventListener("DOMContentLoaded", function () {
  let index = 0;
  const slides = document.querySelectorAll(".slides img");
  const totalSlides = slides.length;

  function nextSlide() {
    index = (index + 1) % totalSlides;
    document.querySelector(".slides").style.transform = `translateX(-${
      index * 100
    }%)`;
  }

  setInterval(nextSlide, 3000); // Pindah setiap 3 detik
});

// Cek apakah datang dari halaman awal
if (sessionStorage.getItem("fromIndex") !== "true") {
  window.location.href = "index.html"; // balik ke awal
} else {
  // Hapus tanda biar kalau refresh balik ke awal
  sessionStorage.removeItem("fromIndex");
}

const triggerIcon = document.getElementById("search");
const animContainer = document.getElementById("animation-container");
const mainContent = document.getElementById("main-content");

triggerIcon.addEventListener("click", (e) => {
  e.preventDefault();

  animContainer.classList.remove("hidden");
  animContainer.classList.remove("not-loaded");

  const titles = "Happy Birthday Ale!".split("");
  const titleElement = document.getElementById("teks");
  const titleWrapper = document.querySelector(".teks"); // biar gampang
  titleElement.innerHTML = "";
  let index = 0;

  function appendTitle() {
    if (index < titles.length) {
      titleElement.innerHTML += titles[index];
      index++;
      setTimeout(appendTitle, 300);
    }
  }

  // delay 3 detik untuk bunga mekar dulu
  setTimeout(() => {
    titleWrapper.classList.add("show");
    appendTitle();
  }, 3000);

  // total waktu = delay + teks ketik + buffer
  const totalTime = 3000 + titles.length * 300 + 2000;

  setTimeout(() => {
    animContainer.classList.add("fade-out");
    titleWrapper.classList.add("fade-out"); // teks fade out barengan

    animContainer.addEventListener(
      "transitionend",
      () => {
        // sembunyikan animasi
        animContainer.classList.add("hidden");
        animContainer.classList.remove("fade-out");

        // reset title
        titleElement.innerHTML = "";
        titleWrapper.classList.remove("show", "fade-out");

        // tampilkan main content
        mainContent.classList.remove("hidden");
      },
      { once: true }
    );
  }, totalTime);
});

let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listHTML = document.querySelector(".carousel .list");
let seeMoreButtons = document.querySelectorAll(".seeMore");
let backButton = document.getElementById("back");

nextButton.onclick = function () {
  showSlider("next");
};
prevButton.onclick = function () {
  showSlider("prev");
};
let unAcceppClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";

  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }
  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 2000);
};
seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.remove("next", "prev");
    carousel.classList.add("showDetail");
  };
});
backButton.onclick = function () {
  const airpodsApp = document.getElementById("airpods-app");
  const mainContent = document.getElementById("main-content");

  if (carousel.classList.contains("showDetail")) {
    // kalau lagi lihat detail → balik ke slider
    carousel.classList.remove("showDetail");
  } else {
    // kalau sudah di slider → keluar ke kanan
    airpodsApp.classList.remove("slide-in-left"); // hapus animasi lama
    airpodsApp.classList.add("slide-out-right");

    airpodsApp.addEventListener(
      "animationend",
      function () {
        airpodsApp.classList.add("hidden");
        airpodsApp.classList.remove("slide-out-right"); // bersihkan animasi

        // tampilkan isi web
        mainContent.classList.remove("hidden");

        // pastikan scroll aktif lagi
        document.body.style.overflow = "auto";
      },
      { once: true }
    );
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const airpodsApp = document.getElementById("airpods-app");
  const cartIcon = document.getElementById("shopping-cart");

  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();

    airpodsApp.classList.remove("hidden", "slide-out-right"); // bersihkan sisa class keluar
    airpodsApp.classList.add("slide-in-left"); // animasi masuk

    document.body.style.overflow = "hidden"; // kunci scroll
  });
});
