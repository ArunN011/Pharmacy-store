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

    const searchInput = document.getElementById("orderSearch");
    const clearSearch = document.getElementById("clearSearch");
    const statusFilter = document.getElementById("statusFilter");
    const sortFilter = document.getElementById("sortFilter");
    const statusChips = document.getElementById("statusChips");
    const tableBody = document.getElementById("ordersTableBody");
    const emptyState = document.getElementById("emptyState");

    const totalOrdersElement = document.getElementById("totalOrders");
    const pendingOrdersElement = document.getElementById("pendingOrders");
    const processingOrdersElement = document.getElementById("processingOrders");
    const deliveredOrdersElement = document.getElementById("deliveredOrders");

    const visibleOrderCount = document.getElementById("visibleOrderCount");
    const paginationInfo = document.getElementById("paginationInfo");
    const pageIndicator = document.getElementById("pageIndicator");
    const previousPage = document.getElementById("previousPage");
    const nextPage = document.getElementById("nextPage");

    const modal = document.getElementById("orderModal");
    const modalBody = document.getElementById("modalBody");
    const modalTitle = document.getElementById("modalTitle");
    const closeModalButton = document.getElementById("closeModal");
    const cancelModalButton = document.getElementById("cancelModal");
    const saveOrderStatusButton = document.getElementById("saveOrderStatus");

    const toast = document.getElementById("toastMessage");
    const toastText = document.getElementById("toastText");

    const sidebarAdminName = document.getElementById("sidebarAdminName");
    const headerAdminName = document.getElementById("headerAdminName");
    const currentDate = document.getElementById("currentDate");
    const currentYear = document.getElementById("currentYear");

    const storageKey = "medicareAdminOrderStatuses";
    const pageSize = 6;

    let currentPage = 1;
    let activeChipStatus = "all";
    let selectedOrderId = null;
    let previousFocus = null;
    let savedScrollPosition = 0;
    let scrollLocked = false;
    let toastTimer = null;

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
    }

    if (headerAdminName) {
        headerAdminName.textContent = displayName;
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

    const orders = [
        {
            id: "MED1001",
            customer: "Rahul Kumar",
            email: "rahul.kumar@example.com",
            initials: "RK",
            avatar: "avatar-green",
            product: "Vitamin C Tablets",
            category: "Vitamins & Supplements",
            icon: "bi-capsule",
            quantity: 2,
            amount: 398,
            date: "2026-10-13",
            payment: "UPI",
            paymentStatus: "Paid",
            status: "Pending",
            address: "Salem, Tamil Nadu"
        },
        {
            id: "MED1002",
            customer: "Sneha Patel",
            email: "sneha.patel@example.com",
            initials: "SP",
            avatar: "avatar-orange",
            product: "Digital Thermometer",
            category: "Health Devices",
            icon: "bi-thermometer-half",
            quantity: 1,
            amount: 349,
            date: "2026-10-12",
            payment: "Card",
            paymentStatus: "Paid",
            status: "Processing",
            address: "Chennai, Tamil Nadu"
        },
        {
            id: "MED1003",
            customer: "Arun Kumar",
            email: "arun.kumar@example.com",
            initials: "AK",
            avatar: "avatar-blue",
            product: "First Aid Kit",
            category: "First Aid",
            icon: "bi-bandaid",
            quantity: 1,
            amount: 549,
            date: "2026-10-11",
            payment: "Cash on Delivery",
            paymentStatus: "Unpaid",
            status: "Confirmed",
            address: "Coimbatore, Tamil Nadu"
        },
        {
            id: "MED1004",
            customer: "Priya Mehta",
            email: "priya.mehta@example.com",
            initials: "PM",
            avatar: "avatar-purple",
            product: "Personal Care Kit",
            category: "Personal Care",
            icon: "bi-heart-pulse",
            quantity: 1,
            amount: 799,
            date: "2026-10-10",
            payment: "UPI",
            paymentStatus: "Paid",
            status: "Shipped",
            address: "Bengaluru, Karnataka"
        },
        {
            id: "MED1005",
            customer: "Vijay Kumar",
            email: "vijay.kumar@example.com",
            initials: "VK",
            avatar: "avatar-pink",
            product: "Hand Sanitizer Pack",
            category: "Personal Care",
            icon: "bi-droplet-half",
            quantity: 3,
            amount: 299,
            date: "2026-10-09",
            payment: "Card",
            paymentStatus: "Paid",
            status: "Delivered",
            address: "Erode, Tamil Nadu"
        },
        {
            id: "MED1006",
            customer: "Kavya Sharma",
            email: "kavya.sharma@example.com",
            initials: "KS",
            avatar: "avatar-teal",
            product: "Digital Blood Pressure Monitor",
            category: "Health Devices",
            icon: "bi-heart-pulse",
            quantity: 1,
            amount: 1499,
            date: "2026-10-08",
            payment: "UPI",
            paymentStatus: "Paid",
            status: "Processing",
            address: "Tiruchirappalli, Tamil Nadu"
        },
        {
            id: "MED1007",
            customer: "Manoj Raj",
            email: "manoj.raj@example.com",
            initials: "MR",
            avatar: "avatar-green",
            product: "Wellness Essentials Pack",
            category: "Wellness",
            icon: "bi-box-seam",
            quantity: 1,
            amount: 899,
            date: "2026-10-07",
            payment: "Cash on Delivery",
            paymentStatus: "Unpaid",
            status: "Cancelled",
            address: "Madurai, Tamil Nadu"
        },
        {
            id: "MED1008",
            customer: "Divya Nair",
            email: "divya.nair@example.com",
            initials: "DN",
            avatar: "avatar-purple",
            product: "Reusable Hot Water Bag",
            category: "Health Essentials",
            icon: "bi-thermometer-sun",
            quantity: 2,
            amount: 598,
            date: "2026-10-06",
            payment: "UPI",
            paymentStatus: "Paid",
            status: "Delivered",
            address: "Tiruppur, Tamil Nadu"
        }
    ];

    function loadSavedStatuses() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");

            orders.forEach(order => {
                if (saved[order.id] && isValidStatus(saved[order.id])) {
                    order.status = saved[order.id];
                }
            });
        } catch {
            localStorage.removeItem(storageKey);
        }
    }

    function saveStatuses() {
        const statusData = {};

        orders.forEach(order => {
            statusData[order.id] = order.status;
        });

        try {
            localStorage.setItem(storageKey, JSON.stringify(statusData));
        } catch {
            showToast("Unable to save order changes in this browser.");
        }
    }

    function isValidStatus(status) {
        return [
            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ].includes(status);
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    }

    function formatDate(dateString) {
        const date = new Date(`${dateString}T12:00:00`);

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function getStatusClass(status) {
        return `status-${status.toLowerCase()}`;
    }

    function updateSummary() {
        totalOrdersElement.textContent = orders.length;

        pendingOrdersElement.textContent = orders.filter(
            order => order.status === "Pending"
        ).length;

        processingOrdersElement.textContent = orders.filter(
            order => ["Confirmed", "Processing", "Shipped"].includes(order.status)
        ).length;

        deliveredOrdersElement.textContent = orders.filter(
            order => order.status === "Delivered"
        ).length;
    }

    function updateActiveChips() {
        document.querySelectorAll(".status-chip").forEach(chip => {
            const active = chip.dataset.status === activeChipStatus;

            chip.classList.toggle("active", active);
            chip.setAttribute("aria-pressed", String(active));
        });
    }

    function getFilteredOrders() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        let filtered = orders.filter(order => {
            const matchesSearch = [
                order.id,
                order.customer,
                order.email,
                order.product,
                order.payment,
                order.status,
                order.address
            ].some(value => value.toLowerCase().includes(searchTerm));

            const matchesSelect =
                statusFilter.value === "all" ||
                order.status === statusFilter.value;

            const matchesChip =
                activeChipStatus === "all" ||
                order.status === activeChipStatus;

            return matchesSearch && matchesSelect && matchesChip;
        });

        switch (sortFilter.value) {
            case "oldest":
                filtered.sort((a, b) => a.date.localeCompare(b.date));
                break;

            case "high":
                filtered.sort((a, b) => b.amount - a.amount);
                break;

            case "low":
                filtered.sort((a, b) => a.amount - b.amount);
                break;

            default:
                filtered.sort((a, b) => b.date.localeCompare(a.date));
        }

        return filtered;
    }

    function renderOrders() {
        const filteredOrders = getFilteredOrders();
        const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

        currentPage = Math.min(currentPage, totalPages);

        const startIndex = (currentPage - 1) * pageSize;
        const visibleOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

        visibleOrderCount.textContent = filteredOrders.length;

        clearSearch.hidden = searchInput.value.length === 0;

        updateActiveChips();

        if (filteredOrders.length === 0) {
            tableBody.innerHTML = "";
            emptyState.hidden = false;
            document.querySelector(".orders-table-wrapper").hidden = true;
        } else {
            emptyState.hidden = true;
            document.querySelector(".orders-table-wrapper").hidden = false;

            tableBody.innerHTML = visibleOrders.map(order => `
                <tr>
                    <td>
                        <span class="order-id">#${escapeHTML(order.id)}</span>
                        <span class="order-date-small">${formatDate(order.date)}</span>
                    </td>

                    <td>
                        <div class="customer-cell">
                            <span class="customer-avatar ${escapeHTML(order.avatar)}">
                                ${escapeHTML(order.initials)}
                            </span>
                            <div class="customer-info">
                                <strong>${escapeHTML(order.customer)}</strong>
                                <span>${escapeHTML(order.email)}</span>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div class="product-cell">
                            <span class="product-thumbnail">
                                <i class="bi ${escapeHTML(order.icon)}"></i>
                            </span>
                            <div class="product-info">
                                <strong>${escapeHTML(order.product)}</strong>
                                <span>Qty: ${order.quantity}</span>
                            </div>
                        </div>
                    </td>

                    <td>${formatDate(order.date)}</td>

                    <td>
                        <span class="order-amount">${formatCurrency(order.amount)}</span>
                    </td>

                    <td>
                        <span class="payment-method">${escapeHTML(order.payment)}</span>
                        <span class="payment-status ${order.paymentStatus === "Unpaid" ? "unpaid" : ""}">
                            ${escapeHTML(order.paymentStatus)}
                        </span>
                    </td>

                    <td>
                        <span class="order-status ${getStatusClass(order.status)}">
                            ${escapeHTML(order.status)}
                        </span>
                    </td>

                    <td>
                        <button
                            type="button"
                            class="row-action"
                            data-order-id="${escapeHTML(order.id)}"
                            aria-label="View order ${escapeHTML(order.id)}"
                            title="View order details">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                    </td>
                </tr>
            `).join("");
        }

        const firstItem = filteredOrders.length ? startIndex + 1 : 0;
        const lastItem = Math.min(startIndex + pageSize, filteredOrders.length);

        paginationInfo.textContent =
            `Showing ${firstItem}–${lastItem} of ${filteredOrders.length} orders`;

        pageIndicator.textContent = `${currentPage} / ${totalPages}`;

        previousPage.disabled = currentPage <= 1;
        nextPage.disabled = currentPage >= totalPages;

        updateSummary();
    }

    function showToast(message) {
        toastText.textContent = message;
        toast.classList.add("active");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("active");
        }, 2800);
    }

    function lockBackgroundScroll() {
        if (scrollLocked) {
            return;
        }

        savedScrollPosition = window.scrollY;
        scrollLocked = true;

        document.body.classList.add("modal-open");
        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
    }

    function unlockBackgroundScroll() {
        if (!scrollLocked) {
            return;
        }

        scrollLocked = false;

        document.body.classList.remove("modal-open");
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

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

    function openOrderModal(orderId) {
        const order = orders.find(item => item.id === orderId);

        if (!order) {
            return;
        }

        selectedOrderId = order.id;
        previousFocus = document.activeElement;

        modalTitle.textContent = `Order #${order.id}`;

        modalBody.innerHTML = `
            <div class="modal-order-number">
                <i class="bi bi-receipt"></i>
                Order reference: #${escapeHTML(order.id)}
            </div>

            <h4 class="modal-section-title">Customer Information</h4>

            <div class="modal-detail-grid">
                <div class="modal-detail">
                    <span>Customer Name</span>
                    <strong>${escapeHTML(order.customer)}</strong>
                </div>

                <div class="modal-detail">
                    <span>Email Address</span>
                    <strong>${escapeHTML(order.email)}</strong>
                </div>

                <div class="modal-detail">
                    <span>Order Date</span>
                    <strong>${formatDate(order.date)}</strong>
                </div>

                <div class="modal-detail">
                    <span>Delivery Address</span>
                    <strong>${escapeHTML(order.address)}</strong>
                </div>
            </div>

            <h4 class="modal-section-title">Product Information</h4>

            <div class="modal-product-row">
                <span class="modal-product-icon">
                    <i class="bi ${escapeHTML(order.icon)}"></i>
                </span>

                <div class="modal-product-info">
                    <strong>${escapeHTML(order.product)}</strong>
                    <span>${escapeHTML(order.category)} · Quantity: ${order.quantity}</span>
                </div>

                <span class="modal-product-price">${formatCurrency(order.amount)}</span>
            </div>

            <h4 class="modal-section-title">Payment Information</h4>

            <div class="modal-detail-grid">
                <div class="modal-detail">
                    <span>Payment Method</span>
                    <strong>${escapeHTML(order.payment)}</strong>
                </div>

                <div class="modal-detail">
                    <span>Payment Status</span>
                    <strong>${escapeHTML(order.paymentStatus)}</strong>
                </div>

                <div class="modal-detail">
                    <span>Order Total</span>
                    <strong>${formatCurrency(order.amount)}</strong>
                </div>

                <div class="modal-detail">
                    <span>Current Status</span>
                    <strong>${escapeHTML(order.status)}</strong>
                </div>
            </div>

            <label class="modal-status-field" for="modalStatusSelect">
                <span>Update Order Status</span>
                <select id="modalStatusSelect">
                    ${[
                        "Pending",
                        "Confirmed",
                        "Processing",
                        "Shipped",
                        "Delivered",
                        "Cancelled"
                    ].map(status => `
                        <option value="${status}" ${order.status === status ? "selected" : ""}>
                            ${status}
                        </option>
                    `).join("")}
                </select>
            </label>
        `;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        lockBackgroundScroll();
        closeModalButton.focus();
    }

    function closeOrderModal(restoreFocus = true) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        selectedOrderId = null;

        unlockBackgroundScroll();

        if (restoreFocus && previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus({ preventScroll: true });
        }
    }

    function updateOrderStatus() {
        if (!selectedOrderId) {
            return;
        }

        const order = orders.find(item => item.id === selectedOrderId);
        const statusSelect = document.getElementById("modalStatusSelect");

        if (!order || !statusSelect || !isValidStatus(statusSelect.value)) {
            return;
        }

        const previousStatus = order.status;
        order.status = statusSelect.value;

        saveStatuses();

        closeOrderModal(false);

        currentPage = 1;
        renderOrders();

        showToast(
            previousStatus === order.status
                ? `Order #${order.id} remains ${order.status}.`
                : `Order #${order.id} updated to ${order.status}.`
        );
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
        if (event.key === "Escape") {
            if (modal.classList.contains("active")) {
                closeOrderModal();
            } else if (sidebar?.classList.contains("mobile-open")) {
                closeSidebar(true);
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

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderOrders();
    });

    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        currentPage = 1;
        renderOrders();
        searchInput.focus();
    });

    statusFilter.addEventListener("change", () => {
        activeChipStatus = "all";
        currentPage = 1;
        renderOrders();
    });

    sortFilter.addEventListener("change", () => {
        currentPage = 1;
        renderOrders();
    });

    statusChips.addEventListener("click", event => {
        const chip = event.target.closest(".status-chip");

        if (!chip) {
            return;
        }

        activeChipStatus = chip.dataset.status;
        statusFilter.value = "all";
        currentPage = 1;

        renderOrders();
    });

    previousPage.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderOrders();
        }
    });

    nextPage.addEventListener("click", () => {
        const totalPages = Math.max(
            1,
            Math.ceil(getFilteredOrders().length / pageSize)
        );

        if (currentPage < totalPages) {
            currentPage++;
            renderOrders();
        }
    });

    document.getElementById("resetFilters").addEventListener("click", () => {
        searchInput.value = "";
        statusFilter.value = "all";
        sortFilter.value = "newest";
        activeChipStatus = "all";
        currentPage = 1;
        renderOrders();
    });

    tableBody.addEventListener("click", event => {
        const button = event.target.closest("[data-order-id]");

        if (!button) {
            return;
        }

        openOrderModal(button.dataset.orderId);
    });

    closeModalButton.addEventListener("click", () => closeOrderModal());
    cancelModalButton.addEventListener("click", () => closeOrderModal());

    modal.addEventListener("click", event => {
        if (event.target.matches("[data-close-modal]")) {
            closeOrderModal();
        }
    });

    saveOrderStatusButton.addEventListener("click", updateOrderStatus);

    loadSavedStatuses();
    renderOrders();

    if (typeof gsap !== "undefined") {
        gsap.fromTo(
            ".page-heading",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );

        gsap.fromTo(
            ".summary-card",
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.08,
                delay: 0.1,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            ".orders-panel",
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.25,
                ease: "power3.out"
            }
        );
    }
});