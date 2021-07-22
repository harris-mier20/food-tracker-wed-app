//module handles client server communication

const Ajax = Object.create(null);

const fetch = window.fetch;
const json = (response) => response.json();

//return based on request from client
//the argument request_object is the json object sent from the client
Ajax.query = function (request_object) {

    //return Promise.resolve(test);

    //takes javascript object from main.js and turns it into a JSON string
    const body = JSON.stringify(request_object);

    //the server is taking in data and therefore the "POST" method is used
    return fetch(
        "/",
        {
            "method": "POST",
            "body": body,
            "headers": {
                "Content-Type": "application/json"
            }

        }
    ).then(json);
};

export default Object.freeze(Ajax);