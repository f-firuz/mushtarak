(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);




  class SimpleCardSlider {
    constructor() {
      this.slider = document.getElementById("cardSlider");
      this.prevBtn = document.getElementById("prevBtn");
      this.nextBtn = document.getElementById("nextBtn");
      this.indicatorsContainer = document.getElementById("sliderIndicators");

      this.cards = this.slider.querySelectorAll(".card");
      this.totalCards = this.cards.length;
      this.visibleCards = 4;
      this.currentIndex = 0;
      this.isAnimating = false;
      this.autoSlideInterval = null;
      this.isAutoSlideActive = true;
      this.autoSlideSpeed = 4000; // 4 секунды между переходами

      this.init();
    }

    init() {
      this.calculateVisibleCards();
      this.createIndicators();
      this.updateSlider();
      this.bindEvents();
      
      // Запускаем автопрокрутку
      if (this.isAutoSlideActive) {
        this.startAutoSlide();
      }
    }

    calculateVisibleCards() {
      if (window.innerWidth < 576) {
        this.visibleCards = 1;
      } else if (window.innerWidth < 768) {
        this.visibleCards = 2;
      } else {
        this.visibleCards = 4;
      }
      
      // Максимальный индекс (сколько карточек можно сдвинуть)
      this.maxIndex = Math.max(0, this.totalCards - this.visibleCards);
    }

    createIndicators() {
      // Количество групп для индикаторов
      const totalGroups = Math.ceil(this.totalCards / this.visibleCards);
      
      // Очищаем существующие индикаторы
      this.indicatorsContainer.innerHTML = '';
      
      for (let i = 0; i < totalGroups; i++) {
        const indicator = document.createElement("button");
        indicator.className = "indicator-btn";
        if (i === 0) indicator.classList.add("active");
        indicator.addEventListener("click", () => this.goToSlide(i));
        indicator.setAttribute("aria-label", `Бурунаи ${i + 1}-ум`);
        this.indicatorsContainer.appendChild(indicator);
      }

      this.indicators = this.indicatorsContainer.querySelectorAll(".indicator-btn");
    }

    updateSlider() {
      // Вычисляем смещение (в процентах)
      const translateX = -(this.currentIndex * (100 / this.visibleCards));
      this.slider.style.transform = `translateX(${translateX}%)`;

      // Обновляем активный индикатор
      this.indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentIndex);
      });

      // Обновляем состояние кнопок
      this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
      this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
    }

    goToSlide(slideIndex) {
      if (this.isAnimating) return;

      this.isAnimating = true;
      this.currentIndex = slideIndex;
      this.updateSlider();

      setTimeout(() => {
        this.isAnimating = false;
      }, 500);

      this.pauseAutoSlide();
    }

    nextSlide() {
      if (this.isAnimating || this.currentIndex >= this.maxIndex) return;

      this.isAnimating = true;
      
      // Если это последний слайд, плавно возвращаемся в начало
      if (this.currentIndex === this.maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      
      this.updateSlider();
      
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);

      this.pauseAutoSlide();
    }

    prevSlide() {
      if (this.isAnimating || this.currentIndex === 0) return;

      this.isAnimating = true;
      this.currentIndex--;
      this.updateSlider();

      setTimeout(() => {
        this.isAnimating = false;
      }, 500);

      this.pauseAutoSlide();
    }

    bindEvents() {
      // Кнопки навигации
      this.nextBtn.addEventListener("click", () => this.nextSlide());
      this.prevBtn.addEventListener("click", () => this.prevSlide());

      // Управление автопрокруткой при наведении
      const container = document.querySelector(".card-slider-container");

      container.addEventListener("mouseenter", () => {
        this.pauseAutoSlide();
      });

      container.addEventListener("mouseleave", () => {
        if (this.isAutoSlideActive) {
          this.startAutoSlide();
        }
      });

      // Обработка кликов по кнопкам "МУФАССАЛ"
      this.slider.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-primary")) {
          const card = e.target.closest(".card");
          const cardTitle = card.querySelector(".card-title").textContent;
        }
      });

      // Клавиатурная навигация
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          this.nextSlide();
        } else if (e.key === "ArrowLeft") {
          this.prevSlide();
        }
      });
    }

    startAutoSlide() {
      this.pauseAutoSlide();
      
      this.autoSlideInterval = setInterval(() => {
        if (!this.isAnimating) {
          this.nextSlide();
        }
      }, this.autoSlideSpeed);
    }

    pauseAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    }

    // Обработка изменения размера окна
    handleResize() {
      this.calculateVisibleCards();
      this.createIndicators();
      
      // Корректируем текущий индекс если нужно
      if (this.currentIndex > this.maxIndex) {
        this.currentIndex = this.maxIndex;
      }
      
      this.updateSlider();
      
      if (this.isAutoSlideActive) {
        this.startAutoSlide();
      }
    }

    // Публичные методы
    setAutoSlideSpeed(speed) {
      this.autoSlideSpeed = speed;
      if (this.isAutoSlideActive) {
        this.startAutoSlide();
      }
    }

    toggleAutoSlide() {
      this.isAutoSlideActive = !this.isAutoSlideActive;
      if (this.isAutoSlideActive) {
        this.startAutoSlide();
      } else {
        this.pauseAutoSlide();
      }
    }
  }

  // Инициализация слайдера
  let simpleSlider;

  function initSimpleSlider() {
    if (simpleSlider) {
      simpleSlider.pauseAutoSlide();
    }
    
    simpleSlider = new SimpleCardSlider();
  }

  // Запуск при загрузке страницы
  document.addEventListener("DOMContentLoaded", initSimpleSlider);

  // Пересчет при изменении размера окна
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (simpleSlider) {
        simpleSlider.handleResize();
      }
    }, 250);
  });

  // Глобальные методы управления
  window.sliderControls = {
    next: () => simpleSlider?.nextSlide(),
    prev: () => simpleSlider?.prevSlide(),
    pause: () => simpleSlider?.pauseAutoSlide(),
    play: () => simpleSlider?.startAutoSlide(),
    toggle: () => simpleSlider?.toggleAutoSlide(),
    setSpeed: (speed) => simpleSlider?.setAutoSlideSpeed(speed),
    goTo: (index) => simpleSlider?.goToSlide(index)
  };