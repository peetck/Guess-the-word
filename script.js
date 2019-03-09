word_listed = ["def", "abs()"];
word_hint = {"def": "To define a function.", "abs()": "Returns the absolute value of a number."};
all_score = 0;
count = 0;
except = ""
function reset(){
    letter_body.innerHTML = temp;
    except = ""
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
    random = Math.random() * 2;
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