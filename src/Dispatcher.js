/// <reference path="Store.ts"/>
/// <reference path="Definitions/ActionInterfaces.d.ts"/>
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 * @preventMunge
 */
"use strict";
import invariant from "./Invariant";
var _prefix = 'ID_';
export default class Dispatcher {
    constructor() {
        this._lastID = 1;
        this._callbacks = {};
        this._isPending = {};
        this._isHandled = {};
        this._isDispatching = false;
        this._pendingPayload = null;
        Dispatcher.prototype._instance = this;
    }
    register(callback, store) {
        var id = _prefix + this._lastID++;
        this._callbacks[id] = callback;
        this._stores.push(store);
        return id;
    }
    unregister(id) {
        invariant(this._callbacks[id], 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id);
        delete this._callbacks[id];
    }
    waitFor(ids) {
        invariant(this._isDispatching, 'Dispatcher.waitFor(...): Must be invoked while dispatching.');
        for (var ii = 0; ii < ids.length; ii++) {
            var id = ids[ii];
            if (this._isPending[id]) {
                invariant(this._isHandled[id], 'Dispatcher.waitFor(...): Circular dependency detected while ' +
                    'waiting for `%s`.', id);
                continue;
            }
            invariant(this._callbacks[id], 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id);
            this._invokeCallback(id);
        }
    }
    dispatch(payload) {
        invariant(!this._isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        }
        finally {
            this._stopDispatching();
        }
    }
    isDispatching() {
        return this._isDispatching;
    }
    _invokeCallback(id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    }
    _startDispatching(payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    }
    _stopDispatching() {
        this._pendingPayload = null;
        this._isDispatching = false;
    }
}
//# sourceMappingURL=Dispatcher.js.map