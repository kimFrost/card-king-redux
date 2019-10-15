

class Registry {
    private entries: Map<string, any>;

    constructor() {
        this.entries = new Map<string, any>();
    }

    generateID(): string {
        let ID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        if (this.entries.has(ID)) {
            ID = this.generateID();
        }
        return ID;
    }

    register(object: any, ID: string = ''): string {
        if (!ID) {
            ID = this.generateID();
        }
        this.entries.set(ID, object);
        return ID;
    }

    get(ID: string) {
        return this.entries.get(ID)
    }
}

const registry = new Registry();
export default registry
