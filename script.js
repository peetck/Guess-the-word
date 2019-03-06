word_listed = ["def"];
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
    temp = letter_body.innerHTML;
    answer_right = 0;
    count = 0;
    random = Math.random() * 1;
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
    right.innerText = "Hint: " + "To define a function.";
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

    if (count >= len){
        if (answer_right >= len){
            all_score++;
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

main();
