$(document).ready(function() {
  var characterNumberArr = [];
  var characterImagesArray= [
    "assets/images/wonderwoman.png",
    "assets/images/wolverine.png",
    "assets/images/batman.png",
    "assets/images/spiderman.png"
  ];
  var randomNumber = Math.floor( Math.random() * 102) + 19;;
  var wins = 0;
  var losses = 0;
  var character = $(".character");
  var playerCounter = 0;

  // Generates random non-duplicate number to assign to character click value
  function generateRandomCharacterNum(){
    var characterRandomNumber;
    for (i = 0; i < 4; i++) {
      characterRandomNumber = Math.floor( Math.random() * 12) + 1;
      if (characterNumberArr.indexOf(characterRandomNumber) === -1){
        characterNumberArr.push(characterRandomNumber);
      } else {
        i --; 
      }
    }
    console.log(characterNumberArr);
  };

  // Controls the determine the win or loss of game
  function winlossCounter () {
    if (playerCounter === randomNumber) {
      console.log("You win!");
      wins++;
      $("#wins").html("<h6>Wins: " + wins + "</h6>");
      resetGame();
    } else if (playerCounter > randomNumber) {
      console.log("You lose!");
      losses++;
      $("#losses").html("<h6>Losses: " + losses + "</h6>");
      resetGame();
    }
  }
  
  // Resets the player counter variable, resets character array, generates and sets new value for character clicks after a win or loss. 
  function resetGame () {
    randomNumber = Math.floor( Math.random() * 102) + 19;
    playerCounter = 0;
    $(".randomNumber").html("<h6>Total Crystals to Collect: </h6>" + "<p>" + randomNumber + "</p>");
    $(".userScore").text(playerCounter);
    characterNumberArr = [];
    generateRandomCharacterNum();
    console.log(characterNumberArr);

    //Get the list(or single item) of Jquery element(s)/object(s)
    var $characters = $('.characterImage');
    //Show me what you got
    console.log($characters);
    //Iterate through each of the Jquery elements/objects safely
    $characters.each(function(index, element){
      //Store the Jquery reference in a variable so we don't create a new Jquery instance(I.e. doing $(this) a bunch of times)
      var $individualCharacter = $(this);
      //Show me what you got
      console.log($individualCharacter);
      //Set the data attribute to the specific Jquery element/object you're on
      $individualCharacter.attr("data-characterValue", characterNumberArr[index]);
      //Proof that you set the value
      console.log("individualCharacter" + $individualCharacter.attr("data-characterValue"));
    });
  }

  // GAME STARTS HERE
  resetGame();
  // Dynamically creates html elements an values for the clickable images
  for (var i = 0; i < characterNumberArr.length; i ++) {
    var imagecharacter = $("<img>");
    imagecharacter.addClass("characterImage");
    imagecharacter.addClass("img-fluid");
    imagecharacter.attr("src", characterImagesArray[i]);
    imagecharacter.attr("data-characterValue", characterNumberArr[i]);
    character.append(imagecharacter);
  }

  character.on("click", ".characterImage", function() {
    var characterValue = ($(this).attr("data-characterValue"));
    characterValue = parseInt(characterValue);
    playerCounter += characterValue;
    $(".userScore").text(playerCounter);
    winlossCounter();
  });
});
