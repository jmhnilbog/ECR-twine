// interface Modules {
//     utilities: Utilities;
// }

// interface Utilities {
//     toSafeClassName: (s: string) => string;
//     uuidv4: (format?: string) => string;
//     uniqueClassName: () => string;
//     onMutation: (selector: string, cb: (node: Element) => void) => void;
//     setupDOM: () => void;
//     getOverviewElement: () => Element;
//     moveToOverview: any;
//     wrapMarkdown: (
//         markdown: string,
//         attributes: { [key: string]: any }
//     ) => string;
// }

// window.setup = window.setup || {};
// window.setup.utilities = window.setup.utilities || {};

// /**
//  * Sometimes you'd like to wrap a block of Markdown text in a <div> tag to apply
//  * some effect to it... but doing so turns off Markdown paragraphing inside the tag
//  * because Markdown leaves block tags alone. This module wraps each paragraph in
//  * Markdown in a <span> for you.
//  */
// window.setup.utilities.wrapMarkdown = (
//     markdown: string,
//     attributes: { [key: string]: any } = {}
// ) => {
//     const tag =
//         '<span' +
//         Object.keys(attributes).reduce(
//             (result, current) =>
//                 result + ` ${current}="${attributes[current]}"`,
//             ''
//         ) +
//         '>';

//     let output =
//         tag + markdown.replace(/[\r\n]{2,}/g, `</span>$&${tag}`) + '</span>';

//     /* Move <span>s after any setext-style headers. */

//     output = output.replace(/(<span.*?>)\s*(#+)/gi, '$2 $1');
//     return output;
// };

// window.setup.utilities.toSafeClassName = (s: string): string => {
//     const unsafe = s.toString();
//     const safe = encodeURIComponent(unsafe)
//         .toLowerCase()
//         .replace(/\.|%[0-9a-z]{2}/gi, '');
//     return 'X' + safe;
// };

// window.setup.utilities.uuidv4 = (() => {
//     const UUID_V4_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
//     const uuidv4 = (format = UUID_V4_FORMAT) =>
//         format.replace(/[xy]/g, function (c) {
//             const r = (Math.random() * 16) | 0,
//                 v = c == 'x' ? r : (r & 0x3) | 0x8;
//             return v.toString(16);
//         });
//     return uuidv4;
// })();

// window.setup.utilities.uniqueClassName = () =>
//     window.setup.utilities.toSafeClassName(window.setup.utilities.uuidv4());

// window.setup.utilities.onMutation = (
//     selector: string,
//     cb: (node: Element) => void
// ) => {
//     const article = document.querySelector(`#page article`);

//     if (!article) {
//         throw new Error('No main div?');
//     }

//     let node = article.querySelector(selector);

//     if (node) {
//         cb(node as HTMLElement);
//     } else {
//         const observer = new MutationObserver((mutationList, observer) => {
//             for (const _mutation of mutationList) {
//                 const node = article.querySelector(selector);
//                 if (node) {
//                     cb(node as HTMLElement);
//                     observer.disconnect();
//                     return;
//                 }
//             }
//         });
//         observer.observe(article, {
//             childList: true,
//             attributes: true,
//             subtree: true,
//         });
//     }
// };
