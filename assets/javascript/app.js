
$(document).ready(function() {
    
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
    
    var subButton1 = document.getElementById('user-one-sub-button');
    var subButton2 = document.getElementById('user-two-sub-button');
    
    // FUNCTIONS 
    //==================================================================================
    
    // Capture and store User 1 name 
    function getUser1Name() {
        var userOneNameField = document.getElementById('user-one-name-field').value;
        var result = document.getElementById('user-one-name-display');
        
        if (userOneNameField.length < 3) {
            result.textContent = 'Username must contain at least 3 characters';
            //alert('Username must contain at least 3 characters');
        } else {
            result.textContent = 'Your username is: ' + userOneNameField;
            //alert(nameField);
        }
    }
    
    // Capture and store User 2 name 
    function getUser2Name() {
        var userTwoNameField = document.getElementById('user-two-name-field').value;
        var result = document.getElementById('user-two-name-display');
        
        if (userTwoNameField.length < 3) {
            result.textContent = 'Username must contain at least 3 characters';
            //alert('Username must contain at least 3 characters');
        } else {
            result.textContent = 'Your username is: ' + userTwoNameField;
            //alert(nameField);
        }
    }
    // This should only run after users have put in thier names otherwise the game is triggered 
    // Could add a ready to play start button that triggers the game 
    
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
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBzJXd5aa8ZWQ_M26EoFH0CGox-YlWSUVA",
        authDomain: "my-first-project-acbf6.firebaseapp.com",
        databaseURL: "https://my-first-project-acbf6.firebaseio.com",
        projectId: "my-first-project-acbf6",
        storageBucket: "my-first-project-acbf6.appspot.com",
        messagingSenderId: "967359446726"
    };
    
    // Initialize Firebase
    firebase.initializeApp(config);
    
    // Create a variable to reference the database
    var database = firebase.database();
    
    // Log the value from the database
    database.ref().on("value", function(snapshot) {
        // We are now inside our .on function...
        
        // Console.log the "snapshot" value (a point-in-time representation of the database)
        console.log(snapshot.val());
    });
    
    
    
    // FUNCTION CALLS 
    //===============================================================================
    
    // Submit button event listener for User 1 
    subButton1.addEventListener('click', getUser1Name, false); 
    // Submit button event listener for User 1 
    subButton2.addEventListener('click', getUser2Name, false); 
    
    
}); // closed the document on ready
