class GameStorage {
    public static ok() {
        const storage = window['localStorage'],
            x = '__storage_test__';
        try {
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                // everything except Firefox
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0
            );
        }
    }

    private key: string;

    constructor(key: string = 'hash') {
        this.key = key;
    }
    save(hash: string) {
        window.localStorage.setItem(this.key, hash);
    }

    restore() {
        return window.localStorage.getItem(this.key);
    }
    delete() {
        window.localStorage.removeItem(this.key);
    }
}

interface Modules {
    GameStorage: typeof GameStorage;
}

window.setup.GameStorage = GameStorage;
