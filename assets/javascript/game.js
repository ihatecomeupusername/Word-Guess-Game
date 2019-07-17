//variable declaration
var phrases=["hmm", "fantastic","allonsy","geronimo","shutup"];//catch phrases for 1st, 9th, 10th, 11th, 12th doctor
var currentWord;//randomly chose world as answer
var chances;//number of mistakes player can make
var workingWord=[];//holds the array of letters player guessed right
var guessed=[];//all the letters player clicked (no duplicate)
var score=0;//numbers of game won


// FUNCTIONS
// ==============================================================================
function getPhrase()
//generate random phrase as answer, returns a string
{
    var ranNum = Math.floor(Math.random() * 5);
    return phrases[ranNum];
}

function initWord(word)
//add place holder '_' to game area according to the length of answer
{
    var tempString=[];
    for (var i = 0; i < word.length; i ++)
    {
        tempString.push("_");
    }
    console.log(word);
    console.log(tempString.toString());
    $("#unsolved_words").append(tempString.toString());
}
function updateWord(letter, location)
//rewrite "#unsolved_words" with current workingWord
{
    console.log(currentWord);
    workingWord[location]=letter;
    console.log(workingWord.toString());
    $("#unsolved_words").text(workingWord.toString());
}
function updateChances()
//display current chances
{
    $("#chances").text("Number of guesses remaining: "+chances);
}
function updateGuessed(inputLetter)
//add user's input to guessed array without duplication, then display it
{
    var duplicate = 0;
    for (var i = 0; i < guessed.length; i ++)
    {
        if (inputLetter===guessed[i])
            duplicate++;
    }

    if (duplicate===0)
        guessed.push(inputLetter);

    $("#guessed_letters").text(guessed.toString());

    console.log(guessed);
}
function checkWin()
//check if user win/lose after input, display corresponding alert
//if user win call win() function
{
    var counter=0;
    for (var i = 0; i < currentWord.length; i ++)
        if (currentWord.charAt(i) === workingWord[i])
            counter ++;

    if (chances===0)
    {
        alert("You lost the game!!! Try again");
        startGame();
    }
    else {
        if (counter === currentWord.length) {
            score++;
            $("#win_num").text("Wins: " + score);
            alert("You won the game!!! Keep Going")
            winner();
        }
    }
}

function winner()
//based on the answer display corresponding image, add answer to top of play area, change theme music, reset the game
{
    if (currentWord === phrases[0]) {
        $("#game_img").attr("src", "assets/images/d1.jpg");
        $(".phrase").text(currentWord);
        //$("#background_music").
        $("#background_music").attr("src", "assets/music/d1.mp3");
    }
    else if(currentWord === phrases[1]){
        $("#game_img").attr("src","assets/images/d9.jpg");
        $(".phrase").text(currentWord);
        $("#background_music").attr("src", "assets/music/d9.mp3");
    }
    else if(currentWord === phrases[2]) {
        $("#game_img").attr("src", "assets/images/d10.jpg");
        $(".phrase").text(currentWord);
        $("#background_music").attr("src", "assets/music/d10.mp3");
    }
    else if(currentWord === phrases[3]) {
        $("#game_img").attr("src", "assets/images/d11.jpg");
        $(".phrase").text(currentWord);
        $("#background_music").attr("src", "assets/music/d11.mp3");
    }
    else {
        $("#game_img").attr("src", "assets/images/d12.jpg");
        $(".phrase").text(currentWord);
        $("#background_music").attr("src", "assets/music/welcome.mp3");
    }

    startGame();

}
function startGame()
{
    $("#unsolved_words").text("");
    currentWord=getPhrase();
    chances = 15;
    initWord(currentWord);

    workingWord=[];
    for (var i = 0; i < currentWord.length; i ++)
        workingWord.push("_");

    guessed=[];

    updateGuessed();
    updateChances();

    console.log(currentWord);
    console.log(workingWord);
    console.log(guessed);
    console.log(chances);
}
// MAIN PROCESS
// ==============================================================================
startGame();// Calling functions to start the game.
$(document).ready(function(){
    document.onkeyup = function(event) {
        // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
        var userInput = event.key.toLowerCase();
        chances--;
        console.log(userInput);
        //console.log("key pressed: "+userInput);

        for (var i = 0; i < currentWord.length; i++)
        {

            if(userInput===currentWord[i])
            {
                chances++;
                updateWord(userInput, i);
            }
        }
        updateChances();
        updateGuessed(userInput);
        checkWin();
        console.log(chances);
    }
});