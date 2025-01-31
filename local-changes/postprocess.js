const navBarTitlesToHide = [
    'Ads',
    'Direct Messages',
    'Moments',
    'Personalization',
    'Safety',
];

const hideUnwantedNavItems = () => {
    const navBarItems = document.querySelectorAll('[role="menuitem"]');
    if (navBarItems.length === 0) {
        // Not finished loading yet. Try again soon.
        window.setTimeout(onFinishedLoading, 10);
    }
    for (let item of navBarItems) {
        console.log(item);
        console.log(item.getAttribute('aria-label'));
        if (navBarTitlesToHide.includes(item.getAttribute('aria-label'))) {
            item.style.display = 'none';
        }
    }
};

const onFinishedLoading = () => {
    hideUnwantedNavItems();
    edit
};

window.setTimeout(onFinishedLoading, 0);
