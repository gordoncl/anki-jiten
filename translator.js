/**
 * Handles all the work involved in parsing and translating
 * the words.
 * 
 * Some unicode notes on Japanese:
 * Punctuation: 0x3000 - 0x303f
 * Hiragana: 0x3040 - 0x309f
 * Katakana: 0x30a0 - 0x30ff
 * Roman characters and half-width katakana: 0xff00 - 0xffef
 * Kanji: 0x4e00 - 0x9faf
 */
var Translator = {
  /**
   * Given ranges of characters, return an array of that character set.
   */
  _getArrayOfChars: function(ranges) {
    var charSet = [];
    for(var i = 0; i < ranges.length; i++) {
      var start = ranges[i][0];
      var end = ranges[i][1];

      for(var j = start; j < end; j++) {
        charSet.push(String.fromCharCode(j));
      }
    }
    return charSet;
  },

  /**
   * Returns true if character is a Kanji character.
   */
  _isKanji: function(charCode) {
    return charCode >= 0x4e00 && charCode <= 0x9faf;
  },

  /**
   * The parse function breaks the text into reasonable chunks to
   * analyze. We do this by taking punctuation and splitting it
   * into different chunks.
   */
  parse: function(text) {
    // Punctuation regular expression.
    var replaceRegExp = new RegExp(
      "[" + 
      this._getArrayOfChars([
        [0x3000, 0x303f], 
        [0xff00, 0xff0f],
        [0xff1a, 0xff1f]
      ]).join("") + "\\s" + 
      "]+",
      "ig"
    );

    return text.replace(replaceRegExp, " ").split(" ");
  },

  /**
   * Determines whether or not a word should be skipped. 
   * In reality, I'm assuming that any single hiragana or katakana
   * character is useless. As well as any numerals.
   */
  skip: function(word) {
    var numerals = new RegExp(
      "^[" + 
      this._getArrayOfChars([[0xff10, 0xff19]]).join("") +
      "]+$",
      "ig"
    );

    return word.match(numerals) || 
      (word.length == 1 && !this._isKanji(word.charCodeAt(0)));
  },

  /**
   * Takes a blob of text, creates a list of definitions.
   */
  translate: function(text) {
    var words = {};
    var chunks = this.parse(text);

    // Iterate through each chunk, extracting as many words as
    // possible.
    for(var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];

      // Now iterate through each character and try to get the
      // largest chunk of data.
      for(var start = 0; start < chunk.length; start++) {
        // Max length should be 20 characters.
        var stringLength = start + 20 >= chunk.length ? chunk.length - start : 20;

        // Go backwards and see if the chunks match 
        // an item in the dictionary.
        for(; stringLength > 0; stringLength--) {
          var splice = chunk.substr(start, stringLength);

          // Found a word? Add it to the word bank and 
          // move the start point ahead.
          if (typeof Dictionary[splice] != "undefined" && !this.skip(splice)) {
            words[splice] = Dictionary[splice];
            start += stringLength - 1;
            break;
          }
        }
      }
    }

    return words;
  }
};