// This is your first fully working tabris.js app. Feel free to hack around ;)
// Every keystroke will be saved and is immediatly available on your device.
var MARGIN = 12;
var PAGE_MARGIN = 16;
// Create a top-level "Page" that contains our UI
var page = tabris.create("Page", {
  title: "Hello, World!",
  topLevel: true
});

// Create a push button and add it to the page
var button = tabris.create("Button", {
  text: "Native Widgets",
  layoutData: {centerX: 0, top: 100}
}).appendTo(page);

tabris.create("Button", {
  id: "animateButton",
  text: "Animate",
  layoutData: {left: MARGIN, right: MARGIN, top: MARGIN}
}).on("select", function(button) {
  button.set("enabled", false);
  page.children("#helloLabel").first().once("animationend", function() {
    button.set("enabled", true);
  }).animate({
    opacity: 0.25,
    transform: {
      rotation: 0.75 * Math.PI,
      scaleX: 2.0,
      scaleY: 2.0,
      translationX: 100,
      translationY: 200
    }
  }, {
    delay: 0,
    duration: 1000,
    repeat: 1,
    reverse: true,
    easing: "ease-out" // "linear", "ease-in", "ease-out", "ease-in-out"
  });
}).appendTo(page);

tabris.create("TextView", {
  id: "helloLabel",
  layoutData: {left: MARGIN, top: ["#animateButton", MARGIN]},
  background: "#6aa",
  textColor: "white",
  font: "20px",
  text: "Hello World!"
}).appendTo(page);
// Create a text view and add it too
var textView = tabris.create("TextView", {
  font: "24px",
  layoutData: {centerX: 0, top: [button, 50]}
}).appendTo(page);
tabris.create("Action", {
  title: "Settings",
  image: {src: "images/action_settings.png", scale: 3}
}).on("select", function() {
  createSettingsPage().open();
});
// Change the text view's text when the button is pressed
button.on("select", function() {
  textView.set("text", "Totally Rock!");
});
var action = tabris.create("SearchAction", {
  title: "Search",
  image: "images/search.png"
}).on("select", function() {
  this.set("text", "");
}).on("input", function(widget, query) {
  updateProposals(query);
}).on("accept", function(widget, query) {
  textView.set("text", "Selected '" + query + "'");
});
page.open();
function createSettingsPage() {
  var page = tabris.create("Page", {
    title: "License"
  });
  var settingsTextView = tabris.create("TextView", {
    text: "Book covers come under CC BY 2.0",
    layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: PAGE_MARGIN}
  }).appendTo(page);
  var url = "https://www.flickr.com/photos/ajourneyroundmyskull/sets/72157626894978086/";
  var linkTextView = tabris.create("TextView", {
    text: "<a href=\"" + url + "\">Covers on flickr</a>",
    markupEnabled: true,
    layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: [settingsTextView, 10]}
  }).appendTo(page);
  tabris.create("TextView", {
    text: "<i>Authors of book covers:</i><br/>" +
    "Paula Rodriguez - 1984<br/>" +
    "Marc Storrs and Rob Morphy - Na Tropie Nieznanych<br/>" +
    "Cat Finnie - Stary Czlowiek I Morze<br/>" +
    "Andrew Brozyna - Hobbit<br/>" +
    "Viacheslav Vystupov - Wojna Swiatow<br/>" +
    "Marc Storrs and Rob Morphy - Zegar Pomaranczowy Pracz<br/>" +
    "Andrew Evan Harner - Ksiega Dzungli",
    markupEnabled: true,
    layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: [linkTextView, 10]}
  }).appendTo(page);
  return page;
}
      