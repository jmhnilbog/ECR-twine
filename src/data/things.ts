interface Modules {
    data: Data;
}

interface Data {
    things: Thing[];
}

window.setup || window.setup || {};
window.setup.data = window.setup.data || {};
window.setup.data.things = window.setup.data.things || [];

() => {
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
};
