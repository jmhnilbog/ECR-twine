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
        const selector = `#page article.article`;
        const mainDiv = document.querySelector(selector);

        if (!mainDiv) {
            throw new Error('No main div?');
        }

        const fitSelector = `.ComponentFit.${marker}`;
        let fitNode = mainDiv ? mainDiv.querySelector(fitSelector) : undefined;

        if (fitNode) {
            fitty(fitNode);
        } else {
            const observer = new MutationObserver((mutationList, observer) => {
                for (const mutation of mutationList) {
                    const fitNode = mainDiv.querySelector(fitSelector);
                    if (fitNode) {
                        console.log('fitNode found; calling fitty()');
                        console.log(mutation);
                        fitty(fitNode);
                        observer.disconnect();
                        return;
                    } else {
                        console.log('fitNode not found.');
                        console.log(mutation);
                    }
                }
            });
            observer.observe(mainDiv, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        }
    },
};

console.log(Object.assign({}, config));

engine.state.set('modules.components.fit', modules.components.fit);
