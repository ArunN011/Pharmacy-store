document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("blogHero");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach(link => {
        link.setAttribute("href", "error.html");
    });

    if (
        typeof gsap === "undefined" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    const content = section.querySelector(".blog-hero-content");
    const visual = section.querySelector(".blog-hero-visual");
    const topicItems = section.querySelectorAll(".blog-topic-item");
    const floatingCards = section.querySelectorAll(".blog-floating-card");

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    timeline
        .from(content, {
            x: -35,
            opacity: 0,
            duration: 0.85
        })
        .from(visual, {
            x: 35,
            opacity: 0,
            duration: 0.85
        }, "-=0.55")
        .from(topicItems, {
            y: 22,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1
        }, "-=0.35");

    gsap.from(floatingCards, {
        y: 15,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        delay: 0.65,
        ease: "power2.out"
    });

    gsap.to(".blog-decoration-one", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none"
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("blogCards");

    if (!section) {
        return;
    }

    const filterButtons = section.querySelectorAll(".blog-filter");
    const cards = Array.from(section.querySelectorAll(".blog-card"));
    const emptyState = section.querySelector(".blog-empty-state");

    section.querySelectorAll("a").forEach(link => {
        link.setAttribute("href", "error.html");
    });

    function filterArticles(category) {
        let visibleCount = 0;

        cards.forEach(card => {
            const matches = category === "All" || card.dataset.category === category;

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        emptyState.hidden = visibleCount !== 0;

        if (
            typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            const visibleCards = cards.filter(card => !card.hidden);

            gsap.fromTo(
                visibleCards,
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: "power2.out",
                    clearProps: "transform"
                }
            );
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            filterArticles(button.dataset.category);
        });

        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );
    });

    if (
        typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        gsap.from(section.querySelector(".blog-section-heading"), {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power2.out"
        });

        gsap.from(section.querySelectorAll(".blog-card"), {
            opacity: 0,
            y: 25,
            duration: 0.65,
            stagger: 0.1,
            delay: 0.15,
            ease: "power2.out"
        });

        gsap.from(section.querySelector(".blog-bottom-cta"), {
            opacity: 0,
            y: 20,
            duration: 0.7,
            delay: 0.35,
            ease: "power2.out"
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("blogFaq");

    if (!section) {
        return;
    }

    const faqItems = Array.from(section.querySelectorAll(".faq-item"));
    const questions = section.querySelectorAll(".faq-question");

    section.querySelectorAll("a").forEach(link => {
        link.setAttribute("href", "error.html");
    });

    function closeItem(item) {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.setAttribute("aria-expanded", "false");
        item.classList.remove("active");

        if (typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
            !answer.hidden) {

            gsap.to(answer, {
                height: 0,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    answer.hidden = true;
                    answer.style.removeProperty("height");
                    answer.style.removeProperty("opacity");
                }
            });
        } else {
            answer.hidden = true;
            answer.style.removeProperty("height");
            answer.style.removeProperty("opacity");
        }
    }

    function openItem(item) {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.setAttribute("aria-expanded", "true");
        item.classList.add("active");
        answer.hidden = false;

        if (typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

            gsap.fromTo(
                answer,
                {
                    height: 0,
                    opacity: 0
                },
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.35,
                    ease: "power2.out",
                    clearProps: "height,opacity"
                }
            );
        }
    }

    questions.forEach(question => {
        question.addEventListener("click", () => {
            const currentItem = question.closest(".faq-item");
            const isOpen = question.getAttribute("aria-expanded") === "true";

            faqItems.forEach(item => {
                if (item !== currentItem) {
                    closeItem(item);
                }
            });

            if (isOpen) {
                closeItem(currentItem);
            } else {
                openItem(currentItem);
            }
        });

        question.addEventListener("keydown", event => {
            const index = Array.from(questions).indexOf(question);

            if (event.key === "ArrowDown") {
                event.preventDefault();
                questions[(index + 1) % questions.length].focus();
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                questions[(index - 1 + questions.length) % questions.length].focus();
            }

            if (event.key === "Home") {
                event.preventDefault();
                questions[0].focus();
            }

            if (event.key === "End") {
                event.preventDefault();
                questions[questions.length - 1].focus();
            }
        });
    });

    if (typeof gsap !== "undefined" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        gsap.from(section.querySelector(".faq-header"), {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power2.out"
        });

        gsap.from(section.querySelector(".faq-sidebar"), {
            opacity: 0,
            x: -25,
            duration: 0.7,
            delay: 0.15,
            ease: "power2.out"
        });

        gsap.from(faqItems, {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.from(section.querySelector(".faq-bottom-banner"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out"
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