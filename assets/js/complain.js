const confirmedMsg = document.querySelector('.confirmed-message');

document.getElementById('complaintForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const submitButton = document.getElementById('submitComplaint');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Please, wait...";
    submitButton.classList.add('disabled');
    submitButton.disabled = true;


    fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target),
        mode: 'no-cors'
    }).then(() => {
        setTimeout (() => {
            if (confirmedMsg.style.display === 'none' || confirmedMsg.style.display === '') {
                confirmedMsg.style.display = 'block';
            }
        }, 500);
    }).catch(error => {
        alert("There was an error of updating Google Form.");
    });
    setTimeout (() => {
        if (confirmedMsg.style.display === 'block') {
            confirmedMsg.style.display = 'none';
        }
        submitButton.innerHTML = originalText;
        submitButton.classList.remove('disabled');
    }, 6000);
    document.getElementById('complaintForm').reset();
});

document.getElementById('close-confirmed-message').addEventListener('click', () => {
    if (confirmedMsg.style.display === 'block') {
        confirmedMsg.style.display = 'none';
    }
});
