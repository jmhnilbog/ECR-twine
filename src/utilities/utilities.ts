interface Modules {
    utilities: Utilities;
}

interface Utilities {
    toSafeClassName: (s: string) => string;
    uuidv4: (format?: string) => string;
    uniqueClassName: () => string;
    onMutation: (selector: string, cb: (node: Element) => void) => void;
    setupDOM: () => void;
    getOverviewElement: () => Element;
    moveToOverview: any;
}

var modules: Modules = globalThis.modules || modules || {};
globalThis.modules = modules;
modules.utilities = modules.utilities || {};
modules.utilities.toSafeClassName = (s: string): string => {
    const unsafe = s.toString();
    const safe = encodeURIComponent(unsafe)
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, '');
    return 'X' + safe;
};

modules.utilities.uuidv4 = (() => {
    const UUID_V4_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const uuidv4 = (format = UUID_V4_FORMAT) =>
        format.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    return uuidv4;
})();

modules.utilities.uniqueClassName = () =>
    modules.utilities.toSafeClassName(modules.utilities.uuidv4());

modules.utilities.onMutation = (
    selector: string,
    cb: (node: Element) => void
) => {
    const article = document.querySelector(`#page article`);

    if (!article) {
        throw new Error('No main div?');
    }

    let node = article.querySelector(selector);

    if (node) {
        cb(node as HTMLElement);
    } else {
        const observer = new MutationObserver((mutationList, observer) => {
            for (const _mutation of mutationList) {
                const node = article.querySelector(selector);
                if (node) {
                    cb(node as HTMLElement);
                    observer.disconnect();
                    return;
                }
            }
        });
        observer.observe(article, {
            childList: true,
            attributes: true,
            subtree: true,
        });
    }
};
modules.utilities.getOverviewElement = () => {
    let overviewEl = document.querySelector('#page article.overview');
    if (!overviewEl) {
        overviewEl = document.createElement('article');
        overviewEl.classList.add('overview');
    }
    return overviewEl;
};

modules.utilities.setupDOM = (() => {
    const getArticleElement = () => {
        const articleEl = document.querySelector('#page article');
        if (!articleEl) {
            throw new Error('Overview: article element not found.');
        }
        articleEl.classList.add('article');
        return articleEl;
    };

    const getMainSection = () => {
        const pageEl = document.querySelector('#page');
        if (!pageEl) {
            throw new Error('Overview: #page not found.');
        }

        let mainSection = document.querySelector('#page section.main');

        if (!mainSection) {
            mainSection = document.createElement('section');
            mainSection.classList.add('main');
        }

        const articleEl = getArticleElement();
        mainSection.appendChild(articleEl);
        const overviewEl = modules.utilities.getOverviewElement();
        mainSection.appendChild(overviewEl);

        const headerEl = document.querySelector('#page header');
        if (!headerEl) {
            throw new Error('Overview: #page>header not found.');
        }
        headerEl.after(mainSection);
        return mainSection as Element;
    };

    return () => getMainSection();
})();
