if (typeof translations1 === "undefined") {
    var translations1;
}
translations1 = '%translations_json%';
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
                    originals[subtitleOriginalOffset[i].innerText]=subtitleOriginalFull[i].innerText;
                }
                main_translate();
            });
        });
    });

    /*var buttons = document.querySelector('.ytd-video-primary-info-renderer
     .dropdown-trigger.style-scope.ytd-menu-renderer button');
     */
    // console.log(buttons);
    /*buttons.click();
    var stopSearch = setInterval(function (){
    var stopSearch1;
        var paper_items = document.querySelectorAll('.ytd-menu-service-item-renderer');
        for (let i = 0; i < paper_items.length; i++) {
            if(paper_items[i].innerText==='Посмотреть расшифровку видео'){
                clearInterval(stopSearch);
                stopSearch1 = setInterval(function (){
                    var paper_items = document.querySelectorAll('.cue.style-scope.ytd-transcript-body-renderer.active');
                    if (paper_items.length>0) {
                        clearInterval(stopSearch1);
                        alert("abc");
                    }
                    // for (let i = 0; i < paper_items.length; i++) {
                    //     if(paper_items[i].innerText==='Посмотреть расшифровку видео'){
                    //         clearInterval(stopSearch);
                    //
                    //         paper_items[i].click();
                    //     }
                    // }
                },300)
                paper_items[i].click();
            }
        }
    },300);*/

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
        if (document.querySelector("body").getAttribute("data-wa") !== "0") {
            return;
        }

        if (document.querySelector(".caption-window") === null) {
            return;
        }
        let spans = document.querySelector(".caption-window").childNodes;
        findAndCallback(spans, ['captions-text','caption-visual-line','ytp-caption-segment'], function (elements){
            if (elements.getAttribute('translated')!=='1') {
                let subtitle = elements.innerText;

                let subtitleoriginalOffset = document.querySelector(".cue-group.style-scope.ytd-transcript-body-renderer.active .cue-group-start-offset");
                let offsetValue = '';
                if(subtitleoriginalOffset!==null){
                    offsetValue = subtitleoriginalOffset.innerText;
                }else {
                    console.log('offset not found');
                }
                let prevText = '';
                let nextText = '';
                let currentText = '';
                let item_found = false;
                for (let offset in originals){
                    if(originals.hasOwnProperty(offset)){
                        console.log(offset,offsetValue,item_found);
                        if(item_found){
                            nextText = originals[offset];
                            break;
                        }
                        if(offset==offsetValue){
                            item_found = true;
                            prevText = currentText;
                        }
                        currentText = originals[offset];
                    }
                }
                y(subtitle, elements, prevText+'\n'+currentText+'\n'+nextText);
                elements.setAttribute("translated", "1");
            }
        });
    }, 10);
}
function main_translate1(){
    // document.querySelector('.style-scope.ytd-menu-popup-renderer')
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
                                    // let subtitleoriginalEl = document.querySelector("div.cue.style-scope.ytd-transcript-body-renderer.active");
                                    // if(subtitleoriginalEl!==null) {
                                    //     let subtitleoriginal = subtitleoriginalEl.innerText;
                                    y(subtitle, spans3[k]);
                                    spans3[k].setAttribute("translated", "1");
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, 10);
}





function t(word) {
    if (typeof translations1[word] !== 'undefined') {
        word = translations1[word];
    }
    return word;
}

function clone(arr){
    var cloned_arr = [];
    for (let i=0; i<arr.length; i++){
        cloned_arr.push(arr[i]);
    }
    return cloned_arr;
}

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
            // console.log(nodes[i].innerText,text);
            if(nodes[i].innerText.match(r)){
                return nodes[i];
            }
        }
    }
    return null;
}

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
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                // console.log(this.responseText);
                let result = JSON.parse(this.responseText);
                let subtitletranslation = result['translations'][0]['text'];
                let subtitle = ' <span style="border: 1px dashed #600; border-radius: 3px" title="' + subtitletranslation + '">' + sentence + '</span>';
                element.innerHTML = subtitle;
            }
        });
        xhr.open("POST", "https://smgen.ru/yandex.php", true);
        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.send(data);
}