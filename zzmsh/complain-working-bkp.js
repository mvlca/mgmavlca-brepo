document.getElementById('complaintForm').addEventListener('submit', async (event) => {
    
    event.preventDefault();

    const sS = "mGmacomPlaint@25ocT20";
    const fI = "1FAIpQLSeQ_LhK7-sjHEZDb7LL3vXO6VifA66lFvsN6QQ5viUR9cBmag";

    const formData = new FormData(event.target);
    formData.set("entry.915684076", `${sS}`);
    const cpS = `https://docs.google.com/forms/d/e/${fI}/formResponse`;
    
    const confirmedMsg = document.querySelector('.confirmed-message');
    const submitButton = document.getElementById('submitComplaint');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Please, wait...";
    submitButton.classList.add('disabled');
    submitButton.disabled = true;

    await fetch(cpS, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    });

    setTimeout(() => {
        document.getElementById('complaintForm').reset();
        if (confirmedMsg.style.display === 'none' || confirmedMsg.style.display === '') {
            confirmedMsg.style.display = 'block';
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, 500);

    const closeComMsg = document.getElementById('close-confirmed-message');
    closeComMsg.addEventListener('click', () => {
        confirmedMsg.style.display = 'none';
        submitButton.innerHTML = originalText;
        submitButton.classList.remove('disabled');
        submitButton.disabled = false;
    });
});
