/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */
"use strict";
export default function (condition, format, a, b, c, d, e, f) {
    if (!condition) {
        var error;
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error('Invariant Violation: ' +
            format.replace(/%s/g, function () { return args[argIndex++]; }));
        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
}
;
//# sourceMappingURL=Invariant.js.map