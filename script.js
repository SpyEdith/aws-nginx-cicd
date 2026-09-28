/**
 * Liza Patel - Personal Portfolio JavaScript
 * Modern, Interactive & Feature-Rich
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Project Database for Dynamic Modal Previews
    // -------------------------------------------------------------------------
    const projectsData = {
        'society-hub': {
            title: 'Society Hub (Society Management System)',
            category: 'Web Application & Management',
            badge: 'Solo Software Project',
            role: 'Frontend design, backend development, database integration, and complete system implementation.',
            overview: 'Society Hub is an end-to-end web-based society management portal designed to streamline day-to-day residential community operations. It offers 3 distinct, role-based panels (Admin, Member, and Watchman) providing automated workflows for dues, visitor verification, and communication.',
            features: [
                '3 Role-Based Portals: Tailored interfaces for Admins, Society Members, and Security Watchmen.',
                'Maintenance & Payment Management: Automated billing, maintenance tracking, and receipt generation.',
                'Visitor & Security Log: Watchman panel to register visitor check-ins and notify members.',
                'Digital Notice Board & Complaints: Direct member grievance submission and instant announcements.',
                'Admin Control Dashboard: Full member database management, finance overview, and access logs.'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Apache/XAMPP'],
            status: 'Completed Academic Project'
        },
        'electro-bazar': {
            title: 'Electro Bazar',
            category: 'E-Commerce Web Portal',
            badge: 'Group Software Project',
            role: 'Frontend design and database integration.',
            overview: 'Electro Bazar is a dynamic e-commerce web platform engineered for electronic appliances and gadgets. The project focused on building an intuitive product discovery journey, a robust cart/checkout flow, and a secure backend database for product listings and user orders.',
            features: [
                'Category-Wise Catalog: Seamless browsing with real-time filtering for electronics.',
                'Shopping Cart & Purchase Flow: Interactive cart management, item quantity updates, and simulated checkout.',
                'User Authentication: Secure user registration, login, and profile order history.',
                'Admin Management: Inventory management interface for adding, updating, and removing items.',
                'Responsive UI: Mobile-first responsive frontend design ensuring cross-device compatibility.'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
            status: 'Completed Group Project'
        },
        'smart-traffic': {
            title: 'Smart Traffic Signal with Emergency Vehicle Detection',
            category: 'IoT & Embedded Systems',
            badge: 'Solo IoT and Hardware Project',
            role: 'Algorithm design and hardware-software integration.',
            overview: 'An intelligent hardware-software IoT system designed to eliminate delay for emergency response vehicles (ambulances, fire tenders, and police). The system detects approaching emergency units and dynamically prioritizes traffic signals to create an automated "Green Corridor".',
            features: [
                'Real-Time Detection Algorithm: Intelligent processing to identify emergency vehicle approaching cues.',
                'Automated Signal Override: Instant transition of traffic lights to green for prioritized lanes while safely halting intersecting lanes.',
                'Hardware-Software Integration: Seamless serial communication between Python algorithmic logic and Arduino microcontroller.',
                'Congestion Mitigation: Reduces crucial response transit time and enhances pedestrian/vehicle safety.',
                'Fail-Safe Architecture: Gracefully returns to normal signal cycles once the emergency vehicle clears the junction.'
            ],
            technologies: ['Python', 'C++', 'Arduino IDE', 'Microcontroller / Sensors', 'Serial Communication'],
            status: 'Completed Solo Project'
        }
    };

    // -------------------------------------------------------------------------
    // 2. Dark / Light Theme Toggle
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('liza_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('liza_portfolio_theme', newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
        });
    }

    // -------------------------------------------------------------------------
    // 3. Dynamic Typewriter Effect
    // -------------------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        'Software Developer',
        'MSc.IT Student',
        'Web Developer',
        'PHP & Python Developer',
        'Creative Problem Solver'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before starting new word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();

    // -------------------------------------------------------------------------
    // 4. Sticky Navbar, Scroll Progress & Active Section Highlighting
    // -------------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        // Progress bar
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrollPercentage}%`;
        }

        // Sticky Navbar styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Navigation Link on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 5. Mobile Navigation Menu Toggle
    // -------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu on clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('open')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('open');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 6. Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------------------
    // 7. Project Category Filtering
    // -------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 8. Project Detail Modal
    // -------------------------------------------------------------------------
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalContent = document.getElementById('modalContent');
    const projectDetailBtns = document.querySelectorAll('.btn-project-detail');

    function openProjectModal(projectId) {
        const data = projectsData[projectId];
        if (!data || !projectModal || !modalContent) return;

        let techChips = data.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
        let featureItems = data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('');

        modalContent.innerHTML = `
            <div class="modal-header-block">
                <span class="modal-tag">${data.category} • ${data.badge}</span>
                <h2>${data.title}</h2>
            </div>
            
            <div class="modal-section">
                <h4><i class="fa-solid fa-circle-info"></i> Project Overview</h4>
                <p>${data.overview}</p>
            </div>

            <div class="modal-section">
                <h4><i class="fa-solid fa-user-gear"></i> My Role & Responsibilities</h4>
                <p>${data.role}</p>
            </div>

            <div class="modal-section">
                <h4><i class="fa-solid fa-list-check"></i> Key Features & Modules</h4>
                <ul class="modal-features-list">
                    ${featureItems}
                </ul>
            </div>

            <div class="modal-section">
                <h4><i class="fa-solid fa-layer-group"></i> Technologies & Tools</h4>
                <div class="project-tech-stack" style="margin-top: 10px;">
                    ${techChips}
                </div>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px;">
                <a href="#contact" class="btn btn-primary btn-sm" onclick="closeProjectModal()">
                    <i class="fa-solid fa-envelope"></i> Discuss This Project
                </a>
            </div>
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = btn.getAttribute('data-target');
            openProjectModal(target);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 9. CV Modal
    // -------------------------------------------------------------------------
    const cvModal = document.getElementById('cvModal');
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');

    function openCvModal() {
        if (cvModal) {
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCvModal() {
        if (cvModal) {
            cvModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', openCvModal);
    }

    if (cvModalCloseBtn) {
        cvModalCloseBtn.addEventListener('click', closeCvModal);
    }

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                closeCvModal();
            }
        });
    }

    // Escape Key to Close any open Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeCvModal();
        }
    });

    // -------------------------------------------------------------------------
    // 10. Copy to Clipboard Functionality
    // -------------------------------------------------------------------------
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (navigator.clipboard && textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
                    showToast(`Copied "${textToCopy}" to clipboard!`, 'success');
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                    }, 2000);
                }).catch(() => {
                    fallbackCopy(textToCopy);
                });
            } else {
                fallbackCopy(textToCopy);
            }
        });
    });

    function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied to clipboard!`, 'success');
    }

    // -------------------------------------------------------------------------
    // 11. Interactive Contact Form with Validation
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';

            // Name check
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Please enter your name.';
                isValid = false;
            }

            // Email check
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Message check
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Please enter your message.';
                isValid = false;
            }

            if (isValid) {
                const originalBtnHtml = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

                setTimeout(() => {
                    showToast(`Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`, 'success');
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }, 1000);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 12. Toast Notification Helper
    // -------------------------------------------------------------------------
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
        toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 3500);
    }

    // -------------------------------------------------------------------------
    // 13. Dynamic Current Year
    // -------------------------------------------------------------------------
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
