interface Modules {
    components: Components;
}

interface Components {
    overview: {
        moveToOverview: () => void;
    };
}

var modules: Modules = globalThis.modules || {};
modules.components = modules.components || {};
modules.components.overview = {
    moveToOverview: (selector?: string) => {
        modifyMainSection();

        const toMoveSelector = selector
            ? `.ComponentOverview.${selector}`
            : '.ComponentOverview';

        let toMove = document.querySelector(toMoveSelector);

        if (toMove) {
            getOverviewElement().append(toMove);
        } else {
            const observer = new MutationObserver((mutationList, observer) => {
                for (const _mutation of mutationList) {
                    toMove = document.querySelector(toMoveSelector);
                    if (toMove) {
                        getOverviewElement().append(toMove);
                        observer.disconnect();
                        return;
                    }
                }
            });
            observer.observe(getArticleElement(), {
                childList: true,
                attributes: true,
                subtree: true,
            });
        }
    },
};

const getArticleElement = () => {
    console.log('GAE');
    const articleEl = document.querySelector('#page article');
    if (!articleEl) {
        throw new Error('Overview: article element not found.');
    }
    articleEl.classList.add('article');
    return articleEl;
};

const getOverviewElement = () => {
    console.log('GOE');
    let overviewEl = document.querySelector('#page article.overview');
    if (!overviewEl) {
        overviewEl = document.createElement('article');
        overviewEl.classList.add('overview');
    }
    return overviewEl;
};

const modifyMainSection = () => {
    console.log('GMS');
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
    const overviewEl = getOverviewElement();
    mainSection.appendChild(overviewEl);

    const headerEl = document.querySelector('#page header');
    if (!headerEl) {
        throw new Error('Overview: #page>header not found.');
    }
    headerEl.after(mainSection);
    return mainSection as Element;
};
