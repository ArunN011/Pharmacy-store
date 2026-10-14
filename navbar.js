const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");
const mobileSidebar = document.getElementById("mobileSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const body = document.body;

let previousScrollY = 0;

function openSidebar() {
if (mobileSidebar.classList.contains("open")) return;


previousScrollY = window.scrollY;

body.style.position = "fixed";
body.style.top = `-${previousScrollY}px`;
body.style.left = "0";
body.style.right = "0";
body.style.width = "100%";
body.classList.add("menu-open");

mobileSidebar.inert = false;
mobileSidebar.setAttribute("aria-hidden", "false");
mobileSidebar.classList.add("open");
sidebarOverlay.classList.add("show");

menuOpen.setAttribute("aria-expanded", "true");
menuClose.focus();


}

function closeSidebar(restoreFocus = true) {
if (!mobileSidebar.classList.contains("open")) return;


mobileSidebar.classList.remove("open");
sidebarOverlay.classList.remove("show");

mobileSidebar.inert = true;
mobileSidebar.setAttribute("aria-hidden", "true");

menuOpen.setAttribute("aria-expanded", "false");

body.classList.remove("menu-open");
body.style.position = "";
body.style.top = "";
body.style.left = "";
body.style.right = "";
body.style.width = "";

window.scrollTo(0, previousScrollY);

if (restoreFocus) {
    menuOpen.focus({ preventScroll: true });
}

}

menuOpen.addEventListener("click", openSidebar);
menuClose.addEventListener("click", () => closeSidebar());
sidebarOverlay.addEventListener("click", () => closeSidebar());

document.addEventListener("keydown", (event) => {
if (event.key === "Escape") {
closeSidebar();
}

if (event.key === "Tab" && mobileSidebar.classList.contains("open")) {
    const focusableElements = mobileSidebar.querySelectorAll(
        'a[href], button:not([disabled])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
    ) {
        event.preventDefault();
        firstElement.focus();
    }
}

});

mobileSidebar.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => closeSidebar(false));
});

window.addEventListener("resize", () => {
if (
window.innerWidth >= 992 &&
mobileSidebar.classList.contains("open")
) {
closeSidebar(false);
}
});

const currentPage = window.location.pathname.split("/").pop() || "about.html";

document
.querySelectorAll(".desktop-navigation a, .sidebar-navigation a")
.forEach((link) => {
if (link.getAttribute("href") === currentPage) {
link.classList.add("active");
link.setAttribute("aria-current", "page");
} else {
link.classList.remove("active");
link.removeAttribute("aria-current");
}
});

gsap.registerPlugin();