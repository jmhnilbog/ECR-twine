interface Modules {
    utilities: Utilities;
}

interface Utilities {
    supplyToVarsSection: (name: string, value: any) => void;
}

var modules: Modules = globalThis.modules || {};
modules.utilities = modules.utilities || {};
modules.utilities.supplyToVarsSection = (name, value) => {
    engine.extend('1.0.0', () => {
        engine.state.set(name, value);
        console.log(`Extended state for ${name}.\n`, value);
    });
};

engine.state.set(
    'modules.utilities.supplyToVarsSection',
    modules.utilities.supplyToVarsSection
);
