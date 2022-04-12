//import Cookies from 'js.cookie.mjs'

pages = ["Hack Club", "Feynman Diagram", "Unicode", "Taiwan", "Malbolge", "Manhattan Project", "Brainfuck", "Apollo 5", "Axiom", "Soyuz", "Radon", "Stack Overflow", "Watt", "The Great Dictator", "Congo River", "Falcon Heavy", "Lexicon", "League of Nations", "Processor register", "Cryptography", "Boson"]

attempts = 0;

var timestamp = Math.floor((Date.now() / 8.64e7));

var day = (timestamp - 19093)

var page = pages[day % pages.length - 1]

document.getElementById("title").innerHTML = "Wikile #" + day;

const request = new Request(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${page.replace(" ", "%20")}&origin=*&indexpageids`);

var summary
var title
var id
var casetitle
var redacted
var len
var word = []
var letters = 0
var done = false;
var results = "Wikile #" + day + "<br>";

fetch(request).then(response => {
  response.json().then(data => {
  id = data.query.pageids;
  summary = (data.query.pages[id].extract)
  title = (data.query.pages[id].title)
    for(var i=0;i<title.length;i++) {
      word[i] = "&#129001"
    }
  updatetext()
});
})

function updatetext() {
  casetitle = new RegExp(title, 'gi');
  redacted = summary.replaceAll(casetitle, word.join(""))

  if (attempts == 3) {
  document.getElementById("summary").innerHTML = redacted.slice(0, 200 * (attempts + 1));
  } else {
      document.getElementById("summary").innerHTML = redacted.slice(0, 200 * (attempts + 1))  + "<br>...";
  }
}

document.getElementById("input").addEventListener("keypress", function (event) {
  
  if (attempts < 3) {
  
  if (event.key === "Enter" && document.getElementById("input").value != "" && done == false) {
    var prediction = document.getElementById("input").value.toLowerCase();

    for (var i = 0; i < title.length; i++) {
      if (prediction[i] === title[i].toLowerCase()) {
        word[i] = title[i];
        letters += 1
        results += "&#129001";
      } else if (prediction.includes(title[i])){
        word[i] = "🟨";
        results += "🟨";
      }
        else {
        results += "&#11035";
      }
    }
    
    
    results += "<br>"
    if (letters < title.length && attempts == 2) {
      message = "<br> <p style=\"font-size: 16px\">You lose! The title was: " + title + "</p>"
      done = true;
      document.getElementById("title").innerHTML = results;
    } else if (letters == title.length) {
      message = "<br> <p style=\"font-size: 16px\">You win! The title was: " + title + "</p>"
      done = true;
      document.getElementById("title").innerHTML = results;
    }
    else {
      message = "<br> <p style=\"font-size: 10px\">Correct Letters: " + letters + "/" + title.length + "</p>"
    }
    
    
    document.getElementById("out").innerHTML += "<br class=smolbr>" +     document.getElementById("input").value.toUpperCase() + message;
    document.getElementById("input").value = "";
    attempts += 1;
    document.getElementById("remaining").innerHTML = "Remaining Attempts: " + (3 - attempts);
    
    updatetext()
    letters = 0;
  }
    
  }

});