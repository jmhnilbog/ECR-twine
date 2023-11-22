(() => {
    let items = [{ name: 'sword', description: 'A small sword.' }];

    engine.extend('1.0.0', () => {
        engine.state.setLookup('ItemData', () => items);
    });

    console.log("Items' data ready.");
})();
