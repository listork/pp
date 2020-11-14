let translateWord = document.getElementById('translateWord');
let translateSentence = document.getElementById('translateSentence');
chrome.storage.sync.get("session_id",function(data){
    if(typeof data.session_id === "undefined"){
        chrome.storage.sync.set({"session_id":Math.random()});
    }
    document.querySelector("#session_id").value = data.session_id;
    document.querySelector("#session").setAttribute('href','https://smgen.ru/view.php?sid='+data.session_id);
});
//chrome.storage.sync.set({"session_id":Math.random()});
    // if (typeof data.session_id === "undefined"){
    //     data.session_id = Math.random();
    // }
translateWord.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let codeWords = this.responseText;
                codeWords=codeWords.replace('\'%translations_json%\'',JSON.stringify(translations));
                codeWords=codeWords.replace('\'%session_id%\'',JSON.stringify(document.querySelector("#session_id").value));
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: codeWords});
            }
        };
        xhttp.open("GET", "codeword.js", true);
        xhttp.send();
    });
};
translateSentence.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let codeSentence = this.responseText;
                codeSentence=codeSentence.replace('\'%translations_json%\'',JSON.stringify(translations));
                console.log(codeSentence);
                chrome.tabs.executeScript(
                    tabs[0].id,
                    {code: codeSentence});
            }
        };
        xhttp.open("GET", "codesentence.js", true);
        xhttp.send();
    });
};
