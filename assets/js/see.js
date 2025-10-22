document.addEventListener('DOMContentLoaded', function () {
    copyLink();
    titleToggle();
});

// copy the link to clipboard
function copyLink() {
    const copyLinkBtn = document.querySelectorAll('i.fa-solid.fa-link');
    copyLinkBtn.forEach(b => {
        b.addEventListener('click', (e) => {
            const titleId = e.target.parentElement.id;
            if (!titleId) return;
            const link = `${window.location.origin}${window.location.pathname}#${titleId}`;
            navigator.clipboard.writeText(link);
            alert('The link is copied.');
        });
    });
}

function titleToggle() {
    const titleBtns = document.querySelectorAll('.see-container > h3');
    titleBtns.forEach(titleBtn => {
        titleBtn.addEventListener('click', () => {
            let sibling = titleBtn.nextElementSibling;
            while (sibling) {
                if (sibling.style.display === 'block' || sibling.style.display === '') {
                    sibling.style.display = 'none';
                } else {
                    sibling.style.display = 'block';
                }
                sibling = sibling.nextElementSibling;
            }
        });
    });
}
