interface Modules {
    utilities: Utilities;
}

interface Utilities {
    uuidv4: (format: string) => string;
}

var modules: Modules = globalThis.modules || {};
modules.utilities = modules.utilities || {};
modules.utilities.uuidv4 = (() => {
    const UUID_V4_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const uuidv4 = (format = UUID_V4_FORMAT) =>
        format.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    return uuidv4;
})();

engine.state.set('modules.utilities.uuidv4', modules.utilities.uuidv4);
