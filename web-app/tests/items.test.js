//use fast check to test the date manipulation functionality
//of items.js

import fc from "fast-check";
import Items from "../items.js";

describe("Reformat Date", function () {

    it((
        "given any date in the format 'yyyy-mm-dd' " +
        "when appended to an an object within an array " +
        "reformat date will return a new array with an object " +
        "with an array as a value to the reformat_date key"
    ), function () {
        fc.assert(fc.property(
            fc.integer(0,9999), fc.integer(0,99), fc.integer(0,99),
        function (yyyy, mm, dd) {
            const date = String(yyyy) + "-" + String(mm) + "-" + String(dd);
            let array = [{"date": date}];
            array = Items.reformat_date(array);
            return Array.isArray(array[0].reformat_date);
        }));
    });

    it((
        "given any date in the format 'yyyy-mm-dd' " +
        "when appended to an an object within an array " +
        "reformat date will return a new array with an object " +
        "that has only 2 keys"
    ), function () {
        fc.assert(fc.property(
            fc.integer(0,9999), fc.integer(0,99), fc.integer(0,99),
        function (yyyy, mm, dd) {
            const date = String(yyyy) + "-" + String(mm) + "-" + String(dd);
            let array = [{"date": date}];
            array = Items.reformat_date(array);
            return Object.keys(array[0]).length === 2;
        }));
    });

    it((
        "given any date in the format 'yyyy-mm-dd' " +
        "when appended to an an object within an array " +
        "reformat date will return a new array with an object " +
        "with an array set to the reformat_date value " +
        "the first item in that array is the original 'yyyy' value"
    ), function () {
        fc.assert(fc.property(
            fc.integer(0,9999), fc.integer(0,99), fc.integer(0,99),
        function (yyyy, mm, dd) {
            const date = String(yyyy) + "-" + String(mm) + "-" + String(dd);
            let array = [{"date": date}];
            array = Items.reformat_date(array);
            return array[0].reformat_date[0] === String(yyyy);
        }));
    });
});

describe("Time To Date", function () {

    it((
        "given any date in the format '[yyyy,mm,dd]' " +
        "time_to_date returns an intiger"
    ), function () {
        fc.assert(fc.property(
            fc.integer(0,9999), fc.integer(0,99), fc.integer(0,99),
        function (yyyy, mm, dd) {
            const date = [String(yyyy), String(mm), String(dd)];
            const time_to_date = Items.time_to_date(date);
            return Number.isInteger(time_to_date);
        }));
    });
});

describe("Order List", function () {

    it((
        "given 3 intigers each assigned to the key name date_day " +
        "in objects within an array, when order_list is applied to the array " +
        "the date_day value at index 0 is smaller than the " +
        "date_day value at index 2"
    ), function () {
        fc.assert(fc.property(
            fc.integer(0,99), fc.integer(0,99), fc.integer(0,99),
        function (a, b, c) {
            const array = [
                {"date_day": a},
                {"date_day": b},
                {"date_day": c}
            ];
            const ordered_array = Items.order_list(array);
            return ordered_array[0].date_day < ordered_array[2].date_day;
        }));
    });
});