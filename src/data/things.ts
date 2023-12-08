interface Modules {
    data: Data;
}

interface Data {
    things: Thing[];
    characters: { [key: Character['name']]: Character };
}

window.setup || window.setup || {};
window.setup.data = window.setup.data || {};
window.setup.data.things = window.setup.data.things || [];
window.setup.data.characters = window.setup.data.characters || [];
(() => {
    const d: ThingData[] = [
        {
            name: 'computer',
            mass: 4000,
            bulk: 1,
            description: `This is a laptop computer.`,
        },
        {
            name: 'sword',
            mass: 5000,
            bulk: 1,
            description: `This is a sword.`,
            weapon: 4,
        },
    ];
    window.setup.data.things = d.map((t) => new Thing(t));
    console.log('Things initialized.');

    const c: ThingData[] = [
        {
            name: 'Nuttal',
            mass: 62000,
            bulk: 4,
            description: `This is a filthy pseudo-medieval peasant.`,
        },
    ];

    window.setup.data.characters = {};
    c.forEach((char) => {
        console.log('creating...', char);
        const character = new Character(char);
        window.setup.data.characters[character.name] = character;
    });
})();
