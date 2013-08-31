var Events = {
  /**
   * Handles browserAction event.
   */
  browserActionOnClicked: function(tab) {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "initialize"
      }, 
      function(response) {
        Events.browserActionOnClickedResponse(tab, response);
      }
    );
  },

  /**
   * Handles browser action response (which should contain text).
   * In this case, we are expecting an array of text strings that
   * should be analyzed and parsed for coherent words.
   */
  browserActionOnClickedResponse: function(tab, response) {
    // Merge all the selected fields together.
    var text = "";
    for(var i in response) {
      if (typeof response[i] != 'string') {
        continue;
      }

      text += response[i] + " ";
    }

    var words = Translator.translate(text);

    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "words",
        words: words
      },
      function(response) {
        // No response expected.
      }
    );
  }
}

/**
 * Wait for the user to click the button, once that happens, parse
 * the text for words that can be used.
 */
chrome.browserAction.onClicked.addListener(Events.browserActionOnClicked);