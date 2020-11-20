let translateWord = document.getElementById('translateWord');
let translateSentence = document.getElementById('translateSentence');
chrome.storage.sync.get("session_id",function(data){
    if(typeof data.session_id === "undefined"){
        // запихиваем в локальное хранилище session.id и создаем заново, если не найден, а когда найден запихиваем в поле session
        chrome.storage.sync.set({"session_id":Math.random()});
    }
    document.querySelector("#session_id").value = data.session_id;
    document.querySelector("#session").setAttribute('href','https://smgen.ru/view.php?sid='+data.session_id);
});
translateWord.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // получаем код и отправляем текст
                let codeWords = this.responseText;
                // любой объект превращает в строку (Json.org)
                codeWords=codeWords.replace('\'%translations_json%\'',JSON.stringify(translations));
                codeWords=codeWords.replace('\'%session_id%\'',JSON.stringify(document.querySelector("#session_id").value));
                chrome.tabs.executeScript(
                    // будет выполнено на текущей активной вкладке хрома
                    tabs[0].id,
                    // JS передаем плагину, чтобы он выполнил на сайте
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
