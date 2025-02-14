let observing = false;
let lastUpdate = 0;

const navBarTitlesToHide = [
    'Ads',
    'Direct Messages',
    'Lists',
    'Moments',
    'Personalization',
    'Safety',
];

const observeDOM = (function() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function(obj, callback) {
      if (!obj || obj.nodeType !== 1) {
        return;
      }

      if (MutationObserver) {
        // define a new observer
        var mutationObserver = new MutationObserver(callback);

        // have the observer observe for changes in children
        mutationObserver.observe(obj, {childList: true, subtree: true});
        return mutationObserver;
      } else if (window.addEventListener) { // browser support fallback
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }
    }
  })();

const hideUnwantedHeader = () => {
    const header = document.querySelector('.css-1dbjc4n.r-1u4rsef.r-18u37iz.r-1x0uki6.r-15bsvpr.r-13qz1uu');
    if (header) {
        header.style.display = 'none';
    } else {
        // Not finished loading yet. Try again soon.
        window.setTimeout(hideUnwantedHeader, 10);
    }
};

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
    const existing = document.querySelector('#simplified-link');
    if (existing) {
        // Already there, nothing to do.
        return;
    }
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
    linkEl.setAttribute('href', 'index.html');
    linkEl.setAttribute('id', 'simplified-link');
    linkEl.textContent = 'Go to simplified view';
    container.appendChild(titleEl);
    container.appendChild(linkEl);
};

const onFinishedLoading = () => {
    let now = new Date().getTime();
    if (now - lastUpdate < 2000) {
        // Throttle
        return;
    }
    hideUnwantedHeader();
    hideUnwantedNavItems();
    hideUnwantedStats();
    addLinkToAllInOnePage();
    if (!observing) {
        window.setTimeout(() => {
            observeDOM(document.body, onFinishedLoading);
            observing = true;
        }, 1000);
    }
    lastUpdate = now;
};

window.setTimeout(onFinishedLoading, 0);
