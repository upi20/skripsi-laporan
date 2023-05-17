<?php
$datas = [];
if (($handle = fopen("./Reviews.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle)) !== FALSE) {
        // $datas[] = $data;
    }
    fclose($handle);
}
