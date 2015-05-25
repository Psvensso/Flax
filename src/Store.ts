/// <reference path="Definitions/react.d.ts" />
/// <reference path="Definitions/eventemitter2.d.ts" />
/// <reference path="./Dispatcher.ts" />

'use strict';
import {EventEmitter2} from "eventemitter2";
import iv from "./Invariant";
import Dispatcher from "./Dispatcher";

export default class Store extends EventEmitter2 {
    callback:any;
    dispatcherID:string;

    constructor(dispatcher:Dispatcher) {
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
