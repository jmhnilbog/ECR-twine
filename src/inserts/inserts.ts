interface Modules {
    inserts: Inserts;
}

interface Inserts {
    infocard: Insert;
    fullwidth: Insert;
    divider: Insert;
    mention: Insert;
    previous: Insert;
}

globalThis.modules = globalThis.modules || {};
globalThis.modules.inserts = globalThis.modules.inserts || {};
globalThis.modules.inserts.infocard = {
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

globalThis.modules = globalThis.modules || {};
globalThis.modules.inserts = globalThis.modules.inserts || {};
globalThis.modules.inserts.mention = {
    match: /^mention\s+things/i,
    render: (firstArg, _props, _invocation) => {
        const present = engine.state.get(firstArg);
        const presentAsList: string[] = Array.isArray(present)
            ? present
            : [present];

        let result = '';
        if (presentAsList.length) {
            result = `<div>${presentAsList.map(
                (p) => '<p>There is a(n) ' + p + ' here.</p>'
            )}
            </div>`;
        }

        return result;
    },
};

/**
 *
 */
globalThis.modules.inserts.fullwidth = {
    match: /^full\s+width?/i,
    render: (_, props, _invocation) => {
        //@ts-ignore
        const { uniqueClassName } = modules.utilities;
        const { text, id = uniqueClassName(), className = '' } = props;

        const result = `<section class="insert fit ${id} ${className}">${text}</section>`;

        engine.event.once('article-new', () => {
            fitty(`.fit.${id}`);
        });

        return result;
    },
};

globalThis.modules.inserts.divider = {
    match: /^divider(\s+insert)?/i,
    render: (_, props, _invocation) => {
        const { alt = '', src = 'media/rose.png', className } = props;
        const result = `<div class="insert divider ${className}"><img src="${src}" alt="${alt}" /><img src="${src}" alt="${alt}" /><img src="${src}" alt="${alt}" /></div>`;

        return result;
    },
};

globalThis.modules.inserts.previous = (() => {
    const renderLink = (target: string, label: string) => {
        // Does the target look like an external link?

        if (/^\w+:\/\/\/?\w/i.test(target)) {
            return `<a href="${target}">${label || target}</a>`;
        }

        // We'll treat it as an internal one if not.

        return `<a href="${'javascript:void(0)'}" data-cb-go="${target}">${
            label || target
        }</a>`;
    };
    return {
        match: /^previous\s+link/i,
        render(_, props) {
            const trail = [...engine.state.get('trail')];

            // find the first passage in the trail different from this passage.
            trail.reverse();
            const currentPassage = trail.shift();
            const previousPassage =
                trail.find((p) => p !== currentPassage) || trail.pop();

            return renderLink(previousPassage, props.label || 'Back');
        },
    };
})();
