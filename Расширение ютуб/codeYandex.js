(function () {
    var data = 'first thing you\'ll notice is the size of that head this alligator snapping';

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
    xhr.open("POST", "https://smgen.ru/yandex.php", true);
    xhr.setRequestHeader("Content-Type", "text/plain");

    xhr.send(data);
}());