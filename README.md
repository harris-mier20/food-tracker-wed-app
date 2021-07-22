**CID:** [01884866]

# Project
This repository is for the submission of your **Computing 2: Applications** coursework.

You should complete the proforma and populate this repository with your project submission.

* **Repository Creation Check:** Tuesday 4th May 18:00 – Update your CID in this file to check your submission.
* **Peer Assessment Deadline:** Tuesday 8th June 18:00
* **Final Submission Deadline:** Thursday 17th June 16:00

# Computing 2 Submission Proforma

For each section, write a maximum of 200 words.

## Brief
A web app that takes a written input from a user, describing an item of food produce they have purchased. The input also consists of a drop-down menu, from which the user selects the food type. Lastly, the input requires the expiry date which uses the html date data entry. The app takes this data and forms an ordered list of items, for which items can be added to. Food that will reach it's expiry date first will appear at the top of the list. Each item is colour coded depending on the time until its expiry, for example, items coloured red will expire in the next 3 days. Each item is also assigned an icon depending on its food type. If the food is eaten, discarded or a mistake was made when inputting data, users have the option to remove an item at any point.

## Coding
An index file was set up with various key elements to display a list of all items of food. For a generic item of food I created an html template. I used the main.js file to create multiple onclick event listeners including an event listener for the ‘add’ button. When this button was pressed, the current input was appended to an array as an object with keys such to store the user’s input. I used the behaviour.js file to handle how these items were appended and removed on screen. For each object, the show_all function created a new element using the previously mentioned template, before appending it to the specific html section. Prior to calling this function, however, a query was sent to the server via ajax. This query included a type and the current list of items, in this case the type was “item_list” and when received by the server the handler used the server-side Items.js file, which utilised functional programming to sequentially manipulate the current list of items before sending it back to the client with a promise. The server also stored the current list of items in session data, which was retrieved by the client on load.

## UX/UI
The page is split into 3 ‘banners’, the second contains the input section, in which there is a description that inexplicitly explains how to interact with the input, as well as three input boxes. These include a text input for the name of each item, a drop down to select a food group and a date data entry section, which is an intuitive way for the user to input dates. There is also an add button which appends each item to the screen. There is also a reset which, on click, sets the users item data to the empty array hence removing all items and resetting the interface. Each list item is represented by a rectangular section within a scrollable section and contains the name inputted by the user, an icon determined by the food group value, an expression that tells the user how long they have until the food expires and a remove button which removes that item from the array and reshows all other items. All buttons have a ‘hover’ appearance which helps communicate their intention. An error message appears in the accent colour if an invalid input is made, the user must click the message to continue.

## Data
I exchanged the users list of items between the server and client program using json. The data was stored as an array of objects where each object represented an item of food each with various properties. The json sent to the server was an object with the “type” key, as well as an items key that contained this array. When received by the server, the handler file called in functionality from the Items.js file. This file complied several sequential functions that edited the data of each item (each object in the items array). This included mapping each object to a new object containing a new key with the expiry date in a new format. Another function mapped each object to a new object that contained a “colour” key. This colour was set depending on the number of days until expiry. I also created a function with a custom sort algorithm to reorder the array in ascending order of days until expiry. After all functions were run on the array the json was sent back to the client with the promise. The client could access the new item list from the value stored in “items” in the returned json.

## Debugging
I used debugging practices and tools to identify and resolve many bugs. For example, I created a unit test to check if expiry dates in the past were shown as ‘expired’. The test failed. I discovered that I was wrongly using the absolute difference I dates. I changed this to pass the test and fix the program. Similarly, I used a property test to check if for a given “yyyy-mm-dd” input the first item in the [yyyy, mm, dd] output matched the original “yyyy” input. This test failed. Despite the date arithmetic requiring [yyyy, mm, dd], I had reversed the output of the reformat_date function to wrongly return [dd, mm, yyyy]. I changed this to pass the test and fix the program. Lastly, I used the Firefox developer debug console to resolve multiple bugs. For example, if the user reset the items and then refreshed the page. The on-load listener would send a query to the server for which nothing would be returned, this meant the behaviour file was trying to iterate through an undefined variable, throwing an error in the debug console. I updated the handler function so that if no data was available and empty array was returned.

## Best Practice
I separated the html, css and main.js within the static directory, and where possible, in the css file, I separated key features with comments so that the styling was easy to change and edit, I also made sure that all variables, aside from media queries, were stored in the root object and called as variables for individual item variables or calculations. I also separated the on-screen behaviour JavaScript with the main event listening JavaScript with a new file named behavior.js in the static directory. Other than the test files, I always ensured jslint highlighted no issues, so that the code was clean and easier to read. I also added comments to any key lines of code to keep track of inputs outputs and relationships. I named variables in a way that was long enough to be sufficiently descriptive and tried to maintain using “-“ to separate words in html and “_” in javascript.
