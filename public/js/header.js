(() => {
  // <stdin>
  document.addEventListener("click", function(event) {
    const sideMenuBar = document.querySelector("header .menubar");
    if (event.target.closest("#mobileMenuButton")) {
      sideMenuBar.style.display = "block";
      return;
    }
    if (event.target.closest("#mobileMenuClose")) {
      sideMenuBar.style.display = "none";
      return;
    }
    if (sideMenuBar.style.display === "block" && !sideMenuBar.contains(event.target)) {
      sideMenuBar.style.display = "none";
    }
  });
})();
