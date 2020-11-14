<?php
if (isset($_GET["sid"])){
    session_id(md5($_GET["sid"]));
}session_start();
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
define('STATS_FILE', "stats.json");
if (isset($_GET["delete"])&&$_GET["delete"]=="yes"){
//    if (file_exists(STATS_FILE)){
//        unlink(STATS_FILE);
//        header("Location: /view.php");
//        exit();
//    }
    session_destroy();
}
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
asort($dict);
$dict = array_reverse($dict, true);
?>
<table>
    <tr><th>Слово</th><th>Кол-во</th></tr>
    <?php
    foreach ($dict as $word => $amount){
        if (trim($word)==''){
            continue;
        }
        printf("<tr><td>%s</td><td>%s</td></tr>", $word, $amount);
    }
    ?>
</table>
<form><button name="delete" value="yes">Очистить статистику</button></form>
<?php
