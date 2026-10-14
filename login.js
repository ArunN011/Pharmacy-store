document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const passwordToggle = document.getElementById("passwordToggle");
    const roleButtons = document.querySelectorAll(".role-option");
    const roleMessage = document.querySelector("#selectedRoleMessage span");
    const errorMessage = document.getElementById("loginErrorMessage");
    const submitButton = document.getElementById("loginSubmit");
    const rememberMe = document.getElementById("rememberMe");
    const currentYear = document.getElementById("currentYear");

    if (
        !form ||
        !emailInput ||
        !passwordInput ||
        !passwordToggle ||
        !submitButton
    ) {
        return;
    }

    const submitText = submitButton.querySelector("span");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let selectedRole = "user";
    let isSubmitting = false;

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const resetButton = () => {
        isSubmitting = false;
        submitButton.disabled = false;

        if (submitText) {
            submitText.textContent = "Sign In";
        }
    };

    window.addEventListener("pageshow", () => {
        resetButton();
    });

    const showFormError = (message) => {
        if (!errorMessage) return;

        errorMessage.textContent = message;
        errorMessage.classList.add("visible");

        if (
            typeof gsap !== "undefined" &&
            !prefersReducedMotion
        ) {
            gsap.killTweensOf(errorMessage);

            gsap.fromTo(
                errorMessage,
                {
                    opacity: 0,
                    y: -8
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );
        }
    };

    const clearFormError = () => {
        if (!errorMessage) return;

        errorMessage.classList.remove("visible");
        errorMessage.textContent = "";
    };

    const getFieldError = (input) => {
        const group = input.closest(".form-group");

        return group
            ? group.querySelector(".field-error")
            : null;
    };

    const setFieldError = (input, message) => {
        const group = input.closest(".form-group");
        const error = getFieldError(input);

        if (!group || !error) return;

        group.classList.add("is-invalid");
        error.textContent = message;
        input.setAttribute("aria-invalid", "true");

        if (
            typeof gsap !== "undefined" &&
            !prefersReducedMotion
        ) {
            gsap.killTweensOf(group);

            gsap.fromTo(
                group,
                {
                    x: -5
                },
                {
                    x: 0,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.4)",
                    clearProps: "x"
                }
            );

            gsap.fromTo(
                error,
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

    const clearFieldError = (input) => {
        const group = input.closest(".form-group");
        const error = getFieldError(input);

        if (!group || !error) return;

        group.classList.remove("is-invalid");
        error.textContent = "";
        input.removeAttribute("aria-invalid");
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();

        if (!email) {
            setFieldError(
                emailInput,
                "Please enter your email address."
            );

            return false;
        }

        if (email.length > 254) {
            setFieldError(
                emailInput,
                "Email address is too long."
            );

            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(email)) {
            setFieldError(
                emailInput,
                "Please enter a valid email address."
            );

            return false;
        }

        clearFieldError(emailInput);
        return true;
    };

    const validatePassword = () => {
        const password = passwordInput.value;

        if (!password) {
            setFieldError(
                passwordInput,
                "Please enter your password."
            );

            return false;
        }

        if (password.length < 8) {
            setFieldError(
                passwordInput,
                "Password must contain at least 8 characters."
            );

            return false;
        }

        clearFieldError(passwordInput);
        return true;
    };

    const validateForm = () => {
        const emailValid = validateEmail();
        const passwordValid = validatePassword();

        if (!emailValid || !passwordValid) {
            const firstInvalidField = !emailValid
                ? emailInput
                : passwordInput;

            firstInvalidField.focus({
                preventScroll: true
            });

            firstInvalidField.scrollIntoView({
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth",
                block: "center"
            });

            return false;
        }

        if (!["user", "admin"].includes(selectedRole)) {
            showFormError("Please select a valid account role.");
            return false;
        }

        return true;
    };

    roleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (isSubmitting) return;

            selectedRole = button.dataset.role;

            roleButtons.forEach((roleButton) => {
                const isActive = roleButton === button;

                roleButton.classList.toggle(
                    "active",
                    isActive
                );

                roleButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            if (roleMessage) {
                roleMessage.textContent =
                    selectedRole === "admin"
                        ? "Administrator login selected"
                        : "User login selected";
            }

            clearFormError();

            if (
                typeof gsap !== "undefined" &&
                !prefersReducedMotion
            ) {
                gsap.fromTo(
                    button,
                    {
                        scale: 0.97
                    },
                    {
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(2)"
                    }
                );
            }
        });
    });

    passwordToggle.addEventListener("click", () => {
        const showPassword =
            passwordInput.type === "password";

        passwordInput.type = showPassword
            ? "text"
            : "password";

        passwordToggle.innerHTML = showPassword
            ? '<i class="bi bi-eye-slash"></i>'
            : '<i class="bi bi-eye"></i>';

        passwordToggle.setAttribute(
            "aria-label",
            showPassword
                ? "Hide password"
                : "Show password"
        );

        passwordToggle.setAttribute(
            "aria-pressed",
            String(showPassword)
        );

        passwordInput.focus();
    });

    emailInput.addEventListener("input", () => {
        clearFormError();

        if (
            emailInput.closest(".form-group")
                ?.classList.contains("is-invalid")
        ) {
            validateEmail();
        }
    });

    passwordInput.addEventListener("input", () => {
        clearFormError();

        if (
            passwordInput.closest(".form-group")
                ?.classList.contains("is-invalid")
        ) {
            validatePassword();
        }
    });

    emailInput.addEventListener("blur", validateEmail);
    passwordInput.addEventListener("blur", validatePassword);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        clearFormError();

        if (!validateForm()) {
            resetButton();
            return;
        }

        const email = emailInput.value
            .trim()
            .toLowerCase();

        const destination =
            selectedRole === "admin"
                ? "admin-dashboard.html"
                : "user-dashboard.html";

        try {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", selectedRole);
            localStorage.setItem(
                "stacklyUsername",
                email.split("@")[0]
            );

            if (rememberMe && rememberMe.checked) {
                localStorage.setItem(
                    "rememberMe",
                    "true"
                );
            } else {
                localStorage.removeItem("rememberMe");
            }
        } catch (error) {
            resetButton();

            showFormError(
                "Unable to save account information. Please enable browser storage and try again."
            );

            return;
        }

        isSubmitting = true;
        submitButton.disabled = true;

        if (submitText) {
            submitText.textContent = "Signing In...";
        }

        if (
            typeof gsap !== "undefined" &&
            !prefersReducedMotion
        ) {
            gsap.to(submitButton, {
                scale: 0.98,
                duration: 0.15,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    window.location.assign(destination);
                }
            });
        } else {
            window.location.assign(destination);
        }
    });

    if (
        typeof gsap !== "undefined" &&
        !prefersReducedMotion
    ) {
        const loginCard = document.querySelector(".login-card");
        const showcaseItems = document.querySelectorAll(
            ".login-showcase > *"
        );

        if (loginCard) {
            gsap.from(loginCard, {
                y: 22,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out"
            });
        }

        if (showcaseItems.length) {
            gsap.from(showcaseItems, {
                x: -18,
                opacity: 0,
                stagger: 0.12,
                duration: 0.6,
                ease: "power2.out"
            });
        }
    }
});