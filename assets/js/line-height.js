document.addEventListener("DOMContentLoaded", () => {
    // Regex to match Myanmar Unicode range (basic + extended)
    const myanmarRegex = /[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF\uABC0-\uABFF]/;

    // Select all headings h1.page-title and h3.list-title
    const headings = document.querySelectorAll("h1.page-title, h3>a.list-title");

    headings.forEach(el => {
        if (myanmarRegex.test(el.textContent)) {
            el.classList.add("lhi18");
        }
    });
});
