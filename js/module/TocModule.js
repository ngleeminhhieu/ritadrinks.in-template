export default function TocModule() {
    const toc = document.querySelector("#articleToc");
    const tocList = document.querySelector("#tocList");
    const content = document.querySelector("#articleContent");
    if (!toc || !tocList || !content) return;

    const sidebar = document.getElementById("tocSidebar");
    const fab = document.getElementById("tocFab");
    const overlay = document.getElementById("tocOverlay");
    const closeBtn = document.getElementById("tocClose");
    const body = document.body;
    let isOpen = false;

    function openSidebar() {
        if (!sidebar) return;
        isOpen = true;
        document.dispatchEvent(new CustomEvent("panel:open", { detail: "toc-sidebar" }));
        sidebar.classList.add("open");
        if (overlay) overlay.classList.add("open");
        body.classList.add("no-scroll");
    }

    function closeSidebar() {
        if (!sidebar) return;
        isOpen = false;
        sidebar.classList.remove("open");
        if (overlay) overlay.classList.remove("open");
        body.classList.remove("no-scroll");
    }

    const headings = content.querySelectorAll("h2, h3");
    if (!headings.length) {
        toc.closest(".blog-detail__toc")?.remove();
        overlay?.remove();
        fab?.remove();
        return;
    }

    if (fab) fab.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);

    document.addEventListener("panel:open", (e) => {
        if (e.detail !== "toc-sidebar" && isOpen) closeSidebar();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) closeSidebar();
    });

    let currentSub = null;

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `toc-heading-${index}`;
        }

        if (heading.tagName === "H2") {
            const item = document.createElement("li");
            item.className = "toc__item";

            const row = document.createElement("div");
            row.className = "toc__row";

            const link = document.createElement("a");
            link.href = `#${heading.id}`;
            link.className = "toc__link";
            link.textContent = heading.textContent;

            const toggle = document.createElement("span");
            toggle.className = "toc__toggle";
            toggle.innerHTML = `<i class="fas fa-chevron-down"></i>`;

            row.append(link, toggle);

            const sub = document.createElement("ul");
            sub.className = "toc__sub";

            item.append(row, sub);
            tocList.appendChild(item);

            row.addEventListener("click", (e) => {
                e.preventDefault();
                if (sub.children.length) {
                    const willOpen = !item.classList.contains("is-open");
                    tocList.querySelectorAll(":scope > li.is-open").forEach((sibling) => {
                        if (sibling !== item) sibling.classList.remove("is-open");
                    });
                    item.classList.toggle("is-open", willOpen);
                }
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                closeSidebar();
            });

            currentSub = sub;
            return;
        }

        if (!currentSub) return;

        const subItem = document.createElement("li");
        subItem.className = "toc__sub-item";

        const subLink = document.createElement("a");
        subLink.href = `#${heading.id}`;
        subLink.className = "toc__sub-link";
        subLink.textContent = heading.textContent;
        subLink.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            closeSidebar();
        });

        subItem.appendChild(subLink);
        currentSub.appendChild(subItem);
    });

    tocList.querySelectorAll(".toc__item").forEach((item) => {
        if (!item.querySelector(".toc__sub").children.length) {
            item.querySelector(".toc__toggle")?.remove();
        }
    });

    tocList.querySelector(".toc__item")?.classList.add("is-open");
}
