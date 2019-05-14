// Get the modal
const modal = document.querySelector('#id01', );

// When the user clicks anywhere outside of the modal, close it
window.addEventListener ('click', event => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


//Modal setup for advertisments card
const cardModal = document.getElementById('boxModal');

//Get the button that opens the modal
const btn = document.querySelector("#adcard","#adcard2");

//Get the span element that closes the modal
const span = document.getElementsByClassName("close")[0];

//When the user clicks on the card, open the modal
btn.onclick = () => {
	cardModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
	cardModal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, clos it
window.onclick = (event) => {
	if (event.target == cardModal) {
		cardModal.style.display = "none";
	}
}

