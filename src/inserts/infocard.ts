interface Modules {
    inserts: Inserts;
}

interface Inserts {
    infocard: Insert;
}

var modules: Modules = globalThis.modules || {};
globalThis.modules = modules;
modules.inserts = modules.inserts || {};
modules.inserts.infocard = {
    match: /^infocard\s+passage/i,
    render: (firstArg, _props, _invocation) => {
        const mainRender = engine.render;
        const passageNamed = engine.story.passageNamed;
        const passage = passageNamed(firstArg);
        const result = `<div class="infocard">${mainRender(
            passage.source
        )}</div>`;

        return result;
    },
};
