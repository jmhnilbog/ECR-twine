declare interface Passage {
    source: string;
}

declare var engine: {
    extend: (version: string, f: Function) => void;
    state: {
        set: (name: string, f: any) => void;
        get: (name: string) => any;
    };
    render: (mkd: string) => string;
    story: {
        passageNamed: (s: string) => Passage;
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

declare interface Insert {
    match: RegExp;
    render: (
        firstArg: string,
        props: { [key: string]: any },
        invocation: string
    ) => string;
}

declare var config: {
    template: {
        modifiers: Modifier[];
        inserts: Insert[];
    };
};

declare type Fit = {
    fit: () => void;
    freeze: () => void;
    unfreeze: () => void;
    unsubscribe: () => void;
    element: Element;
};

// declare var fitty(element: Element) Fit;
// declare function fitty(s: string): Fit[];
