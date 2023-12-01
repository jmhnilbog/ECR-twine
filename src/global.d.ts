declare var engine: {
    extend: (version: string, f: Function) => void;
    state: {
        set: (name: string, f: any) => void;
        get: (name: string) => any;
    };
};

declare interface Modifier {
    match: RegExp;
    process: (
        output: { text: string; startsNewParagraph: boolean },
        state: { [key: string]: any },
        invocation: string
    ) => void;
}

declare var config: {
    template: {
        modifiers: Modifier[];
    };
};

declare type Fit = {
    fit: () => void;
    freeze: () => void;
    unfreeze: () => void;
    unsubscribe: () => void;
    element: Element;
};

declare function fitty(element: Element): Fit;
declare function fitty(s: string): Fit[];
