document.addEventListener('DOMContentLoaded', () => {
    const b = document.querySelector('.share-btn');
    b.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('The link is copied');
        }).catch(err => {
            alert('Failed to copy link');
            console.log('Failed to copy link:', err)
        });
    });
});
