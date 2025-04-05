document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.video__reviews')
  const slides = document.querySelectorAll('.video__review-wrapper')
  const dots = document.querySelectorAll('.slider-nav__dot')
  const prevBtn = document.querySelector('.slider-arrow--prev')
  const nextBtn = document.querySelector('.slider-arrow--next')
  const modal = document.getElementById('videoModal')
  const modalVideo = document.getElementById('modalVideo')
  const closeBtn = document.querySelector('.close')

  let currentIndex = 1
  const slideWidth = slides[0].offsetWidth + 32
  const totalSlides = slides.length

  function isMobileView() {
    return window.innerWidth < 480
  }

  function updateSlider() {
    if (!isMobileView()) return

    const offset =
      -currentIndex * slideWidth +
      (slider.parentElement.offsetWidth / 2 - slideWidth / 2)
    slider.style.transform = `translateX(${offset}px)`

    slides.forEach((slide, index) => {
      slide.classList.remove('slide-prev', 'slide-active', 'slide-next')
      if (index === currentIndex - 1) slide.classList.add('slide-prev')
      if (index === currentIndex) slide.classList.add('slide-active')
      if (index === currentIndex + 1) slide.classList.add('slide-next')

      if (index === currentIndex) {
        slide.style.height = '520px'
        slide.querySelector('.gradient').style.background =
          'linear-gradient(180deg, rgba(27, 91, 247, 0) 70.16%, rgba(27, 91, 247, 0.7) 99.93%)'
      } else {
        slide.style.height = '486px'
        slide.querySelector('.gradient').style.background =
          'linear-gradient(180deg, rgba(27, 91, 247, 0) 70.16%, rgba(0, 0, 0, 0.7) 99.93%)'
      }
    })

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex)
    })
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++
      updateSlider()
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--
      updateSlider()
    }
  }

  nextBtn.addEventListener('click', nextSlide)
  prevBtn.addEventListener('click', prevSlide)

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index
      updateSlider()
    })
  })

  slides.forEach((slide) => {
    slide.addEventListener('click', () => {
      const videoSrc = slide.getAttribute('data-video')
      modalVideo.src = videoSrc
      modal.style.display = 'flex'
      modalVideo.play()
    })
  })

  updateSlider()

  document.querySelectorAll('.video__review-wrapper').forEach((wrapper) => {
    wrapper.addEventListener('click', function () {
      const videoSrc = this.getAttribute('data-video')
      const modal = document.getElementById('videoModal')
      const modalVideo = document.getElementById('modalVideo')

      if (!videoSrc) {
        console.error('Ошибка: data-video отсутствует.')
        return
      }

      modal.style.display = 'flex'
      document.body.classList.add('no-scroll')
      modalVideo.src = videoSrc
      modalVideo.play()
    })
  })

  document
    .querySelector('.modal .close')
    .addEventListener('click', function () {
      const modal = document.getElementById('videoModal')
      const modalVideo = document.getElementById('modalVideo')

      modal.style.display = 'none'
      document.body.classList.remove('no-scroll')
      modalVideo.pause()
      modalVideo.src = ''
    })

  document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) {
      this.style.display = 'none'
      const modalVideo = document.getElementById('modalVideo')
      modalVideo.pause()
      modalVideo.src = ''
    }
  })
})
