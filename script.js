/* ==========================================
   MAVERA | script.js
   Etkileşimler ve Saf JavaScript Fonksiyonları
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Automatic Footer Year Update
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Gallery Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    let currentIndex = 0;
    const galleryImagesSrc = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImagesSrc.push(img.src);
            item.addEventListener('click', () => {
                currentIndex = index;
                openModal(galleryImagesSrc[currentIndex]);
            });
        }
    });

    function openModal(src) {
        if (modalImage && galleryModal) {
            modalImage.src = src;
            galleryModal.classList.add('active');
            galleryModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (galleryModal) {
            galleryModal.classList.remove('active');
            galleryModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeModal();
            }
        });
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryImagesSrc.length) % galleryImagesSrc.length;
            modalImage.src = galleryImagesSrc[currentIndex];
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryImagesSrc.length;
            modalImage.src = galleryImagesSrc[currentIndex];
        });
    }

    // Keyboard navigation for modal (Escape, Arrow keys)
    document.addEventListener('keydown', (e) => {
        if (!galleryModal || !galleryModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImagesSrc.length) % galleryImagesSrc.length;
            modalImage.src = galleryImagesSrc[currentIndex];
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImagesSrc.length;
            modalImage.src = galleryImagesSrc[currentIndex];
        }
    });

    // 4. Contact Form Mailto Enhancement
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Form, action="mailto:..." sayesinde tarayıcının varsayılan e-posta istemcisini tetikler.
            // Ekstra JavaScript validasyonu veya yönlendirmesi burada güvenle yönetilebilir.
        });
    }
});
