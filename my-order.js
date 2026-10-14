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

    const sidebarUserName = document.getElementById("sidebarUserName");
    const headerUserName = document.getElementById("headerUserName");

    const ordersGrid = document.getElementById("ordersGrid");
    const orderCards = Array.from(document.querySelectorAll(".order-card"));
    const searchInput = document.getElementById("orderSearch");
    const statusFilter = document.getElementById("statusFilter");
    const noOrders = document.getElementById("noOrders");
    const ordersCount = document.getElementById("ordersCount");
    const resetFilters = document.getElementById("resetFilters");

    const totalOrders = document.getElementById("totalOrders");
    const processingOrders = document.getElementById("processingOrders");
    const deliveredOrders = document.getElementById("deliveredOrders");

    const currentYear = document.getElementById("currentYear");

    function getDisplayName(email) {
        const localPart = email.split("@")[0] || "Customer";

        const formatted = localPart
            .replace(/[0-9]+/g, "")
            .replace(/[._-]+/g, " ")
            .trim();

        if (!formatted) {
            return "Customer";
        }

        return formatted
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    const displayName = getDisplayName(savedEmail);

    if (sidebarUserName) {
        sidebarUserName.textContent = savedEmail;
        sidebarUserName.title = savedEmail;
    }

    if (headerUserName) {
        headerUserName.textContent = displayName;
        headerUserName.title = displayName;
    }

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function updateSummary() {
        if (totalOrders) {
            totalOrders.textContent = orderCards.length;
        }

        if (processingOrders) {
            processingOrders.textContent = orderCards.filter(card => {
                const status = card.dataset.status;
                return status === "processing" || status === "shipped";
            }).length;
        }

        if (deliveredOrders) {
            deliveredOrders.textContent = orderCards.filter(card =>
                card.dataset.status === "delivered"
            ).length;
        }
    }

    function filterOrders() {
        const query = (searchInput?.value || "").trim().toLowerCase();
        const selectedStatus = statusFilter?.value || "all";
        let visibleCount = 0;

        orderCards.forEach(card => {
            const searchableText = (
                card.dataset.search + " " + card.textContent
            ).toLowerCase();

            const matchesSearch = searchableText.includes(query);
            const matchesStatus =
                selectedStatus === "all" ||
                card.dataset.status === selectedStatus;

            const isVisible = matchesSearch && matchesStatus;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        if (noOrders) {
            noOrders.classList.toggle("visible", visibleCount === 0);
        }

        if (ordersGrid) {
            ordersGrid.style.display = visibleCount === 0 ? "none" : "grid";
        }

        if (ordersCount) {
            ordersCount.textContent =
                `Showing ${visibleCount} ${visibleCount === 1 ? "order" : "orders"}`;
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterOrders);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", filterOrders);
    }

    if (resetFilters) {
        resetFilters.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            filterOrders();
        });
    }

    document.querySelectorAll(".view-order-button").forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "error.html";
        });
    });

    function lockBackgroundScroll() {
        if (document.body.dataset.scrollLocked === "true") {
            return;
        }

        const scrollPosition = window.scrollY;

        document.body.dataset.savedScrollPosition = String(scrollPosition);
        document.body.dataset.scrollLocked = "true";

        document.documentElement.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
        document.body.classList.add("sidebar-open");
    }

    function unlockBackgroundScroll() {
        if (document.body.dataset.scrollLocked !== "true") {
            return;
        }

        const scrollPosition = Number(
            document.body.dataset.savedScrollPosition || 0
        );

        delete document.body.dataset.scrollLocked;
        delete document.body.dataset.savedScrollPosition;

        document.documentElement.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.body.classList.remove("sidebar-open");

        window.scrollTo(0, scrollPosition);
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

    updateSummary();
    filterOrders();
});