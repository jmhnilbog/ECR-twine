interface Modules {
    inserts: Inserts;
}

interface Inserts {
    infocard: Insert;
    fullwidth: Insert;
    divider: Insert;
}

var modules: Modules = globalThis.modules || modules || {};
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

/**
 *
 */
modules.inserts.fullwidth = {
    match: /^full\s+width?/i,
    render: (_, props, _invocation) => {
        //@ts-ignore
        const { onMutation, uniqueClassName } = modules.utilities;
        const { text, id = uniqueClassName(), className = '' } = props;

        const result = `<section class="insert fit ${id} ${className}">${text}</section>`;

        onMutation(`.fit.${id}`, (node: Element) => {
            fitty(node as HTMLElement);
        });
        return result;
    },
};

modules.inserts.divider = {
    match: /^divider(\s+insert)?/i,
    render: (_, props, _invocation) => {
        const { alt = '', src = 'images/rose.png' } = props;
        const result = `<div class="insert divider"><img src="${src}" alt="${alt}" /><img src="${src}" alt="${alt}" /><img src="${src}" alt="${alt}" /></div>`;

        return result;
    },
};
