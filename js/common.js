/*scroll anchors*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'));
		const offset = 80;
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = target.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
})

/*fix header*/
const header = document.querySelector('.header');

const sentinel = document.createElement('div');
header.before(sentinel);

const observer = new IntersectionObserver(
	([entry])=>{
		if(!entry.isIntersecting){
      		header.classList.add('fixed');
    	}else{
      		header.classList.remove('fixed');
    	}
  	},
  	{threshold: 0}
);

observer.observe(sentinel);

/*mobile menu*/
if(document.querySelector('.nav-toggle')){
	document.querySelector('.nav-toggle').addEventListener('click', function () {
		document.querySelector('.nav').classList.toggle('nav--open');
		this.classList.toggle('nav-toggle--active');
	});
}
const links = document.querySelectorAll('.nav__link');
links.forEach(link => {
	link.addEventListener('click', () => {
		document.querySelector('.nav').classList.remove('nav--open');
		document.querySelector('.nav-toggle').classList.remove('nav-toggle--active');
	});
});


/*swiper*/
let servicesSwiper = new Swiper(".services__slider", {
	loop: false,
	grabCursor: true,
	autoHeight: false,
	breakpoints:{
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		768:{
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1200:{
			slidesPerView: 4,
			spaceBetween: 20,
		}
	}
});

let testimonislsSwiper = new Swiper(".testimonials__slider", {
	loop: false,
	grabCursor: true,
	autoHeight: false,
	dots: true,
	pagination: {
		el: ".testimonials__list-pagination",
		clickable: true,
	},
	breakpoints:{
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
			slidesPerGroup: 1,
		},
		992: {
			slidesPerView: 2,
			spaceBetween: 40,
			slidesPerGroup: 2,
		},
		1200:{
			slidesPerView: 3,
			spaceBetween: 60,
			slidesPerGroup: 3,
		}
	}
});

/*tabs*/
const tabs = document.querySelectorAll(".tabs__item");
const contents = document.querySelectorAll(".tabs__content");
const indicator = document.querySelector(".tabs__indicator");

function moveIndicator(el) {
	indicator.style.width = el.offsetWidth + "px";
	indicator.style.left = el.offsetLeft + "px";
}

moveIndicator(document.querySelector(".tabs__item.active"));

tabs.forEach(tab => {
	tab.addEventListener("click", () => {
		tabs.forEach(t => t.classList.remove("active"));
		tab.classList.add("active");
	    moveIndicator(tab);

		const id = tab.getAttribute("data-tab");
		contents.forEach(content => {
			content.classList.remove("active");
			if (content.getAttribute("data-content") === id) {
				content.classList.add("active");
			}
		});
	});
});

/*gallery slider*/
const captionEl = document.getElementById('caption');
let gallerySwiper = new Swiper('.gallery__slider', {
	slidesPerView: 3,
	loop: true,
	grabCursor: true,
	centeredSlides: true,
	dots: false,
	spaceBetween: 30,
	navigation: {
		nextEl: '.gallery__nav--next',
		prevEl: '.gallery__nav--prev',
	},
	on: {
		init: function () {
			const activeSlide = this.slides[this.activeIndex];
			captionEl.textContent = activeSlide.dataset.caption;
		},
		slideChange: function () {
			const activeSlide = this.slides[this.activeIndex];
			captionEl.textContent = activeSlide.dataset.caption;
		}
	}
});