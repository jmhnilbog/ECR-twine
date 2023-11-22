(() => {
    /**
     * Things describe game objects. They should have a name at a minimum.
     */
    let Thing = class Thing {
        name = '';
        description = '';

        constructor(obj) {
            Object.assign(this, obj);
        }
        toString() {
            return this.name || this.description || this;
        }
    };

    engine.extend('1.0.0', () => {
        engine.state.setLookup('Thing', () => Thing);
    });

    class Inventory extends Thing {
        _items = [];

        maxBulk = 100;
        maxWeight = 100;

        currentBulk = 0;
        currentWeight = 0;

        constructor(obj) {
            super(obj);
        }

        willAccept(item) {
            return (
                this.currentBulk + (item.bulk || 0) <= this.maxBulk &&
                this.currentWeight + (item.weight || 0) <= this.maxWeight
            );
        }
        addItem(item) {
            this._items.push(item);
            this.currentBulk += item.bulk || 0;
            this.currentWeight += item.weight || 0;
        }
        removeItem(item) {
            let name = item.name || item;
            let i = this._items.findIndex((i) => i.name === name);
            if (i !== -1) {
                let removed = this._items.splice(i, 1);
                this.currentWeight -= removed.weight || 0;
                this.currentBulk -= removed.bulk || 0;
            }
        }

        toString() {
            return `Inventory (${this._items.length}): ${this._items
                .map((i) => i.toString())
                .join(', ')}`;
        }
    }

    class Container extends Thing {
        _inventory;

        constructor(obj) {
            super(obj);

            this._inventory = new Inventory({
                name: 'contents',
                maxBulk: obj.maxBulk,
                maxWeight: obj.maxWeight,
            });
        }

        willAccept(item) {
            return this._inventory.willAccept(item);
        }

        addItem(item) {
            return this._inventory.addItem(item);
        }
        removeItem(item) {
            return this._inventory.removeItem(item);
        }
    }
})();
