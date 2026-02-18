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

    // const appScriptId = "AKfycbxNBipzRe0emt7-6qMV1nxzWLcAzbn61VMhJXqaqqDgEab0tUIgbqrqIfij7WBWwfAv";

    const factoriesCount = document.getElementById('factories-count');
    const factoriesBlock = document.getElementById('factories-block');
    const factoriesTemplate = document.getElementById('factories-template');

    function loadFactories() {
        // const url = `https://script.google.com/macros/s/${appScriptId}/exec?sheet=2025Overview4`;
        const url = `https://docs.mgmaemp.com/public/vlca-Flist-2025.json`;

        factoriesCount.textContent = "...";
        factoriesBlock.innerHTML = 'Please wait. Loading ...';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                factoriesBlock.innerHTML = '';
                factoriesCount.textContent = data.length;

                // build array with objects for search
                factories = data.map(factoryData => {
                    const clone = factoriesTemplate.content.cloneNode(true);
                    const eachBlock = clone.querySelector('.each-factory-block');

                    eachBlock.querySelector('.each-factory-name').textContent = factoryData.FName;
                    eachBlock.querySelector('.each-factory-type').textContent = factoryData.COwner;
                    eachBlock.querySelector('.each-factory-workers').textContent = factoryData.Workers;
                    eachBlock.querySelector('.each-factory-position').textContent = factoryData.Position;
                    eachBlock.querySelector('.each-factory-timestamp').textContent = factoryData.Timestamp;

                    factoriesBlock.appendChild(eachBlock);

                    // return object for searching
                    return {
                        FName: factoryData.FName || "",
                        COwner: factoryData.COwner || "",
                        element: eachBlock
                    };
                });
            })
            .catch(err => {
                factoriesBlock.innerHTML = "Error loading data.";
                factoriesCount.textContent = "Error";
                console.error("Fetch error:", err);
            });
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