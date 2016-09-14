export class BrowserStorage {
    private static inMemoryData = {};
    private static hasLocalStore() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    private static hasSessionStore() {
        try {
            return 'sessionStorage' in window && window['sessionStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    private static quotaExceeded(store) {
        if (store.length > 0) {
            this.clearNamespace("DA");
        }
    }

    private static hasKey(store, key) {
        var exists = false;
        for (var i = 0; i < store.length; i++) {
            if (store.key(i) === key) {
                exists = true;
                break;
            }
        }
        return exists;
    }

    private static getKeys(store, ns) {
        var keys = [];
        var length = store.length;
        for (var x = 0; x < length; x++) {
            var key = store.key(x);
            if (key && (!ns || key.indexOf(ns) === 0)) {
                keys.push(key);
            }
        }
        return keys;
    }

    private static  removeInMemoryData(key) {
        if (this.inMemoryData.hasOwnProperty(key)) {
            this.inMemoryData[key] = null;
            delete this.inMemoryData[key];
        }
    }

    private static removeSessionStorageData(key) {
        var existed = false;
        this.removeInMemoryData("SS_" + key);
        if (this.hasSessionStore() && this.hasKey(sessionStorage, key)) {
            existed = true;
            sessionStorage.removeItem(key);
        }
        return existed;
    }

    private static removeLocalStorageData(key) {
        var existed = false;
        this.removeInMemoryData("LS_" + key);
        if (this.hasLocalStore() && this.hasKey(localStorage, key)) {
            existed = true;
            localStorage.removeItem(key);
        }
        return existed;
    }

    private static removeData(key) {
        this.removeSessionStorageData(key);
        this.removeLocalStorageData(key);
        return true;
    }

    private static clearNamespace(namespace) {
        var count = 0;
        var keys = [];
        if (this.hasSessionStore()) {
            keys = this.getKeys(sessionStorage, namespace);
            for (var i = 0; i < keys.length; i++) {
                if (this.removeSessionStorageData(keys[i])) {
                    count++;
                }
            }
        }
        if (this.hasLocalStore()) {
            keys = this.getKeys(localStorage, namespace);
            for (var i = 0; i < keys.length; i++) {
                if (this.removeLocalStorageData(keys[i])) {
                    count++;
                }
            }
        }
        return count;
    }

    private static clearAll(persisted) {
        this.inMemoryData = {};
        if (!persisted) {
            sessionStorage.clear();
        } else {
            localStorage.clear();
        }
        return true;
    }

        public static setData(key, value, persist) {
        if (persist) {
            if (this.hasLocalStore()) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    this.inMemoryData["LS_" + key] = value;
                } catch (error) {
                    if (error.name && error.name === "QuotaExceededError") {
                        this.quotaExceeded(localStorage);
                    } else {
                        throw error;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else {
            if (this.hasSessionStore()) {
                try {
                    sessionStorage.setItem(key, JSON.stringify(value));
                    this.inMemoryData["SS_" + key] = value;
                } catch (error) {
                    if (error.name && error.name === "QuotaExceededError") {
                        this.quotaExceeded(sessionStorage);
                    } else {
                        throw error;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
    }

    public static getData(key) {
        let result = this.inMemoryData["SS_" + key];
        if (!!result) { return result; }
        result = this.inMemoryData["LS_" + key];
        if (!!result) { return result; }
        if (this.hasSessionStore() && sessionStorage.getItem(key) && sessionStorage.getItem(key) !== 'undefined') {
            return  this.inMemoryData["SS_" + key] = JSON.parse(sessionStorage.getItem(key));
        } else if (this.hasLocalStore() && localStorage.getItem(key) && localStorage.getItem(key) !== 'undefined') {
            return  this.inMemoryData["LS_" + key] = JSON.parse(localStorage.getItem(key));
        } else {
            return null;
        }
    }
}
