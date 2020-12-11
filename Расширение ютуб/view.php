<?php
if (isset($_GET["sid"])){
//             превращение информации в хэш этой информации
    session_id(md5($_GET["sid"]));
}session_start();
//            сообщает, что дальше будет идти html страница
header('Content-Type: text/html; charset=utf-8');
//            к нашему сайту возможен запрос с абсолютно другого любого сайта
header('Access-Control-Allow-Origin: *');
//  если задано, аналог в JS typeof some_var !== "undefined"
if (isset($_GET["delete"])&&$_GET["delete"]=="yes"){
    session_destroy();
            header("Location: /view.php");
//      прекращает что-либо делать
        exit();
}
if (empty($_SESSION["dict"])){
    $_SESSION["dict"] = array();
}
$dict = $_SESSION["dict"];
// выстраивает слова в алфавитном порядке
uasort($dict, 'cmp');
function cmp($a, $b) {
    if ($a['amount'] == $b['amount']) {
        return 0;
    }
    return ($a['amount'] > $b['amount']) ? -1 : 1;
}
?>
    <style  type="text/css">
/*             ячейка заголовка, ячейка текста*/
        table, th, td {
            border: 1px solid #ccc;
        }
    </style>
<table style = "border-collapse: collapse;">
    <tr><th>Слово</th><th>Перевод</th><th>Кол-во</th></tr>
    <?php
//    проходит по всем ключам словаря dict и помещает их в переменную word, в word_data кладет значение массива
    foreach ($dict as $word => $word_data){
        $amount = $word_data["amount"];
        $translation = $word_data["translation"];
//        проверяет, что слово не пустое, состоит из букв
        if (trim($word)==''){
//            прерывает текущую иттерацию и переходит к следующей
            continue;
        }
        printf("<tr><td>%s</td><td>%s</td><td>%s</td></tr>", $word,$translation, $amount);
    }
    ?>
</table>
<form><button name="delete" value="yes">Очистить статистику</button></form>
<?php
