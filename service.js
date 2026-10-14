document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#service-hero");

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

    const content = section.querySelector(".service-hero-content");
    const visual = section.querySelector(".service-hero-visual");

    const introTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    introTimeline
        .from(section.querySelector(".service-hero-breadcrumb"), {
            y: 15,
            opacity: 0,
            duration: 0.5
        })
        .from(section.querySelector(".service-hero-label"), {
            y: 20,
            opacity: 0,
            duration: 0.5
        }, "-=0.2")
        .from(content.querySelector("h1"), {
            y: 35,
            opacity: 0,
            duration: 0.8
        }, "-=0.2")
        .from(section.querySelector(".service-hero-description"), {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.4")
        .from(section.querySelectorAll(".service-hero-actions > *"), {
            y: 15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12
        }, "-=0.3")
        .from(section.querySelectorAll(".service-highlight-item"), {
            y: 15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15
        }, "-=0.2")
        .from(visual, {
            x: 35,
            opacity: 0,
            duration: 0.9
        }, "-=1");

    gsap.from(section.querySelectorAll(".service-floating-card"), {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        delay: 0.6,
        ease: "power3.out"
    });

    if (hasScrollTrigger) {
        gsap.from(section.querySelector(".service-hero-bottom"), {
            y: 15,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section.querySelector(".service-hero-bottom"),
                start: "top 95%",
                once: true
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#service-list");

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

    const makeScrollConfig = (element, start = "top 85%") => {
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

    const heading = section.querySelector(".service-list-heading");
    const grid = section.querySelector(".service-list-grid");
    const bottom = section.querySelector(".service-list-bottom");

    gsap.from(heading.querySelectorAll("*"), {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        ...makeScrollConfig(heading)
    });

    gsap.from(grid.querySelectorAll(".service-list-card"), {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.13,
        ease: "power3.out",
        clearProps: "transform",
        ...makeScrollConfig(grid, "top 82%")
    });

    gsap.from(bottom, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        ...makeScrollConfig(bottom, "top 90%")
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#service-process");

    if (!section) {
        return;
    }

    const links = section.querySelectorAll("a");
    const heading = section.querySelector(".process-heading");
    const cards = section.querySelectorAll(".process-card");
    const bottom = section.querySelector(".process-bottom");
    const progress = section.querySelector(".process-timeline-progress");

    links.forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    if (typeof gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

    gsap.from(heading, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        })
    });

    gsap.from(cards, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: ".process-grid",
                start: "top 85%",
                once: true
            }
        })
    });

    if (progress) {
        gsap.to(progress, {
            scaleX: 1,
            duration: 1.3,
            ease: "power2.inOut",
            ...(hasScrollTrigger && {
                scrollTrigger: {
                    trigger: ".process-grid",
                    start: "top 80%",
                    once: true
                }
            })
        });
    }

    gsap.from(bottom, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: bottom,
                start: "top 90%",
                once: true
            }
        })
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#service-benefits");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    const heading = section.querySelector(".benefits-heading");
    const cards = section.querySelectorAll(".benefit-card");
    const bottom = section.querySelector(".benefits-bottom");

    if (typeof gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

    gsap.from(heading, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        })
    });

    gsap.from(cards, {
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: section.querySelector(".benefits-grid"),
                start: "top 85%",
                once: true
            }
        })
    });

    gsap.from(bottom, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: bottom,
                start: "top 90%",
                once: true
            }
        })
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#service-testimonials");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    if (typeof gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const hasScrollTrigger = typeof ScrollTrigger !== "undefined";
    const heading = section.querySelector(".testimonials-heading");
    const cards = section.querySelectorAll(".testimonial-card");
    const bottom = section.querySelector(".testimonials-bottom");

    gsap.from(heading, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                once: true
            }
        })
    });

    gsap.from(cards, {
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        clearProps: "opacity",
        ease: "power2.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: section.querySelector(".testimonials-grid"),
                start: "top 85%",
                once: true
            }
        })
    });

    gsap.from(bottom, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        ...(hasScrollTrigger && {
            scrollTrigger: {
                trigger: bottom,
                start: "top 90%",
                once: true
            }
        })
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#service-faq");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    const items = section.querySelectorAll(".faq-item");
    const questions = section.querySelectorAll(".faq-question");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function closeItem(item) {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) {
            return;
        }

        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");

        if (typeof gsap !== "undefined" && !reduceMotion) {
            gsap.killTweensOf(answer);

            answer.hidden = false;

            gsap.to(answer, {
                height: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    answer.hidden = true;
                    answer.style.height = "";
                }
            });
        } else {
            answer.hidden = true;
            answer.style.height = "";
        }
    }

    function openItem(item) {
        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!button || !answer) {
            return;
        }

        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        answer.hidden = false;

        if (typeof gsap !== "undefined" && !reduceMotion) {
            gsap.killTweensOf(answer);

            gsap.set(answer, {
                height: 0,
                overflow: "hidden"
            });

            gsap.to(answer, {
                height: answer.scrollHeight,
                duration: 0.35,
                ease: "power2.out",
                onComplete: () => {
                    answer.style.height = "auto";
                    answer.style.overflow = "";
                }
            });
        } else {
            answer.style.height = "auto";
            answer.style.overflow = "";
        }
    }

    questions.forEach((button) => {
        button.addEventListener("click", () => {
            const currentItem = button.closest(".faq-item");

            if (!currentItem) {
                return;
            }

            const isOpen = currentItem.classList.contains("active");

            items.forEach((item) => {
                if (item !== currentItem && item.classList.contains("active")) {
                    closeItem(item);
                }
            });

            if (isOpen) {
                closeItem(currentItem);
            } else {
                openItem(currentItem);
            }
        });
    });

    if (typeof gsap !== "undefined" && !reduceMotion) {
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const heading = section.querySelector(".faq-intro");
        const accordion = section.querySelector(".faq-accordion");
        const banner = section.querySelector(".faq-bottom-banner");

        const hasScrollTrigger = typeof ScrollTrigger !== "undefined";

        gsap.from(heading, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            ...(hasScrollTrigger && {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    once: true
                }
            })
        });

        gsap.from(accordion, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            ...(hasScrollTrigger && {
                scrollTrigger: {
                    trigger: accordion,
                    start: "top 85%",
                    once: true
                }
            })
        });

        gsap.from(banner, {
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            ...(hasScrollTrigger && {
                scrollTrigger: {
                    trigger: banner,
                    start: "top 90%",
                    once: true
                }
            })
        });
    }
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