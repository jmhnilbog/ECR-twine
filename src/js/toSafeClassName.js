"use strict";
const toSafeClassName = (s) => {
    const unsafe = s.toString();
    const safe = encodeURIComponent(unsafe).toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, '');
    return 'X' + safe;
};
//# sourceMappingURL=toSafeClassName.js.map