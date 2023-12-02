interface Modules {
    modifiers: Modifiers;
}

interface Modifiers {
    box: Modifier;
    move: Modifier;
}

var modules: Modules = globalThis.modules || modules || {};
globalThis.modules = modules;
modules.modifiers = modules.modifiers || {};
modules.modifiers.box = {
    match: /^box/i,
    process: (output, state, _invocation) => {
        console.log('output', output);
        console.log('state', state);
        console.log('invocation', _invocation);
        const invocationChunks = state.invocation.split(/\s+/);
        const modifierName = invocationChunks.shift();
        console.log(modifierName);
        const bits: { [keys: string]: string } = {};
        invocationChunks.forEach((c: string) => {
            const split: string[] = c.split('=');
            if (split.length === 1) {
                //@ts-ignore
                bits[split[0]] = true;
            } else {
                //@ts-ignore
                bits[split[0]] = split[1];
            }
        });

        output.text = `<div class="modifier box ${Object.keys(bits).join(
            ', '
        )}">${
            bits.rose
                ? "<img src='images/rose.png' alt='LITERALIZED rose as decorative item.'>"
                : ''
        }${output.text}</div>`;

        console.log('bits', bits);

        output.startsNewParagraph = false;
    },
};

modules.modifiers.move = {
    match: /^move/i,
    process: (output, state, _invocation) => {
        console.log('output', output);
        console.log('state', state);
        console.log('invocation', _invocation);
        const invocationChunks = state.invocation.split(/\s+/);
        const modifierName = invocationChunks.shift();
        console.log(modifierName);
        const bits: { [keys: string]: string } = {};
        invocationChunks.forEach((c: string) => {
            const split: string[] = c.split('=');
            if (split.length === 1) {
                //@ts-ignore
                bits[split[0]] = true;
            } else {
                //@ts-ignore
                bits[split[0]] = split[1];
            }
        });

        const el = document.createElement('div');
        el.textContent = output.text;

        const overview = modules.utilities.getOverviewElement();
        overview.appendChild(el);

        output.text = '';
        output.startsNewParagraph = false;
    },
};
