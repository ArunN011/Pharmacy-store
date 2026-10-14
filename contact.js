document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector("#contactHero");

    if (!hero) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        const timeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        timeline
            .from(".contact-breadcrumb", {
                y: 15,
                opacity: 0,
                duration: 0.5
            })
            .from(".contact-hero-badge", {
                y: 18,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(".contact-hero-content h1", {
                y: 35,
                opacity: 0,
                duration: 0.8
            }, "-=0.2")
            .from(".contact-hero-description", {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, "-=0.45")
            .from(".contact-hero-actions > *", {
                y: 15,
                opacity: 0,
                stagger: 0.15,
                duration: 0.5
            }, "-=0.35")
            .from(".contact-hero-trust", {
                y: 15,
                opacity: 0,
                duration: 0.5
            }, "-=0.25")
            .from(".contact-hero-visual", {
                x: 35,
                opacity: 0,
                duration: 0.9
            }, "-=1")
            .from(".contact-floating-card", {
                y: 20,
                opacity: 0,
                stagger: 0.2,
                duration: 0.6
            }, "-=0.4")
            .from(".contact-bottom-item", {
                y: 12,
                opacity: 0,
                stagger: 0.12,
                duration: 0.4
            }, "-=0.2");

        gsap.to(".contact-decoration-one", {
            rotation: 360,
            duration: 25,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".contact-decoration-two", {
            y: -12,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".contact-support-card", {
            y: -8,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".contact-care-card", {
            y: 8,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    hero.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();
                window.location.href = "error.html";
                return;
            }

            if (href.startsWith("#")) {
                const target = document.querySelector(href);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? "auto" : "smooth",
                        block: "start"
                    });
                } else {
                    event.preventDefault();
                    window.location.href = "error.html";
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("stacklyContactForm");

    if (!form) return;

    const submitButton = document.getElementById("contactSubmit");
    const messageField = document.getElementById("contactMessage");
    const characterCount = document.getElementById("contactCharCount");
    const privacyCheckbox = document.getElementById("contactPrivacy");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let isSubmitting = false;

    const getGroup = (field) => field.closest(".stackly-form-group");

    const getErrorElement = (field) => {
        const group = getGroup(field);

        if (!group) return null;

        if (field === privacyCheckbox) {
            return group.querySelector(".stackly-checkbox-error");
        }

        return group.querySelector(".stackly-error");
    };

    const setError = (field, message, animate = true) => {
        const group = getGroup(field);
        const errorElement = getErrorElement(field);

        if (!group || !errorElement) return;

        group.classList.remove("is-valid");
        group.classList.add("is-invalid");

        field.setAttribute("aria-invalid", "true");
        errorElement.textContent = message;

        if (animate && !prefersReducedMotion && typeof gsap !== "undefined") {
            gsap.killTweensOf(group);

            gsap.fromTo(
                group,
                {
                    x: -5
                },
                {
                    x: 0,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.45)",
                    clearProps: "x"
                }
            );

            gsap.fromTo(
                errorElement,
                {
                    opacity: 0,
                    y: -5
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.25,
                    ease: "power2.out"
                }
            );
        }
    };

    const clearError = (field) => {
        const group = getGroup(field);
        const errorElement = getErrorElement(field);

        if (!group || !errorElement) return;

        group.classList.remove("is-invalid");
        field.removeAttribute("aria-invalid");
        errorElement.textContent = "";

        if (field === privacyCheckbox) {
            group.classList.toggle("is-valid", field.checked);
            return;
        }

        if (field.value.trim() !== "") {
            group.classList.add("is-valid");
        } else {
            group.classList.remove("is-valid");
        }
    };

    const validateName = (value) => {
        const name = value.trim();

        if (!name) return "Please enter your full name.";

        if (name.length < 3) {
            return "Name must contain at least 3 characters.";
        }

        if (name.length > 100) {
            return "Name must not exceed 100 characters.";
        }

        if (!/^[\p{L}][\p{L}\p{M}\s.'-]*$/u.test(name)) {
            return "Enter a valid name using letters and spaces.";
        }

        if (!/[\p{L}]/u.test(name)) {
            return "Name must contain letters.";
        }

        return "";
    };

    const validateEmail = (value) => {
        const email = value.trim();

        if (!email) return "Please enter your email address.";

        if (email.length > 254) {
            return "Email address is too long.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            return "Please enter a valid email address.";
        }

        return "";
    };

    const validatePhone = (value) => {
        const phone = value.trim();

        if (!phone) return "Please enter your phone number.";

        if (!/^\+?[0-9\s().-]+$/.test(phone)) {
            return "Enter a valid phone number.";
        }

        const digits = phone.replace(/\D/g, "");

        if (digits.length < 7 || digits.length > 15) {
            return "Phone number must contain 7 to 15 digits.";
        }

        return "";
    };

    const validateSubject = (value) => {
        if (!value.trim()) return "Please select a subject.";
        return "";
    };

    const validateMessage = (value) => {
        const message = value.trim();

        if (!message) return "Please enter your message.";

        if (message.length < 10) {
            return "Message must contain at least 10 characters.";
        }

        if (message.length > 1000) {
            return "Message must not exceed 1000 characters.";
        }

        if (!/[\p{L}\p{N}]/u.test(message)) {
            return "Please enter a meaningful message.";
        }

        return "";
    };

    const validatePrivacy = () => {
        if (!privacyCheckbox.checked) {
            return "Please agree to the privacy policy.";
        }

        return "";
    };

    const validators = [
        {
            field: document.getElementById("contactName"),
            validate: validateName
        },
        {
            field: document.getElementById("contactEmail"),
            validate: validateEmail
        },
        {
            field: document.getElementById("contactPhone"),
            validate: validatePhone
        },
        {
            field: document.getElementById("contactSubject"),
            validate: validateSubject
        },
        {
            field: messageField,
            validate: validateMessage
        },
        {
            field: privacyCheckbox,
            validate: validatePrivacy
        }
    ];

    const validateField = (field, validator, animate = true) => {
        const error = validator(field.value);

        if (error) {
            setError(field, error, animate);
            return false;
        }

        clearError(field);
        return true;
    };

    const updateCharacterCount = () => {
        characterCount.textContent = `${messageField.value.length} / 1000`;
    };

    validators.forEach(({ field, validate }) => {
        field.addEventListener("blur", () => {
            validateField(field, validate, true);
        });

        field.addEventListener("input", () => {
            if (getGroup(field).classList.contains("is-invalid")) {
                validateField(field, validate, false);
            }
        });

        field.addEventListener("change", () => {
            if (getGroup(field).classList.contains("is-invalid")) {
                validateField(field, validate, false);
            }
        });
    });

    messageField.addEventListener("input", updateCharacterCount);

    privacyCheckbox.addEventListener("change", () => {
        validateField(privacyCheckbox, validatePrivacy, true);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        let firstInvalidField = null;

        validators.forEach(({ field, validate }) => {
            const isValid = validateField(field, validate, true);

            if (!isValid && !firstInvalidField) {
                firstInvalidField = field;
            }
        });

        if (firstInvalidField) {
            firstInvalidField.focus({
                preventScroll: true
            });

            firstInvalidField.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "center"
            });

            return;
        }

        isSubmitting = true;
        submitButton.disabled = true;

        const buttonText = submitButton.querySelector("span");
        const originalText = buttonText.textContent;

        buttonText.textContent = "Submitting...";

        if (typeof gsap !== "undefined" && !prefersReducedMotion) {
            gsap.to(submitButton, {
                scale: 0.98,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                onComplete: () => {
                    window.location.href = "error.html";
                }
            });
        } else {
            window.location.href = "error.html";
        }

        window.setTimeout(() => {
            if (window.location.pathname.endsWith("error.html")) return;

            isSubmitting = false;
            submitButton.disabled = false;
            buttonText.textContent = originalText;
        }, 1500);
    });

    updateCharacterCount();
});

document.addEventListener("DOMContentLoaded", () => {
    const faqSection = document.querySelector("#contactFaq");

    if (!faqSection) return;

    const faqItems = Array.from(
        faqSection.querySelectorAll(".stackly-faq-item")
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const animateOpen = (item, answer) => {
        if (
            prefersReducedMotion ||
            typeof gsap === "undefined"
        ) {
            answer.hidden = false;
            return;
        }

        answer.hidden = false;

        const content = answer.firstElementChild;

        gsap.killTweensOf([answer, content]);

        gsap.fromTo(
            content,
            {
                height: 0,
                opacity: 0
            },
            {
                height: "auto",
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
                clearProps: "height"
            }
        );
    };

    const closeItem = (item) => {
        const button = item.querySelector(".stackly-faq-question");
        const answer = item.querySelector(".stackly-faq-answer");

        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");

        if (
            !prefersReducedMotion &&
            typeof gsap !== "undefined" &&
            !answer.hidden
        ) {
            const content = answer.firstElementChild;

            gsap.killTweensOf([answer, content]);

            gsap.to(content, {
                height: 0,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    answer.hidden = true;
                    gsap.set(content, {
                        clearProps: "height,opacity"
                    });
                }
            });
        } else {
            answer.hidden = true;
        }
    };

    const openItem = (item) => {
        const button = item.querySelector(".stackly-faq-question");
        const answer = item.querySelector(".stackly-faq-answer");

        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");

        animateOpen(item, answer);
    };

    faqItems.forEach((item) => {
        const button = item.querySelector(".stackly-faq-question");
        const answer = item.querySelector(".stackly-faq-answer");

        if (button.getAttribute("aria-expanded") === "true") {
            item.classList.add("active");
            answer.hidden = false;
        } else {
            item.classList.remove("active");
            answer.hidden = true;
        }

        button.addEventListener("click", () => {
            const isOpen = button.getAttribute("aria-expanded") === "true";

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    closeItem(otherItem);
                }
            });

            if (isOpen) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });

        button.addEventListener("keydown", (event) => {
            const currentIndex = faqItems.indexOf(item);
            let nextIndex = currentIndex;

            if (event.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % faqItems.length;
            } else if (event.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + faqItems.length) % faqItems.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = faqItems.length - 1;
            } else {
                return;
            }

            event.preventDefault();

            faqItems[nextIndex]
                .querySelector(".stackly-faq-question")
                .focus();
        });
    });

    faqSection.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    if (
        typeof gsap !== "undefined" &&
        !prefersReducedMotion
    ) {
        gsap.from(faqSection.querySelector(".stackly-faq-heading"), {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: typeof ScrollTrigger !== "undefined"
                ? undefined
                : undefined
        });

        gsap.from(faqItems, {
            y: 18,
            opacity: 0,
            stagger: 0.09,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.1
        });

        gsap.from(faqSection.querySelector(".stackly-faq-sidebar"), {
            x: -25,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out"
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