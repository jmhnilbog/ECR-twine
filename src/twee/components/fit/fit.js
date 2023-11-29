// sometimes, we need to wait for the article attributes to change.
const fit = (marker) => {
    console.log(`FIT: ${marker}`);
    const selector = `#page article.article`;
    const mainDiv = document.querySelector(selector);

    console.log(`FIT: mainDiv:`, mainDiv);
    if (!mainDiv) {
        throw new Error('No main div?');
    }

    const fitSelector = `.Fit.${marker}`;
    let fitNode = mainDiv ? mainDiv.querySelector(fitSelector) : undefined;

    console.log(`FIT: fitSelector:`, fitSelector);
    console.log(`FIT: fitNode:`, fitNode);

    if (fitNode) {
        console.log('fitNode found; calling fitty()');
        fitty(fitNode);
    } else {
        console.log('Waiting for mutations.');
        const observer = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                const fitNode = mainDiv.querySelector(fitSelector);
                if (fitNode) {
                    console.log('fitNode found; calling fitty()');
                    console.log(mutation);
                    fitty(fitNode);
                    observer.disconnect();
                    return;
                } else {
                    console.log('fitNode not found.');
                    console.log(mutation);
                }
            }
        });
        observer.observe(mainDiv, {
            childList: true,
            attributes: true,
            subtree: true,
        });
    }
};

engine.extend('1.0.0', () => {
    engine.state.set('fitty', fitty);
    engine.state.set('uuidv4', uuidv4);
    engine.state.set('toSafeClassName', toSafeClassName);
    engine.state.set('fit', fit);
    console.log('Extended state for Fitty.');
});
