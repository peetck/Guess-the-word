word_listed = ["def", "abs()", "all()","ascii()","bool()","chr()","dict()","float()","help()","int()","len()","list()","max()","min()","ord()","print()","range()","reversed()","str()","tuple()","capitalize()","center()","count()","find()","isalnum()","isalpha()","isdigit()","islower()",
"isspace()","isupper()","lower()","replace()","rfind()","rsplit()","split()","strip()","swapcase()","title()","upper()","append()","insert()","pop()",
"remove()","reverse()","sort()","fromkeys()","get()","items()","keys()","update()"];

word_hint = {"def": "To define a function.", "abs()": "Returns the absolute value of a number.", "all()": "Returns True if all items in an iterable object are true.","ascii()": "Returns a readable version of an object. Replaces none-ascii characters with escape character",
"bool()": "Returns the boolean value of the specified object","chr()": "Returns a character from the specified Unicode code.","dict()": "Returns a dictionary (Array)","float()": "Returns a floating point number","help()": "Executes the built-in help system",
"len()":"Returns the length of an object","list()": "Returns a list","max()": " Returns the largest item in an iterable", "min()": "Returns the smallest item in an iterable","ord()":" Convert an integer representing the Unicode of the specified character",
"print()":" Prints to the standard output device","range()":"Returns a sequence of numbers, starting from 0 and increments by 1 (by default)","reversed()":"Returns a reversed iterator","str()":"Returns a string object","tuple()":"Returns a tuple",
"capitalize()":"Converts the first character to upper case","center()":"Returns a centered string","count()":"Returns the number of times a specified value occurs in a string","find()":"Searches the string for a specified value and returns the position of where it was found",
"isalnum()":"Returns True if all characters in the string are alphanumeric","isalpha()":"Returns True if all characters in the string are in the alphabet","isdigit()":"Returns True if all characters in the string are digits","islower()":"Returns True if all characters in the string are lower case",
"isspace()":"Returns True if all characters in the string are whitespaces","isupper()":"Returns True if all characters in the string are upper case","lower()":"Converts a string into lower case","replace()":"Returns a string where a specified value is replaced with a specified value","rfind()":"Searches the string for a specified value and returns the last position of where it was found",
"rsplit()":"Splits the string at the specified separator, and returns a list","split()":"Splits the string at the specified separator, and returns a list","strip()":"Returns a trimmed version of the string","swapcase()":"Swaps cases, lower case becomes upper case and vice versa","title()":"Converts the first character of each word to upper case","upper()":"Converts a string into upper case","append()":"Adds an element at the end of the list",
"insert()":"Adds an element at the specified position","pop()":"Removes the element at the specified position","remove()":" Removes the first item with the specified value","reverse()":"Reverses the order of the list","sort()":"Sorts the list",
"fromkeys()":"Returns a dictionary with the specified keys and values","get()":"Returns the value of the specified key","items()":"Returns a list containing a tuple for each key value pair","keys()":"Returns a list containing the dictionary's keys","update()":"Updates the dictionary with the specified key-value pairs"};

all_score = 0;
count = 0;
except = ""
function reset(){
    letter_body.innerHTML = temp;
    except = "";
    str = "";
    alpha = "abcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < 26; i++){
        str += "<letter onclick=\"select('" +alpha[i] + "')\" id = '" +alpha[i] + "'>" +alpha[i].toUpperCase() + "</letter>" + " ";
    }
    document.getElementById('alpha').innerHTML = str;
    document.getElementById('right').innerHTML = "";
    main();
}
function main(){
    
    hp = 5;
    hp_create(hp);
    temp = letter_body.innerHTML;
    answer_right = 0;
    count = 0;
    random = Math.random() * 50;
    word = word_listed[Math.floor(random)];
    word_only = word.replace("(", "").replace(")", "");
    len = word_only.length;
    letter = [];
    for (var i = 0; i < len; i++){
        letter[i] = "<word class = 'letter'>x</word>";
    }
    if (word.indexOf("(") > -1 && word.indexOf(")") > -1){
        letter[i + 1] = "<word class = 'letter_show'>(</word>";
        letter[i + 2] = "<word class = 'letter_show'>)</word>";
    }
    inner_out = "";
    for (i = 0; i < len;i++){
        inner_out += letter[i];
    }
    if (word.indexOf("(") > -1 && word.indexOf(")") > -1){
        inner_out += letter[i + 1];
        inner_out += letter[i + 2];
    }
    letter_body.innerHTML = inner_out;
    right.innerText = "Hint: " + word_hint[word];
}
function select(inp){
    document.getElementById(inp).id = "done";
    except += inp;
    if (word.indexOf(inp) > -1){
        for (var i = 0; i < len; i++){
            if (word_only[i] == inp){
                letter[i] = "<word class = 'letter_show'>" + inp + "</word>";
            }
        }
        console.log("found!!");
        inner_out = "";
        for (i = 0; i < len;i++){
            inner_out += letter[i];
        }
        if (word.indexOf("(") > -1 && word.indexOf(")") > -1){
            inner_out += letter[i + 1];
            inner_out += letter[i + 2];
        }
        letter_body.innerHTML = inner_out;
        for (i = 0; i < len; i++){
            if (word_only[i] == inp){
                answer_right++;
                count++;
            }
        }
        console.log(answer_right);
    }
    else{
        hp--;
        hp_create(hp);
        if (hp <= 0){count = len;}
    }
    if (count >= len){
        if (answer_right >= len){
            all_score++;
        }
        else{
            all_score--;
        }
        answer_right = 0;
        score.innerHTML = "Your score is :" + all_score;
        right.innerHTML = '<a onclick="reset()">Next word</a>';
        str = "";
        alpha = "abcdefghijklmnopqrstuvwxyz";
        for (i = 0; i < 26; i++){
            if (except.indexOf(alpha[i]) > -1){
                str += "<letter id = 'done'>" + alpha[i].toUpperCase() + "</letter>" + " ";
                continue;
            }
            str += "<letter id = '" +alpha[i] + "'>" +alpha[i].toUpperCase() + "</letter>" + " ";
        }
        document.getElementById('alpha').innerHTML = str;
    }
}

document.onkeydown = function(e){
    if (count < len) select(e.key);
};

function hp_create(hp){
    document.getElementsByTagName("heart")[0].innerHTML = "";
    for (i = 0; i < hp; i++){
         document.getElementsByTagName("heart")[0].innerHTML += "<img src='heart.gif'>";
    }
}

function start(){
    document.getElementsByTagName("body")[0].innerHTML = "<game>        <header>Guess the word game</header>        <div id = \"letter_body\"></div>        <div id = \"alpha\">            <letter onclick=\"select('a')\" id = 'a'>A</letter>            <letter onclick=\"select('b')\" id = 'b'>B</letter>\
            <letter onclick=\"select('c')\" id = 'c'>C</letter>            <letter onclick=\"select('d')\" id = 'd'>D</letter>            <letter onclick=\"select('e')\" id = 'e'>E</letter>            <letter onclick=\"select('f')\" id = 'f'>F</letter>\
            <letter onclick=\"select('g')\" id = 'g'>G</letter>            <letter onclick=\"select('h')\" id = 'h'>H</letter>            <letter onclick=\"select('i')\" id = 'i'>I</letter>            <letter onclick=\"select('j')\" id = 'j'>J</letter>\
            <letter onclick=\"select('k')\" id = 'k'>K</letter>            <letter onclick=\"select('l')\" id = 'l'>L</letter>            <letter onclick=\"select('m')\" id = 'm'>M</letter>            <letter onclick=\"select('n')\" id = 'n'>N</letter>\
            <letter onclick=\"select('o')\" id = 'o'>O</letter>            <letter onclick=\"select('p')\" id = 'p'>P</letter>            <letter onclick=\"select('q')\" id = 'q'>Q</letter>\
            <letter onclick=\"select('r')\" id = 'r'>R</letter>            <letter onclick=\"select('s')\" id = 's'>S</letter>            <letter onclick=\"select('t')\" id = 't'>T</letter>            <letter onclick=\"select('u')\" id = 'u'>U</letter>\
            <letter onclick=\"select('v')\" id = 'v'>V</letter>            <letter onclick=\"select('w')\" id = 'w'>W</letter>            <letter onclick=\"select('x')\" id = 'x'>X</letter>            <letter onclick=\"select('y')\" id = 'y'>Y</letter>\
            <letter onclick=\"select('z')\" id = 'z'>Z</letter>        </div>        <div id = \"right\"></div>        <div id = \"score\">Your score is :0</div>        <heart></heart>    </game>    <script type=\"text/javascript\" src=\"script.js\"></script>";
    main();
}