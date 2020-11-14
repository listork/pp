<?php
if (isset($_GET["sid"])){
    session_id(md5($_GET["sid"]));
}
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
//define('STATS_FILE', "stats.json");
//if (!file_exists(STATS_FILE)){
//    $f = fopen(STATS_FILE, "w");
//    fclose($f);
//}
//$fbody = file_get_contents(STATS_FILE);
//$dict = json_decode($fbody, true);
if (empty($_SESSION["dict"])){
    $_SESSION["dict"] = array();
}
$dict = $_SESSION["dict"];
//if (empty($dict)){
//    $dict = array();
//}
if (isset ($word)){
    file_put_contents("log.txt", print_r($word,1));
    foreach ($word as $worditem){
        if (!isset($dict[$worditem])) {
            $dict[$worditem] = 0;
        }
        $dict[$worditem]++;
    }
//    file_put_contents(STATS_FILE, json_encode($dict));
$_SESSION["dict"] = $dict;
}
if (isset($_GET["word"])) {
    $word = $_GET["word"];
    if (!isset($dict[$word])) {
        $dict[$word] = 0;
    }
    $dict[$word]++;
//    file_put_contents(STATS_FILE, json_encode($dict));
    $_SESSION["dict"] = $dict;
    print_r(session_id());
}
