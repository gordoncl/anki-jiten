<?php
/**
 * Quick, dirty script to convert the edict.txt file into 
 * a JSON file and give us some statistics.
 */
ini_set('memory_limit', '500M');

if (!file_exists("edict.txt")) {
  die("Cannot find edict.txt");
}

$dictionary = array();
$file = file("edict.txt");
foreach($file as $line) {
  // Get kanji, kana and english meanings.
  preg_match_all("/^([^\/\[]+)[ ]?(\[[^\]]+\])?[ ]?\/(.*)\/$/", $line, $matches);
  if (count($matches) != 4) {
    continue;
  }

  $readings = array_map('trim', explode(";", preg_replace("/\([^\)]+\)/", "", $matches[1][0])));
  $kana = preg_replace("/[\[\]]/", "", $matches[2][0]);
  $definitions = preg_replace("/\/?EntL[^\/]+$/", "", $matches[3][0]);

  foreach($readings as $reading) {
    $reading = str_replace("・", "", $reading);
    $dictionary[$reading] = array(
      'kana' => trim($kana),
      'definition' => trim($definitions),
    );
  }
}

$fh = fopen("../dictionary.js", "w");
$js = "var Dictionary = " . json_encode($dictionary) . ";";
fwrite($fh, $js);
fclose($fh);

/**
 * Get some statistics on the files.
 */
$words = array_keys($dictionary);
$wordLengths = array();
foreach($words as $word) {
  $length = mb_strlen($word, 'UTF-8');

  if (!isset($wordLengths[$length])) {
    $wordLengths[$length] = 0;
  }

  $wordLengths[$length]++;
}

ksort($wordLengths);
echo "Number of words by Length: \n";
foreach($wordLengths as $length => $count) {
  echo "Words of length {$length}: {$count}\n";
}

function lengthSort($a, $b) {
  return strlen($b)-strlen($a);
}
usort($words, 'lengthSort');

echo "\nLongest 20 words: \n";
for($i = 0; $i < 20; $i++) {
  echo $words[$i] . "\n";
}