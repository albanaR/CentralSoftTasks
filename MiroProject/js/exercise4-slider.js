async function loadAndInitSlider() {
    const res = await fetch('data/companies.json');
    const companies = await res.json();

    const track = document.querySelector('.trusted-slider-track');
    companies.forEach(c => {
        const img = document.createElement('img');
        img.src = c.image;
        img.alt = c.name;
        img.dataset.id = c.id;
        track.appendChild(img);
    });

    initSlider();
}

const container = document.querySelector('.trusted-slider');
const track     = document.querySelector('.trusted-slider-track');
const VISIBLE   = 5;
let index       = VISIBLE;
let autoTimer   = null;
let restartTimer= null;
let isDragging  = false;
let startX      = 0;
let prevTranslate = 0;
let currentTranslate = 0;

function initSlider() {
    const slides = Array.from(track.children);

    slides.slice(-VISIBLE).forEach(node => {
        track.insertBefore(node.cloneNode(true), track.firstChild);
    });
    slides.slice(0, VISIBLE).forEach(node => {
        track.appendChild(node.cloneNode(true));
    });

    const allSlides  = Array.from(track.children);
    const slideCount = allSlides.length;
    let slideWidth;

    function updateSizes() {
        slideWidth = track.clientWidth / VISIBLE;
        track.style.transition = 'none';
        track.style.transform  = `translateX(-${index * slideWidth}px)`;
    }
    window.addEventListener('resize', updateSizes);
    updateSizes();

    track.querySelectorAll('img').forEach(img => img.ondragstart = () => false);

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (!isDragging) {
                index += 1;
                track.style.transition = 'transform 0.3s ease';
                track.style.transform  = `translateX(-${index * slideWidth}px)`;

                if (index >= slideCount - VISIBLE) {
                    setTimeout(() => {
                        track.style.transition = 'none';
                        index = VISIBLE;
                        track.style.transform  = `translateX(-${index * slideWidth}px)`;
                    }, 300);
                }
            }
        }, 3000);
    }

    function onDragStart(e) {
        isDragging = true;
        startX = e.clientX;
        prevTranslate = currentTranslate || -index * slideWidth;
        clearInterval(autoTimer);
        clearTimeout(restartTimer);
        track.style.cursor = 'grabbing';
    }

    function onDragMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        currentTranslate = prevTranslate + dx;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const dx = e.clientX - startX;
        const movedSlides = Math.round(Math.abs(dx) / slideWidth);

        if (movedSlides >= 1) {
            index += dx < 0 ? movedSlides : -movedSlides;
        }

        if (index >= slideCount - VISIBLE) {
            index = VISIBLE;
        } else if (index < VISIBLE) {
            index = slideCount - VISIBLE * 2;
        }

        track.style.transition = 'transform 0.3s ease';
        track.style.transform  = `translateX(-${index * slideWidth}px)`;
        currentTranslate = -index * slideWidth;
        restartTimer = setTimeout(startAuto, 3000);
    }

    container.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup',   onDragEnd);

    startAuto();
}

loadAndInitSlider();
