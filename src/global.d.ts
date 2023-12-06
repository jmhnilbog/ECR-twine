// type PassageId = number;

// interface Passage {
//     id: PassageId;
//     name: string;
//     source: string;
// }

// type EventName<T> = T extends '*' ? '*' : string;

// interface EventBus {
//     emit(eventName: string, data?: any): void;
//     on<T extends string>(
//         eventName: EventName<T>,
//         cb: (data?: any) => void
//     ): void;
//     on<T extends '*'>(
//         eventName: EventName<T>,
//         cb: (name: string, data?: any) => void
//     ): void;
//     addListener<T extends string>(
//         eventName: EventName<T>,
//         cb: (data?: any) => void
//     ): void;
//     addListener<T extends '*'>(
//         star: EventName<T>,
//         cb: (eventName: string, data?: any, timingId?: number) => void
//     ): void;
//     prependListener(
//         eventName: EventName<string>,
//         cb: (data?: any) => void
//     ): void;
//     prependListener(
//         star: EventName<'*'>,
//         cb: (eventName: EventName<string>, data?: any) => void
//     ): void;
//     once(eventName: EventName<string>, cb: (data?: any) => void): void;
//     once(
//         eventName: EventName<'*'>,
//         cb: (eventName: EventName<string>, data?: any) => void
//     ): void;
//     prependOnceListener(eventName: string, cb: (data?: any) => void): void;
//     prependOnceListener(
//         eventName: EventName<'*'>,
//         cb: (eventName: EventName<string>, data?: any) => void
//     ): void;
//     removeListener: (eventName: string, cb: (data?: any) => void) => void;
//     listeners: (eventName: string) => ((data?: any) => void)[];
//     removeAllListeners: (eventName?: string) => void;
// }

// interface Engine {
//     extend: (version: string, f: Function) => void;
//     state: {
//         set: (name: string, f: any) => void;
//         get: (name: string) => any;
//         setDefault: (name: string, f: any) => void;
//     };
//     render: (mkd: string) => string;
//     story: {
//         passageNamed: (s: string) => Passage;
//     };
//     event: EventBus;
// }

// interface Modifier {
//     match: RegExp;
//     process: (
//         output: { text: string; startsNewParagraph: boolean },
//         state: { [key: string]: any },
//         invocation: string
//     ) => void;
// }

// interface Insert {
//     match: RegExp;
//     render: (
//         firstArg: string,
//         props: { [key: string]: any },
//         invocation: string
//     ) => string;
// }

// interface Config {
//     template: {
//         modifiers: Modifier[];
//         inserts: Insert[];
//     };
//     testing: boolean;
//     header: {
//         left: string;
//         center: string;
//         right: string;
//     };
//     footer: {
//         left: string;
//         center: string;
//         right: string;
//     };
//     style: {
//         googleFont: string;
//     };
// }

// interface Browser {
//     height: number;
//     online: boolean;
//     width: number;
//     version: string;
// }

// interface Now {
//     datestamp: string;
//     day: number;
//     hour: number;
//     minute: number;
//     month: number;
//     monthName: string;
//     second: number;
//     timestamp: string;
//     weekday: number;
//     weekdayName: string;
//     year: number;
// }

// interface GPassage {
//     name: string;
//     visits: number;
// }

// declare var modules: Modules;
// declare var engine: Engine;
// declare var config: Config;
// declare var browser: Browser;
// declare var now: Now;
// declare var passage: GPassage;
// declare var story: { name: string };
