import {getZero} from "./services";

function slider(sliderObj) {
    // Slider
    createSlider();

    function createSlider(zero = true, loop = true) {
        // Constants
        const slider = document.querySelector(sliderObj.sliderSel),
            prevSlide = slider.querySelector(sliderObj.prevSlideSel),
            nextSlide = slider.querySelector(sliderObj.nextSlideSel),
            sliderWrapper = slider.querySelector(sliderObj.sliderWrapperSel),
            sliderInner = slider.querySelector(sliderObj.sliderInnerSel),
            sliderDots = slider.querySelector(sliderObj.sliderDotsSel),
            sliderLength = slider.querySelectorAll(sliderObj.slideSel).length;
        
        let sliderIndex = 0;

        // Initializing of Slider
        sliderInner.style.width = sliderLength * 100 + '%';

        // Creating navigation Dots
        let dots = [];
        for (let i = 0; i < sliderLength; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            
            sliderDots.append(dot);
            dots.push(dot);
        }
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                sliderIndex = i;
                updateIndex();
            });
        });

        // Auto-scrolling
        const autoScroll = setInterval(() => {
            updateIndex('+');
        }, 5000);
        updateIndex();
        
        // Events for next and prev
        prevSlide.addEventListener('click', e => {
            updateIndex('-');
            clearInterval(autoScroll);
        });
        nextSlide.addEventListener('click', e => {
            updateIndex('+');
            clearInterval(autoScroll);
        });

        // Event of resizing
        const sliderResize  = new ResizeObserver(() => {
            updateSlide();
        });

        sliderResize.observe(sliderWrapper);

        function updateIndex(op = false) {
            // Changing index
            if (op == '+') {
                sliderIndex++;
            }
            if (op == '-') {
                sliderIndex--;
            }

            // Checking validity of Index
            if (sliderIndex >= sliderLength) {  // If larger than can be
                if (loop) {
                    sliderIndex = 0;
                } else {
                    sliderIndex--; // Discard change
                }
            }
            if (sliderIndex < 0) {  // If lower than can be
                if (loop) {
                    sliderIndex = sliderLength - 1;
                } else {
                    sliderIndex++;  // Discard change
                }
            }
            // Change slide
            updateSlide();
        }

        function updateSlide(num = sliderIndex) {
            const sliderWidth = +window.getComputedStyle(sliderWrapper).width.replace(/px/, '');
            sliderInner.style.transform = `translateX(-${sliderWidth * num}px)`;
            
            updateCounter();
            updateDots();
            sliderIndex = num;

            function updateDots() {
                dots.forEach((dot, n) => {
                    dot.classList.remove('active');
                    if (n == num) {
                        dot.classList.add('active');
                    }
                });
            }
            function updateCounter() {
                const cur = slider.querySelector('#current'),
                    total = slider.querySelector('#total');
                
                if (zero) {
                    cur.innerHTML = getZero(num + 1);
                    total.innerHTML = getZero(sliderLength);
                } else {
                    cur.innerHTML = num + 1;
                    total.innerHTML = sliderLength;
                }
            }
        }
    }
}

export default slider;