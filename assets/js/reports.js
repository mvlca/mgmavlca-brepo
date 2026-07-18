let reports = [];
function updateCount() {
    const count = document.getElementById('reports-count');
    const visible = Array.from(reports).filter(el => el.style.display !== 'none').length;
    count.textContent = visible.toString();
}
const input = document.querySelector('form.reports-search input');
function searchReports() {
    input.addEventListener('input', () => {
        const value = input.value.toLowerCase();
        reports.forEach((report) => {
            const text = report.textContent.toLowerCase() || "";
            report.style.display = text.includes(value) ? '' : 'none';
        });
        updateCount();
    });
}
const form = document.querySelector('form.reports-search');
function clearSearch() {
    form.addEventListener('reset', () => {
        input.value = '';
        reports.forEach((report) => {
            report.style.display = '';
        });
        updateCount();
    });
}
function preventFromSubmit() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}
async function reportsList() {
    const ctn = document.getElementById('all-reports');
    const temp = document.getElementById('reports-template');
    if (!ctn || !temp) return;
    try {
        const apiUrl = "https://reports.mgmavlca.org/api/reports/fetchtext";
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ preset: "2026" })
        });
        const text = res ? (await res.text()) : "No data found";
        ctn.textContent = "";
        const lines = text.split(/\r?\n/);
        reports = lines.slice(1).map(line => {
            const cols = line.split('\t');
            const clone = temp.content.cloneNode(true);
            const each = clone.querySelector('div.each-report');
            if (!clone || !each) return;
            const name = each.querySelector('.name');
            const grade = each.querySelector('.grade');
            const country = each.querySelector('div .country');
            const workers = each.querySelector('div .workers');
            const status = each.querySelector('.status-line .status');
            const period = each.querySelector('.status-line .period');
            const date = each.querySelector('.status-line .date');
            const timestamp = each.querySelector('.status-line .timestamp');
            const a = document.createElement('a');
            a.href = `https://reports.mgmavlca.org/members/report?rid=${cols[1]}`;
            a.textContent = cols[7];
            if (name) name.appendChild(a);
            if (grade) grade.textContent = cols[6];
            if (status) status.textContent = cols[11];
            if (country) country.textContent = cols[8];
            if (workers) workers.textContent = cols[10];
            if (period) period.textContent = cols[3];
            if (date) date.textContent = cols[2];
            if (timestamp) timestamp.textContent = cols[0];
            ctn.appendChild(clone);
            return each;
        });
        updateCount();
    } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        ctn.textContent = `Caught: ${error}`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    reportsList();
    updateCount();
    searchReports();
    clearSearch();
    preventFromSubmit();
});