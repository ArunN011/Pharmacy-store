
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "medicareAdminProducts";
    const PAGE_SIZE = 5;
    const LOW_STOCK_LIMIT = 10;

    const categories = [
        "Medicines",
        "Vitamins",
        "Personal Care",
        "Medical Devices",
        "First Aid"
    ];

    const initialProducts = [
        { id: 1, name: "Vitamin C Tablets", sku: "MED-1001", category: "Vitamins", price: 249, stock: 45, image: "" },
        { id: 2, name: "Digital Thermometer", sku: "MED-1002", category: "Medical Devices", price: 399, stock: 8, image: "" },
        { id: 3, name: "First Aid Kit", sku: "MED-1003", category: "First Aid", price: 599, stock: 0, image: "" },
        { id: 4, name: "Hand Sanitizer", sku: "MED-1004", category: "Personal Care", price: 99, stock: 65, image: "" },
        { id: 5, name: "Multivitamin Capsules", sku: "MED-1005", category: "Vitamins", price: 349, stock: 7, image: "" },
        { id: 6, name: "Blood Pressure Monitor", sku: "MED-1006", category: "Medical Devices", price: 1899, stock: 24, image: "" },
        { id: 7, name: "Moisturizing Lotion", sku: "MED-1007", category: "Personal Care", price: 279, stock: 32, image: "" },
        { id: 8, name: "Adhesive Bandages", sku: "MED-1008", category: "First Aid", price: 79, stock: 0, image: "" },
        { id: 9, name: "Antiseptic Solution", sku: "MED-1009", category: "First Aid", price: 119, stock: 12, image: "" },
        { id: 10, name: "Daily Wellness Tablets", sku: "MED-1010", category: "Medicines", price: 189, stock: 5, image: "" },
        { id: 11, name: "Reusable Hot Water Bag", sku: "MED-1011", category: "Medical Devices", price: 299, stock: 18, image: "" },
        { id: 12, name: "Gentle Cleansing Wash", sku: "MED-1012", category: "Personal Care", price: 159, stock: 37, image: "" }
    ];

    const $ = id => document.getElementById(id);

    const ui = {
        sidebar: $("sidebar"),
        overlay: $("sidebarOverlay"),
        menuToggle: $("menuToggle"),
        currentDate: $("currentDate"),
        currentYear: $("currentYear"),
        totalProducts: $("totalProducts"),
        inStockProducts: $("inStockProducts"),
        lowStockProducts: $("lowStockProducts"),
        outStockProducts: $("outStockProducts"),
        search: $("searchInput"),
        category: $("categoryFilter"),
        stock: $("stockFilter"),
        reset: $("resetFiltersBtn"),
        tableBody: $("productsTableBody"),
        tableWrapper: $("tableWrapper"),
        mobileProducts: $("mobileProducts"),
        emptyState: $("emptyState"),
        results: $("resultsText"),
        pagination: $("pagination"),
        add: $("addProductBtn"),
        emptyAdd: $("emptyAddBtn"),
        export: $("exportBtn"),
        modal: $("productModal"),
        modalTitle: $("modalTitle"),
        closeModal: $("closeModalBtn"),
        cancelModal: $("cancelModalBtn"),
        form: $("productForm"),
        id: $("productId"),
        name: $("productName"),
        sku: $("productSku"),
        categoryInput: $("productCategory"),
        price: $("productPrice"),
        quantity: $("productStock"),
        image: $("productImage"),
        toastContainer: $("toastContainer")
    };

    let products = loadProducts();
    let currentPage = 1;
    let savedScrollY = 0;
    let scrollLockCount = 0;
    let lastFocusedElement = null;
    let sidebarOpen = false;

    function loadProducts() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored !== null) {
                const parsed = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    return parsed.filter(product =>
                        product &&
                        Number.isFinite(Number(product.id)) &&
                        typeof product.name === "string" &&
                        typeof product.sku === "string" &&
                        categories.includes(product.category) &&
                        Number.isFinite(Number(product.price)) &&
                        Number(product.price) > 0 &&
                        Number.isInteger(Number(product.stock)) &&
                        Number(product.stock) >= 0 &&
                        typeof product.image === "string"
                    );
                }
            }
        } catch (error) {
            console.error("Unable to load products:", error);
        }

        return initialProducts.map(product => ({ ...product }));
    }

    function saveProducts() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            return true;
        } catch (error) {
            showToast("Unable to save inventory in this browser.", true);
            return false;
        }
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function getStatus(stock) {
        const quantity = Number(stock);

        if (quantity <= 0) return "Out of Stock";
        if (quantity <= LOW_STOCK_LIMIT) return "Low Stock";

        return "In Stock";
    }

    function statusClass(status) {
        if (status === "Out of Stock") return "out-stock";
        if (status === "Low Stock") return "low-stock";

        return "in-stock";
    }

    function currency(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(Number(value));
    }

    function imageMarkup(product) {
        if (!product.image) {
            return `
                <div class="product-image">
                    <i class="bi bi-capsule"></i>
                </div>
            `;
        }

        const imageUrl = escapeHTML(product.image);

        return `
            <div class="product-image">
                <img
                    src="${imageUrl}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
                <i class="bi bi-capsule"
                   style="display:none"></i>
            </div>
        `;
    }

    function getFilteredProducts() {
        const term = ui.search.value.trim().toLowerCase();
        const category = ui.category.value;
        const stock = ui.stock.value;

        return products.filter(product => {
            const matchesTerm =
                product.name.toLowerCase().includes(term) ||
                product.sku.toLowerCase().includes(term);

            const matchesCategory =
                category === "all" || product.category === category;

            const matchesStock =
                stock === "all" || getStatus(product.stock) === stock;

            return matchesTerm && matchesCategory && matchesStock;
        });
    }

    function updateStats() {
        ui.totalProducts.textContent = products.length;

        ui.inStockProducts.textContent = products.filter(
            product => getStatus(product.stock) === "In Stock"
        ).length;

        ui.lowStockProducts.textContent = products.filter(
            product => getStatus(product.stock) === "Low Stock"
        ).length;

        ui.outStockProducts.textContent = products.filter(
            product => getStatus(product.stock) === "Out of Stock"
        ).length;
    }

    function desktopRow(product) {
        const status = getStatus(product.stock);

        return `
            <tr>
                <td>
                    <div class="product-cell">
                        ${imageMarkup(product)}
                        <div class="product-info">
                            <h4>${escapeHTML(product.name)}</h4>
                            <span>${escapeHTML(product.category)}</span>
                        </div>
                    </div>
                </td>
                <td><span class="sku-text">${escapeHTML(product.sku)}</span></td>
                <td>${escapeHTML(product.category)}</td>
                <td><span class="price-text">${currency(product.price)}</span></td>
                <td><span class="stock-number">${Number(product.stock)}</span></td>
                <td><span class="stock-badge ${statusClass(status)}">${status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button type="button" class="icon-btn"
                            data-action="edit" data-id="${Number(product.id)}"
                            aria-label="Edit ${escapeHTML(product.name)}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" class="icon-btn delete-btn"
                            data-action="delete" data-id="${Number(product.id)}"
                            aria-label="Delete ${escapeHTML(product.name)}">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    function mobileCard(product) {
        const status = getStatus(product.stock);

        return `
            <article class="mobile-product-card">
                <div class="mobile-product-top">
                    ${imageMarkup(product)}
                    <div class="product-info">
                        <h4>${escapeHTML(product.name)}</h4>
                        <span>${escapeHTML(product.category)}</span>
                    </div>
                    <span class="stock-badge ${statusClass(status)}">${status}</span>
                </div>

                <div class="mobile-product-meta">
                    <div class="mobile-meta-item">
                        <span>SKU</span>
                        <strong>${escapeHTML(product.sku)}</strong>
                    </div>
                    <div class="mobile-meta-item">
                        <span>Price</span>
                        <strong>${currency(product.price)}</strong>
                    </div>
                    <div class="mobile-meta-item">
                        <span>Available Stock</span>
                        <strong>${Number(product.stock)} units</strong>
                    </div>
                    <div class="mobile-meta-item">
                        <span>Category</span>
                        <strong>${escapeHTML(product.category)}</strong>
                    </div>
                </div>

                <div class="mobile-product-actions">
                    <button type="button" class="mobile-edit-btn"
                        data-action="edit" data-id="${Number(product.id)}">
                        <i class="bi bi-pencil-square"></i>
                        Edit Product
                    </button>
                    <button type="button" class="mobile-delete-btn"
                        data-action="delete" data-id="${Number(product.id)}">
                        <i class="bi bi-trash3"></i>
                        Delete
                    </button>
                </div>
            </article>
        `;
    }

    function renderPagination(totalPages, count) {
        if (count <= PAGE_SIZE) {
            ui.pagination.innerHTML = "";
            return;
        }

        let html = `
            <button class="page-btn" type="button" data-page="${currentPage - 1}"
                aria-label="Previous page" ${currentPage === 1 ? "disabled" : ""}>
                <i class="bi bi-chevron-left"></i>
            </button>
        `;

        for (let page = 1; page <= totalPages; page++) {
            html += `
                <button class="page-btn ${page === currentPage ? "active" : ""}"
                    type="button" data-page="${page}"
                    aria-label="Page ${page}"
                    ${page === currentPage ? 'aria-current="page"' : ""}>
                    ${page}
                </button>
            `;
        }

        html += `
            <button class="page-btn" type="button" data-page="${currentPage + 1}"
                aria-label="Next page"
                ${currentPage === totalPages ? "disabled" : ""}>
                <i class="bi bi-chevron-right"></i>
            </button>
        `;

        ui.pagination.innerHTML = html;
    }

    function renderProducts() {
        updateStats();

        const filtered = getFilteredProducts();
        const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

        currentPage = Math.min(currentPage, totalPages);

        const start = (currentPage - 1) * PAGE_SIZE;
        const visible = filtered.slice(start, start + PAGE_SIZE);
        const hasProducts = filtered.length > 0;

        ui.tableBody.innerHTML = visible.map(desktopRow).join("");
        ui.mobileProducts.innerHTML = visible.map(mobileCard).join("");

        ui.emptyState.hidden = hasProducts;
        ui.tableWrapper.hidden = !hasProducts;
        ui.mobileProducts.hidden = !hasProducts;

        if (hasProducts) {
            ui.results.textContent =
                `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} products`;
        } else {
            ui.results.textContent = "Showing 0 products";
        }

        renderPagination(totalPages, filtered.length);
    }

    function showToast(message, isError = false) {
        const toast = document.createElement("div");
        toast.className = `toast${isError ? " error" : ""}`;

        const icon = document.createElement("i");
        icon.className = isError
            ? "bi bi-exclamation-circle"
            : "bi bi-check-circle";

        const text = document.createElement("span");
        text.textContent = message;

        toast.append(icon, text);
        ui.toastContainer.appendChild(toast);

        window.setTimeout(() => toast.remove(), 3000);
    }

    function clearErrors() {
        ui.form.querySelectorAll(".field-error").forEach(error => {
            error.textContent = "";
        });

        ui.form.querySelectorAll(".invalid").forEach(field => {
            field.classList.remove("invalid");
        });
    }

    function setError(field, message) {
        field.classList.add("invalid");
        const error = $(`${field.id}Error`);

        if (error) {
            error.textContent = message;
        }
    }

    function validateForm() {
        clearErrors();

        let valid = true;
        const name = ui.name.value.trim();
        const sku = ui.sku.value.trim();
        const category = ui.categoryInput.value;
        const priceText = ui.price.value.trim();
        const stockText = ui.quantity.value.trim();
        const image = ui.image.value.trim();

        const price = Number(priceText);
        const stock = Number(stockText);

        if (name.length < 2) {
            setError(ui.name, "Enter at least 2 characters.");
            valid = false;
        }

        if (!/^[A-Za-z0-9_-]+$/.test(sku)) {
            setError(ui.sku, "Use letters, numbers, hyphens or underscores.");
            valid = false;
        } else if (products.some(product =>
            product.sku.toLowerCase() === sku.toLowerCase() &&
            String(product.id) !== ui.id.value
        )) {
            setError(ui.sku, "This SKU already exists.");
            valid = false;
        }

        if (!categories.includes(category)) {
            setError(ui.categoryInput, "Select a category.");
            valid = false;
        }

        if (
            priceText === "" ||
            !Number.isFinite(price) ||
            price <= 0 ||
            price > 10000000
        ) {
            setError(ui.price, "Enter a valid price greater than zero.");
            valid = false;
        }

        if (
            stockText === "" ||
            !Number.isInteger(stock) ||
            stock < 0 ||
            stock > 1000000
        ) {
            setError(ui.quantity, "Enter a whole number from 0 to 1,000,000.");
            valid = false;
        }

        if (image) {
            try {
                const url = new URL(image);

                if (!["http:", "https:"].includes(url.protocol)) {
                    throw new Error("Invalid protocol");
                }
            } catch {
                setError(ui.image, "Enter a valid HTTP or HTTPS image URL.");
                valid = false;
            }
        }

        return valid;
    }

    function lockPage() {
        scrollLockCount++;

        if (scrollLockCount > 1) return;

        savedScrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
    }

    function unlockPage() {
        if (scrollLockCount === 0) return;

        scrollLockCount--;

        if (scrollLockCount > 0) return;

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        window.scrollTo(0, savedScrollY);
    }

    function openSidebar() {
        if (sidebarOpen) return;

        sidebarOpen = true;

        lockPage();

        ui.sidebar.classList.add("open");
        ui.overlay.classList.add("show");

        ui.menuToggle.setAttribute("aria-expanded", "true");
        ui.menuToggle.setAttribute("aria-label", "Close navigation");
        ui.menuToggle.innerHTML = '<i class="bi bi-x-lg"></i>';

        const firstLink = ui.sidebar.querySelector(".nav-link");

        if (firstLink) {
            firstLink.setAttribute("tabindex", "0");
        }
    }

    function closeSidebar() {
        if (!sidebarOpen) return;

        sidebarOpen = false;

        ui.sidebar.classList.remove("open");
        ui.overlay.classList.remove("show");

        ui.menuToggle.setAttribute("aria-expanded", "false");
        ui.menuToggle.setAttribute("aria-label", "Open navigation");
        ui.menuToggle.innerHTML = '<i class="bi bi-list"></i>';

        unlockPage();
    }

    function openModal(product = null) {
        lastFocusedElement = document.activeElement;

        ui.form.reset();
        clearErrors();

        if (product) {
            ui.modalTitle.textContent = "Edit Product";
            ui.id.value = product.id;
            ui.name.value = product.name;
            ui.sku.value = product.sku;
            ui.categoryInput.value = product.category;
            ui.price.value = product.price;
            ui.quantity.value = product.stock;
            ui.image.value = product.image || "";
        } else {
            ui.modalTitle.textContent = "Add New Product";
            ui.id.value = "";
        }

        lockPage();

        ui.modal.classList.add("show");
        ui.modal.setAttribute("aria-hidden", "false");

        window.setTimeout(() => ui.name.focus(), 50);
    }

    function closeModal() {
        if (!ui.modal.classList.contains("show")) return;

        ui.modal.classList.remove("show");
        ui.modal.setAttribute("aria-hidden", "true");

        clearErrors();
        unlockPage();

        if (lastFocusedElement && lastFocusedElement.isConnected) {
            lastFocusedElement.focus();
        }
    }

    function saveProduct(event) {
        event.preventDefault();

        if (!validateForm()) {
            ui.form.querySelector(".invalid")?.focus();
            return;
        }

        const existingId = ui.id.value;

        const product = {
            id: existingId ? Number(existingId) : Date.now(),
            name: ui.name.value.trim(),
            sku: ui.sku.value.trim().toUpperCase(),
            category: ui.categoryInput.value,
            price: Number(ui.price.value),
            stock: Number(ui.quantity.value),
            image: ui.image.value.trim()
        };

        const previous = products.map(item => ({ ...item }));

        if (existingId) {
            products = products.map(item =>
                String(item.id) === existingId ? product : item
            );
        } else {
            products.unshift(product);
        }

        if (!saveProducts()) {
            products = previous;
            return;
        }

        currentPage = 1;
        closeModal();
        renderProducts();

        showToast(existingId ? "Product updated successfully." : "Product added successfully.");
    }

    function editProduct(id) {
        const product = products.find(item => String(item.id) === String(id));

        if (product) {
            openModal(product);
        } else {
            showToast("Product not found.", true);
        }
    }

    function deleteProduct(id) {
        const product = products.find(item => String(item.id) === String(id));

        if (!product) {
            showToast("Product not found.", true);
            return;
        }

        if (!window.confirm(`Delete "${product.name}" from inventory?`)) {
            return;
        }

        const previous = products.map(item => ({ ...item }));

        products = products.filter(item => String(item.id) !== String(id));

        if (!saveProducts()) {
            products = previous;
            return;
        }

        currentPage = Math.min(
            currentPage,
            Math.max(1, Math.ceil(getFilteredProducts().length / PAGE_SIZE))
        );

        renderProducts();
        showToast("Product deleted successfully.");
    }
    function exportCSV() {
    window.location.href = "error.html";
}

    // function exportCSV() {
    //     if (!products.length) {
    //         showToast("There are no products to export.", true);
    //         window.location.href="error.html";
    //         return;
    //     }

    //     const headers = [
    //         "Product Name",
    //         "SKU",
    //         "Category",
    //         "Price",
    //         "Stock",
    //         "Status",
    //         "Image URL"
    //     ];

    //     function csvCell(value) {
    //         let text = String(value ?? "");

    //         if (/^[=+\-@\t\r]/.test(text)) {
    //             text = "'" + text;
    //         }

    //         return `"${text.replace(/"/g, '""')}"`;
            
    //     }

    //     const rows = products.map(product => [
    //         product.name,
    //         product.sku,
    //         product.category,
    //         product.price,
    //         product.stock,
    //         getStatus(product.stock),
    //         product.image
    //     ]);

       

    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement("a");


    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();

    //      window.location.href="error.html";

    //     showToast("Inventory exported successfully.");
    // }

    function handleProductAction(event) {
        const button = event.target.closest("button[data-action]");

        if (!button) return;

        if (button.dataset.action === "edit") {
            editProduct(button.dataset.id);
        }

        if (button.dataset.action === "delete") {
            deleteProduct(button.dataset.id);
        }
    }

    ui.menuToggle.addEventListener("click", () => {
        if (sidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    ui.overlay.addEventListener("click", closeSidebar);

    ui.sidebar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSidebar();
            closeModal();
        }

        if (
            event.key === "Tab" &&
            sidebarOpen &&
            window.innerWidth <= 900
        ) {
            const focusable = [
                ...ui.sidebar.querySelectorAll('a[href], button:not(:disabled)')
            ].filter(element => element.offsetParent !== null);

            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeSidebar();
        }
    });

    ui.search.addEventListener("input", () => {
        currentPage = 1;
        renderProducts();
    });

    ui.category.addEventListener("change", () => {
        currentPage = 1;
        renderProducts();
    });

    ui.stock.addEventListener("change", () => {
        currentPage = 1;
        renderProducts();
    });

    ui.reset.addEventListener("click", () => {
        ui.search.value = "";
        ui.category.value = "all";
        ui.stock.value = "all";
        currentPage = 1;
        renderProducts();
    });

    ui.add.addEventListener("click", () => openModal());
    ui.emptyAdd.addEventListener("click", () => openModal());

    ui.closeModal.addEventListener("click", closeModal);
    ui.cancelModal.addEventListener("click", closeModal);

    ui.modal.addEventListener("click", event => {
        if (event.target === ui.modal) {
            closeModal();
        }
    });

    ui.form.addEventListener("submit", saveProduct);

    ui.tableBody.addEventListener("click", handleProductAction);
    ui.mobileProducts.addEventListener("click", handleProductAction);

    ui.pagination.addEventListener("click", event => {
        const button = event.target.closest("button[data-page]");

        if (!button || button.disabled) return;

        const requestedPage = Number(button.dataset.page);
        const totalPages = Math.max(
            1,
            Math.ceil(getFilteredProducts().length / PAGE_SIZE)
        );

        if (requestedPage >= 1 && requestedPage <= totalPages) {
            currentPage = requestedPage;
            renderProducts();
        }
    });

    ui.export.addEventListener("click", exportCSV);

    const now = new Date();

    ui.currentDate.textContent = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    ui.currentYear.textContent = now.getFullYear();
     
     renderProducts();
});
renderProducts();
