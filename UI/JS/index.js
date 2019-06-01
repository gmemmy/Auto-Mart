// Get the modal
// eslint-disable-next-line no-undef
const modal = document.querySelector('#id01');

// When the user clicks anywhere outside of the modal, close it
// eslint-disable-next-line no-undef
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


// Modal setup for advertisments card
// eslint-disable-next-line no-undef
const cardModal = document.querySelector('#boxModal');

// Get the button that opens the modal
// eslint-disable-next-line no-undef
const btn = document.querySelector('#adcard');

// Get the span element that closes the modal
// eslint-disable-next-line no-undef
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the card, open the modal
btn.onclick = () => {
  cardModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  cardModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, clos it
// eslint-disable-next-line no-undef
window.onclick = (event) => {
  if (event.target === cardModal) {
    cardModal.style.display = 'none';
  }
};
