# Acknowledgements

This publication has included material from the JMdict (EDICT, etc.) dictionary files in accordance with the licence provisions of the Electronic Dictionaries Research Group. See http://www.csse.monash.edu.au/~jwb/edict.html and http://www.edrdg.org/.

Other libraries also include [jQuery](http://jquery.com/), [cleanslate](https://github.com/premasagar/cleanslate), [mustache.js](http://mustache.github.io/) and, of course, [Anki](http://ankisrs.net/).

# What is Anki Jiten?

A chrome plugin that takes selected Japanese text and translates each word into a format that can be imported into an anki deck.

# Files

The functions of the files that are not third party files are:

* background.js - Core background script that sets up events for the backend.
* dictionary.js - JSON format of the edict.txt file.
* front.js - Sets up events for the front end of the site.
* translator.js - Utilities dictionary.js to convert words.
* scripts/
  * edict-to-dictionary.php - Script to convert edict.txt to a JSON object.
* ui.js - Used by front.js to help facility the UI.

# Methodology and Statistics

There are some statistics beneath to show the amount of words per length. The longest terms can be broken up into smaller words.

The application takes a greedy approach and looks for the longest matches before moving onto the next character. Since we know that most words and expressions won't match more than 20 characters, we can check substrings of length 1 to 20. Due to the fact that this number is constant and the lookups in the dictionary are O(1), we know that the worst case running time is O(n) where n is the number of characters in the string.

## Number of Words by Length

Words of length 1: 3128  
Words of length 2: 53075  
Words of length 3: 43938  
Words of length 4: 40568  
Words of length 5: 20903  
Words of length 6: 14189  
Words of length 7: 9007  
Words of length 8: 5912  
Words of length 9: 3540  
Words of length 10: 2315  
Words of length 11: 1372  
Words of length 12: 846  
Words of length 13: 511  
Words of length 14: 331  
Words of length 15: 234  
Words of length 16: 141  
Words of length 17: 95  
Words of length 18: 56  
Words of length 19: 29  
Words of length 20: 16  
Words of length 21: 9  
Words of length 22: 8  
Words of length 23: 5  
Words of length 24: 2  
Words of length 25: 3  
Words of length 26: 1  
Words of length 27: 2  
Words of length 33: 1  
Words of length 37: 1  

## 20 Longest "Words"

1. プログラム制御式及びキーボード制御式のアドレス指定可能な記憶域をもつ計算器
2. ニューモノウルトラマイクロスコーピックシリコヴォルケーノコニオシス
3. 馬を水辺に導く事は出来るが馬に水を飲ませる事は出来ない
4. プログラム制御式のアドレス指定可能な記憶域をもつ計算器
5. イーストアトランティックアフリカンスペードフィッシュ
6. クイーンズランドイエローテールエンジェルフィッシュ
7. インディアンオーシャンミミックサージョンフィッシュ
8. インディアンオーシャンミミックサージャンフィッシュ
9.  共通オブジェクトリクエストブローカアーキテクチャ
10. ニコチンアミドアデニンジヌクレオチドホスフェート
11. フレキシブルアドバンストアーキテクチャシステム
12. カスタマーインストレーションインストラクション
13. 同位エンティティに割り当てられるウィンドウ上限
14. ブラジリアンロングスナウトバタフライフィッシュ
15. インディアンゴールドバードバタフライフィッシュ
16. ハワイアンゴールドバードバタフライフィッシュ
17. インディアンゴールドリングブリストルトゥース
18. ウェストオーストラリアンバタフライフィッシュ
19. インディアンヴァガボンドバタフライフィッシュ
20. キャリア検地多重アクセス衝突回避ネットワーク