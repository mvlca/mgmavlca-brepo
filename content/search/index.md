+++
date = '2025-09-07T17:55:34+06:30'
draft = false
title = 'Search in this Site'
[params.page]
    add = 'search'
+++

{{< inner-html >}}
<div id="search"></div>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({
            element: "#search",
            showSubResults: true,
            showImages: false,
            pageSize: 9
            });
    });
</script>
{{< /inner-html >}}
