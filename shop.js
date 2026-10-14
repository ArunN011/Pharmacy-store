document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#shop-hero");

    if (!section) {
        return;
    }

    section.querySelectorAll("a").forEach((link) => {
        link.setAttribute("href", "error.html");
    });

    const searchForm = section.querySelector("#shopSearchForm");
    const searchInput = section.querySelector("#shopSearchInput");

    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();

            window.location.href = "error.html";
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                window.location.href = "error.html";
            }
        });
    }

    if (typeof gsap === "undefined") {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
        return;
    }

    const content = section.querySelector(".shop-hero-content");
    const visual = section.querySelector(".shop-hero-visual");
    const categories = section.querySelectorAll(".shop-category-item");
    const floatingCards = section.querySelectorAll(".shop-floating-card");

    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    timeline
        .from(content, {
            opacity: 0,
            duration: 0.8
        })
        .from(visual, {
            opacity: 0,
            duration: 0.8
        }, "-=0.55")
        .from(categories, {
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        }, "-=0.3");

    gsap.from(floatingCards, {
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.7
    });
});








document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const productCount = document.getElementById("productCount");
    const pagination = document.getElementById("pagination");
    const emptyProducts = document.getElementById("emptyProducts");
    const sidebar = document.getElementById("shopSidebar");
    const overlay = document.getElementById("filterOverlay");
    const openFilters = document.getElementById("openFilters");
    const closeFilters = document.getElementById("closeFilters");
    const applyFilters = document.getElementById("applyFilters");
    const clearFilters = document.getElementById("clearFilters");
    const emptyClearFilters = document.getElementById("emptyClearFilters");
    const sortProducts = document.getElementById("sortProducts");
    const activeFilters = document.getElementById("activeFilters");
    const resetSort = document.getElementById("resetSort");

    const products = [
        {
            id: 1,
            name: "Helps Maintain Emotional Well-Being Relax Gummies",
            category: "Cold & Flu",
            categories: ["Cold & Flu", "Supplements"],
            price: 49.99,
            oldPrice: 59.99,
            rating: 5,
            reviews: 3,
            image: "Assets/cat-1.webp",
            badges: ["-17%", "Rx", "Temperature"],
            brand: "NatureCare",
            composition: ["Vitamin D", "Magnesium"],
            stock: true,
            prescription: true
        },
        {
            id: 2,
            name: "Turmeric Supreme Extra Strength",
            category: "Cold & Flu",
            categories: ["Cold & Flu", "Supplements"],
            price: 24.99,
            oldPrice: null,
            rating: 5,
            reviews: 3,
            image: "Assets/cat-2.webp",
            badges: ["Rx", "Generic"],
            brand: "MediPlus",
            composition: ["Iron"],
            stock: true,
            prescription: true
        },
        {
            id: 3,
            name: "Vitamin D3 5000 IU Tablets",
            category: "Cold & Flu",
            categories: ["Cold & Flu", "Supplements"],
            price: 39.99,
            oldPrice: 44.99,
            rating: 5,
            reviews: 3,
            image: "Assets/cat-3.webp",
            badges: ["-11%", "Hot"],
            brand: "WellLife",
            composition: ["Vitamin D", "Calcium"],
            stock: true,
            prescription: false
        },
        {
            id: 4,
            name: "Gallbladder Formula Detoxify Urinary Tract",
            category: "Cold & Flu",
            categories: ["Cold & Flu", "Supplements"],
            price: 29.99,
            oldPrice: 39.99,
            rating: 4,
            reviews: 5,
            image: "Assets/cat-4.webp",
            badges: ["-25%", "Generic"],
            brand: "NatureCare",
            composition: ["Potassium"],
            stock: true,
            prescription: false
        },
        {
            id: 5,
            name: "Immunistren Immune System Support",
            category: "Cold & Flu",
            categories: ["Cold & Flu", "Supplements"],
            price: 34.99,
            oldPrice: null,
            rating: 4,
            reviews: 4,
            image: "Assets/cat-5.webp",
            badges: ["Rx", "Temperature"],
            brand: "HealthFirst",
            composition: ["Iron", "Magnesium"],
            stock: true,
            prescription: true
        },
        {
            id: 6,
            name: "Two-Per-Day Multivitamin Tablets",
            category: "Pain Relief",
            categories: ["Pain Relief", "Supplements"],
            price: 19.99,
            oldPrice: null,
            rating: 5,
            reviews: 8,
            image: "Assets/cat-6.webp",
            badges: ["Hot", "Branded"],
            brand: "WellLife",
            composition: ["Vitamin A", "Vitamin D"],
            stock: true,
            prescription: false
        },
        {
            id: 7,
            name: "Manuka Honey Daily Wellness Formula",
            category: "Bandages",
            categories: ["Bandages", "Pain Relief"],
            price: 32.99,
            oldPrice: null,
            rating: 4,
            reviews: 3,
            image: "Assets/cat-7.webp",
            badges: ["Generic"],
            brand: "NatureCare",
            composition: ["Calcium"],
            stock: true,
            prescription: false
        },
        {
            id: 8,
            name: "Multivitamin With Probiotics",
            category: "Pain Relief",
            categories: ["Pain Relief", "Supplements"],
            price: 29.99,
            oldPrice: 39.99,
            rating: 4,
            reviews: 4,
            image: "Assets/cat-8.webp",
            badges: ["-25%"],
            brand: "MediPlus",
            composition: ["Magnesium"],
            stock: true,
            prescription: false
        },
        {
            id: 9,
            name: "Vitamin 1000 IU Softgel Capsules",
            category: "Medical Mask",
            categories: ["Medical Mask", "Pain Relief"],
            price: 27.99,
            oldPrice: null,
            rating: 4,
            reviews: 2,
            image: "Assets/cat-9.webp",
            badges: [],
            brand: "HealthFirst",
            composition: ["Vitamin A"],
            stock: true,
            prescription: false
        },
        {
            id: 10,
            name: "Digital Blood Pressure Monitor",
            category: "Blood Pressure",
            categories: ["Blood Pressure"],
            price: 54.99,
            oldPrice: 69.99,
            rating: 5,
            reviews: 12,
            image: "Assets/cat-10.webp",
            badges: ["-22%", "Hot"],
            brand: "MediPlus",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 11,
            name: "Comfort Medical Face Masks",
            category: "Medical Mask",
            categories: ["Medical Mask"],
            price: 11.99,
            oldPrice: null,
            rating: 4,
            reviews: 6,
            image: "Assets/tablet1.webp",
            badges: ["Generic"],
            brand: "HealthFirst",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 12,
            name: "Flexible Adhesive Bandages",
            category: "Bandages",
            categories: ["Bandages"],
            price: 12.99,
            oldPrice: null,
            rating: 4,
            reviews: 5,
            image: "Assets/tablet8.webp",
            badges: [],
            brand: "WellLife",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 13,
            name: "Calcium Daily Supplement",
            category: "Supplements",
            categories: ["Supplements"],
            price: 18.99,
            oldPrice: null,
            rating: 4,
            reviews: 5,
            image: "Assets/tablet3.webp",
            badges: [],
            brand: "NatureCare",
            composition: ["Calcium"],
            stock: true,
            prescription: false
        },
        {
            id: 14,
            name: "Gentle Personal Care Lotion",
            category: "Personal Care",
            categories: ["Personal Care"],
            price: 15.99,
            oldPrice: 19.99,
            rating: 4,
            reviews: 7,
            image: "Assets/tablet4.webp",
            badges: ["-20%"],
            brand: "WellLife",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 15,
            name: "Magnesium Wellness Tablets",
            category: "Supplements",
            categories: ["Supplements"],
            price: 21.99,
            oldPrice: null,
            rating: 5,
            reviews: 8,
            image: "Assets/tablet5.webp",
            badges: [],
            brand: "MediPlus",
            composition: ["Magnesium"],
            stock: true,
            prescription: false
        },
        {
            id: 16,
            name: "Digital Thermometer",
            category: "Blood Pressure",
            categories: ["Blood Pressure"],
            price: 14.99,
            oldPrice: null,
            rating: 4,
            reviews: 9,
            image: "Assets/tablet6.webp",
            badges: [],
            brand: "HealthFirst",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 17,
            name: "Everyday Pain Relief Tablets",
            category: "Pain Relief",
            categories: ["Pain Relief"],
            price: 13.99,
            oldPrice: null,
            rating: 4,
            reviews: 6,
            image: "Assets/tablet7.webp",
            badges: ["Rx"],
            brand: "MediPlus",
            composition: [],
            stock: true,
            prescription: true
        },
        {
            id: 18,
            name: "Vitamin A Wellness Capsules",
            category: "Supplements",
            categories: ["Supplements"],
            price: 17.99,
            oldPrice: null,
            rating: 4,
            reviews: 4,
            image: "Assets/tablet8.webp",
            badges: [],
            brand: "NatureCare",
            composition: ["Vitamin A"],
            stock: true,
            prescription: false
        },
        {
            id: 19,
            name: "Protective Medical Face Mask Pack",
            category: "Medical Mask",
            categories: ["Medical Mask"],
            price: 10.99,
            oldPrice: 14.99,
            rating: 4,
            reviews: 5,
            image: "Assets/cat-11.webp",
            badges: ["-27%"],
            brand: "HealthFirst",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 20,
            name: "Premium First Aid Bandages",
            category: "Bandages",
            categories: ["Bandages"],
            price: 16.99,
            oldPrice: null,
            rating: 5,
            reviews: 6,
            image: "Assets/cat-12.webp",
            badges: [],
            brand: "WellLife",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 21,
            name: "Daily Hydrating Skin Cream",
            category: "Personal Care",
            categories: ["Personal Care"],
            price: 22.99,
            oldPrice: null,
            rating: 4,
            reviews: 8,
            image: "Assets/cat-13.webp",
            badges: [],
            brand: "NatureCare",
            composition: [],
            stock: true,
            prescription: false
        },
        {
            id: 22,
            name: "Advanced Blood Pressure Monitor",
            category: "Blood Pressure",
            categories: ["Blood Pressure"],
            price: 79.99,
            oldPrice: 99.99,
            rating: 5,
            reviews: 10,
            image: "Assets/cat-4.webp",
            badges: ["-20%"],
            brand: "MediPlus",
            composition: [],
            stock: false,
            prescription: false
        },
        {
            id: 23,
            name: "Vitamin D Daily Tablets",
            category: "Supplements",
            categories: ["Supplements"],
            price: 26.99,
            oldPrice: null,
            rating: 4,
            reviews: 3,
            image: "Assets/tablet5.webp",
            badges: [],
            brand: "HealthFirst",
            composition: ["Vitamin D"],
            stock: false,
            prescription: false
        },
        {
            id: 24,
            name: "Gentle Personal Care Essentials",
            category: "Personal Care",
            categories: ["Personal Care"],
            price: 19.99,
            oldPrice: null,
            rating: 4,
            reviews: 5,
            image: "Assets/cat-15.webp",
            badges: [],
            brand: "WellLife",
            composition: [],
            stock: false,
            prescription: false
        }
    ];

    const state = {
        page: 1,
        pageSize: 12,
        columns: 3,
        view: "grid"
    };

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    function getSelectedValues(name) {
        return Array.from(
            document.querySelectorAll(`input[name="${name}"]:checked`)
        ).map(input => input.value);
    }

    function getFilters() {
        return {
            categories: getSelectedValues("category"),
            brands: getSelectedValues("brand"),
            compositions: getSelectedValues("composition"),
            minPrice: Number(document.getElementById("minPrice").value) || 0,
            maxPrice: Number(document.getElementById("maxPrice").value) || 200,
            onSale: document.getElementById("onSale").checked,
            inStock: document.getElementById("inStock").checked,
            outOfStock: document.getElementById("outOfStock").checked
        };
    }

    function getFilteredProducts() {
        const filters = getFilters();
        let result = products.filter(product => {
            const matchesCategory =
                filters.categories.length === 0 ||
                filters.categories.some(category =>
                    product.categories.includes(category)
                );

            const matchesBrand =
                filters.brands.length === 0 ||
                filters.brands.includes(product.brand);

            const matchesComposition =
                filters.compositions.length === 0 ||
                filters.compositions.some(composition =>
                    product.composition.includes(composition)
                );

            const matchesPrice =
                product.price >= filters.minPrice &&
                product.price <= filters.maxPrice;

            const matchesSale =
                !filters.onSale ||
                product.oldPrice !== null && product.oldPrice > product.price;

            const matchesStock =
                !filters.inStock || product.stock;

            const matchesOutOfStock =
                !filters.outOfStock || !product.stock;

            return matchesCategory &&
                matchesBrand &&
                matchesComposition &&
                matchesPrice &&
                matchesSale &&
                matchesStock &&
                matchesOutOfStock;
        });

        switch (sortProducts.value) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "discount":
                result.sort((a, b) => getDiscount(b) - getDiscount(a));
                break;
            default:
                result.sort((a, b) => a.id - b.id);
        }

        return result;
    }

    function getDiscount(product) {
        if (!product.oldPrice || product.oldPrice <= product.price) {
            return 0;
        }

        return (product.oldPrice - product.price) / product.oldPrice;
    }

    function renderBadges(product) {
        return product.badges.map(badge => {
            let badgeClass = "";

            if (badge.startsWith("-")) {
                badgeClass = "badge-discount";
            } else if (badge === "Rx") {
                badgeClass = "badge-prescription";
            } else if (badge === "Generic") {
                badgeClass = "badge-generic";
            } else if (badge === "Temperature") {
                badgeClass = "badge-temperature";
                badge = "Temp";
            } else if (badge === "Hot") {
                badgeClass = "badge-hot";
            } else if (badge === "Branded") {
                badgeClass = "badge-branded";
            }

            return `<span class="product-badge ${badgeClass}">${escapeHTML(badge)}</span>`;
        }).join("");
    }

    function renderStars(rating) {
        let html = "";

        for (let index = 1; index <= 5; index++) {
            html += `<i class="bi bi-star-fill ${index > rating ? "empty-star" : ""}"></i>`;
        }

        return html;
    }

    function renderProduct(product) {
        const discounted = product.oldPrice !== null &&
            product.oldPrice > product.price;

        const priceHTML = `
            <div class="product-price">
                <span class="current-price ${discounted ? "discounted" : ""}">
                    $${product.price.toFixed(2)}
                </span>
                ${discounted ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ""}
            </div>
        `;

        const stockHTML = product.stock
            ? `<div class="product-stock">In Stock</div>`
            : `<div class="product-stock out">Currently Unavailable</div>`;

        const actionLabel = product.stock
            ? product.prescription ? "View Details" : "Add To Cart"
            : "Unavailable";

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-visual">
                    <div class="product-badges">${renderBadges(product)}</div>
                    <img
                        class="product-image"
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        width="300"
                        height="300"
                    >
                </div>

                <div class="product-content">
                    <p class="product-category">${escapeHTML(product.category)}</p>
                    <h3 class="product-title">${escapeHTML(product.name)}</h3>

                    <div class="product-rating">
                        <span class="product-stars">${renderStars(product.rating)}</span>
                        <span>(${product.reviews})</span>
                    </div>

                    ${priceHTML}
                    ${stockHTML}

                    <button
                        class="product-action"
                        type="button"
                        data-product-id="${product.id}"
                        ${product.stock ? "" : "disabled"}
                    >
                        ${escapeHTML(actionLabel)}
                    </button>
                </div>
            </article>
        `;
    }

    function renderPagination(totalProducts) {
        const totalPages = Math.ceil(totalProducts / state.pageSize);

        pagination.replaceChildren();

        if (totalPages <= 1) {
            pagination.hidden = true;
            return;
        }

        pagination.hidden = false;

        const previous = document.createElement("button");
        previous.type = "button";
        previous.className = "page-button";
        previous.innerHTML = '<i class="bi bi-chevron-left"></i>';
        previous.setAttribute("aria-label", "Previous page");
        previous.disabled = state.page === 1;

        previous.addEventListener("click", () => {
            if (state.page > 1) {
                state.page--;
                render();
                scrollToProducts();
            }
        });

        pagination.appendChild(previous);

        for (let page = 1; page <= totalPages; page++) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = `page-button ${page === state.page ? "active" : ""}`;
            button.textContent = page;
            button.setAttribute("aria-label", `Page ${page}`);

            if (page === state.page) {
                button.setAttribute("aria-current", "page");
            }

            button.addEventListener("click", () => {
                state.page = page;
                render();
                scrollToProducts();
            });

            pagination.appendChild(button);
        }

        const next = document.createElement("button");
        next.type = "button";
        next.className = "page-button";
        next.innerHTML = '<i class="bi bi-chevron-right"></i>';
        next.setAttribute("aria-label", "Next page");
        next.disabled = state.page === totalPages;

        next.addEventListener("click", () => {
            if (state.page < totalPages) {
                state.page++;
                render();
                scrollToProducts();
            }
        });

        pagination.appendChild(next);
    }

    function renderActiveFilters() {
        const filters = getFilters();
        const chips = [];

        filters.categories.forEach(value => {
            chips.push({ label: value, type: "category", value });
        });

        filters.brands.forEach(value => {
            chips.push({ label: value, type: "brand", value });
        });

        filters.compositions.forEach(value => {
            chips.push({ label: value, type: "composition", value });
        });

        if (filters.onSale) {
            chips.push({ label: "On Sale", type: "availability", value: "onSale" });
        }

        if (filters.inStock) {
            chips.push({ label: "In Stock", type: "availability", value: "inStock" });
        }

        if (filters.outOfStock) {
            chips.push({ label: "Out of Stock", type: "availability", value: "outOfStock" });
        }

        if (filters.minPrice > 0 || filters.maxPrice < 200) {
            chips.push({
                label: `$${filters.minPrice}–$${filters.maxPrice}`,
                type: "price",
                value: "price"
            });
        }

        activeFilters.innerHTML = chips.map(chip => `
            <span class="active-filter-chip">
                ${escapeHTML(chip.label)}
                <button
                    type="button"
                    data-filter-type="${escapeHTML(chip.type)}"
                    data-filter-value="${escapeHTML(chip.value)}"
                    aria-label="Remove ${escapeHTML(chip.label)} filter"
                >
                    <i class="bi bi-x"></i>
                </button>
            </span>
        `).join("");
    }

    function render() {
        const filteredProducts = getFilteredProducts();
        const totalProducts = filteredProducts.length;
        const totalPages = Math.ceil(totalProducts / state.pageSize);

        if (state.page > Math.max(totalPages, 1)) {
            state.page = Math.max(totalPages, 1);
        }

        const startIndex = (state.page - 1) * state.pageSize;
        const pageProducts = filteredProducts.slice(
            startIndex,
            startIndex + state.pageSize
        );

        productGrid.dataset.columns = state.columns;
        productGrid.dataset.view = state.view;

        productGrid.innerHTML = pageProducts.map(renderProduct).join("");

        emptyProducts.hidden = totalProducts !== 0;
        productGrid.hidden = totalProducts === 0;

        if (totalProducts === 0) {
            productCount.textContent = "Showing 0 products";
        } else {
            productCount.textContent =
                `Showing ${startIndex + 1}–${Math.min(startIndex + state.pageSize, totalProducts)} of ${totalProducts} products`;
        }

        renderPagination(totalProducts);
        renderActiveFilters();

        if (typeof gsap !== "undefined" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.fromTo(
                productGrid.querySelectorAll(".product-card"),
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.35,
                    stagger: 0.035,
                    clearProps: "opacity",
                    ease: "power1.out"
                }
            );
        }
    }

    function scrollToProducts() {
        const toolbar = document.querySelector(".shop-toolbar");

        if (!toolbar) {
            return;
        }

        const mobile = window.matchMedia("(max-width: 767px)").matches;

        if (mobile) {
            toolbar.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    function syncPriceRange(source) {
        const minRange = document.getElementById("minPriceRange");
        const maxRange = document.getElementById("maxPriceRange");
        const minInput = document.getElementById("minPrice");
        const maxInput = document.getElementById("maxPrice");

        let minValue = Number(minInput.value);
        let maxValue = Number(maxInput.value);

        if (!Number.isFinite(minValue)) {
            minValue = 0;
        }

        if (!Number.isFinite(maxValue)) {
            maxValue = 200;
        }

        minValue = Math.max(0, Math.min(200, minValue));
        maxValue = Math.max(0, Math.min(200, maxValue));

        if (minValue > maxValue) {
            if (source === "min") {
                maxValue = minValue;
            } else {
                minValue = maxValue;
            }
        }

        minInput.value = minValue;
        maxInput.value = maxValue;
        minRange.value = minValue;
        maxRange.value = maxValue;

        const minPercent = (minValue / 200) * 100;
        const maxPercent = (maxValue / 200) * 100;

        document.querySelector(".price-slider-track").style.background =
            `linear-gradient(to right, #e4e1e8 ${minPercent}%, #8247b1 ${minPercent}%, #8247b1 ${maxPercent}%, #e4e1e8 ${maxPercent}%)`;
    }

    function openDrawer() {
        sidebar.classList.add("open");
        overlay.classList.add("open");
        document.body.classList.add("filter-open");
        openFilters.setAttribute("aria-expanded", "true");
        closeFilters.focus();
    }

    function closeDrawer() {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
        document.body.classList.remove("filter-open");
        openFilters.setAttribute("aria-expanded", "false");
        openFilters.focus();
    }

    openFilters.addEventListener("click", openDrawer);
    closeFilters.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
    applyFilters.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && sidebar.classList.contains("open")) {
            closeDrawer();
        }
    });

    document.querySelectorAll(".filter-heading").forEach(button => {
        button.addEventListener("click", () => {
            const expanded = button.getAttribute("aria-expanded") === "true";
            const content = button.nextElementSibling;

            button.setAttribute("aria-expanded", String(!expanded));
            content.classList.toggle("collapsed", expanded);
        });
    });

    document.querySelectorAll(
        'input[name="category"], input[name="brand"], input[name="composition"], #onSale, #inStock, #outOfStock'
    ).forEach(input => {
        input.addEventListener("change", () => {
            state.page = 1;
            render();
        });
    });

    document.getElementById("minPriceRange").addEventListener("input", () => {
        document.getElementById("minPrice").value =
            document.getElementById("minPriceRange").value;
        syncPriceRange("min");
        state.page = 1;
        render();
    });

    document.getElementById("maxPriceRange").addEventListener("input", () => {
        document.getElementById("maxPrice").value =
            document.getElementById("maxPriceRange").value;
        syncPriceRange("max");
        state.page = 1;
        render();
    });

    document.getElementById("minPrice").addEventListener("change", () => {
        syncPriceRange("min");
        state.page = 1;
        render();
    });

    document.getElementById("maxPrice").addEventListener("change", () => {
        syncPriceRange("max");
        state.page = 1;
        render();
    });

    sortProducts.addEventListener("change", () => {
        state.page = 1;
        render();
    });

    document.querySelectorAll(".view-button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".view-button").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (button.dataset.columns) {
                state.columns = Number(button.dataset.columns);
                state.view = "grid";
            }

            if (button.dataset.view === "list") {
                state.view = "list";
            }

            document.querySelectorAll(".view-button").forEach(item => {
                const active =
                    item.dataset.columns === String(state.columns) &&
                    state.view === "grid" ||
                    item.dataset.view === state.view &&
                    state.view === "list";

                item.classList.toggle("active", active);
            });

            render();
        });
    });

    function resetFilters() {
        document.querySelectorAll(
            'input[name="category"], input[name="brand"], input[name="composition"], #onSale, #inStock, #outOfStock'
        ).forEach(input => {
            input.checked = false;
        });

        document.getElementById("minPrice").value = 0;
        document.getElementById("maxPrice").value = 200;
        document.getElementById("minPriceRange").value = 0;
        document.getElementById("maxPriceRange").value = 200;

        sortProducts.value = "default";
        state.page = 1;

        syncPriceRange();
        render();
    }

    clearFilters.addEventListener("click", resetFilters);
    emptyClearFilters.addEventListener("click", resetFilters);

    resetSort.addEventListener("click", () => {
        sortProducts.value = "default";
        state.page = 1;
        render();
    });

    activeFilters.addEventListener("click", event => {
        const button = event.target.closest("button[data-filter-type]");

        if (!button) {
            return;
        }

        const type = button.dataset.filterType;
        const value = button.dataset.filterValue;

        if (type === "category" || type === "brand" || type === "composition") {
            const input = document.querySelector(
                `input[name="${type}"][value="${CSS.escape(value)}"]`
            );

            if (input) {
                input.checked = false;
            }
        }

        if (type === "availability") {
            document.getElementById(value).checked = false;
        }

        if (type === "price") {
            document.getElementById("minPrice").value = 0;
            document.getElementById("maxPrice").value = 200;
            document.getElementById("minPriceRange").value = 0;
            document.getElementById("maxPriceRange").value = 200;
            syncPriceRange();
        }

        state.page = 1;
        render();
    });

    productGrid.addEventListener("click", event => {
        const button = event.target.closest(".product-action");

        if (!button || button.disabled) {
            return;
        }
        window.location.href = "error.html";

        const productId = Number(button.dataset.productId);
        const product = products.find(item => item.id === productId);

        if (!product) {
            return;
        }

        if (product.prescription) {
            window.location.href = "error.html";
            return;
        }

        const cart = JSON.parse(localStorage.getItem("medicareCart") || "[]");
        const existing = cart.find(item => item.id === productId);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem("medicareCart", JSON.stringify(cart));

        button.innerHTML = '<i class="bi bi-check2"></i> Added';
        button.classList.add("added");

        window.setTimeout(() => {
            render();
        }, 700);
    });

    document.querySelectorAll(".product-image").forEach(image => {
        image.addEventListener("error", () => {
            image.style.visibility = "hidden";
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 767 && sidebar.classList.contains("open")) {
            closeDrawer();
        }
    });

    syncPriceRange();
    render();
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