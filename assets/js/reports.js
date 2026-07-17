document.addEventListener('DOMContentLoaded', async () => {
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
        lines.slice(1).map(line => {
            const cols = line.split('\t');
            const clone = temp.content.cloneNode(true);
            if (!clone) return;
            const name = clone.querySelector('.each-report .name');
            const grade = clone.querySelector('.each-report .grade');
            const status = clone.querySelector('.each-report .status-line .status');
            const country = clone.querySelector('.each-report .status-line .country');
            const period = clone.querySelector('.each-report .status-line .period');
            const date = clone.querySelector('.each-report .status-line .date');
            const timestamp = clone.querySelector('.each-report .status-line .timestamp');
            const a = document.createElement('a');
            a.href = `https://reports.mgmavlca.org/members/report?rid=${cols[1]}`;
            a.textContent = cols[7];
            if (name) name.appendChild(a);
            if (grade) grade.textContent = cols[6];
            if (status) status.textContent = cols[11];
            if (country) country.textContent = cols[8];
            if (period) period.textContent = cols[3];
            if (date) date.textContent = cols[2];
            if (timestamp) timestamp.textContent = cols[0];
            ctn.appendChild(clone);
        });
    } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        ctn.textContent = `Caught: ${error}`;
    }
});