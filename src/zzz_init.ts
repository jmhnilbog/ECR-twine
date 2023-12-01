/**
 * This is the code that runs last, before any passages are shown.
 * It must be named LAST alphabetically, hence the weird file name.
 */

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
