
document.addEventListener("DOMContentLoaded", () => {
    const goBackBtn = document.getElementById("goBackBtn");
    const currentYear = document.getElementById("currentYear");

    currentYear.textContent = new Date().getFullYear();

    goBackBtn.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    });
});
