/**
 * This is the code that runs last, before any passages are shown.
 * It must be named LAST alphabetically, hence the weird file name.
 */

engine.extend('1.0.0', () => {
    //@ts-ignore
    engine.event.on('*', (e, t) => {
        console.log('LOGGING EVENT', e, t);
    });
    //@ts-ignore
    engine.event.on('dom-click', (e, t) => {
        modules.utilities.getOverviewElement().textContent = '';
    });
    console.log('Hoisting modules into state.');
    console.log(modules);
    console.log(engine.state);
    console.log(config);
    engine.state.set('utilities', modules.utilities);
    engine.state.set('components', modules.components);

    modules.utilities.setupDOM();

    console.log('Adding Modifiers:', Object.keys(modules.modifiers));
    config.template.modifiers = [
        ...Object.values(modules.modifiers),
        ...config.template.modifiers,
    ];

    console.log('Added Modifiers:');

    console.log('Adding Inserts:', Object.keys(modules.inserts));
    config.template.inserts = [
        ...Object.values(modules.inserts),
        ...config.template.inserts,
    ];

    console.log('Engine updated.');

    // emit an event when the article element changes
    const article = document.querySelector(`#page article`) as Element;

    const observer = new MutationObserver((mutationList, _observer) => {
        console.log(mutationList.length, 'mutations.');

        let childrenAdded = 0;
        //let _attributesChanged = 0;
        let childrenRemoved = 0;
        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                if (mutation.addedNodes.length > 0) {
                    childrenAdded++;
                }
                if (mutation.removedNodes.length > 0) {
                    childrenRemoved++;
                }
                // engine.event.emit('article-mutation-childList', mutation);
            } else if (mutation.type === 'attributes') {
                //engine.event.emit('article-mutation-attributes', mutation);
            } else {
                //engine.event.emit('article-mutation', mutation);
            }
        }
        if (childrenAdded) {
            engine.event.emit('article-change', { target: article });
        }
    });
    observer.observe(article, {
        childList: true,
        attributes: true,
        subtree: true,
    });
});
