interface Modules {
    modifiers: Modifiers;
}

interface Modifiers {
    box: Modifier;
}

var modules: Modules = globalThis.modules || {};
modules.modifiers = modules.modifiers || {};
modules.modifiers.box = {
    match: /^box/i,
    process: (output, _state, _invocation) => {
        output.text = `<div class="modifier-box">${output.text}</div>`;
        output.startsNewParagraph = false;
    },
};
