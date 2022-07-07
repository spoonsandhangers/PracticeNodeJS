// takes the package from the modules folder and stores it in the variable.
const { response } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const { Server } = require('http');

// create an app using the express function
var app = express();
// body parser checks that the data is correctly formatted.
// The get request will first go through this 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id":"232kAk",
        "text":"Eggs"
    },
    {
        "id":"351Tpk",
        "text":"Milk"
    },
    {
        "id":"587Lwk",
        "text":"Potatoes"
    },
    {
        "id":"863Ywf",
        "text":"Bread"
    }
];


// To do this in one line 
// var app = require('express')();

// returns the whole list of ingredients.
app.get('/ingredients', function(request, response){
    response.send(ingredients);

});

// recieves a post request and puts it in the body
// express takes the data in the body.
// post is used to add something new to the database for example.
app.post('/ingredients', function(request, response) {
    var ingredient = request.body;
    if (!ingredient || ingredient.text === ""){
        response.status(500).send({error: "Your ingredient must have text"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});

// change an ingredient
// '/ingredients/:ingredientId' the varaible after the colon is a http parameter.
app.put('/ingredients/:ingredientId', function(request, response) {
    var ingredientId = request.params.ingredientId;
    var newText = request.body.text;
    var objectFound = false;
    if (!newText || newText === ""){
        response.status(500).send({error: "You must provide ingredient text"});
    } else {
        for (var x=0; x < ingredients.length; x++){
            var ing = ingredients[x];
            if (ing.id === request.params.ingredientId) {
                ingredients[x].text = newText;
                objectFound = true;
                break;
            }
    }

    if (!objectFound){
        response.status(500).send({error: "Ingredient id not found"});
    } else {
        response.send(ingredients);
    }
    response.send(ingredients);
}
});
app.listen(3000, function(){
    console.log("first API running on port 3000!");
})




