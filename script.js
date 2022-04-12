pages = ["Among Us", "Frog", "Stack Overflow", "Feynman Diagram", "Reddit", "Taiwan", "Hack Club", "Apollo 5"]

attempts = 0;

var r = Math.floor(Math.random() * pages.length);

page = pages[r]

const request = new Request(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${page.replace(" ", "%20")}&origin=*&indexpageids`);

var summary
var title
var id
var casetitle
var redacted
var len
var lastword
var word = []
var letters = 0

fetch(request).then(response => {
  response.json().then(data => {
  id = data.query.pageids;
  summary = (data.query.pages[id].extract)
  title = (data.query.pages[id].title)
    for(var i=0;i<title.length;i++) {
      word[i] = "&#129001"
    }
  lastword = title
  updatetext()
});
})

function updatetext() {
  casetitle = new RegExp(title, 'gi');
  redacted = summary.replaceAll(casetitle, word.join(""))

  document.getElementById("summary").innerHTML = redacted.slice(0, 200 * (attempts + 1)) + "...";
}

document.getElementById("input").addEventListener("keypress", function (event) {
  
  if (attempts < 3) {
  
  if (event.key === "Enter" && document.getElementById("input").value != "") {
    var prediction = document.getElementById("input").value.toLowerCase();
    for (var i = 0; i < title.length; i++) {
      if (prediction[i] === title[i].toLowerCase()) {
        word[i] = title[i];
        letters += 1
      }
    }

    if (letters < title.length && attempts == 2) {
      message = "<br> <p style=\"font-size: 16px\">You lose! The title was: " + title + "</p>"
    } else if (letters == title.length) {
      message = "<br> <p style=\"font-size: 16px\">You win! The title was: " + title + "</p>"
    }
    else {
      message = "<br> <p style=\"font-size: 10px\">Correct Letters: " + letters + "</p>"
    }
    
    
    document.getElementById("out").innerHTML += "<br>" + document.getElementById("input").value.toUpperCase() + message;
    document.getElementById("input").value = "";
    attempts += 1;
    updatetext()
    letters = 0;
  }
    
  }

});