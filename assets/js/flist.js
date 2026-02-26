document.addEventListener('DOMContentLoaded', () => {
    let factories = [];

    const factoriesSearch = document.getElementById('factories-search');
    factoriesSearch.addEventListener('input', e => {
        const value = e.target.value.toLowerCase();
        factories.forEach(factory => {
            const isVisible =
                factory.FName.toLowerCase().includes(value) ||
                factory.COwner.toLowerCase().includes(value);
            factory.element.classList.toggle("factories-hidden", !isVisible);
        });
        const visibleCount = factories.filter(factory => !factory.element.classList.contains("factories-hidden")).length;
        factoriesCount.textContent = visibleCount;
    });

    const factoriesCount = document.getElementById('factories-count');
    const factoriesBlock = document.getElementById('factories-block');
    const factoriesTemplate = document.getElementById('factories-template');

    
    async function loadFactories () {
        const varCon = document.getElementById('varFFM');
        const url = varCon.getAttribute('data-custom-var');

        factoriesCount.textContent = "...";
        factoriesBlock.innerHTML = 'Please wait. Loading ...';

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch TSV.");

            const text = await res.text();
            const lines = text.trim().split('\n');
            const headers = lines[0].split('\t').map(h => h.trim());
            const data = lines.slice(1).map(line => {
                const values = line.split('\t');
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i] ? values[i].trim() : "";
                });
                return obj;
            });

            factoriesBlock.innerHTML = "";
            factoriesCount.textContent = data.length;

            factories = data.map(factoryData => {
                const clone = factoriesTemplate.content.cloneNode(true);
                const eachBlock = clone.querySelector('.each-factory-block');

                eachBlock.querySelector('.each-factory-name').textContent = factoryData.FName || "";
                eachBlock.querySelector('.each-factory-type').textContent = factoryData.COwner || "";
                eachBlock.querySelector('.each-factory-workers').textContent = factoryData.FWorkers || "";
                eachBlock.querySelector('.each-factory-position').textContent = factoryData.PPosition || "";
                eachBlock.querySelector('.each-factory-timestamp').textContent = factoryData.Timestamp || "";

                factoriesBlock.appendChild(eachBlock);

                return {
                    FName: factoryData.FName || "",
                    COwner: factoryData.COwner || "",
                    element: eachBlock
                };
            });
        } catch (err) {
            factoriesBlock.innerHTML = "Error loading data."
            factoriesCount.textContent = "Error";
            console.error("Fetch error: ", err);
        }
    }

    // Load data on page ready
    loadFactories();

    const searchForm = document.querySelector('.factories-search-form');
    searchForm.addEventListener('reset', () => {
        document.getElementById('factories-search').value = '';
        factories.forEach(factory => {
            factory.element.classList.remove('factories-hidden');
        });
        factoriesCount.textContent = factories.length;
    });
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});
