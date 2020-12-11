<?php
if (isset($_GET["sid"])){
    session_id(md5($_GET["sid"]));
}
session_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
if (empty($_SESSION["dict"])){
    $_SESSION["dict"] = array();
}
$dict = $_SESSION["dict"];
if (isset($_GET["word"])) {
    $word = $_GET["word"];
    $tr = "";
    if (isset($_GET["tr"])) {
        $tr = $_GET["tr"];
    }
    if (!isset($dict[$word])) {
        $dict[$word] = array("amount" => 0, "translation" => $tr);
    }
    $dict[$word]["amount"]++;
    if (!empty($tr)) {
        $dict[$word]["translation"] = $tr;
    }
//   заносим статистику пользователя
    $_SESSION["dict"] = $dict;
}
