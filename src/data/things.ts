interface Modules {
    data: Data;
}

interface Data {
    things: Thing[];
}

globalThis.modules || globalThis.modules || {};
globalThis.modules.data = globalThis.modules.data || {};
globalThis.modules.data.things = globalThis.modules.data.things || [];

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
    modules.data.things = d.map((t) => new Thing(t));

    console.log('Things initialized.');
};
