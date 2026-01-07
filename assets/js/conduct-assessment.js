document.addEventListener('DOMContentLoaded', () => {

    let url = "";
    let trDiv = "";
    let trTemplate = "";
    const erTrToggle = document.querySelectorAll('.tags-references-toggle');
    erTrToggle.forEach(tr => {
        tr.addEventListener('click', async (e) => {
            const trCtn = e.target.nextElementSibling;
            const trTitle = trCtn.querySelector('div:first-child').textContent;
            switch (trTitle) {
                case "Employment Relationship":
                    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQyRMqFPdm5E4YIpIDhsFPclsV-yFZ628UJkWENmc7EcAtrRn6k7vY08lIXY0wJqbUe-dpN_bVlbM5B/pub?gid=0&single=true&output=tsv";
                    trTemplate = document.getElementById('erTrTemplate');
                    trDiv = document.getElementById('erTagsReferences');
                    trDiv.textContent = "Loading..."
                    break;
                case "Working Conditions":
                    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZnAtOFbwZwmPGT_4TeMNvB9UWfsRRzMRkcZxiepOnZn6ibhej42lU4llFBI5kYmcAfrvLBHKTfDUM/pub?gid=0&single=true&output=tsv";
                    trTemplate = document.getElementById('wcTrTemplate');
                    trDiv = document.getElementById('wcTagsReferences');
                    break;
                case "Working Environment":
                    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSVi8Ehle0G4OnWfnMoqdHvXvzildWi6M_kP6hRFDKk-WtXmxkYjQmzf9FRBHBcqBnwd7PfAjnRn2nk/pub?gid=0&single=true&output=tsv";
                    trTemplate = document.getElementById('weTrTemplate');
                    trDiv = document.getElementById('weTagsReferences');
                    break;
                case "Worker Treatment":
                    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSvmq_Xv_FSg7ygwFwzhgUScUNduQmVfL8H_OWqqFymERDwJnRfDAJ027g6i-2_i51rJNC5SteJNMgq/pub?gid=0&single=true&output=tsv";
                    trTemplate = document.getElementById('wtTrTemplate');
                    trDiv = document.getElementById('wtTagsReferences');
                    break;
                case "Industrial Relations":
                    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8H2BSf88RvBihlwjQIVD1Cqwrzp5SMYV-vFpSCJgw2ueKoUiqzTk7I-zcC9TuKCHo3dBiXhcKS1sb/pub?gid=0&single=true&output=tsv";
                    trTemplate = document.getElementById('irTrTemplate');
                    trDiv = document.getElementById('irTagsReferences');
                    break;
                default:
                    console.log("default: no trTitle");
                    break;
            }
            trDiv.textContent = "Loading...";
            if (trCtn.style.display === 'none' || trCtn.style.display === '') {
                trCtn.style.display = 'block';
                e.target.innerHTML = '&minus;';
                const raw = await fetch(url);
                const res = await raw.text();
                trDiv.innerHTML = "";
                res.trim().split("\n").forEach(line => {
                    if (!line.trim()) return;
                    const cols = line.split("\t");
                    if (cols.length < 3) return;
                    const clone = trTemplate.content.cloneNode(true);
                    clone.querySelector(".tag-name").textContent = cols[0];
                    clone.querySelector(".tag-link").textContent = cols[1];
                    clone.querySelector(".tag-description").textContent = cols[2];
                    trDiv.appendChild(clone);
                });
            } else {
                trCtn.style.display = 'none';
                e.target.innerHTML = '&plus;';
            }
        });
    });

    document.querySelectorAll('.grade-selector').forEach(gsb => {
        gsb.addEventListener('change', (e) => {
            const gTable = e.target.nextElementSibling;
            const allTd = gTable.querySelectorAll('tr td');
            allTd.forEach(td => {
                td.classList.remove('selectcolor');
            });
            const nA = gTable.querySelector('tr td.gna');
            const nB = gTable.querySelector('tr td.gnb');
            const pA = gTable.querySelector('tr td.gpa');
            const pB = gTable.querySelector('tr td.gpb');
            const fA = gTable.querySelector('tr td.gfa');
            const fB = gTable.querySelector('tr td.gfb');
            const hA = gTable.querySelector('tr td.gha');
            const hB = gTable.querySelector('tr td.ghb');
            switch (e.target.value) {
                case "nanb":
                    nA.classList.add('selectcolor');
                    nB.classList.add('selectcolor');
                    break;
                case "nbpa":
                    nB.classList.add('selectcolor');
                    pA.classList.add('selectcolor');
                    break;
                case "papb":
                    pA.classList.add('selectcolor');
                    pB.classList.add('selectcolor');
                    break;
                case "pbfa":
                    pB.classList.add('selectcolor');
                    fA.classList.add('selectcolor');
                    break;
                case "fafb":
                    fA.classList.add('selectcolor');
                    fB.classList.add('selectcolor');
                    break;
                case "fbha":
                    fB.classList.add('selectcolor');
                    hA.classList.add('selectcolor');
                    break;
                case "hahb":
                    hA.classList.add('selectcolor');
                    hB.classList.add('selectcolor');
                    break;
                default:
                    console.log("default case: clear grade selection.");
                    break;
            }
        });
    });

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
    console.log("end...");
});
