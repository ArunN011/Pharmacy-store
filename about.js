document.addEventListener("DOMContentLoaded", function () {
    const aboutHero = document.querySelector("#about-hero");

    if (!aboutHero) {
        return;
    }

    aboutHero.querySelectorAll("a").forEach(function (link) {
        link.setAttribute("href", "error.html");
    });

    const counters = aboutHero.querySelectorAll(".about-counter");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animateCounters() {
        counters.forEach(function (counter) {
            const target = Number(counter.dataset.count) || 0;

            if (reduceMotion) {
                counter.textContent = target.toLocaleString("en-IN");
                return;
            }

            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(target * easedProgress);

                counter.textContent = currentValue.toLocaleString("en-IN");

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString("en-IN");
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.35
        });

        const stats = aboutHero.querySelector(".about-hero-stats");

        if (stats) {
            counterObserver.observe(stats);
        }
    } else {
        animateCounters();
    }

    if (typeof gsap !== "undefined" && !reduceMotion) {
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const contentItems = aboutHero.querySelectorAll(
            ".about-hero-breadcrumb, .about-hero-label, .about-hero-content h1, .about-hero-description, .about-hero-actions, .about-hero-stats"
        );

        gsap.from(contentItems, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.13,
            ease: "power3.out",
            delay: 0.15
        });

        gsap.from(".about-hero-visual", {
            x: 45,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.3
        });

        gsap.from(".about-floating-card", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "back.out(1.5)",
            delay: 0.8
        });

        gsap.from(".about-bottom-item", {
            y: 15,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about-hero-bottom",
                start: "top 90%"
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const storySection = document.querySelector("#about-story");

    if (!storySection) {
        return;
    }

    storySection.querySelectorAll("a").forEach(function (link) {
        link.setAttribute("href", "error.html");
    });

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typeof gsap === "undefined" || reduceMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const visual = storySection.querySelector(".about-story-visual");
    const content = storySection.querySelector(".about-story-content");
    const valueItems = storySection.querySelectorAll(".story-value-item");

    gsap.from(visual, {
        x: -45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: storySection,
            start: "top 78%",
            once: true
        }
    });

    gsap.from(content.children, {
        y: 25,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: content,
            start: "top 78%",
            once: true
        }
    });

    gsap.from(valueItems, {
        x: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: storySection.querySelector(".story-values"),
            start: "top 85%",
            once: true
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector("#mission-vision");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach(function (link) {
        link.setAttribute("href", "error.html");
    });

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from(section.querySelector(".mv-heading").children, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });

    gsap.from(section.querySelectorAll(".mv-card"), {
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section.querySelector(".mv-grid"),
            start: "top 82%",
            once: true
        }
    });

    gsap.from(section.querySelector(".mv-bottom-note"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section.querySelector(".mv-bottom-note"),
            start: "top 90%",
            once: true
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector("#about-values");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach(function (link) {
        link.setAttribute("href", "error.html");
    });

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typeof gsap === "undefined" || prefersReducedMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const headingItems = section.querySelector(".values-heading").children;
    const cards = section.querySelectorAll(".value-card");
    const bottomNote = section.querySelector(".values-bottom");

    gsap.from(headingItems, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });

    gsap.from(cards, {
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section.querySelector(".values-grid"),
            start: "top 85%",
            once: true
        }
    });

    gsap.from(bottomNote, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: bottomNote,
            start: "top 90%",
            once: true
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const section = document.getElementById("about-team");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach(function (link) {
        link.setAttribute("href", "error.html");
    });

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typeof gsap === "undefined" || prefersReducedMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from(section.querySelector(".team-heading").children, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
        }
    });

    gsap.from(section.querySelectorAll(".team-card"), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section.querySelector(".team-grid"),
            start: "top 85%",
            once: true
        }
    });

    gsap.from(section.querySelector(".team-bottom"), {
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section.querySelector(".team-bottom"),
            start: "top 90%",
            once: true
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#why-choose");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    if (typeof gsap === "undefined") {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from(".why-choose-heading > *", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? {
                trigger: ".why-choose-heading",
                start: "top 85%",
                once: true
            }
            : undefined
    });

    gsap.from(".why-choose-visual", {
        x: -45,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? {
                trigger: ".why-choose-content",
                start: "top 80%",
                once: true
            }
            : undefined
    });

    gsap.from(".feature-card", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? {
                trigger: ".why-choose-features",
                start: "top 82%",
                once: true
            }
            : undefined
    });

    gsap.from(".why-choose-bottom", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? {
                trigger: ".why-choose-bottom",
                start: "top 90%",
                once: true
            }
            : undefined
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#testimonials");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

    if (hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    const createScrollTrigger = (element, start = "top 85%") => {
        if (!hasScrollTrigger) {
            return {};
        }

        return {
            scrollTrigger: {
                trigger: element,
                start,
                once: true
            }
        };
    };

    gsap.from(section.querySelectorAll(".testimonials-heading > *"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        ...createScrollTrigger(
            section.querySelector(".testimonials-heading")
        )
    });

    gsap.from(section.querySelector(".testimonials-summary"), {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        ...createScrollTrigger(
            section.querySelector(".testimonials-summary")
        )
    });

    gsap.from(section.querySelectorAll(".testimonial-card"), {
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "transform",
        ...createScrollTrigger(
            section.querySelector(".testimonials-grid"),
            "top 82%"
        )
    });

    gsap.from(section.querySelector(".testimonials-bottom"), {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        ...createScrollTrigger(
            section.querySelector(".testimonials-bottom"),
            "top 90%"
        )
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

  
});