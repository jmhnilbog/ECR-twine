import type { marked as mkd } from 'marked';

type PassageId = number;
type PassageName = string;
type PassageIdOrName = Passage['id'] | Passage['name'];

declare global {
    var marked: typeof mkd;
    // also $
    // also _
    var setup: Modules;
    var story: Story;
    var passage: Passage;
    var s: Story['state'];
    var either: <T extends any[]>(...choices: T[] | T) => T;
    var hasVisited: (...idsOrPassageNames: PassageIdOrName[]) => boolean;
    var visited: (...idsOrPassageNames: PassageIdOrName[]) => number;
    var renderToSelector: (selector: string, torender: PassageIdOrName) => void;
    var getStyles: <T>(...urls: string[]) => Promise<T>;
}

declare enum StoryEvents {
    Started = 'sm.story.started',
    Error = 'sm.story.error',
}

declare enum PassageEvents {
    Hidden = 'sm.passage.hidden',
    Showing = 'sm.passage.showing',
    Shown = 'sm.passage.shown',
}

declare enum CheckpointEvents {
    Added = 'sm.checkpoint.added',
    Failed = 'sm.checkpoint.failed',
}

interface Story {
    name: string;
    startPassage: PassageId;
    creator: string;
    creatorVersion: string;
    history: PassageId[];
    state: { [key: string]: any };
    checkpointName: string;
    ignoreErrors: boolean;
    errorMessage: string;
    passages: Passage[];
    userScripts: any[];
    userStyles: any[];
    atCheckpoint: boolean;
    checkpoint: (name?: string) => void;
    passage: (p: PassageIdOrName) => Passage | null;
    render: (p: PassageIdOrName) => string;
    restore: (hash: string) => boolean;
    save: (s: string) => string;
    saveHash: () => string;
    show: (p: PassageIdOrName, noHistory?: boolean) => void;
    start: () => void;
}

interface Passage {
    id: number;
    name: string;
    tags: string[];
    source: string;
    render: (source: string) => string;
}

export { Story, Passage };
