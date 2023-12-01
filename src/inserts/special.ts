interface Modules {
    inserts: Inserts;
}

interface Inserts {
    special: Insert;
}

var modules: Modules = globalThis.modules || {};
globalThis.modules = modules;
modules.inserts = modules.inserts || {};
modules.inserts.special = {
    match: /^icon of/i,
    render(firstArg, props, _invocation) {
        let result = '';

        if (firstArg.toLowerCase() === 'wizard') {
            result = '🧙';
        }

        if (firstArg.toLowerCase() === 'vampire') {
            result = '🧛';
        }

        switch (props.mood.toLowerCase()) {
            case 'anger':
                result += '💥';
                break;

            case 'love':
                result += '❤️';
                break;
        }

        return result;
    },
};
