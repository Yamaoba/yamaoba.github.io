/*
Hide header on scroll down & show on scroll up
*/

const header = document.getElementById("header");
let lastPos = document.documentElement.scrollTop;

window.addEventListener(
	"scroll",
	() => {
		const currPos = document.documentElement.scrollTop;

		if (currPos > lastPos) {
			if (currPos > header.offsetHeight) {
				header.classList.add("-translate-y-full");
				header.classList.remove("shadow-md");
			}
		} else {
			header.classList.remove("-translate-y-full");
			header.classList.add("shadow-md");
		}

		lastPos = currPos;
	},
	false
);

/*
Toggle the menu when pressed on hamburger button
Only on mobile devices
*/

const menu = document.getElementById("menu");
const searchBox = document.getElementById("search");
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener(
	"click",
	() => {
		menu.classList.toggle("hidden");
		searchBox.classList.toggle("hidden");
	},
	false
);

/*
Toggle untuk menu kategori collapsible
*/
document.addEventListener("DOMContentLoaded", () => {
	const categoryToggle = document.getElementById("category-toggle");
	const categoryList = document.getElementById("category-list");
	const categoryChevron = document.getElementById("category-chevron");

	// Cek jika elemennya ada di halaman ini
	if (categoryToggle && categoryList && categoryChevron) {
		categoryToggle.addEventListener("click", () => {
			// Toggle class 'hidden' untuk menampilkan/menyembunyikan daftar
			categoryList.classList.toggle("hidden");

			// Toggle rotasi ikon chevron
			categoryChevron.classList.toggle("rotate-180");
		});
	}
});

/*
Lazy load images
*/

const lazyImages = document.getElementsByClassName("lazy");

document.addEventListener(
	"DOMContentLoaded",
	() => {
		[...lazyImages].forEach(elem => {
			const originalImage = elem.dataset.src;

			elem.setAttribute("src", originalImage);
			elem.removeAttribute("data-src");
		});
	},
	false
);

/*
Menampilkan tanggal real-time di sisi klien
*/
document.addEventListener("DOMContentLoaded", () => {
	const dateElement = document.getElementById("live-date");

	if (dateElement) {
		// Gunakan API browser yang modern untuk format tanggal yang bagus
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		};
		// Gunakan locale 'id-ID' untuk format Bahasa Indonesia
		const today = new Date().toLocaleDateString("id-ID", options);

		dateElement.textContent = today;
	}
});

document.addEventListener("DOMContentLoaded", () => {
	const timeElement = document.getElementById("live-time");

	function updateTime() {
		if (timeElement) {
			// Gunakan locale 'id-ID' dan format jam:menit:detik
			const now = new Date();
			const timeString = now.toLocaleTimeString("id-ID", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false // Gunakan format 24 jam jika diinginkan
			});
			timeElement.textContent = `WIB ${timeString}`;
		}
	}

	// Jalankan sekali saat load agar tidak kosong
	updateTime();
	// Update jam setiap menit
	setInterval(updateTime, 60000);
});
