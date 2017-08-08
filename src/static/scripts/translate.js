function translateText() {
    var etoggle = document.getElementById("successful");
    etoggle.setAttribute("style", "display:none;")
    var element = document.getElementById("textInput");
    var request = new XMLHttpRequest();
    var URL = "https://www.dixionary.com/api/translate";
    request.onreadystatechange = function() {
            let responce = JSON.parse(request.responseText);
            document.getElementById("textInput").value = responce.join(' ');
            etoggle.removeAttribute("style");
    }
    var jsonStr = JSON.stringify({
        message: element.value
    });
    request.open("POST", URL, false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    console.log(jsonStr);
    request.send(jsonStr);
}
