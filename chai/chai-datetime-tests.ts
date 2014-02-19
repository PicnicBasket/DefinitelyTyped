/*
  test extracted from original test suite
  https://github.com/gaslight/chai-datetime/blob/master/test/test.js
*/

///<reference path="chai-datetime.d.ts" />

//test suite
declare var it: Function;
declare var describe: Function;
declare var beforeEach: Function;


var assert = chai.assert;

describe('chai-datetime', function () {

    describe('tdd alias', function () {
        beforeEach(function () {
            this.subject = new Date(2013, 4, 30, 16, 5);
        });

        it('.equalDate', function () {
            assert.equalDate(this.subject, new Date(2013, 4, 30, 17));
        });

        it('.notEqualDate', function () {
            assert.notEqualDate(this.subject, new Date(2013, 4, 31, 17));
        });

        it('.beforeDate', function () {
            assert.beforeDate(this.subject, new Date(2013, 4, 31));
        });

        it('.notBeforeDate', function () {
            assert.notBeforeDate(this.subject, new Date(2013, 4, 30));
        });

        it('.afterDate', function () {
            assert.afterDate(this.subject, new Date(2013, 4, 29));
        });

        it('.notAfterDate', function () {
            assert.notAfterDate(this.subject, new Date(2013, 4, 30));
        });

        it('.equalTime', function () {
            assert.equalTime(this.subject, new Date(2013, 4, 30, 16, 5));
        });

        it('.notEqualTime', function () {
            assert.notEqualTime(this.subject, new Date(2013, 4, 30, 16, 6));
        });

        it('.beforeTime', function () {
            assert.beforeTime(this.subject, new Date(2013, 4, 30, 16, 6));
        });

        it('.notBeforeTime', function () {
            assert.notBeforeTime(this.subject, new Date(2013, 4, 30, 16, 5));
        });

        it('.afterTime', function () {
            assert.afterTime(this.subject, new Date(2013, 4, 30, 16, 4));
        });

        it('.notAfterTime', function () {
            assert.notAfterTime(this.subject, new Date(2013, 4, 30, 16, 6));
        });

    });
});