// interface Modules {
//     state: {
//         setDefaults: (sta te: Engine['state']) => void;
//     };
// }

// globalThis.modules || globalThis.modules || {};
// globalThis.modules.state = globalThis.modules.state || {};

// modules.state.setDefaults = (state: Engine['state']) => {
//     const d = {
//         reader: {
//             canInspectSelf: false,
//             canAccessGlossary: false,
//         },
//     } as const;

//     Object.keys(d).forEach((key: keyof typeof d) => {
//         state.setDefault(key, d[key]);
//     });
// };
