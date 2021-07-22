const Items = Object.create(null);

//only list data is read here, not request_object

//return todays date in [yyyy,mm,dd] form
//localise impure function
Items.date_today = function () {
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    today = [yyyy, mm, dd];
    return today;
};

//for array of objects, convert their "date" value
//from "yyyy-mm-dd" to [yyyy,mm,dd]
//use map function
Items.reformat_date = function (array) {
    const new_dates = array.map(function (index) {
        const date = index.date;
        const reformat_date = date.split("-");
        index.reformat_date = reformat_date;
        return index;
    });
    return new_dates;
};

//find the difference in days between the current date
//and another date, both in [yyyy,mm,dd] format
Items.time_to_date = function (date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = Items.date_today();
    const firstDate = new Date(today[0], today[1], today[2]);
    const secondDate = new Date(date[0], date[1], date[2]);

    const diffDays = Math.round((secondDate - firstDate) / oneDay);

    return diffDays;
};

//for an array of objects, for each object add a key containing
//an a intiger with the number of days from the current date
//and a string describing this
//using map
Items.date_data = function (array) {
    const new_array = array.map(function (index) {
        index.date_day = Items.time_to_date(index.reformat_date);
        if (index.date_day < 0) {
            index.date_expression = "This has expired";
        } else if (index.date_day === 0) {
            index.date_expression = "Eat this today!";
        } else {
            index.date_expression =
            "You have " + String(index.date_day) + " days to eat this";
        }
        return index;
    });
    return new_array;
};

//set boarder colour of list item based on number of days until the expiry date
//Less than 3 days = red
//3-7 days = orange
//more than 7 days = green
//use map
Items.set_colour = function (array) {
    const new_array = array.map(function (index) {
        if (index.date_day < 3) {
            index.colour = "red";
        } else if (index.date_day >= 3 && index.date_day <= 7) {
            index.colour = "orange";
        } else {
            index.colour = "green";
        }
        return index;
    });
    return new_array;
};

//order array of objects in ascending order of date_day value
Items.order_list = function (array) {
    //create custom sort function that compares the date_day values
    array = array.sort(function (a, b) {
        if (a.date_day < b.date_day) {
            return -1;
        }
        if (a.date_day > b.date_day) {
            return 1;
        }
        return 0;
    });
    return array;
};


//final construction of functions that is called by the handler
Items.construction = function (items) {
    items =
    Items.order_list(
        Items.set_colour(
            Items.date_data(
                Items.reformat_date(items)
            )
        )
    );
    return items;
};

// debugger;

export default Object.freeze(Items);