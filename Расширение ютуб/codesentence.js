//                запрос к элементу по его классу, id или тегу
var el = document.querySelector("body");
var originals = {};
el.setAttribute("data-wa", "0");
(function() {
    var subtitle_button_sentese = document.querySelector('.ytp-subtitles-button');
    if(subtitle_button_sentese.getAttribute('aria-pressed')!=="true"){
        subtitle_button_sentese.click();
    }
    findAndClickDelay(300,'.ytd-video-primary-info-renderer .dropdown-trigger.style-scope.ytd-menu-renderer button', '', false, function (){
        findAndClickDelay(300,'.ytd-menu-service-item-renderer', 'Посмотреть расшифровку видео', false, function (){
            findAndClickDelay(300,'.cue.style-scope.ytd-transcript-body-renderer.active', '', false, function (){
                let subtitleOriginalFull = document.querySelectorAll("div.cue.style-scope.ytd-transcript-body-renderer");
                let subtitleOriginalOffset = document.querySelectorAll("div.cue-group-start-offset.style-scope.ytd-transcript-body-renderer");
                for (let i=0; i<subtitleOriginalFull.length; i++){
                    //                                  только текстовая составляющая без разметки
                    originals[subtitleOriginalOffset[i].innerText]=subtitleOriginalFull[i].innerText;
                }
                main_translate();
            });
        });
    });
}());
(function() {
    setInterval(function(){
        let player = document.querySelector('.ytp-caption-segment');
        player.onmousemove = function() {
            var play_button_sentense = document.querySelector('.ytp-play-button');
            if (play_button_sentense.getAttribute('aria-label') !== "Смотреть (k)") {
                play_button_sentense.click();
            }
        }
    },300);
}());

function main_translate(){
    setInterval(function () {
        //            смотрит включены ли субтитры
        if (document.querySelector("body").getAttribute("data-wa") !== "0") {
            return;
        }
        //              смотрит есть ли субтитры
        if (document.querySelector(".caption-window") === null) {
            return;
        }
        //                                                            получаем все внутренние элементы
        let spans = document.querySelector(".caption-window").childNodes;
        findAndCallback(spans, ['captions-text','caption-visual-line','ytp-caption-segment'], function (elements){
            //                                      проверяем переведен ли этот кусочек или нет
            if (elements.getAttribute('translated')!=='1') {
                let subtitle = elements.innerText;
                // элемент, содержащий текущее время субтитра, который на данный момент показывается
                let subtitleoriginalOffset = document.querySelector(".cue-group.style-scope.ytd-transcript-body-renderer.active .cue-group-start-offset");
                // значение элемента мин:сек
                let offsetValue = '';
                if(subtitleoriginalOffset!==null){
                    offsetValue = subtitleoriginalOffset.innerText;
                }
                let prevText = '';
                let nextText = '';
                let currentText = '';
                let item_found = false;
                // пробегаемся по всем временам
                for (let offset in originals){
                    if(originals.hasOwnProperty(offset)){
                        if(item_found){
                            nextText = originals[offset];
                            break;
                        }
                        // проверяем, что элемент текущий
                        if(offset==offsetValue){
                            item_found = true;
                            prevText = currentText;
                        }
                        currentText = originals[offset];
                    }
                }
                y(subtitle, elements, prevText+'\n'+currentText+'\n'+nextText);
                // говорим, что нашли перевод
                elements.setAttribute("translated", "1");
            }
        });
    }, 10);
}
function main_translate1(){
    // постоянное выполнение
    setInterval(function () {
        if (document.querySelector("body").getAttribute("data-wa") !== "0") {
            return;
        }

        if (document.querySelector(".caption-window") === null) {
            return;
        }
        let spans = document.querySelector(".caption-window").childNodes;
        for (let i = 0; i < spans.length; i++) {
            if (typeof spans[i] !== 'undefined' && spans[i].className === 'captions-text') {
                let spans2 = spans[i].childNodes;
                for (let j = 0; j < spans2.length; j++) {
                    if (typeof spans2[j] !== 'undefined' && spans2[j].className === 'caption-visual-line') {
                        let spans3 = spans2[j].childNodes;
                        for (let k = 0; k < 1; k++) {
                            if (typeof spans3[k] !== 'undefined' && spans3[k].className === 'ytp-caption-segment') {
                                if (spans3[k].getAttribute('translated')!=='1') {
                                    let subtitle = spans3[k].innerText;
                                    y(subtitle, spans3[k]);
                                    spans3[k].setAttribute("translated", "1");
                                }
                            }
                        }
                    }
                }
            }
        }
    }, 10);
}
// клонируем массив, чтобы он передавался по значению, а не по ссылке
function clone(arr){
    var cloned_arr = [];
    for (let i=0; i<arr.length; i++){
        cloned_arr.push(arr[i]);
    }
    return cloned_arr;
}
// ищет и находит элементы
function findAndCallback(elements,selectors,callback){
    let selector = selectors.shift();
    for (let i = 0; i < elements.length; i++) {
        if (typeof elements[i] !== 'undefined' && elements[i].className === selector) {
            if(selectors.length>0){
                findAndCallback(elements[i].childNodes,clone(selectors),callback);
            }else {
                callback(elements[i]);
            }
        }
    }
}
function findAndClick(selector, text, strict){
    let nodes = document.querySelectorAll(selector);
    for (let i=0; i<nodes.length; i++){
        if(strict){
            if(nodes[i].innerText===text){
                return nodes[i];
            }
        }else{
            let r = new RegExp('.*'+text+'.*');
            if(nodes[i].innerText.match(r)){
                return nodes[i];
            }
        }
    }
    return null;
}
// не знает есть ли элемент на странице, ждет пока появится и ищет
function findAndClickDelay(delay, selector, text, strict, callback){
    let stopSearch = setInterval(function (){
        let searchResult = findAndClick(selector,text,strict);
        if(searchResult!==null){
            clearInterval(stopSearch);
            searchResult.click();
            setTimeout(function (){callback()},delay);
        }
    },delay);
}
function y(sentence, element, context){
        var data = context;
        var xhr = new XMLHttpRequest();
        // ждем ответа
        xhr.addEventListener("readystatechange", function () {
            // ответ получили, но неизвестно с каким статусом, статус получен и завершен 4
            if (this.readyState === 4) {
                // входящий элемент преобразовываем в объект
                let result = JSON.parse(this.responseText);
                let subtitletranslation = result['translations'][0]['text'];
                let subtitle = ' <span style="border: 1px dashed #600; border-radius: 3px" title="' + subtitletranslation + '">' + sentence + '</span>';
                element.innerHTML = subtitle;
            }
        });
        xhr.open("POST", "https://smgen.ru/yandex.php", true);
        //                                                 просто текст
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.send(data);
}