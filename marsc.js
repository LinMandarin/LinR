document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".favorite").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
        });
    });
});
