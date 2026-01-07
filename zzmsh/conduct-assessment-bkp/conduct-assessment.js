document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('conductAssessmentForm').addEventListener('submit', async(e) => {
        e.preventDefault();
        const form = e.target;
        const res = await fetch(form.action, {
            method: "POST",
            body: new FormData(form)
        });
        if (!res.ok) {
            console.log("Error updating VLCA Submission Form");
            return;
        }
        console.log("google form maybe updated.");
    });

    console.log("conduct assessment...");

    const secToggle = document.querySelectorAll('.section-view-toggle');
    secToggle.forEach(b => {
        const minusPlus = b.querySelector('.mps');
        b.addEventListener('click', () => {
            const shBlock = b.nextSibling;
            if (!shBlock) return;
            if (shBlock.style.display === 'block' || shBlock.style.display === '') {
                shBlock.style.display = 'none';
                minusPlus.innerHTML = '&plus;';
            } else {
                shBlock.style.display = 'block';
                minusPlus.innerHTML = '&minus;';
            }
        });
    });
});
