interface Modules {
    modifiers: Modifiers;
}

interface Modifiers {
    box: Modifier;
    move: Modifier;
    definition: Modifier;
    typewriter: Modifier;
}

globalThis.modules = globalThis.modules || {};
globalThis.modules.modifiers = globalThis.modules.modifiers || {};
globalThis.modules.modifiers.definition = {
    match: /^definition/i,
    process: (output, { invocation }) => {
        const chunks = invocation.split(/\s+/);
        chunks.shift();
        const term = chunks.join(' ');

        output.text = `<div class="modifier definition"><div class="dt">${term}</div><div class="dd">${output.text}</div></div>`;

        output.startsNewParagraph = true;
    },
};
globalThis.modules.modifiers.box = {
    match: /^box/i,
    process: (output, { invocation }) => {
        const invocationChunks = invocation.split(/\s+/);
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
            ' '
        )}">${
            bits.rose
                ? "<img src='media/rose.png' alt='LITERALIZED rose as decorative item.'>"
                : ''
        }${output.text}</div>`;

        console.log('bits', bits);

        output.startsNewParagraph = false;
    },
};

globalThis.modules.modifiers.move = {
    match: /^move/i,
    process: (output, { invocation }) => {
        const invocationChunks = invocation.split(/\s+/);
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

        if (bits.clear) {
            const overview = modules.utilities.getOverviewElement();
            overview.innerHTML = '';
        }

        const el = document.createElement('div');
        el.textContent = output.text;

        const overview = modules.utilities.getOverviewElement();
        overview.appendChild(el);

        output.text = '';
        output.startsNewParagraph = false;
    },
};

globalThis.modules.modifiers.typewriter = {
    match: /^typewriter\s/i,
    process(output, { invocation }) {
        // Get the time
        let time = invocation.replace(/^typewriter\s/i, '');

        // Save original text
        let text = output.text;

        // Get length of original text
        let length = text.length;

        // Wipe out output to start
        output.text = '';

        // Loop through the text
        //  -- Add a new <span> for each character
        //  -- Set the class "fade-in"
        //  -- Set the delay as equal to time multiplied position
        for (let i = 0; i < length; i++) {
            output.text += `<span class='fade-in' style='animation-delay: ${
                time * i
            }ms'>${text[i]}</span>`;
        }
    },
};
