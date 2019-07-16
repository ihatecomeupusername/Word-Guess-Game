var phrases=["hmm", "fantastic","allonsy","geronimo","shutup"];
var currentWord;
var chances;
var workingWord=[];
var guessed=[];
var score=0;


// FUNCTIONS
// ==============================================================================
function getPhrase()
{
    var ranNum = Math.floor(Math.random() * 5);
    return phrases[ranNum];
}

function initWord(word)
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
{
    console.log(currentWord);
    workingWord[location]=letter;
    console.log(workingWord.toString());
    $("#unsolved_words").text(workingWord.toString());
}
function updateChances()
{
    $("#chances").text("Number of guesses remaining: "+chances);
}
function updateGuessed(inputLetter)
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
{
    if (currentWord === phrases[0]) {
        $("#game_img").attr("src", "assets/images/d1.jpg");
        $("#background_music").attr("src", "assets/music/d1.mp3");
        console.log($("#background_music").textContent);
    }
    else if(currentWord === phrases[1]){
        $("#game_img").attr("src","assets/images/d9.jpg");
        $("#background_music").attr("src", "assets/music/d9.mp3");
    }
    else if(currentWord === phrases[2]) {
        $("#game_img").attr("src", "assets/images/d10.jpg");
        $("#background_music").attr("src", "assets/music/d10.mp3");
    }
    else if(currentWord === phrases[3]) {
        $("#game_img").attr("src", "assets/images/d11.jpg");
        $("#background_music").attr("src", "assets/music/d11.mp3");
    }
    else {
        $("#game_img").attr("src", "assets/images/d12.jpg");
        $("#background_music").attr("src", "assets/music/d12.mp3");
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
startGame();
// Calling functions to start the game.
// When the user presses a key, it will run the following function...
document.onkeyup = function(event) {
    // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
    var userInput = event.key.toLowerCase();
    chances--;
    console.log(userInput);
    //console.log("key pressed: "+userInput);

    // Only run this code if "t" or "f" were pressed.
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