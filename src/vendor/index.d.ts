interface FittyOptions {
    minSize?: number;
    maxSize?: number;
    multiLine?: boolean;
    observeMutations?: MutationObserverInit;
}

interface FitOptions {
    sync?: boolean;
}

interface FittyInstance {
    element: HTMLElement;
    fit: (options?: FitOptions) => void;
    freeze: () => void;
    unfreeze: () => void;
    unsubscribe: () => void;
}

declare interface fitty {
    (el: HTMLElement, options?: FittyOptions): FittyInstance;
    (el: string, options?: FittyOptions): FittyInstance[];
}
