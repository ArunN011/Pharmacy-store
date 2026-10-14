document.addEventListener("DOMContentLoaded", () => {
    const savedEmail =
        localStorage.getItem("userEmail") ||
        localStorage.getItem("stacklyUserEmail") ||
        "";

    const savedRole = (
        localStorage.getItem("userRole") ||
        localStorage.getItem("stacklyUserRole") ||
        ""
    ).trim().toLowerCase();

    const isLoggedIn =
        localStorage.getItem("stacklyLoggedIn") === "true" ||
        localStorage.getItem("isLoggedIn") === "true" ||
        Boolean(savedEmail && savedRole);

    if (!savedEmail || !savedRole || !isLoggedIn) {
        window.location.replace("login.html");
        return;
    }

    if (savedRole === "admin") {
        window.location.replace("admin-dashboard.html");
        return;
    }

    if (savedRole !== "user") {
        window.location.replace("login.html");
        return;
    }

    const sidebar = document.getElementById("dashboardSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuButton = document.getElementById("mobileMenuButton");
    const logoutButton = document.getElementById("logoutButton");

    const welcomeUser = document.getElementById("welcomeUser");
    const sidebarUserName = document.getElementById("sidebarUserName");
    const headerUserName = document.getElementById("headerUserName");
    const currentDate = document.getElementById("currentDate");
    const currentYear = document.getElementById("currentYear");

    function getDisplayName(email) {
        const localPart = email.split("@")[0] || "User";

        const formatted = localPart
            .replace(/[0-9]+/g, "")
            .replace(/[._-]+/g, " ")
            .trim();

        if (!formatted) {
            return "User";
        }

        return formatted
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    const displayName = getDisplayName(savedEmail);

    if (welcomeUser) {
        welcomeUser.textContent = displayName.toUpperCase();
    }

    if (sidebarUserName) {
        sidebarUserName.textContent = savedEmail;
        sidebarUserName.title = savedEmail;
    }

    if (headerUserName) {
        headerUserName.textContent = displayName;
        headerUserName.title = displayName;
    }

    if (currentDate) {
        currentDate.textContent = new Date()
            .toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            .toUpperCase();
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    let savedScrollPosition = 0;
    let scrollLocked = false;

    function lockBackgroundScroll() {
        if (scrollLocked) {
            return;
        }

        savedScrollPosition = window.scrollY;
        scrollLocked = true;

        document.documentElement.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        document.body.classList.add("sidebar-open");
    }

    function unlockBackgroundScroll() {
        if (!scrollLocked) {
            return;
        }

        scrollLocked = false;

        document.documentElement.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.classList.remove("sidebar-open");

        window.scrollTo(0, savedScrollPosition);
    }

    function openSidebar() {
        if (!sidebar || !overlay || window.innerWidth > 991) {
            return;
        }

        lockBackgroundScroll();

        sidebar.classList.add("mobile-open");
        overlay.classList.add("active");

        if (menuButton) {
            menuButton.innerHTML = '<i class="bi bi-x-lg"></i>';
            menuButton.setAttribute("aria-label", "Close menu");
            menuButton.setAttribute("aria-expanded", "true");
        }
    }

    function closeSidebar(restoreFocus = false) {
        if (!sidebar || !overlay) {
            return;
        }

        sidebar.classList.remove("mobile-open");
        overlay.classList.remove("active");

        if (menuButton) {
            menuButton.innerHTML = '<i class="bi bi-list"></i>';
            menuButton.setAttribute("aria-label", "Open menu");
            menuButton.setAttribute("aria-expanded", "false");
        }

        unlockBackgroundScroll();

        if (restoreFocus && menuButton && window.innerWidth <= 991) {
            menuButton.focus({ preventScroll: true });
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", event => {
            event.preventDefault();

            if (sidebar && sidebar.classList.contains("mobile-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            closeSidebar(true);
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && sidebar?.classList.contains("mobile-open")) {
            closeSidebar(true);
        }

        if (event.key === "Tab" && sidebar?.classList.contains("mobile-open")) {
            const focusableElements = sidebar.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            if (!focusableElements.length) {
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 991 && sidebar?.classList.contains("mobile-open")) {
            closeSidebar();
        }
    });

    document.querySelectorAll(".sidebar-link").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 991) {
                closeSidebar();
            }
        });
    });

    document.querySelectorAll(".sidebar-support a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 991) {
                closeSidebar();
            }
        });
    });

    if (logoutButton) {
        logoutButton.addEventListener("click", event => {
            event.preventDefault();

            [
                "userEmail",
                "userRole",
                "userName",
                "stacklyUserEmail",
                "stacklyUserRole",
                "stacklyUsername",
                "stacklyLoggedIn",
                "isLoggedIn",
                "stacklyUserPassword",
                "rememberMe",
                "stacklyRememberMe"
            ].forEach(key => localStorage.removeItem(key));

            sessionStorage.clear();
            window.location.replace("login.html");
        });
    }

    document.querySelectorAll('a[href="error.html"]').forEach(link => {
        link.addEventListener("click", () => {
            if (sidebar?.classList.contains("mobile-open")) {
                closeSidebar();
            }
        });
    });

    if (typeof gsap !== "undefined") {
        gsap.fromTo(
            ".welcome-card",
            {
                opacity: 0,
                y: 22
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            ".quick-card",
            {
                opacity: 0,
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.07,
                delay: 0.12,
                ease: "power2.out"
            }
        );

        gsap.fromTo(
            ".dashboard-card",
            {
                opacity: 0,
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                delay: 0.2,
                ease: "power2.out"
            }
        );

        gsap.fromTo(
            ".health-tip",
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                delay: 0.35,
                ease: "power2.out"
            }
        );

        gsap.to(".orbit-one", {
            rotation: 360,
            duration: 28,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".orbit-two", {
            rotation: -360,
            duration: 19,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".orbit-dot", {
            scale: 1.4,
            opacity: 0.55,
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "sine.inOut"
        });

        gsap.to(".medical-core", {
            y: -5,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});