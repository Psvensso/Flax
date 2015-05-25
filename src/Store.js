/// <reference path="Definitions/react.d.ts" />
/// <reference path="Definitions/eventemitter2.d.ts" />
/// <reference path="./Dispatcher.ts" />
'use strict';
import { EventEmitter2 } from "eventemitter2";
export default class Store extends EventEmitter2 {
    constructor(dispatcher) {
        super();
        this.dispatcherID = dispatcher.register(this.callback, this);
    }
    getDispatchToken() {
        return this.dispatcherID;
    }
    emitChange() {
        this.emit('change');
    }
    addChangeListener(callback) {
        this.on('change', callback);
    }
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}
//# sourceMappingURL=Store.js.map