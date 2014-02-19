// Type definitions for chai-datetime
// Project: http://chaijs.com/plugins/chai-datetime
// Definitions by: Basarat Ali Syed <https://github.com/basarat>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

///<reference path="chai.d.ts" />
///<reference path="chai-assert.d.ts" />

declare module chai {

    // TODO: support chai expect

    // Done: Chai Assert
    interface Assert {
        equalTime(val: Date, exp: Date, msg?: string);
        notEqualTime(val: Date, exp: Date, msg?: string);
        beforeTime(val: Date, exp: Date, msg?: string);
        notBeforeTime(val: Date, exp: Date, msg?: string);
        afterTime(val: Date, exp: Date, msg?: string);
        notAfterTime(val: Date, exp: Date, msg?: string);
        equalDate(val: Date, exp: Date, msg?: string);
        notEqualDate(val: Date, exp: Date, msg?: string);
        beforeDate(val: Date, exp: Date, msg?: string);
        notBeforeDate(val: Date, exp: Date, msg?: string);
        afterDate(val: Date, exp: Date, msg?: string);
        notAfterDate(val: Date, exp: Date, msg?: string);
    }
}

