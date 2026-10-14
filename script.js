const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const mobileSidebar = document.getElementById("mobileSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const body = document.body;

let previousScrollY = 0;

function openSidebar() {
if (mobileSidebar.classList.contains("open")) return;


previousScrollY = window.scrollY;

body.style.position = "fixed";
body.style.top = `-${previousScrollY}px`;
body.style.left = "0";
body.style.right = "0";
body.style.width = "100%";
body.classList.add("menu-open");

mobileSidebar.inert = false;
mobileSidebar.setAttribute("aria-hidden", "false");
mobileSidebar.classList.add("open");
sidebarOverlay.classList.add("show");

menuOpen.setAttribute("aria-expanded", "true");
menuClose.focus();


}

function closeSidebar(restoreFocus = true) {
if (!mobileSidebar.classList.contains("open")) return;


mobileSidebar.classList.remove("open");
sidebarOverlay.classList.remove("show");

mobileSidebar.inert = true;
mobileSidebar.setAttribute("aria-hidden", "true");

menuOpen.setAttribute("aria-expanded", "false");

body.classList.remove("menu-open");
body.style.position = "";
body.style.top = "";
body.style.left = "";
body.style.right = "";
body.style.width = "";

window.scrollTo(0, previousScrollY);

if (restoreFocus) {
    menuOpen.focus({ preventScroll: true });
}

}

menuOpen.addEventListener("click", openSidebar);
menuClose.addEventListener("click", () => closeSidebar());
sidebarOverlay.addEventListener("click", () => closeSidebar());

document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
closeSidebar();
}

if (event.key === "Tab" && mobileSidebar.classList.contains("open")) {
    const focusableElements = mobileSidebar.querySelectorAll(
        'a[href], button:not([disabled])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
    ) {
        event.preventDefault();
        firstElement.focus();
    }
}

});

mobileSidebar.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => closeSidebar(false));
});

window.addEventListener("resize", () => {
if (
window.innerWidth >= 992 &&
mobileSidebar.classList.contains("open")
) {
closeSidebar(false);
}
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document
.querySelectorAll(".desktop-navigation a, .sidebar-navigation a")
.forEach((link) => {
if (link.getAttribute("href") === currentPage) {
link.classList.add("active");
link.setAttribute("aria-current", "page");
} else {
link.classList.remove("active");
link.removeAttribute("aria-current");
}
});















gsap.registerPlugin();

const heroElements = gsap.matchMedia();

heroElements.add("(prefers-reduced-motion: no-preference)", () => {
    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    timeline
        .from(".hero-badge", {
            y: 25,
            opacity: 0,
            duration: 0.7
        })
        .from(".hero-title", {
            y: 45,
            opacity: 0,
            duration: 0.9
        }, "-=0.4")
        .from(".hero-description", {
            y: 25,
            opacity: 0,
            duration: 0.7
        }, "-=0.5")
        .from(".hero-buttons .hero-btn", {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6
        }, "-=0.4")
        .from(".hero-feature", {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6
        }, "-=0.3")
        .from(".hero-image-main", {
            x: 70,
            opacity: 0,
            rotation: 8,
            duration: 1
        }, "-=1.5")
        .from(".hero-image-secondary", {
            x: -50,
            y: 40,
            opacity: 0,
            rotation: -12,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-floating-card", {
            y: 25,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6
        }, "-=0.5")
        .from(".hero-decoration", {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6
        }, "-=0.5")
        .to(".hero-bottom-line", {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.4");

    gsap.to(".hero-image-main", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-image-secondary", {
        y: 9,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-card-top", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-card-bottom", {
        y: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

gsap.registerPlugin(ScrollTrigger);

const categoriesMotion = gsap.matchMedia();

categoriesMotion.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".categories-heading > *", {
        scrollTrigger: {
            trigger: ".categories-heading",
            start: "top 85%",
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.from(".category-card", {
        scrollTrigger: {
            trigger: ".categories-grid",
            start: "top 85%",
            once: true
        },
        y: 45,
        opacity: 0,
        scale: 0.94,
        duration: 0.65,
        stagger: {
            each: 0.12,
            grid: "auto",
            from: "start"
        },
        ease: "power3.out"
    });

    document.querySelectorAll(".category-card").forEach((card) => {
        const icon = card.querySelector(".category-icon i");

        card.addEventListener("mouseenter", () => {
            gsap.to(icon, {
                y: -5,
                scale: 1.12,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(icon, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

gsap.registerPlugin(ScrollTrigger);

const productMotion = gsap.matchMedia();

productMotion.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".products-heading > *", {
        scrollTrigger: {
            trigger: ".products-heading",
            start: "top 90%",
            once: true
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.from(".products-promo", {
        scrollTrigger: {
            trigger: ".products-layout",
            start: "top 85%",
            once: true
        },
        x: -45,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: ".products-grid",
            start: "top 85%",
            once: true
        },
        y: 35,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out"
    });
});

document.querySelectorAll(".pharmacy-products a").forEach((link) => {
    link.setAttribute("href", "error.html");
});

gsap.registerPlugin(ScrollTrigger);

const featuresMotion = gsap.matchMedia();

featuresMotion.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(".features-heading > *", {
        scrollTrigger: {
            trigger: ".features-heading",
            start: "top 85%",
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.from(".feature-card", {
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
            once: true
        },
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out"
    });

    gsap.from(".features-bottom", {
        scrollTrigger: {
            trigger: ".features-bottom",
            start: "top 90%",
            once: true
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
    });

    document.querySelectorAll(".feature-card").forEach((card) => {
        const icon = card.querySelector(".feature-icon i");

        card.addEventListener("mouseenter", () => {
            gsap.to(icon, {
                rotation: 8,
                scale: 1.12,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

document.querySelectorAll(".pharmacy-features a").forEach((link) => {
    link.setAttribute("href", "error.html");
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".pharmacy-deals");

    if (!section) {
        return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (window.gsap && window.ScrollTrigger && !reducedMotion) {
        gsap.registerPlugin(ScrollTrigger);

        const animationContext = gsap.context(() => {
            gsap.from(".deals-heading > *", {
                scrollTrigger: {
                    trigger: ".deals-header",
                    start: "top 85%",
                    once: true
                },
                y: 25,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out"
            });

            gsap.from(".countdown-box", {
                scrollTrigger: {
                    trigger: ".deals-countdown",
                    start: "top 90%",
                    once: true
                },
                y: -15,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });

            gsap.from(".deal-card", {
                scrollTrigger: {
                    trigger: ".deals-grid",
                    start: "top 85%",
                    once: true
                },
                y: 35,
                opacity: 0,
                duration: 0.65,
                stagger: 0.12,
                ease: "power3.out"
            });

            gsap.from(".deals-footer", {
                scrollTrigger: {
                    trigger: ".deals-footer",
                    start: "top 95%",
                    once: true
                },
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        }, section);

        window.addEventListener("pagehide", () => {
            animationContext.revert();
        }, { once: true });
    }

    const countdownElements = {
        days: document.getElementById("dealDays"),
        hours: document.getElementById("dealHours"),
        minutes: document.getElementById("dealMinutes"),
        seconds: document.getElementById("dealSeconds")
    };

    const storageKey = "pharmacyDealsEndTime";
    const savedEndTime = Number(localStorage.getItem(storageKey));

    let endTime;

    if (savedEndTime && savedEndTime > Date.now()) {
        endTime = savedEndTime;
    } else {
        endTime = Date.now() + (2 * 24 * 60 * 60 * 1000);
        localStorage.setItem(storageKey, String(endTime));
    }

    function updateCountdown() {
        const remaining = Math.max(0, endTime - Date.now());

        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        countdownElements.days.textContent = String(days).padStart(2, "0");
        countdownElements.hours.textContent = String(hours).padStart(2, "0");
        countdownElements.minutes.textContent = String(minutes).padStart(2, "0");
        countdownElements.seconds.textContent = String(seconds).padStart(2, "0");

        if (remaining === 0) {
            section.classList.add("deals-expired");
        }
    }

    updateCountdown();

    const countdownInterval = window.setInterval(() => {
        updateCountdown();

        if (Date.now() >= endTime) {
            window.clearInterval(countdownInterval);
        }
    }, 1000);

    document.querySelectorAll(".pharmacy-deals a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    section.querySelectorAll(".deal-image-link img").forEach((img) => {
        img.addEventListener("error", () => {
            img.style.visibility = "hidden";
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".wellness-section");

    if (!section || !window.gsap) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        return;
    }

    const animations = gsap.matchMedia();

    animations.add("(min-width: 851px)", () => {
        const timeline = gsap.timeline({
            scrollTrigger: window.ScrollTrigger ? {
                trigger: section,
                start: "top 80%",
                once: true
            } : undefined,
            defaults: {
                ease: "power3.out"
            }
        });

        timeline
            .from(".wellness-badge", {
                y: 20,
                opacity: 0,
                duration: 0.6
            })
            .from(".wellness-content h2", {
                y: 35,
                opacity: 0,
                duration: 0.8
            }, "-=0.3")
            .from(".wellness-content > p", {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            .from(".wellness-feature", {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.12
            }, "-=0.3")
            .from(".wellness-button", {
                y: 15,
                opacity: 0,
                duration: 0.5
            }, "-=0.2")
            .from(".wellness-image-wrapper", {
                x: 40,
                opacity: 0,
                duration: 0.9
            }, "-=1")
            .from(".wellness-floating-card", {
                y: 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6
            }, "-=0.4");
    });

    animations.add("(max-width: 850px)", () => {
        gsap.from([
            ".wellness-badge",
            ".wellness-content h2",
            ".wellness-content > p",
            ".wellness-feature",
            ".wellness-button"
        ], {
            scrollTrigger: window.ScrollTrigger ? {
                trigger: section,
                start: "top 80%",
                once: true
            } : undefined,
            y: 20,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out"
        });

        gsap.from(".wellness-image-wrapper", {
            scrollTrigger: window.ScrollTrigger ? {
                trigger: ".wellness-visual",
                start: "top 85%",
                once: true
            } : undefined,
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(".wellness-floating-card", {
            scrollTrigger: window.ScrollTrigger ? {
                trigger: ".wellness-visual",
                start: "top 85%",
                once: true
            } : undefined,
            scale: 0.9,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".pharmacy-testimonials");

    if (!section) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (window.gsap && !reducedMotion) {
        const animations = gsap.matchMedia();

        animations.add("(min-width: 561px)", () => {
            const timeline = gsap.timeline({
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section,
                    start: "top 80%",
                    once: true
                } : undefined,
                defaults: {
                    ease: "power3.out"
                }
            });

            timeline
                .from(".testimonials-heading > *", {
                    y: 25,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.12
                })
                .from(".testimonials-summary", {
                    y: 20,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.25")
                .from(".testimonial-card", {
                    y: 35,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.15
                }, "-=0.2")
                .from(".testimonials-footer", {
                    y: 20,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.2");
        });

        animations.add("(max-width: 560px)", () => {
            gsap.from(".testimonials-heading > *", {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section,
                    start: "top 85%",
                    once: true
                } : undefined,
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12
            });

            gsap.from(".testimonials-summary, .testimonial-card, .testimonials-footer", {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: ".testimonials-grid",
                    start: "top 85%",
                    once: true
                } : undefined,
                y: 25,
                opacity: 0,
                duration: 0.6,
                stagger: 0.12
            });
        });
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".pharmacy-promises");

    if (!section) {
        return;
    }

    if (
        window.gsap &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        const animations = gsap.matchMedia();

        animations.add("(min-width: 601px)", () => {
            const timeline = gsap.timeline({
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section,
                    start: "top 80%",
                    once: true
                } : undefined,
                defaults: {
                    ease: "power3.out"
                }
            });

            timeline
                .from(section.querySelector(".promises-eyebrow"), {
                    y: 15,
                    opacity: 0,
                    duration: 0.5
                })
                .from(section.querySelector("h2"), {
                    y: 25,
                    opacity: 0,
                    duration: 0.7
                }, "-=0.2")
                .from(section.querySelector(".promises-heading > p"), {
                    y: 15,
                    opacity: 0,
                    duration: 0.5
                }, "-=0.3")
                .from(section.querySelectorAll(".promise-card"), {
                    y: 30,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.6
                }, "-=0.1")
                .from(section.querySelector(".promises-bottom"), {
                    y: 20,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.2");
        });

        animations.add("(max-width: 600px)", () => {
            gsap.from(section.querySelectorAll(".promises-heading > *"), {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section,
                    start: "top 85%",
                    once: true
                } : undefined,
                y: 20,
                opacity: 0,
                stagger: 0.12,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.from(section.querySelectorAll(".promise-card"), {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section.querySelector(".promises-grid"),
                    start: "top 85%",
                    once: true
                } : undefined,
                y: 25,
                opacity: 0,
                stagger: 0.1,
                duration: 0.55,
                ease: "power3.out"
            });

            gsap.from(section.querySelector(".promises-bottom"), {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section.querySelector(".promises-bottom"),
                    start: "top 95%",
                    once: true
                } : undefined,
                y: 15,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".pharmacy-newsletter");
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const errorMessage = document.getElementById("newsletterError");

    if (!section || !form || !emailInput || !errorMessage) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (window.gsap && !reducedMotion) {
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        const animations = gsap.matchMedia();

        animations.add("(min-width: 761px)", () => {
            const timeline = gsap.timeline({
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section,
                    start: "top 80%",
                    once: true
                } : undefined,
                defaults: {
                    ease: "power3.out"
                }
            });

            timeline
                .from(".newsletter-eyebrow", {
                    y: 15,
                    opacity: 0,
                    duration: 0.5
                })
                .from(".newsletter-content h2", {
                    y: 25,
                    opacity: 0,
                    duration: 0.7
                }, "-=0.2")
                .from(".newsletter-content > p", {
                    y: 15,
                    opacity: 0,
                    duration: 0.5
                }, "-=0.3")
                .from(".newsletter-form", {
                    y: 20,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.2")
                .from(".newsletter-visual > *", {
                    scale: 0.85,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.6
                }, "-=0.4")
                .from(".newsletter-bottom-item", {
                    y: 12,
                    opacity: 0,
                    stagger: 0.12,
                    duration: 0.5
                }, "-=0.2");
        });

        animations.add("(max-width: 760px)", () => {
            gsap.from(".newsletter-content > *", {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: section,
                    start: "top 85%",
                    once: true
                } : undefined,
                y: 20,
                opacity: 0,
                stagger: 0.12,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.from(".newsletter-visual > *", {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: ".newsletter-visual",
                    start: "top 90%",
                    once: true
                } : undefined,
                scale: 0.9,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        emailInput.setAttribute("aria-invalid", "true");
    }

    function clearError() {
        errorMessage.textContent = "";
        emailInput.removeAttribute("aria-invalid");
    }

    emailInput.addEventListener("input", clearError);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearError();

        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            showError("Please enter your email address.");
            emailInput.focus();
            return;
        }

        if (!emailPattern.test(email)) {
            showError("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        showError("Subscription is not connected yet. Please configure a newsletter service.");

        emailInput.focus();
        window.location.href = "error.html";
        refresh();
    });
});




















document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector(".pharmacy-footer");

    if (!footer) {
        return;
    }

    const yearElement = footer.querySelector("#footerYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (
        window.gsap &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        const animations = gsap.matchMedia();

        animations.add("(min-width: 651px)", () => {
            gsap.from(footer.querySelectorAll(".footer-brand, .footer-links-column, .footer-contact-column"), {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: footer,
                    start: "top 85%",
                    once: true
                } : undefined,
                y: 25,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out"
            });

            gsap.from(footer.querySelectorAll(".footer-benefit"), {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: footer.querySelector(".footer-benefits"),
                    start: "top 90%",
                    once: true
                } : undefined,
                y: 15,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        });

        animations.add("(max-width: 650px)", () => {
            gsap.from(footer.querySelectorAll(".footer-brand, .footer-links-column, .footer-contact-column"), {
                scrollTrigger: window.ScrollTrigger ? {
                    trigger: footer,
                    start: "top 90%",
                    once: true
                } : undefined,
                y: 20,
                opacity: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power3.out"
            });
        });
    }

    // footer.querySelectorAll("a").forEach((link) => {
    //     link.setAttribute("href", "error.html");
    // });
});