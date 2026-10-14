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

    const wishlistGrid = document.getElementById("wishlistGrid");
    const searchInput = document.getElementById("wishlistSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortFilter = document.getElementById("sortFilter");

    const emptyWishlist = document.getElementById("emptyWishlist");
    const noResults = document.getElementById("noResults");
    const clearSearch = document.getElementById("clearSearch");

    const heroWishlistCount = document.getElementById("heroWishlistCount");
    const heroAvailableCount = document.getElementById("heroAvailableCount");
    const sectionCount = document.getElementById("sectionCount");
    const cartCount = document.getElementById("cartCount");
    const currentYear = document.getElementById("currentYear");

    const toastMessage = document.getElementById("toastMessage");
    const toastText = document.getElementById("toastText");

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

    function getStoredCart() {
        const possibleKeys = [
            "medicareCart",
            "cartItems",
            "cart",
            "stacklyCart"
        ];

        for (const key of possibleKeys) {
            try {
                const parsed = JSON.parse(localStorage.getItem(key) || "null");

                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch {
                continue;
            }
        }

        return [];
    }

    function updateCartCount() {
        if (!cartCount) {
            return;
        }

        const cart = getStoredCart();

        const count = cart.reduce((total, item) => {
            const quantity = Number(item.quantity || item.qty || 1);
            return total + (Number.isFinite(quantity) ? quantity : 1);
        }, 0);

        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? "flex" : "none";
    }

    let toastTimer;

    function showToast(message) {
        if (!toastMessage || !toastText) {
            return;
        }

        toastText.textContent = message;
        toastMessage.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toastMessage.classList.remove("show");
        }, 2600);
    }

    function getProductCards() {
        return Array.from(
            wishlistGrid.querySelectorAll(".wishlist-card")
        );
    }

    function updateWishlistCounts() {
        const cards = getProductCards();

        const availableCount = cards.filter(card =>
            card.dataset.available === "true"
        ).length;

        if (heroWishlistCount) {
            heroWishlistCount.textContent = cards.length;
        }

        if (heroAvailableCount) {
            heroAvailableCount.textContent = availableCount;
        }

        if (sectionCount) {
            sectionCount.textContent = `(${cards.length})`;
        }

        if (emptyWishlist) {
            emptyWishlist.classList.toggle("visible", cards.length === 0);
        }

        if (wishlistGrid) {
            wishlistGrid.style.display = cards.length === 0 ? "none" : "grid";
        }
    }

    function filterAndSortProducts() {
        const cards = getProductCards();

        const query = (searchInput?.value || "").trim().toLowerCase();
        const category = categoryFilter?.value || "all";
        const sort = sortFilter?.value || "default";

        cards.forEach(card => {
            const name = (card.dataset.name || "").toLowerCase();
            const description = (
                card.querySelector(".product-description")?.textContent || ""
            ).toLowerCase();

            const categoryText = (
                card.querySelector(".product-category")?.textContent || ""
            ).toLowerCase();

            const matchesSearch =
                name.includes(query) ||
                description.includes(query) ||
                categoryText.includes(query);

            const matchesCategory =
                category === "all" ||
                card.dataset.category === category;

            card.hidden = !(matchesSearch && matchesCategory);
        });

        const visibleCards = cards.filter(card => !card.hidden);

        visibleCards.sort((first, second) => {
            if (sort === "price-low") {
                return Number(first.dataset.price) - Number(second.dataset.price);
            }

            if (sort === "price-high") {
                return Number(second.dataset.price) - Number(first.dataset.price);
            }

            if (sort === "name") {
                return first.dataset.name.localeCompare(second.dataset.name);
            }

            return Number(second.dataset.added) - Number(first.dataset.added);
        });

        visibleCards.forEach(card => wishlistGrid.appendChild(card));

        const hasProducts = cards.length > 0;
        const hasResults = visibleCards.length > 0;

        if (noResults) {
            noResults.classList.toggle("visible", hasProducts && !hasResults);
        }

        if (emptyWishlist) {
            emptyWishlist.classList.toggle("visible", !hasProducts);
        }

        if (wishlistGrid) {
            wishlistGrid.style.display = hasResults ? "grid" : "none";
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterAndSortProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterAndSortProducts);
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", filterAndSortProducts);
    }

    if (clearSearch) {
        clearSearch.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
            }

            if (categoryFilter) {
                categoryFilter.value = "all";
            }

            if (sortFilter) {
                sortFilter.value = "default";
            }

            filterAndSortProducts();
        });
    }

    document.querySelectorAll(".remove-wishlist").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".wishlist-card");

            if (!card) {
                return;
            }

            const productName =
                card.dataset.name || "Product";

            card.remove();

            updateWishlistCounts();
            filterAndSortProducts();

            showToast(`${productName} removed from your wishlist.`);
        });
    });

    function saveCart(cart) {
        localStorage.setItem("medicareCart", JSON.stringify(cart));
    }

    document.querySelectorAll(".add-cart-button[data-product-id]").forEach(button => {
        button.addEventListener("click", () => {
            if (button.disabled) {
                return;
            }

            const card = button.closest(".wishlist-card");

            if (!card) {
                return;
            }

            const productId = button.dataset.productId;
            const productName = card.dataset.name;
            const price = Number(card.dataset.price);

            const cart = getStoredCart();

            const existingItem = cart.find(item =>
                String(item.id || item.productId) === productId
            );

            if (existingItem) {
                existingItem.quantity =
                    Number(existingItem.quantity || existingItem.qty || 1) + 1;
            } else {
                cart.push({
                    id: productId,
                    productId: productId,
                    name: productName,
                    price: price,
                    quantity: 1,
                    image: card.querySelector(".product-image")?.getAttribute("src") || ""
                });
            }

            saveCart(cart);
            updateCartCount();

            const originalContent = button.innerHTML;

            button.innerHTML = '<i class="bi bi-check-circle-fill"></i> Added to Cart';
            button.classList.add("added");

            showToast(`${productName} added to cart.`);

            setTimeout(() => {
                if (button.isConnected) {
                    button.innerHTML = originalContent;
                    button.classList.remove("added");
                }
            }, 1600);
        });
    });

    let scrollPosition = 0;
    let scrollLocked = false;

    function lockBackgroundScroll() {
        if (scrollLocked) {
            return;
        }

        scrollPosition = window.scrollY;
        scrollLocked = true;

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

    updateWishlistCounts();
    updateCartCount();
    filterAndSortProducts();
});