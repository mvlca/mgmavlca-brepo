document.addEventListener('DOMContentLoaded', async () => {
    const ctn = document.getElementById('allReports');
    const url = "https://reports.mgmavlca.org/api/reports/fetchtext";
    const form = new FormData();
    form.set("preset", "2026");
    const res = await fetch(url, {
        method: "POST",
        body: form
    });
    const text = await res.text();
    if (!ctn || !text) return;
    ctn.textContent = "";
    ctn.textContent = text;
});