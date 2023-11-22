(() => {
    class Game {
        items;

        constructor() {}

        async initialize() {
            // turn data into objects
            let itemData = engine.state.get('ItemData');
            let Item = engine.state.get('Thing');

            this.items = {};
            itemData.forEach((item) => {
                this.items[item.name] = new Item(item);
            });
        }
    }

    engine.extend('1.0.0', () => {
        engine.state.set('Game', new Game());
    });
})();
