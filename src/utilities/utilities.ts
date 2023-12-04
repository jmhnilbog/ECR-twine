interface Modules {
    utilities: Utilities;
}

interface Utilities {
    toSafeClassName: (s: string) => string;
    uuidv4: (format?: string) => string;
    uniqueClassName: () => string;
    onMutation: (selector: string, cb: (node: Element) => void) => void;
    setupDOM: () => void;
    getOverviewElement: () => Element;
    moveToOverview: any;
    wrapMarkdown: (
        markdown: string,
        attributes: { [key: string]: any }
    ) => string;
}

globalThis.modules || globalThis.modules || {};
globalThis.modules.utilities = globalThis.modules.utilities || {};

/**
 * Sometimes you'd like to wrap a block of Markdown text in a <div> tag to apply
 * some effect to it... but doing so turns off Markdown paragraphing inside the tag
 * because Markdown leaves block tags alone. This module wraps each paragraph in
 * Markdown in a <span> for you.
 */
globalThis.modules.utilities.wrapMarkdown = (
    markdown: string,
    attributes: { [key: string]: any } = {}
) => {
    const tag =
        '<span' +
        Object.keys(attributes).reduce(
            (result, current) =>
                result + ` ${current}="${attributes[current]}"`,
            ''
        ) +
        '>';

    let output =
        tag + markdown.replace(/[\r\n]{2,}/g, `</span>$&${tag}`) + '</span>';

    /* Move <span>s after any setext-style headers. */

    output = output.replace(/(<span.*?>)\s*(#+)/gi, '$2 $1');
    return output;
};

globalThis.modules.utilities.toSafeClassName = (s: string): string => {
    const unsafe = s.toString();
    const safe = encodeURIComponent(unsafe)
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, '');
    return 'X' + safe;
};

globalThis.modules.utilities.uuidv4 = (() => {
    const UUID_V4_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    const uuidv4 = (format = UUID_V4_FORMAT) =>
        format.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    return uuidv4;
})();

globalThis.modules.utilities.uniqueClassName = () =>
    modules.utilities.toSafeClassName(modules.utilities.uuidv4());

globalThis.modules.utilities.onMutation = (
    selector: string,
    cb: (node: Element) => void
) => {
    const article = document.querySelector(`#page article`);

    if (!article) {
        throw new Error('No main div?');
    }

    let node = article.querySelector(selector);

    if (node) {
        cb(node as HTMLElement);
    } else {
        const observer = new MutationObserver((mutationList, observer) => {
            for (const _mutation of mutationList) {
                const node = article.querySelector(selector);
                if (node) {
                    cb(node as HTMLElement);
                    observer.disconnect();
                    return;
                }
            }
        });
        observer.observe(article, {
            childList: true,
            attributes: true,
            subtree: true,
        });
    }
};
globalThis.modules.utilities.getOverviewElement = () => {
    let overviewEl = document.querySelector('#page article.overview');
    if (!overviewEl) {
        overviewEl = document.createElement('article');
        overviewEl.classList.add('overview');
    }
    return overviewEl;
};

globalThis.modules.utilities.setupDOM = () => {
    const mainSection =
        document.querySelector('#page section.main') ||
        document.createElement('section');
    mainSection.classList.add('main');

    const overviewArticle =
        document.querySelector('#page article.overview') ||
        document.createElement('article');
    overviewArticle.classList.add('overview');

    const articleArticle =
        document.querySelector('#page>article') ||
        document.createElement('article');
    articleArticle.classList.add('article');

    const headerEl = document.querySelector('#page header');
    if (!headerEl) {
        throw new Error('Overview: #page>header not found.');
    }
    headerEl.after(mainSection);
    mainSection.append(articleArticle);
    mainSection.append(overviewArticle);
};
