document.getElementById('complaintForm').addEventListener('submit', async (event) => {
    
    event.preventDefault();
    
    const confirmedMsg = document.querySelector('.confirmed-message');
    const submitButton = document.getElementById('submitComplaint');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Please, wait...";
    submitButton.classList.add('disabled');
    submitButton.disabled = true;

    const form = event.target;
    const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    });

    // await fetch(cpS, {
    //     method: "POST",
    //     body: formData,
    //     mode: "no-cors"
    // });

    if (res.ok) {
        form.reset();
        confirmedMsg.style.display = 'block';
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    // setTimeout(() => {
    //     document.getElementById('complaintForm').reset();
    //     if (confirmedMsg.style.display === 'none' || confirmedMsg.style.display === '') {
    //         confirmedMsg.style.display = 'block';
    //         window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    //     }
    // }, 500);

    const closeComMsg = document.getElementById('close-confirmed-message');
    closeComMsg.addEventListener('click', () => {
        confirmedMsg.style.display = 'none';
        submitButton.innerHTML = originalText;
        submitButton.classList.remove('disabled');
        submitButton.disabled = false;
    });
});
