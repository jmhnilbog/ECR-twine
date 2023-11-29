const toSafeClassName = (s: any) => {
    const unsafe: string = s.toString();

    const safe = encodeURIComponent(unsafe).toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, '');

    return 'X' + safe;
}


