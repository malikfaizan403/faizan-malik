// slight blur animation for page load..
document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        document.body.classList.add('is-loaded')
    }, 500);
});
