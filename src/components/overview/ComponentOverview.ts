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
    moveToOverview: () => {
        const articleEl = getArticleElement();
        const overviewEl = getOverviewElement();

        const toMove = articleEl.querySelector('.ComponentOverview');
        if (toMove) {
            overviewEl.append(toMove);
        } else {
            const observer = new MutationObserver((mutationList, observer) => {
                for (const _mutation of mutationList) {
                    const node = articleEl.querySelector('.ComponentOverview');
                    if (node) {
                        overviewEl.append(node);
                        observer.disconnect();
                        return;
                    }
                }
            });
            observer.observe(articleEl, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        }
    },
};

const getArticleElement = () => {
    const articleEl = document.querySelector('#page article');
    if (!articleEl) {
        throw new Error('Overview: article element not found.');
    }
    articleEl.classList.add('article');
    return articleEl;
};

const getOverviewElement = () => {
    let overviewEl = document.querySelector(
        '#page>section.main>article.overview'
    );
    if (!overviewEl) {
        overviewEl = document.createElement('article');
        overviewEl.classList.add('overview');
    }
    return overviewEl;
};

const getMainSection = () => {
    const pageEl = document.querySelector('#page');
    if (!pageEl) {
        throw new Error('Overview: #page not found.');
    }

    let mainSection = document.querySelector('#page>section.main');
    if (!mainSection) {
        mainSection = document.createElement('section');
        mainSection.classList.add('main');

        const articleEl = getArticleElement();
        mainSection.appendChild(articleEl);
        const overviewEl = getOverviewElement();
        mainSection.appendChild(overviewEl);

        const headerEl = document.querySelector('#page>header');
        if (!headerEl) {
            throw new Error('Overview: #page>header not found.');
        }
        headerEl.append(mainSection);
    }
};

modules.components.overview.moveToOverview();

engine.state.set('modules.components.overview', modules.components.overview);
