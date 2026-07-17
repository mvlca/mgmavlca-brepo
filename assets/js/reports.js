document.addEventListener('DOMContentLoaded', async () => {
    const ctn = document.getElementById('allReports');
    const apiUrl = "https://reports.mgmavlca.org/api/reports/fetchtext";
    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            preset: "2026"
        })
    });
    const text = await res.text();
    if (!ctn || !text) return;
    ctn.textContent = "";
    ctn.textContent = text;
});