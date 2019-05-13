
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
    
    // Create variables that hold references to the places in the HTML where we want to display things.
    var instructionsText = document.getElementById("instructions");
    
    // User 1 Stats
    var userOneChoiceText = document.getElementById("user-one-choice-text");
    var userOneWinsText = document.getElementById("user-one-wins-text");
    var userOneLossesText = document.getElementById("user-one-losses-text");
    var userOneTiesText = document.getElementById("user-one-ties-text");
    
    // User 2 Stats
    var userTwoChoiceText = document.getElementById("user-two-choice-text");
    var userTwoWinsText = document.getElementById("user-two-wins-text");
    var userTwoLossesText = document.getElementById("user-two-losses-text");
    var userTwoTiesText = document.getElementById("user-two-ties-text"); // same as user 1 because it takes two to tie
    
    var subButton1 = document.getElementById('user-one-sub-button');
    var subButton2 = document.getElementById('user-two-sub-button');
    
    // FUNCTIONS 
    //==================================================================================
    
    // 2 player Mode
    $("#2-player-mode-start-button").on("click", function() {
        
        document.getElementById('user-one-stats').style.display = "block";
        document.getElementById('user-two-stats').style.display = "block";
        document.getElementById('computer-mode-start-button').style.display = 'none';
    });
    
    // Capture and store User 1 name 
    function getUser1Name() {
        
        // not sure if I need this
        event.preventDefault();
        
        var userOneNameField = document.getElementById('user-one-name-field').value;
        var result = document.getElementById('user-one-name-display');
        
        if (userOneNameField.length < 3) {
            result.textContent = 'Username must contain at least 3 characters';
            //alert('Username must contain at least 3 characters');
        } else {
            // Display user 1 name
            result.textContent = 'Welcome ' + userOneNameField + '!';
            
            // Log the userOneNameField 
            console.log(userOneNameField);
            
            // Save the user 1 name to firebase
            database.ref().child("/users/user1").set({
                //map key
                userOneNameField: userOneNameField,
            });
            
        }
    }
    
    // Capture and store User 2 name 
    function getUser2Name() {
        
        event.preventDefault();
        
        var userTwoNameField = document.getElementById('user-two-name-field').value;
        var result = document.getElementById('user-two-name-display');
        
        if (userTwoNameField.length < 3) {
            result.textContent = 'Username must contain at least 3 characters';
            //alert('Username must contain at least 3 characters');
        } else {
            // Display user 2 name
            result.textContent = 'Welcome ' + userTwoNameField + '!';
            
            // Log the userOneNameField 
            console.log(userTwoNameField);
            
            // Save the user 2 name to firebase
            // Add player1 to the database
            database.ref().child("/users/user2").set({
                userTwoNameField: userTwoNameField,
            });
        }
    }
    
    // 2 Player Game Logic
    // trigger when user 1 name and user 2 name exist. 
    //database.ref("/users/").on("value", function() {
    //if (userOneNameField && userTwoNameField) {
    
    // Allow users to make selections when two users are connected
    if (user1 && user2) {
        
        // Compare the two choices and record the outcome
        rpsCompare(); 
    }

    
    // Use a time count down from 3..2..1.. SHOOT! (If i have time I'll add a timer)
    
    
    
    // Capture user 2 guess 
    // rpsCompare is the main rock/paper/scissors logic to see which player wins
    function rpsCompare() {
        if (user1.choice === "Rock") {
            if (user2.choice === "Rock") {
                // Tie
                console.log("tie");
                
                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/users/user1/tie").set(user1.tie + 1);
                database.ref().child("/users/user2/tie").set(user2.tie + 1);
            } else if (user2.choice === "Paper") {
                // user2 wins
                console.log("paper wins");
                
                database.ref().child("/outcome/").set("Paper wins!");
                database.ref().child("/users/user1/loss").set(user1.loss + 1);
                database.ref().child("/users/user2/win").set(user2.win + 1);
            } else { // scissors
                // user1 wins
                console.log("rock wins");
                
                database.ref().child("/outcome/").set("Rock wins!");
                database.ref().child("/players/user1/win").set(user1.win + 1);
                database.ref().child("/players/user2/loss").set(user2.loss + 1);
            }
            
        } else if (user1.choice === "Paper") {
            if (user2.choice === "Rock") {
                // user1 wins
                console.log("paper wins");
                
                database.ref().child("/outcome/").set("Paper wins!");
                database.ref().child("/players/user1/win").set(user1.win + 1);
                database.ref().child("/players/user2/loss").set(user2.loss + 1);
            } else if (user2.choice === "Paper") {
                // Tie
                console.log("tie");
                
                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/user1/tie").set(user1.tie + 1);
                database.ref().child("/players/user2/tie").set(user2.tie + 1);
            } else { // Scissors
                // user2 wins
                console.log("scissors win");
                
                database.ref().child("/outcome/").set("Scissors win!");
                database.ref().child("/players/user1/loss").set(user1.loss + 1);
                database.ref().child("/players/user2/win").set(user2.win + 1);
            }
            
        } else if (user1.choice === "Scissors") {
            if (user2.choice === "Rock") {
                // user2 wins
                console.log("rock wins");
                
                database.ref().child("/outcome/").set("Rock wins!");
                database.ref().child("/players/user1/loss").set(user1.loss + 1);
                database.ref().child("/players/user2/win").set(user2.win + 1);
            } else if (user2.choice === "Paper") {
                // user1 wins
                console.log("scissors win");
                
                database.ref().child("/outcome/").set("Scissors win!");
                database.ref().child("/players/user1/win").set(user1.win + 1);
                database.ref().child("/players/user2/loss").set(user2.loss + 1);
            } else {
                // Tie
                console.log("tie");
                
                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/user1/tie").set(user1.tie + 1);
                database.ref().child("/players/user2/tie").set(user2.tie + 1);
            }
            
        }
        // Start with challenge the computer mode button 
        $("#computer-mode-choice-button").on("click", function() {
            
            document.getElementById('user-one-stats').style.display = "block";
            //document.getElementById('user-two-stats').style.display = "block";
            //  document.getElementById('2-player-mode-choice-button').style.display = "none";
            
            // Display start button after mode is chosen
            document.getElementById("computer-mode-start-button").style.display = "block"
        });
        
        
        $("#computer-mode-start").on("click", function() {
            
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
        });
        
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
    