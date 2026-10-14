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

    if (savedRole === "user") {
        window.location.replace("user-dashboard.html");
        return;
    }

    if (savedRole !== "admin") {
        window.location.replace("login.html");
        return;
    }

    const sidebar = document.getElementById("adminSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const menuButton = document.getElementById("mobileMenuButton");
    const logoutButton = document.getElementById("logoutButton");

    const sidebarAdminName = document.getElementById("sidebarAdminName");
    const headerAdminName = document.getElementById("headerAdminName");
    const welcomeAdminName = document.getElementById("welcomeAdminName");
    const currentDate = document.getElementById("currentDate");
    const currentYear = document.getElementById("currentYear");

    function getDisplayName(email) {
        const localPart = email.split("@")[0] || "Administrator";

        const formatted = localPart
            .replace(/[0-9]+/g, "")
            .replace(/[._-]+/g, " ")
            .trim();

        if (!formatted) {
            return "Administrator";
        }

        return formatted
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    const displayName = getDisplayName(savedEmail);

    if (sidebarAdminName) {
        sidebarAdminName.textContent = displayName;
        sidebarAdminName.title = displayName;
    }

    if (headerAdminName) {
        headerAdminName.textContent = displayName;
        headerAdminName.title = displayName;
    }

    if (welcomeAdminName) {
        welcomeAdminName.textContent = displayName;
    }

    if (currentDate) {
        currentDate.textContent = new Date().toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });
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

            if (sidebar?.classList.contains("mobile-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => closeSidebar(true));
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && sidebar?.classList.contains("mobile-open")) {
            closeSidebar(true);
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
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
        );

        gsap.fromTo(
            ".metric-card",
            { opacity: 0, y: 18 },
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.08,
                delay: 0.12,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            ".dashboard-panel",
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.25,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            ".quick-action-card",
            { opacity: 0, y: 12 },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.08,
                delay: 0.35,
                ease: "power3.out"
            }
        );

        gsap.to(".ring-one", {
            rotation: 360,
            duration: 28,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".ring-two", {
            rotation: -360,
            duration: 19,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".visual-dot", {
            scale: 1.4,
            opacity: 0.6,
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "sine.inOut"
        });
    }
});