function fetchProjects() {
    var request = new XMLHttpRequest();
    var URL = "https://www.dixionary.com/api/fetch";
    var indexs = 0;
    request.overrideMimeType("application/json");
    request.open("GET", URL);
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let responce = JSON.parse(request.responseText);
            console.log(responce);
            responce.forEach((item, index, array) => {
                var scammer = item.scammer;
                var english = item.english;
                indexs = indexs + sendProject(english, scammer);
                if (indexs == array.length) {
                    document.getElementById('spinner').setAttribute("style", "display:none;");
                    document.getElementById('scammerContainer').removeAttribute("style");
                }
            });
        }
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
    return 1;
}





fetchProjects();
