//file handles how items are placed on and removed from the screen

const Behavior = Object.create(null);
import Ajax from "./ajax.js";

//function to clone a template from html
Behavior.cloneTemplate = function (id) {
    return document.importNode(document.getElementById(id).content, true);
};

//function takes 2 argurments
//an array and a value
//returns the index of the list object that cobtains that value
//under the key "name"
Behavior.find_index = function (array, value) {
    let i = 0;
    while (i < array.length) {
        if (array[i].name === value) {
            return i;
        }
        i = i + 1;
    }
};

//function to produce and append error message
Behavior.error_message = function (location) {
    let new_error = Behavior.cloneTemplate("error-template");
    new_error.id = "new_error";
    new_error.querySelector(
        "[name=error-button]"
    ).onclick = function () {
        //remove all created elements associated with the error message
        //when the error message itself is displayed
        location.removeChild(location.lastChild);
        location.removeChild(location.lastChild);
    };

    location.appendChild(new_error);

};

//shows all items in the list
Behavior.show_all = function (location, items) {
    //first clear all items already displayed
    while (location.firstChild) {
        location.removeChild(location.firstChild);
    }

    //for each item in the list add an element on screen
    items.forEach(function (index) {
        //uses template defined in html
        let new_item = Behavior.cloneTemplate("item-template");
        new_item.querySelector(
            "[name=food-text]"
        ).textContent = index.name;
        new_item.querySelector(
            "[name=date-text]"
        ).textContent = index.date_expression;
        new_item.querySelector(
            "[name=food-image]"
        ).src = index.image;
        new_item.querySelector(
            "[name=item]"
        ).style.border = "thick solid " + index.colour;
        new_item.id = index;

        //adds an event listener to the new on screen element
        new_item.querySelector(
            "[name=delete-button]"
        ).onclick = function () {
            //finds the location of the current element and delete it
            //from the array
            const address = Behavior.find_index(items, index.name);
            items.splice(address, 1);
            //then shows all again in recursive mannor
            //use server to run functions on items before showing
            Ajax.query({
                "type": "item_list",
                "items": items
            }).then(function (response_object) {
                //show all on screen
                Behavior.show_all(location, response_object.items);
                items = response_object.items;
            });
        };

        location.appendChild(new_item);
    });
};

//function takes 2 arguments
//array and value and checks if the input is already in the array
//as a value under the "name" key
//returns false if already there
Behavior.valid_name = function (array, value) {
    let i = 0;
    while (i < array.length) {
        if (array[i].name === value) {
            return false;
        }
        i = i + 1;
    }
    return true;
};

export default Object.freeze(Behavior);