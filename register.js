
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");
    const submitBtn = document.getElementById("registerBtn");
    const formStatus = document.getElementById("formStatus");
    const roleMessage = document.getElementById("roleMessage");
    const roleOptions = document.querySelectorAll('input[name="role"]');

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    function showError(field, message) {
        const wrapper = field.closest(".input-wrapper");
        const error = document.getElementById(`${field.id}Error`);

        if (wrapper) {
            wrapper.classList.add("invalid");
        }

        field.setAttribute("aria-invalid", "true");

        if (error) {
            error.textContent = message;
        }
    }

    function clearError(field) {
        const wrapper = field.closest(".input-wrapper");
        const error = document.getElementById(`${field.id}Error`);

        if (wrapper) {
            wrapper.classList.remove("invalid");
        }

        field.removeAttribute("aria-invalid");

        if (error) {
            error.textContent = "";
        }
    }

    function clearTermsError() {
        document.getElementById("termsError").textContent = "";
        terms.removeAttribute("aria-invalid");
    }

    function validateName() {
        const value = fullName.value.trim();

        if (value.length < 2) {
            showError(fullName, "Please enter your full name.");
            return false;
        }

        if (!/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(value)) {
            showError(fullName, "Enter a valid name using letters.");
            return false;
        }

        clearError(fullName);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!value) {
            showError(email, "Email address is required.");
            return false;
        }

        if (value.length > 254 || !emailPattern.test(value)) {
            showError(email, "Please enter a valid email address.");
            return false;
        }

        clearError(email);
        return true;
    }

    function validatePhone() {
        const value = phone.value.trim();

        if (!/^[6-9]\d{9}$/.test(value)) {
            showError(phone, "Enter a valid 10-digit Indian mobile number.");
            return false;
        }

        clearError(phone);
        return true;
    }

    function validatePassword() {
        const value = password.value;

        if (value.length < 8) {
            showError(password, "Password must contain at least 8 characters.");
            return false;
        }

        if (
            !/[A-Z]/.test(value) ||
            !/[a-z]/.test(value) ||
            !/\d/.test(value) ||
            !/[^A-Za-z0-9]/.test(value)
        ) {
            showError(
                password,
                "Include uppercase, lowercase, a number and a special character."
            );
            return false;
        }

        clearError(password);
        return true;
    }

    function validateConfirmPassword() {
        if (!confirmPassword.value) {
            showError(confirmPassword, "Please confirm your password.");
            return false;
        }

        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "Passwords do not match.");
            return false;
        }

        clearError(confirmPassword);
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            terms.setAttribute("aria-invalid", "true");
            document.getElementById("termsError").textContent =
                "Please accept the Terms of Service and Privacy Policy.";
            return false;
        }

        clearTermsError();
        return true;
    }

    function updateRoleSelection() {
        roleOptions.forEach(option => {
            const card = option.closest(".role-option");
            card.classList.toggle("selected", option.checked);
        });

        const selectedRole = document.querySelector(
            'input[name="role"]:checked'
        ).value;

        roleMessage.innerHTML = selectedRole === "admin"
            ? '<i class="bi bi-info-circle"></i><span>Admin registration selected. Administrator access must be authorized by the server.</span>'
            : '<i class="bi bi-info-circle"></i><span>User registration selected.</span>';
    }

    document.querySelectorAll(".password-toggle").forEach(button => {
        button.addEventListener("click", () => {
            const target = document.getElementById(button.dataset.target);
            const showing = target.type === "text";

            target.type = showing ? "password" : "text";
            button.setAttribute("aria-pressed", String(!showing));
            button.setAttribute(
                "aria-label",
                showing ? "Show password" : "Hide password"
            );

            button.innerHTML = showing
                ? '<i class="bi bi-eye"></i>'
                : '<i class="bi bi-eye-slash"></i>';
        });
    });

    roleOptions.forEach(option => {
        option.addEventListener("change", updateRoleSelection);
    });

    fullName.addEventListener("input", validateName);
    fullName.addEventListener("blur", validateName);

    email.addEventListener("input", validateEmail);
    email.addEventListener("blur", validateEmail);

    phone.addEventListener("input", () => {
        phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
        validatePhone();
    });

    phone.addEventListener("blur", validatePhone);

    password.addEventListener("input", () => {
        validatePassword();

        if (confirmPassword.value) {
            validateConfirmPassword();
        }
    });

    password.addEventListener("blur", validatePassword);

    confirmPassword.addEventListener("input", validateConfirmPassword);
    confirmPassword.addEventListener("blur", validateConfirmPassword);

    terms.addEventListener("change", validateTerms);

    form.addEventListener("submit", event => {
        event.preventDefault();
        formStatus.textContent = "";

        const checks = [
            validateName(),
            validateEmail(),
            validatePhone(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms()
        ];

        if (checks.some(isValid => !isValid)) {
            const firstInvalid = form.querySelector(
                '[aria-invalid="true"]'
            );

            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            formStatus.textContent = "Please correct the highlighted fields.";
            return;
        }

        const selectedRole = document.querySelector(
            'input[name="role"]:checked'
        ).value;
      
          window.location.href = "login.html";
        formStatus.textContent =
            `Validation successful for ${selectedRole} registration. Connect this form to your registration API to create the account.`;
    });

    updateRoleSelection();
});
