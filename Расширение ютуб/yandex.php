<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
ini_set('display_errors','on');
error_reporting(E_ALL);
//print('abc');
//flush();
$curl = curl_init();
$data = file_get_contents('php://input');
$word = preg_split("/[^\w]+/",$data);
//include "stat.php";
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
        "Authorization: Bearer t1.9euelZrMkc2YzYvLysiLx5iZzJycy-3rnpWajsaRk5uVzI-blZWez8qKy8nl8_dRD0AC-u83czNM_t3z9xE-PQL67zdzM0z-.BTHdDkwjIqGVs5Uk9ivTxordvUZwvfMD5pEmDkmbU9oO8Rx-FQ_kOGFBmXtQr1Hyd1NCpUpKnyAH6h4e0Oy0Dg",
        "Content-Type: application/json"
    ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
