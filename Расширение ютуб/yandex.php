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
        "Authorization: Bearer t1.9euelZqdmcaSx4qNnpDIzc2bnJDLnO3rnpWajsaRk5uVzI-blZWez8qKy8nl8_cVe2oB-u9vE1wX_d3z91UpaAH6728TXBf9.WpBW9oDEUxy4QbKTdfM6gijBcdWRzLPBsuoZesH6OT5_QPL3q3A2au5xlPvGExR15YFr2_0b_FjC_o1h_e1-Aw",
        "Content-Type: application/json"
    ),
));
// получение ответа
$response = curl_exec($curl);
// закрывает запрос
curl_close($curl);
// выводит JS, которой содержит перевод
echo $response;
