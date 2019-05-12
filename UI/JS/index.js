// Get the modal
const modal = document.querySelector('#id01');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener ('click', event => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});