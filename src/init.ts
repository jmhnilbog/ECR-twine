// run after document ready, before any passages.

(() => {
    const onceReady = () => {
        console.log('Document ready.');

        engine.extend('1.0.0', () => {
            console.log('Hoisting modules into state.');
            engine.state.set('modules', modules);

            console.log('Adding Modifiers:', Object.keys(modules.modifiers));
            config.template.modifiers = [
                ...Object.values(modules.modifiers),
                ...config.template.modifiers,
            ];

            console.log('Adding Inserts:', Object.keys(modules.inserts));
            config.template.inserts = [
                ...Object.values(modules.inserts),
                ...config.template.inserts,
            ];

            console.log('Engine updated.');
        });
    };
    const handler = (_evt: Event) => {
        if (document.readyState === 'complete') {
            onceReady();
            document.removeEventListener('readystatechange', handler);
        }
    };
    if (document.readyState === 'complete') {
        onceReady();
    } else {
        document.addEventListener('readystatechange', handler);
    }
})();
