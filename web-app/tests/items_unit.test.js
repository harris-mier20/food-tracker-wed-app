//file handles unit testing for items.js functionality
//chai install required with 'npm install chai'
//chai contains some helpful functions that I’ll use to verify test results

import { expect } from "chai";
import Items from "../items.js";

describe ("Date data", function () {
    it(
        "for an array with an object with a date in the past" +
        "the date_expression is set to 'This has expired'",
        function () {
            let array = [{"reformat_date": ["0000", "00", "00"]}];
            array = Items.date_data(array);
            expect(array[0].date_expression).to.be.equal("This has expired");
        }
    );

});

describe ("Set Colour", function () {
    it(
        "for an array with an object with a date_day value less than three" +
        "the colour value is set to red when set_colour is run",
        function () {
            let array = [{"date_day": 2}];
            array = Items.set_colour(array);
            expect(array[0].colour).to.be.equal("red");
        }
    );

    it(
        "for an array with an object with a date_day value greater than 7" +
        "the colour value is set to green when set_colour is run",
        function () {
            let array = [{"date_day": 9}];
            array = Items.set_colour(array);
            expect(array[0].colour).to.be.equal("green");
        }
    );
});
