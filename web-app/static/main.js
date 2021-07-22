import Behavior from "./behavior.js";
import Ajax from "./ajax.js";

//set up page elements
const food_name = document.getElementById("food-name");
const food_type = document.getElementById("food-type");
const expiry = document.getElementById("expiry");
const add_button = document.getElementById("add-button");
const delete_all_button = document.getElementById("delete-all-button");
const item_container = document.getElementById("item-container");
const input_banner = document.getElementById("input-banner");

//create new empty list to store all items
let items = [];

//when page loaded show all items saved in the session
window.onload = function () {
    Ajax.query({
        "type": "get_from_session"
    }).then(function (response_object) {
        //show all items if they exist yet
        //items are added to session data after the items.js functions
        //are run, so no need to send a "item_list" query
        items = response_object.items;

        Behavior.show_all(item_container, items);
    });
};

//add functionality to the add button
add_button.onclick = function () {
    //define variables
    let name_text;
    let date_text;
    let food_group;
    //check if input is valid
    //no repeat names and all sections filled
    //adds to array and shows on screen if valid
    if (
        Behavior.valid_name(items, food_name.value) &&
        food_type.value !== "" &&
        expiry.value !== ""
    ) {

        //set values
        name_text = food_name.value;
        food_group = food_type.value;
        date_text = expiry.value;

        //add new item to list with set values
        items.push({
            "name": name_text,
            "date": date_text,
            "image": food_group,
            "colour": "green"
        });

        //use server to run functions on items before showing
        Ajax.query({
            "type": "item_list",
            "items": items
        }).then(function (response_object) {
            //show all on screen
            Behavior.show_all(item_container, response_object.items);
            items = response_object.items;
        });

    } else {
        //returns the error message to the input banner if invalid input
        Behavior.error_message(input_banner);
    }
    //reset inputs
    food_name.value = "";
    food_type.value = "";
    expiry.value = "";
    console.log(items);
};

//add functionality to the reset button
delete_all_button.onclick = function () {
    //remove all displayed items
    while (item_container.firstChild) {
        item_container.removeChild(item_container.firstChild);
    }

    //resets item list
    items = [];

    //clear session data
    Ajax.query({
        "type": "clear_session",
        "items": items
    }).then(function (response_object) {
        //show all on screen
        Behavior.show_all(item_container, response_object.items);
        items = response_object.items;
    });
};
