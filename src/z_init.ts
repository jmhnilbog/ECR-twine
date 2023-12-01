console.log('Entering init.js');

console.log(modules);
console.log(Object.assign({}, config));

const handler = (_event: Event) => {
    if (document.readyState !== 'complete') {
        console.log('waiting');
        return;
    }
    console.log('config set?', config);
    document.removeEventListener('readystatechange', handler);
};

document.addEventListener('readystatechange', handler);
