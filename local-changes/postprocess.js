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

const onFinishedLoading = () => {
    hideUnwantedNavItems();
    hideUnwantedStats();
};

window.setTimeout(onFinishedLoading, 0);
