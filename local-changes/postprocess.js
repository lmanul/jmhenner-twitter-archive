const navBarTitlesToHide = [
    'Ads',
    'Direct Messages',
    'Lists',
    'Moments',
    'Personalization',
    'Safety',
];

const hideUnwantedNavItems = () => {
    const navBarItems = document.querySelectorAll('[role="menuitem"]');
    if (navBarItems.length === 0) {
        // Not finished loading yet. Try again soon.
        window.setTimeout(hideUnwantedNavItems, 10);
        return;
    }
    for (let item of navBarItems) {
        if (navBarTitlesToHide.includes(item.getAttribute('aria-label'))) {
            item.style.display = 'none';
        }
    }
};

const hideUnwantedStats = () => {
    // These class names won't ever change now!
    const statItems = document.querySelectorAll('.css-1dbjc4n.r-1loqt21.r-1f720gc');
    if (statItems.length === 0) {
        // Not finished loading yet. Try again soon.
        window.setTimeout(hideUnwantedStats, 10);
        return;
    }
    // We only want to keep the first two.
    for (let i = 2; i < statItems.length; i++) {
        statItems[i].style.display = 'none';
    }
};

const addLinkToAllInOnePage = () => {
    const container = document.querySelector('.css-1dbjc4n.r-15bsvpr.r-feyk0v');
    if (!container) {
        // Not finished loading yet. Try again soon.
        window.setTimeout(addLinkToAllInOnePage, 10);
        return;
    }
    const titleEl = document.createElement('div');
    titleEl.classList.add('css-901oao', 'r-hkyrab', 'r-1qd0xha', 'r-a023e6', 'r-vw2c0b', 'r-ad9z0x', 'r-bcqeeo', 'r-qvutc0');
    titleEl.textContent = 'Alternate view';
    const linkEl = document.createElement('a');
    linkEl.setAttribute('href', 'browse.html');
    linkEl.textContent = 'Go to simplified view';
    container.appendChild(titleEl);
    container.appendChild(linkEl);
};

const onFinishedLoading = () => {
    hideUnwantedNavItems();
    hideUnwantedStats();
    addLinkToAllInOnePage();
};

window.setTimeout(onFinishedLoading, 0);
