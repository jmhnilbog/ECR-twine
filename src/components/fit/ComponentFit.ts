interface Modules {
    components: Components;
}

interface Components {
    fit: {
        fit: (s: string) => any;
    };
}

var modules: Modules = globalThis.modules || {};
modules.components = modules.components || {};
modules.components.fit = {
    fit: (marker: string) => {
        const selector = `#page article`;
        const article = document.querySelector(selector);

        if (!article) {
            throw new Error('No main div?');
        }

        const fitSelector = `.ComponentFit.${marker}`;
        let fitNode = article.querySelector(fitSelector);

        if (fitNode) {
            fitty(fitNode);
        } else {
            const observer = new MutationObserver((mutationList, observer) => {
                for (const _mutation of mutationList) {
                    const fitNode = article.querySelector(fitSelector);
                    if (fitNode) {
                        fitty(fitNode);
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
    },
};
