/**
 * Listens for initialization to load the window.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Switch through the request types.
  switch(request.type) {
    // Initialize the site.
    case "initialize":
      App.initialize(sendResponse);
      break;

    case "words":
      App.loadWords(request.words);
      break;
  }
});

/**
 * Contains variables and functionality for the front end of the app.
 */
var App = {
  /**
   * Handles requests to generate a deck and passes it to the
   * callback function.
   */
  buildDeck: function(words) {
    var fileParts = [];

    // Iterate through words and add them to the deck.
    for(var i in words) {
      var word = words[i];

      if (typeof this.words[word] != "undefined") {
        // Expression.
        filePart = word + "\t";

        // Reading.
        filePart += (this.words[word].kana || word) + "\t";

        // Meaning.
        filePart += this.words[word].definition + "\t";

        // Site title.
        filePart += window.document.title + "\t";

        // Site url.
        filePart += window.location.href;

        fileParts.push(filePart + "\n");
      }
    }

    return URL.createObjectURL(new Blob(fileParts, {type: "text/plain"}));
  },

  /**
   * Handles the initialization functionality. Renders UI, collects
   * text and sends it back to the backend of the application.
   */
  initialize: function(callback) {
    UI.render();

    var text = [];
    var selections = window.getSelection();
    for(var i = 0; i < selections.rangeCount; i++) {
      var div = document.createElement("div");
      div.appendChild(selections.getRangeAt(i).cloneContents());
      text.push(div.innerText);
    }
    callback(text);
  },

  /**
   * Handles the response from the server, which has pulled the
   * words that were matched.
   */
  loadWords: function(words) {
    // Keep a list of the current words specified.
    this.words = words;

    // Convert words into a format that will be 
    // UI friendly.
    var wordList = [];
    for(var word in words) {
      wordList.push({
        definition: words[word].definition,
        kana: words[word].kana ? words[word].kana : word,
        word: word
      });
    }

    // Show them in the UI.
    UI.showWords(wordList);
  },

  words: []
}