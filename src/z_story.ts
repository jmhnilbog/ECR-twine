engine.extend('1.0.0', () => {
    console.log('Extending engine.');

    // console.log(config.template);
    // console.log('Adding Inserts:', Object.keys(modules.inserts));
    // config.template.inserts = [
    //     ...Object.values(modules.inserts),
    //     ...config.template.inserts,
    // ];
    // console.log('Adding Modifiers:', Object.keys(modules.modifiers));
    // config.template.modifiers = [
    //     ...Object.values(modules.modifiers),
    //     ...config.template.modifiers,
    // ];
    // console.log('Inserts & Modifiers added.', config.template);

    // Testing mode?
    config.testing = false;

    if (config.testing) {
        // link to the test page.
        config.header.left = '[[test-page]]';

        // log more things
        // create events for each log source (action, render, parse, etc)
        engine.event.on(
            '*',
            (name: string, e: { message: string; source: string }) => {
                if (name === 'log') {
                    engine.event.emit(e.source, e);
                } else {
                    // console.log(name, e);
                }
            }
        );
    }
    //@ts-ignore
    config.body.transition.name = 'none';

    modules.utilities.setupDOM();

    engine.event.on('article-new', () => {
        const overview = document.querySelector(
            '#page section.main article.overview'
        );
        if (overview) {
            overview.innerHTML = '';
        }
    });

    // emit an event when the article element changes
    (() => {
        const article = document.querySelector(`#page article`);
        if (!article) {
            throw new Error('Bad HTML: no article element.');
        }

        const observer = new MutationObserver((mutationList, _observer) => {
            let childrenAdded = 0;
            //let attributesChanged = 0;
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
                engine.event.emit('article-new', { target: article });
            }
            console.log('nothing.');
        });
        observer.observe(article, {
            childList: true,
            //attributes: true,
            subtree: false,
        });
    })();

    console.log('Engine updated.');

    console.log('Setting state defaults.');
    modules.state.setDefaults(engine.state);
});
