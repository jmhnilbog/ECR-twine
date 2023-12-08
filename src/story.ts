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

    // location state
    const elfward = {};

    const home = {};

    const locations = {
        elfward,
        home,
    };

    // character state
    const reader = {
        canAccessGlossary: false,
        canInspectSelf: false,
        location: undefined,
        inventory: new Inventory(),
    };

    const nuttal = setup.data.characters.Nuttal;

    const characters = {
        reader,
        nuttal,
    };

    // sub-story state
    const prime = {
        seed: 0,
        time: 0,
    };

    const life = {
        seed: setup.d6(6),
        time: 0,
    };

    const earf = {
        seed: setup.d6(6),
        time: 0,
    };

    story.state = {
        characters,
        locations,
        reader,
        protagonist: nuttal,
        story: prime,
        life,
        earf,
    };

    // scroll to the top each passage
    $().on('sm.passage.shown', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    _fieldsToList: (data?: Field) => string;
    infocard: (data: Field, abstract?: string) => string;
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

interface Modules {
    _fieldsToList: (data?: Field) => string;
    infocard: (data: Field, abstract?: string) => string;
}

type Field = { [key: string]: string | number | Field };

window.setup._fieldsToList = (data?: Field) => {
    if (!data) {
        return '';
    }
    const keys = Object.keys(data);
    let listMarkup = '';
    if (keys.length) {
        listMarkup += '<ul>';
        keys.forEach((k: string) => {
            const value = data[k];
            listMarkup += `<li><strong>${k}</strong>: `;
            if (typeof value === 'string') {
                listMarkup += value;
            } else if (typeof value === 'number') {
                listMarkup += value.toString();
            } else {
                listMarkup += window.setup._fieldsToList(value);
            }
            listMarkup += '</li>';
        });
        listMarkup += '</ul>';
    }
    return listMarkup;
};
window.setup.infocard = (data: Field, abstract?: string) => {
    let output = '<div class="infocard">';
    output += window.setup._fieldsToList(data);
    if (abstract) {
        output += `<div class="abstract">${abstract}</div>`;
    }
    output += `</div>`;
    return output;
};
