// interface Modules {
//     modifiers: Modifiers;
// }

// interface Modifiers {
//     box: Modifier;
//     move: Modifier;
//     definition: Modifier;
//     typewriter: Modifier;
// }

// globalThis.modules = globalThis.modules || {};
// globalThis.modules.modifiers = globalThis.modules.modifiers || {};
// globalThis.modules.modifiers.definition = {
//     match: /^definition/i,
//     process: (output, { invocation }) => {
//         const { wrapMarkdown } = modules.utilities;
//         const chunks = invocation.split(/\s+/);
//         chunks.shift();
//         const term = chunks.join(' ');

//         output.text = `<div class="dt">${term}</div><div class="dd">${output.text}</div>`;

//         output.text = wrapMarkdown(output.text, {
//             'data-cb-skippable': '',
//             class: 'modifier definition',
//         });

//         output.startsNewParagraph = true;
//     },
// };
// globalThis.modules.modifiers.box = {
//     match: /^box/i,
//     process: (output, { invocation }) => {
//         const invocationChunks = invocation.split(/\s+/);
//         const modifierName = invocationChunks.shift();
//         console.log(modifierName);
//         const bits: { [keys: string]: string } = {};
//         invocationChunks.forEach((c: string) => {
//             const split: string[] = c.split('=');
//             if (split.length === 1) {
//                 //@ts-ignore
//                 bits[split[0]] = true;
//             } else {
//                 //@ts-ignore
//                 bits[split[0]] = split[1];
//             }
//         });

//         if (bits.rose) {
//             output.text = `<img src='media/rose.png' alt='LITERALIZED rose as decorative item.'>${output.text}`;
//         }

//         const { wrapMarkdown } = modules.utilities;
//         output.text = wrapMarkdown(output.text, {
//             class: `modifier box ${Object.keys(bits).join(' ')}`,
//             'data-cb-skippable': '',
//         });

//         output.startsNewParagraph = true;
//     },
// };

// globalThis.modules.modifiers.move = {
//     match: /^move/i,
//     process: (output, { invocation }) => {
//         const invocationChunks = invocation.split(/\s+/);
//         const modifierName = invocationChunks.shift();
//         console.log(modifierName);
//         const bits: { [keys: string]: string } = {};
//         invocationChunks.forEach((c: string) => {
//             const split: string[] = c.split('=');
//             if (split.length === 1) {
//                 //@ts-ignore
//                 bits[split[0]] = true;
//             } else {
//                 //@ts-ignore
//                 bits[split[0]] = split[1];
//             }
//         });

//         if (bits.clear) {
//             const overview = modules.utilities.getOverviewElement();
//             overview.innerHTML = '';
//         }

//         const el = document.createElement('div');
//         el.textContent = output.text;

//         const overview = modules.utilities.getOverviewElement();
//         overview.appendChild(el);

//         output.text = '';
//         output.startsNewParagraph = false;
//     },
// };

// globalThis.modules.modifiers.typewriter = {
//     match: /^typewriter\s/i,
//     process(output, { invocation }) {
//         // Get the time
//         let [time, chunkSize = 1, backwards = false] = invocation
//             .replace(/^typewriter\s/i, '')
//             .split(' ');

//         if (isNaN(parseInt(chunkSize, 10))) {
//             if (chunkSize === 'backwards') {
//                 backwards = true;
//             } else if (chunkSize !== 'word') {
//                 chunkSize = 1;
//             }
//         }

//         // Save original text
//         let text = output.text;

//         // Wipe out output to start
//         output.text = '';

//         let chunkedLetters = [];

//         if (chunkSize === 'word') {
//             text.split(' ').forEach((t: string) =>
//                 chunkedLetters.push([t, ' '])
//             );
//         } else {
//             const letters = text.split('');
//             while (letters.length) {
//                 chunkedLetters.push(letters.splice(0, chunkSize));
//             }
//         }

//         if (backwards) {
//             chunkedLetters.reverse();
//         }

//         // Loop through the text
//         //  -- Add a new <span> for each character
//         //  -- Set the class "fade-in"
//         //  -- Set the delay as equal to time multiplied position
//         output.text = chunkedLetters
//             .map(
//                 (chunk, i) =>
//                     `<span class='fade-in' style='animation-delay: ${
//                         time * i
//                     }ms'>${chunk?.join('') || chunk}</span>`
//             )
//             .join('');
//     },
// };
