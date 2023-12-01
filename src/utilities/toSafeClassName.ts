interface Modules {
    utilities: Utilities;
}

interface Utilities {
    toSafeClassName: (s: string) => string;
}

var modules: Modules = globalThis.modules || {};
modules.utilities = modules.utilities || {};
modules.utilities.toSafeClassName = (s: string): string => {
    const unsafe = s.toString();
    const safe = encodeURIComponent(unsafe)
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, '');
    return 'X' + safe;
};
engine.state.set('modules.utilities.uuidv4', modules.utilities.toSafeClassName);
