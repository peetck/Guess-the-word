word_listed = ["float()", "return", "def"];
all_score = 0;
alphabet = document.querySelector("letter");
function main(){
    answer_right = 0;
    random = Math.random() * 3;
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
}

function select(inp){
    document.getElementById(inp).id = "done";
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
        answer_right++;
        console.log(answer_right);
    }
    if (answer_right >= len){
        all_score++;
        answer_right = 0;
        score.innerHTML = "Your score is :" + all_score;
    }
}
main();