function fetchProjects() {
    var request = new XMLHttpRequest();
    var URL = "https://www.dixionary.com/api/fetch";
    var testURL = "http://aws.arturonet.com:8080/api/fetch";
    request.overrideMimeType("application/json");
    request.open("GET", testURL);
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let responce = JSON.parse(request.responseText);
            console.log(responce);
            responce.forEach(item => {
                var scammer = item.scammer;
                var english = item.english;
                sendProject(english, scammer)});
        }
        document.getElementById('spinner').setAttribute("style", "display:none;");
        document.getElementById('scammerContainer').removeAttribute("style");
    }
    request.send();
}
function sendProject(englishItem, scammerItem) {
    var project = document.getElementById('scammerTable');
    var table = document.createElement('tr');

    var scammer = document.createElement('th');
    var text = document.createTextNode(scammerItem);
    scammer.appendChild(text);
    table.appendChild(scammer);

    var english = document.createElement('th');
    var text = document.createTextNode(englishItem);
    english.appendChild(text);
    table.appendChild(english);

    project.appendChild(table);
}





fetchProjects();
