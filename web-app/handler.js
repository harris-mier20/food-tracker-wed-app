//handles program logic
//takes in object and returns object

const Handler = Object.create(null);
import Items from "./items.js";

//when requested, returns the current list of items to the client
Handler.get_from_session = function (ignore, session_data) {
    //create a variable for the current list of items
    let items = [];

    //if session data is available return the data
    //otherwise returns the empty array
    if (session_data.items) {
        items = session_data.items;
    }

    //return promise
    return Promise.resolve({
        "items": items
    });
};

//the server recieves and empty array from the client
//behaves in the same was as item_list() but does not run
//the item.js functions on the empty array
Handler.clear_session = function (request_object, session_data) {
    const items = request_object.items;

    session_data.items = items;

    return Promise.resolve({
        "items": items
    });
};

//sends only the items to the items.js file
//returns the items to the client after several functions
//have manipulated them
Handler.item_list = function (request_object, session_data) {
    const items = request_object.items;
    const reformatted_items = Items.construction(items);

    //add items to session data
    session_data.items = reformatted_items;

    return Promise.resolve({
        "items": reformatted_items
    });
};

export default Object.freeze(Handler);