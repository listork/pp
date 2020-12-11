if (typeof translations === "undefined") {
    var translations;
}
translations = '%translations_json%';
session_id = '%session_id%';
var el1 = document.querySelector("body");
el1.setAttribute("data-wa", "1");
let subtitleon = document.querySelector(".ytp-subtitles-button");
if (subtitleon.getAttribute('aria-pressed') !== 'true') {
    subtitleon.click();
}
(function () {
    setInterval(function () {
        let subtitlestring = document.querySelector(".ytp-caption-segment");
        subtitlestring.onmousemove = function () {
            let playbutton = document.querySelector(".ytp-play-button");
            if (playbutton.getAttribute('aria-label') !== 'Смотреть (k)') {
                playbutton.click();
            }
        };
    }, 300);
}());
setInterval(function () {
    if (document.querySelector("body").getAttribute("data-wa") !== "1") {
        return;
    }
    if (document.getElementById("caption-window-1") === null) {
        return;
    }
    let spans = document.getElementById("caption-window-1").childNodes;
    for (let i = 0; i < spans.length; i++) {
        if (typeof spans[i] !== 'undefined' && spans[i].className === 'captions-text') {
            let spans2 = spans[i].childNodes;
            for (let j = 0; j < spans2.length; j++) {
                if (typeof spans2[j] !== 'undefined' && spans2[j].className === 'caption-visual-line') {
                    let spans3 = spans2[j].childNodes;
                    for (let k = 0; k < spans3.length; k++) {
                        if (typeof spans3[k] !== 'undefined' && spans3[k].className === 'ytp-caption-segment') {
                            if (spans3[k].getAttribute('translated') !== '1') {
                                let subtitle = spans3[k].innerText;
                                let subtitle_words = subtitle.split(/[^\w]+/);
                                subtitle = mt(subtitle_words);
                                spans3[k].innerHTML = subtitle;
                                spans3[k].setAttribute("translated", "1");
                                let spans4 = spans3[k].childNodes;
                                for (let n = 0; n < spans4.length; n++){
                                    if (typeof spans4[n] !== 'undefined'&& spans4[n].className === 'translate-word'){
                                        // spans4[n].onmouseover = function (){
                                        //     // функция отправки статисктики при наведении мышкой
                                        // }
                                        doHover(spans4[n], spans4[n].title);
                                        spans4[n].title = '';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}, 300);
function mt(subtitle_words) {
    let out = [];
    let besttranslation = '';
    let combination = [];
    // закончить перевод и начать переводить с того слова, которое мы еще не переводили
    let last_word_added = 0;
    for (let i = 0; i < subtitle_words.length; i++) {
        combination.push(subtitle_words[i]);
        // фраза разделена пробелами
        let r = new RegExp('^' + combination.join(' '));
        // если точное совпадение фразы, то переводим
        let rfull = new RegExp('^' + combination.join(' ')+'$');
        // до сих пор не нашли перевод
        let translationfound = false;
        for (let word in translations) {
            if (translations.hasOwnProperty(word)) {
                // слово из словаря совпадает полностью, не перебираем словарь дальше
                if (word.match(rfull)) {
                    besttranslation = translations[word];
                    translationfound = true;
                    break;
                }
                // если найдено частичное совпадение, пишем перевод, но продолжаем перебирать словарь, вдруг найдется точное совпадение
                if (word.match(r)) {
                    besttranslation = translations[word];
                    translationfound = true;
                }
            }
        }
        //   не нашли перевод     конец предложения
        if (!translationfound || i === (subtitle_words.length - 1)) {
            //   фраза без последнего слова
            let real_combination = combination.slice(0,combination.length-1);
            // фраза через пробелы
            let phrase = real_combination.join(' ');
            // проверяем, что перевод не найден
            if(besttranslation==''){
                // если последнее слово не является текущим
                if(last_word_added<i) {
                    // переводим
                    besttranslation = subtitle_words[i];
                    // кладем в массив вывода
                    out.push(besttranslation);
                    // говорим, что последнее слово есть текущее
                    last_word_added = i;
                }
            }else {
                out.push('<span class="translate-word" style="border: 1px dotted #666; border-radius: 3px" title="' + besttranslation + '">' + phrase + '</span>');
            }

            if (combination.length > 1) {
                combination = [];
                i--;
            }

            besttranslation = '';
        }
    }
    // возвращает значение переведенной фразы разделенной пробелами
    return out.join(' ');
}
function stats(word, translation, element){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://smgen.ru/stat.php?word="+word+ "&tr=" + translation + "&sid=" + session_id, true);
    xhr.setRequestHeader("Content-Type", "text/plain");

    xhr.send();
}
function doHover(element,title) {
    element.onmouseover = function(event){
        let title_span = document.querySelector('#custom_title');
        if(title_span===null){
            title_span = document.createElement('div');
            title_span.id = 'custom_title';
            title_span.style.position = "absolute";
            title_span.style.background = "#6699cc";
            title_span.style.padding = "3px 5px";
            title_span.style.fontSize = "3em";
            document.body.appendChild(title_span);
        }
        title_span.style.display = 'block';
        title_span.style.top = event.clientY+5+"px";
        title_span.style.left = event.clientX+5+"px";
        // title_span.innerText = element.title;
        title_span.innerText = title;
        stats(element.innerText, title);

    }
    element.onmouseout = function () {
        let title_span = document.querySelector('#custom_title');
        if(title_span!==null){
            title_span.style.display = 'none';
        }
    }
}