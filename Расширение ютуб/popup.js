let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'let translations = '+JSON.stringify(translations)+';\n' +
                    'setInterval(function(){\n' +
                    '    if(document.getElementById("caption-window-1")===null) {\n' +
                    '        return;\n' +
                    '    }\n' +
                    '    let spans = document.getElementById("caption-window-1").childNodes;\n' +
                    '    for (let i=0; i<spans.length;i++){\n' +
                    '        if(typeof spans[i]!==\'undefined\' && spans[i].className===\'captions-text\'){\n' +
                    '            let spans2 = spans[i].childNodes;\n' +
                    '            for (let j=0; j<spans2.length;j++){\n' +
                    '                if(typeof spans2[j]!==\'undefined\' && spans2[j].className===\'caption-visual-line\'){\n' +
                    '                    let spans3 = spans2[j].childNodes;\n' +
                    '                    for (let k=0; k<spans3.length;k++){\n' +
                    '                        if(typeof spans3[k]!==\'undefined\' && spans3[k].className===\'ytp-caption-segment\'){\n' +
                    '                            let subtitle = spans3[k].innerText;\n' +
                    '                            let subtitle_words = subtitle.split(/[^\\w]+/);\n' +
                    '                            subtitle = \'\';\n' +
                    '                            for (let i=0; i<subtitle_words.length; i++){\n' +
                    '                                let subtitle_translation = t(subtitle_words[i]);\n' +
                    '                                if(subtitle_translation!==subtitle_words[i]){\n' +
                    '                                    subtitle += \' <span style="border: 1px dotted #666; border-radius: 3px" title="\'+subtitle_translation+\'">\'+subtitle_words[i]+\'</span>\';\n' +
                    '                                }else{\n' +
                    '                                    subtitle += \' \'+subtitle_words[i];\n' +
                    '                                }\n' +
                    '                            }\n' +
                    '                            spans3[k].innerHTML=subtitle;\n' +
                    '                        }\n' +
                    '                    }\n' +
                    '                }\n' +
                    '            }\n' +
                    '        }\n' +
                    '    }\n' +
                    '},300);\n' +
                    'function t(word){\n' +
                    '    if(typeof translations[word] !== \'undefined\'){\n' +
                    '        word = translations[word];\n' +
                    '    }\n' +
                    '    return word;\n' +
                    '}'});
    });
};