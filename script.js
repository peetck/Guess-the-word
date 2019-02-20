word = ["float()"];
select = word[0].replace("(", "").replace(")", "");
len = select.length;
str = "";
for (var i = 0; i < len; i++){
    str += "<word class = 'letter'>x</word>";
}
if ("(" || ")" in word[0]){
    str += "<word class = 'letter_show'>(</word>";
    str += "<word class = 'letter_show'>)</word>";
}
letter_body.innerHTML = str;