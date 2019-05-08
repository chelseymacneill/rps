
//$(document).ready(function() {
    
    // Variables 
    //================================================================================
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var computerChoices = ["r", "p", "s"];
    
    // Creating variables to hold the number of wins, losses, and ties for user 1. They start at 0.
    var userOneWins = 0;
    var userOneLosses = 0;
    // Creating variables to hold the number of wins, losses, and ties for user 2. They start at 0.
    var userTwoWins = 0;
    var userTwoLosses = 0;
    // Not associated with user 1 or 2 but both users
    var ties = 0;
    // 
    
    
    // Create variables that hold references to the places in the HTML where we want to display things.
    var instructionsText = document.getElementById("instructions");
    
    // User 1 Stats
    var userOneChoiceText = document.getElementById("user-one-choice-text");
    var userOneWinsText = document.getElementById("user-one-wins-text");
    var userOneLossesText = document.getElementById("user-one-losses-text");
    var userOneTiesText = document.getElementById("user-one-ties-text");
    
    // User 2 Choice
    var userTwoChoiceText = document.getElementById("user-two-choice-text");
    var userTwoWinsText = document.getElementById("user-two-wins-text");
    var userTwoLossesText = document.getElementById("user-two-losses-text");
    var userTwoTiesText = document.getElementById("user-two-ties-text"); // same as user 1 because it takes two to tie
    
    
    
    
    // FUNCTIONS 
    //==================================================================================
    
    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {
        
        // Determines which key was pressed.
        var userOneGuess = event.key;
        
        // Randomly chooses a choice from the options array. This is the Computer's guess.
        var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        
        
        
        // Only run the following code block if the user presses "r" or "p" or "s".
        if ((userOneGuess === "r") || (userOneGuess === "p") || (userOneGuess === "s")) {
            
            // If we choose rock and the computer guesses scissors, increment our wins variable.
            if ((userOneGuess === "r") && (computerGuess === "s") || (userOneGuess === "s") && (computerGuess === "p") || (userOneGuess === "p") && (computerGuess === "r")) {
                userOneWins++;
                userTwoLosses++
            }
            
            // If we choose rock and the computer guesses paper, increment our losses variable.
            if ((userOneGuess === "r") && (computerGuess === "p") || (userOneGuess === "s") && (computerGuess === "r") || (userOneGuess === "p") && (computerGuess === "s")) {
                userOneLosses++;
                userTwoWins++
            }
            
            // If we choose the same thing as the computer, increment our ties variable.
            if (userOneGuess === computerGuess) {
                ties++;
            }
            
            // Hide the directions
            instructionsText.textContent = "";
            
            // Update the display the user and computer guesses, and wins/losses/ties.
            // User 1 
            userOneChoiceText.textContent = "User One chose: " + userOneGuess;
            userOneWinsText.textContent = "wins: " + userOneWins;
            userOneLossesText.textContent = "losses: " + userOneLosses;
            userOneTiesText.textContent = "ties: " + ties;
            // User 2
            userTwoChoiceText.textContent = "User Two chose: " + computerGuess;
            userTwoWinsText.textContent = "wins: " + userTwoWins;
            userTwoLossesText.textContent = "losses: " + userTwoLosses;
            userTwoTiesText.textContent = "ties: " + ties;
        }
    };
    
    // Firebase configuration
    // Your web app's Firebase configuration

    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    //
    var database = firebase.database();
    
    // console logging a value in the database 
    
    database.ref().on("value", function(snapshot) {
        
        // Then we console.log the value of snapshot
        console.log(snapshot.val());
        
        // Update the clickCounter variable with data from the database.
        userOneWins= snapshot.val().userOneWins
        
        // Then we change the html associated with the number.
       // $("#click-value").text(snapshot.val().clickCount);
        
        // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
        // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {
        
        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });
    
    
    
    // Capturing User One Guess and storing it in firebase
    /*$("#user-one-input").on("keyup", function() {
        
        // store user one input as User One Guess
        
        
        //  Store Click Data to Firebase in a JSON property called clickCount
        // Note how we are using the Firebase .set() method
        database.ref().set({
            userOneGuess: userOneGuess
        });*/
   // });
    
//}); // closed the document on ready
