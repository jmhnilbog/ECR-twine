interface Modules {
    data: Data;
}

interface Data {
    Thing: typeof Thing.constructor;
    Character: typeof Character.constructor;
}

window.setup = window.setup || {};
window.setup.data = window.setup.data || {};

interface ThingData {
    name?: string;
    location?: string;
    description?: string;
    mass?: number; // in grams;
    bulk?: number; // in handfuls;
    weapon?: number; // in relative threat units (0 is harmless, 2 is a brass knuckle, 4 is a sword, 10 is a gun)
}

class Inventory {
    maxMass: number = Number.MAX_VALUE;
    maxBulk: number = Number.MAX_VALUE;
    items: Thing[] = [];
    canAcceptMass(grams: number) {
        return this.maxMass >= this.mass + grams;
    }
    canAcceptBulk(handfuls: number) {
        return this.maxBulk >= this.bulk + handfuls;
    }
    canAccept(thing: Thing) {
        return this.canAcceptMass(thing.mass) && this.canAcceptBulk(thing.bulk);
    }
    add(thing: Thing) {
        this.items.push(thing);
    }
    remove(name: string): Thing | undefined {
        const index = this.items.findIndex((i) => i.name === name);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }
    get mass() {
        return this.items
            .map((i) => i.mass)
            .reduce((prev, curr) => prev + curr);
    }
    get bulk() {
        return this.items
            .map((i) => i.bulk)
            .reduce((prev, curr) => prev + curr);
    }
}

class Thing implements ThingData {
    description: string = 'No description.';
    name: string = 'No name.';
    location: string;
    _mass: number = 0; // in grams
    _bulk: number = 0; // in handfuls
    weapon: number = 0; // in relative threat units (0 is harmless, 2 is a brass knuckle, 4 is a sword, 10 is a gun)

    constructor(initializer: ThingData) {
        Object.assign(this, initializer);
    }

    copy() {
        return new Thing(this);
    }

    get mass() {
        return this._mass;
    }
    set mass(m) {
        this._mass = m;
    }
    get bulk() {
        return this._bulk;
    }
    set bulk(b) {
        this._bulk = b;
    }

    toString() {
        let s = this.description;
        if (this.mass) {
            s += ` It has a mass of ${this.mass} grams.`;
        }
        if (this.bulk < 0 && this.bulk > 1) {
            s += ` It fits comfortably in a human hand.`;
        } else if (this.bulk === 1) {
            s += ` It fits in a human hand.`;
        } else if (this.bulk > 1 && this.bulk < 2) {
            s += ` It requires two human hands to carry it comfortably.`;
        } else if (this.bulk === 2) {
            s += ` It requires two human hands to carry.`;
        } else {
            s += ` It is difficult for a human to carry, even with two hands.`;
        }
        return this.description;
    }
}

class Character extends Thing {
    inventory = new Inventory();
    name: string;

    constructor(obj: ThingData) {
        super(obj);
    }

    toString() {
        let s = super.toString();
        return s;
    }
}

window.setup.data.Character = Character;
window.setup.data.Thing = Thing;
