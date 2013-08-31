/**
 * UI component for the application. Handles rendering, as well switching
 * modes.
 */
var UI = {
  /**
   * Core element.
   */
  $el: $('\
<div id="ankilang" class="hide cleanslate">\
  <div class="overlay"></div>\
  <div class="wrapper">\
    <a class="close"></a>\
    <div class="content"></div>\
</div>\
  '),

  /**
   * Templates that can be loaded.
   */
  templates: {
    downloadLink: '<a href="{{href}}" download="{{filename}}" class="button download-deck">Download Deck</a>',

    error: '<h1>{{error}}</h1><p>{{details}}</p>',

    loading: 'Generating Results <span class="first period"></span><span class="second period"></span><span class="third period"></span>',

    words: '\
      <h1>Matched {{count}} Words</h1>\
      <p>Hover over Kanji to show kana.<p>\
      <div class="words">\
        <table>\
          {{#words}}\
            <tr>\
              <td><input type="checkbox" name="{{word}}" value="{{word}}" checked /></td>\
              <td class="word"><span class="primary">{{word}}</span> <span class="secondary">{{kana}}</span></td>\
              <td class="definition">{{definition}}</td>\
            </tr>\
          {{/words}}\
        </table>\
      </div>\
      <div class="actions">\
        <a class="button generate-deck">Generate Deck</a>\
      </div>\
    '
  },

  /**
   * Binds events to the plugin.
   */
  bindEvents: function() {
    // If someone clicks on close or on the overlay, hide the window.
    this.$el.on("click", ".close, .overlay", $.proxy(function() {
      this.hide();
    }, this));

    // If someone clicks on of the generate deck button, 
    // create a URL to build and download the deck.
    this.$el.on("click", ".generate-deck", $.proxy(function() {
      // Get words to select.
      var words = $('.words input:checked').map(function() { 
        return $(this).val();
      });

      // Have the app build a deck.
      var url = App.buildDeck(words);
      var downloadLink = Mustache.render(
        this.templates.downloadLink,
        {
          filename: window.document.title + ".txt",
          href: url
        }
      );
      this.$el.find(".actions").html(downloadLink);

      // Do a little reveal animation.
      this.$el.find(".download-deck").addClass("reveal");
    }, this));
  },

  /**
   * Used to render an error message.
   */
  error: function(header, details) {
    this._setClass("error")
    this._setTemplate("error", {header: header, details: details})
  },

  /**
   * Hides the UI.
   */
  hide: function() {
    this._setClass("hide");
  },

  /**
   * Change the UI to loading content.
   */
  loading: function() {
    this._setClass("loading");
    this._setTemplate("loading");
  },

  /**
   * Loads and displays the words found.
   */
  showWords: function(words) {
    if (!words.length) {
      this._setClass("error");
      this._setTemplate("error", {
        error: "Matched 0 words",
        details: "Please be sure you are selecting the text you want to translate."
      });
    } else {
      this._setClass("show-words");
      this._setTemplate("words", {
        count: words.length, 
        words: words
      });      
    }
  },

  /**
   * Renders the UI.
   */
  render: function() {
    // If the element can't be found in the body, append it.
    if (!this.$el.parents().length) {
      $('body').append(this.$el);
      this.bindEvents();
    }

    this.loading();
  },

  /**
   * Helper functions.
   */
  _setClass: function(className) {
    this.$el.attr("class", className + " cleanslate");
  },

  _setTemplate: function(template, vars) {
    $(".content", this.$el).html(
      Mustache.render(this.templates[template], vars)
    );
  }
};