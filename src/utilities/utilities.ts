interface Modules {
    utilities: Utilities;
}

interface Utilities {
    toSafeClassName: (s: string) => string;
    uuidv4: (format?: string) => string;
    uniqueClassName: () => string;
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

modules.utilities.uniqueClassName = () =>
    modules.utilities.toSafeClassName(modules.utilities.uuidv4());
