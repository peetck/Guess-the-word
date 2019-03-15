word_listed = ["def", "abs()", "all()","ascii()","bool()","chr()","dict()","float()","help()","int()","len()","list()","max()","min()","ord()","print()","range()","reversed()","str()","tuple()","capitalize()","center()","count()","find()","isalnum()","isalpha()","isdigit()","islower()",
               "isspace()","isupper()","lower()","replace()","rfind()","rsplit()","split()","strip()","swapcase()","title()","upper()","append()","insert()","pop()",
               "remove()","reverse()","sort()","fromkeys()","get()","items()","keys()","update()", "and", "or", "not", "for", "break", "while", "return"];


word_hint = {"def": "To define a function.", "abs()": "Returns the absolute value of a number.", "all()": "Returns True if all items in an iterable object are true.","ascii()": "Returns a readable version of an object. Replaces none-ascii characters with escape character",
"bool()": "Returns the boolean value of the specified object","chr()": "Returns a character from the specified Unicode code.","dict()": "Returns a dictionary (Array)","float()": "Returns a floating point number","help()": "Executes the built-in help system", "int()": "Returns an integer number",
"len()":"Returns the length of an object","list()": "Returns a list","max()": " Returns the largest item in an iterable", "min()": "Returns the smallest item in an iterable","ord()":" Convert an integer representing the Unicode of the specified character",
"print()":" Prints to the standard output device","range()":"Returns a sequence of numbers, starting from 0 and increments by 1 (by default)","reversed()":"Returns a reversed iterator","str()":"Returns a string object","tuple()":"Returns a tuple",
"capitalize()":"Converts the first character to upper case","center()":"Returns a centered string","count()":"Returns the number of times a specified value occurs in a string","find()":"Searches the string for a specified value and returns the position of where it was found",
"isalnum()":"Returns True if all characters in the string are alphanumeric","isalpha()":"Returns True if all characters in the string are in the alphabet","isdigit()":"Returns True if all characters in the string are digits","islower()":"Returns True if all characters in the string are lower case",
"isspace()":"Returns True if all characters in the string are whitespaces","isupper()":"Returns True if all characters in the string are upper case","lower()":"Converts a string into lower case","replace()":"Returns a string where a specified value is replaced with a specified value","rfind()":"Searches the string for a specified value and returns the last position of where it was found",
"rsplit()":"Splits the string at the specified separator, and returns a list","split()":"Splits the string at the specified separator, and returns a list","strip()":"Returns a trimmed version of the string","swapcase()":"Swaps cases, lower case becomes upper case and vice versa","title()":"Converts the first character of each word to upper case","upper()":"Converts a string into upper case","append()":"Adds an element at the end of the list",
"insert()":"Adds an element at the specified position","pop()":"Removes the element at the specified position","remove()":" Removes the first item with the specified value","reverse()":"Reverses the order of the list","sort()":"Sorts the list",
"fromkeys()":"Returns a dictionary with the specified keys and values","get()":"Returns the value of the specified key","items()":"Returns a list containing a tuple for each key value pair","keys()":"Returns a list containing the dictionary's keys","update()":"Updates the dictionary with the specified key-value pairs",
"and": "A logical operator", "or": "A logical operator", "not": "A logical operator", "for": "To create a for loop", "break": "To break out of a loop", "while": "To create a while loop", "return": "To exit a function and return a value"};

var rand = word_listed.length;
var fail = new Audio('audio/fail.mp3');
var correct = new Audio("audio/correct.mp3");
var guess_right = new Audio("audio/guess_right.mp3");
var guess_wrong = new Audio("audio/guess_wrong.mp3");
var bg_music = new Audio("audio/bg_music.mp3");
var can_press_enter = 0;
var all_score = 0;
var count = 0;
var except = "";
var help_count = 0;
function reset(){
    can_press_enter = 0;
    letter_body.innerHTML = temp;
    except = "";
    str = "";
    help_count = 0;
    alpha = "abcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < 26; i++){
        str += "<letter onclick=\"select('" +alpha[i] + "')\" id = '" +alpha[i] + "'>" +alpha[i].toUpperCase() + "</letter>" + " ";
    }
    document.getElementById('alpha').innerHTML = str;
    document.getElementById('right').innerHTML = "";
    main();
}
function main(){
    bg_music.play();
    hp = 5;
    hp_create(hp);
    temp = letter_body.innerHTML;
    answer_right = 0;
    count = 0;
    random = Math.random() * rand;
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
    if (document.getElementById(inp).id != 'done_red' && document.getElementById(inp).id != 'done_blue'){
        done_color = 'blue';
        except += inp;
        if (word.indexOf(inp) > -1){
            correct.pause();
            correct.currentTime = 0;
            correct.play();
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
            fail.pause();
            fail.currentTime = 0;
            fail.play();
            hp--;
            hp_create(hp);
            if (hp <= 0){count = len;}
            done_color = 'red';
        }
        document.getElementById(inp).id = "done" + "_" + done_color;
        if (count >= len){
            hp_create(0);
            if (answer_right >= len){
                guess_wrong.pause();
                guess_wrong.currentTime = 0;
                guess_right.pause();
                guess_right.currentTime = 0;
                guess_right.play();
                all_score++;
                right.innerHTML = 'Awesome, You Correct!' + '<br> <h1><button class="button" onclick="reset()"><span> Next Word </span></button></h1>';
            }
            else{
                guess_wrong.pause();
                guess_wrong.currentTime = 0;
                guess_right.pause();
                guess_right.currentTime = 0;
                guess_wrong.play();
                right.innerHTML = 'You Lost.. The word was: ' + word + '<br> <h1><button class="button" onclick="reset()"><span> Next Word </span></button></h1>';
            }
            answer_right = 0;
            score.innerHTML = "Your score is : " + all_score;
            str = "";
            alpha = "abcdefghijklmnopqrstuvwxyz";
            for (i = 0; i < 26; i++){
                if (except.indexOf(alpha[i]) > -1){
                    str += "<letter id = 'done_'" + done_color + ">" + alpha[i].toUpperCase() + "</letter>" + " ";
                    continue;
                }
                str += "<letter id = '" +alpha[i] + "'>" +alpha[i].toUpperCase() + "</letter>" + " ";
            }
            document.getElementById('alpha').innerHTML = str;
            word_listed.splice(word_listed.indexOf(word), 1);
            console.log(word);
            console.log(word_listed);
            rand--;
            if (rand <= 0){
                hp_create(0);
                document.getElementById('alpha').innerHTML = "";
                letter_body.innerHTML = "";
                right.innerHTML = 'Answer is: ' + word + '<br>' + 'You just guess all of the word' + '<br>' + '<h1><button class="button" onclick="start()"><span> Play again </span></button></h1>';
            }
            console.log(rand);
            can_press_enter = 1;
        }
    }
}

document.onkeydown = function(e){
    console.log(e.key);
    if (can_press_enter && e.key == "Enter"){
        reset();
    }
    else if (e.key == '1'){help();}
    else if (count < len && document.getElementById(e.key).id != 'done_red' && document.getElementById(e.key).id != 'done_blue') select(e.key);
};

function hp_create(hp){
    document.getElementsByTagName("heart")[0].innerHTML = "";
    for (i = 0; i < hp; i++){
         document.getElementsByTagName("heart")[0].innerHTML += "<img src='image/heart.gif'>";
    }
}

function start(){
    can_press_enter = 0;
    all_score = 0;
    count = 0;
    except = "";
    help_count = 0;
    word_listed = ["def", "abs()", "all()","ascii()","bool()","chr()","dict()","float()","help()","int()","len()","list()","max()","min()","ord()","print()","range()","reversed()","str()","tuple()","capitalize()","center()","count()","find()","isalnum()","isalpha()","isdigit()","islower()",
               "isspace()","isupper()","lower()","replace()","rfind()","rsplit()","split()","strip()","swapcase()","title()","upper()","append()","insert()","pop()",
               "remove()","reverse()","sort()","fromkeys()","get()","items()","keys()","update()", "and", "or", "not", "for", "break", "while", "return"];
    rand = word_listed.length;
    document.getElementsByTagName("body")[0].innerHTML = "<game>        <header>Guess the word game <div class='how_div' id='item'><img onclick='help()' src='https://image.flaticon.com/icons/png/512/61/61671.png'></div></header>        <div id = \"letter_body\"></div>        <div id = \"alpha\">            <letter onclick=\"select('a')\" id = 'a'>A</letter>            <letter onclick=\"select('b')\" id = 'b'>B</letter>\
            <letter onclick=\"select('c')\" id = 'c'>C</letter>            <letter onclick=\"select('d')\" id = 'd'>D</letter>            <letter onclick=\"select('e')\" id = 'e'>E</letter>            <letter onclick=\"select('f')\" id = 'f'>F</letter>\
            <letter onclick=\"select('g')\" id = 'g'>G</letter>            <letter onclick=\"select('h')\" id = 'h'>H</letter>            <letter onclick=\"select('i')\" id = 'i'>I</letter>            <letter onclick=\"select('j')\" id = 'j'>J</letter>\
            <letter onclick=\"select('k')\" id = 'k'>K</letter>            <letter onclick=\"select('l')\" id = 'l'>L</letter>            <letter onclick=\"select('m')\" id = 'm'>M</letter>            <letter onclick=\"select('n')\" id = 'n'>N</letter>\
            <letter onclick=\"select('o')\" id = 'o'>O</letter>            <letter onclick=\"select('p')\" id = 'p'>P</letter>            <letter onclick=\"select('q')\" id = 'q'>Q</letter>\
            <letter onclick=\"select('r')\" id = 'r'>R</letter>            <letter onclick=\"select('s')\" id = 's'>S</letter>            <letter onclick=\"select('t')\" id = 't'>T</letter>            <letter onclick=\"select('u')\" id = 'u'>U</letter>\
            <letter onclick=\"select('v')\" id = 'v'>V</letter>            <letter onclick=\"select('w')\" id = 'w'>W</letter>            <letter onclick=\"select('x')\" id = 'x'>X</letter>            <letter onclick=\"select('y')\" id = 'y'>Y</letter>\
            <letter onclick=\"select('z')\" id = 'z'>Z</letter>        </div>        <div id = \"right\"></div>        <div id = \"score\">Your score is : 0</div>        <heart></heart>    </game>    <script type=\"text/javascript\" src=\"script.js\"></script>";
    main();
}

function help(){
    if (count < len){
        try{
            select(word_only[help_count]);
            help_count++;
        }
        catch(err){
            help_count++;
            help();
        }
    }
}
function howto(){
     document.getElementsByTagName("body")[0].innerHTML = "<game><header>HOW TO PLAY ?</header> <div class='how_div' >1. คุณสามารถกดเลือกตัวอักษรจากบนหน้าจอด้วยเมาส์ของท่านหรือคีย์บอร์ด</div><div class='how_div'>2. หากทายถูกจะได้รับคะแนนหนึ่งคะแนน</div><div class='how_div'>3. หากทายตัวอักษรผิดหัวใจจะหายไปหนึ่งดวงหากหัวใจหมดจะไม่ได้คะแนนข้อนั้น</div><div class='how_div'>4. จะไม่มีการนําคําที่ให้ทายไปแล้วกลับมาให้ทายอีก(แม้ว่าจะทายผิด)</div><div class='how_div'>5. กดเครื่องหมายคำถามข้างบนขวา หรือ กด 1 เพื่อเฉลย 1 ตัวอักษร (ใช้เวลาหมดหนทางจริงๆ :X)</div>\
     <button class=\"button_back\" onclick=\"menu()\"><span>ย้อนกลับ</span></button></game>";
}
var first_menu = document.getElementsByTagName("body")[0].innerHTML;
function menu(){
    document.getElementsByTagName("body")[0].innerHTML = first_menu;
}
