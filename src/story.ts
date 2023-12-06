/**
 * Set up a sidebar, header, and footer.
 */
$(window).on('sm.story.started', () => {
    $(document.createElement('div'))
        .attr('id', 'sidebar-A')
        .insertBefore('.passage');

    $(document.createElement('div'))
        .attr('id', 'sidebar-B')
        .insertAfter('.passage');

    $(document.createElement('header'))
        .attr('id', 'header')
        .insertBefore('#sidebar-A');

    $(document.createElement('footer'))
        .attr('id', 'footer')
        .insertAfter('#sidebar-B');

    // update subsections each passage.
    $(window).on('sm.passage.shown', function () {
        renderToSelector('#sidebar-A', 'Sidebar-A');
        renderToSelector('#sidebar-B', 'Sidebar-B');
        renderToSelector('#header', 'Header');
        renderToSelector('#footer', 'Footer');
    });

    // set default state.
    story.state.reader = {};
    story.state.reader.canAccessGlossary = false;
    story.state.reader.canInspectSelf = false;
    story.state.reader.location = undefined;
    story.state.protagonist = false;
    story.state.animacule = {};
    story.state.life = {};
    story.state.life.seed = setup.d6(6);

    // scroll to the top each passage
    $().on('sm.passage.shown', function () {
        window.scrollTo(0, 0);
    });
});

/**
 * Allow browser back button.
 */
$(window).on('sm.passage.shown', function (_e, data) {
    story.checkpoint(data.passage.name);
});

interface Modules {
    backlink: (label?: string) => string;
    previouslink: (label?: string) => string;
    restartLink: (label?: string) => string;
    d6: (num: number) => number;
}

window.setup = window.setup || {};

window.setup.d6 = (n) => {
    let acc = 0;
    for (var i = 0; i < n; i++) {
        acc += Math.floor(Math.random() * 6) + 1;
    }
    return acc;
};

window.setup.restartLink = (label = 'restart') => {
    return `<a href="javascript:story.start()">
        ${label}
    </a>`;
};

window.setup.backlink = (label = 'back') => {
    const h =
        story.history[story.history.length - 2] || (story.history[0] as number);
    const p = story.passage(h);
    return `<a href="javascript:void(0)" data-passage=${p?.name}>
        ${label}
    </a>`;
};

window.setup.previouslink = (label = 'back') => {
    const h = [...story.history].reverse();
    const currentId = passage.id;
    const previousId = h.find((id) => id !== currentId) || 0;
    const p = story.passage(previousId);

    return `<a href="javascript:void(0)" data-passage=${p?.name}>
        ${label}
    </a>`;
};

interface Modules {
    buildGlossary: () => string;
}

// get all passages tagged [glossary] without [page]
// sort alphabetically by name
// provide a link to each

window.setup.buildGlossary = () =>
    story.passages
        .filter(
            (p) =>
                p !== null &&
                p.tags.includes('glossary') &&
                !p.tags.includes('page')
        )
        .sort((a, b) => ((a?.name || '') <= (b?.name || '') ? -1 : 1))
        .map((p) => {
            const label = p?.name.toUpperCase().replace(/^GLOSSARY-/, '');
            return `<p><h2><a href="javascript:void(0)" data-passage="${p?.name}">${label}</a></h2></p>`;
        })
        .join('');

// interface Modules {
//     storage: GameStorage;
// }

// window.setup.storage = new window.setup.GameStorage();

// let restoring = false;
// $(window).on('sm.story.started', () => {
//     console.log('Testing storage.');
//     const { storage, GameStorage } = window.setup;

//     if (!GameStorage.ok()) {
//         throw new Error('Cannot store game.');
//     }

//     console.log('Storage working?', GameStorage.ok());

//     const previousSession = storage.restore();

//     console.log('previous session:', previousSession);
//     if (previousSession) {
//         console.log('restoring');
//         restoring = true;
//         window.story.restore(previousSession);
//     }
// });

// $(window).on('sm.passage.shown', (_e, _data) => {
//     const { storage, GameStorage } = window.setup;

//     if (restoring) {
//         restoring = false;
//         return;
//     }

//     story.save(story.saveHash());
//     if (GameStorage.ok()) {
//         storage.save(window.story.saveHash());
//     }
// });

$(window).on('sm.passage.shown', (_e, _data) => {
    if (document.querySelector('.fullwidth')) {
        fitty('.fullwidth');
    }
});
