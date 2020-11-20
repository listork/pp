<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
//      создает объект, который будет отправлять запрос
$curl = curl_init();
//      получает слово из потокового ввода
$data = file_get_contents('php://input');
//                           не символ, который может встречаться в слове
$word = preg_split("/[^\w]+/",$data);
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://translate.api.cloud.yandex.net/translate/v2/translate",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS =>"{\n    \"folder_id\": \"b1gr7bsl6d317bq2tqh8\",\n    \"texts\": [\"".$data."\"],\n    \"targetLanguageCode\": \"ru\"\n}",
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer t1.9euelZrIj5HLj5mZy8eOyZrGjc3Oie3rnpWajsaRk5uVzI-blZWez8qKy8nl9PclaiAC-u8ndWy73fT3ZRgeAvrvJ3Vsuw.4FGVuG-DB0QCmaAYLH5CNvvxR3iIIq4Ocvgv4uq4WiqlRxps7xwFNJhrijN5t8q5pwldLEiIFFX6B3ux27I6Bw",
        "Content-Type: application/json"
    ),
));
// получение ответа
$response = curl_exec($curl);
// закрывает запрос
curl_close($curl);
// выводит JS, которой содержит перевод
echo $response;
