pages = ["Sputnik", "Turbine", "Unicode", "Taiwan", "Malbolge", "Manhattan Project", "Brainfuck", "Coriolis force", "Apollo 5", "Axiom", "Cosmological constant", "Radon", "Stack Overflow", "Watt", "The Great Dictator", "Congo River", "Falcon Heavy", "Lexicon", "League of Nations", "Processor register", "Cryptography", "Boson", "Wolfenstein 3D", "Boolean algebra", "Poison ivy", "Gulf of Mexico", "Electromagnetic field", "Feynman Diagram"]

attempts = 0;
document.getElementById("copy").style.display = "none";

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
var info = "Wikile #" + day + " - ";
var results = "";

fetch(request).then(response => {
  response.json().then(data => {
  id = data.query.pageids;
  summary = (data.query.pages[id].extract)
  title = (data.query.pages[id].title)
    for(var i=0;i<title.length;i++) {
      if(title[i] == " ") {
        word[i] = " "
      } else {
        word[i] = "⬛"
      }
    }
    summary = summary.replace(/ *\([^)]*\) */g, " ");

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
        results += "🟩";
      } else if (prediction.includes(title[i].toLowerCase())){
        word[i] = "🟨";
        results += "🟨";
        
      }
        else {
        results += "⬛";
      }
    }
    
    
    results += "<br>"
    if (letters < title.length && attempts == 2) {
      message = "<br> <p style=\"font-size: 16px\">You lose! The title was: " + title + "</p>"
      done = true;
      info += (attempts + 1)  + "/3<br>"
      document.getElementById("title").innerHTML = info + results;
      document.getElementById("copy").style.display = "inline";

    } else if (letters == title.length) {
      message = "<br> <p style=\"font-size: 16px\">You win! The title was: " + title + "</p>"
      done = true;
      info += (attempts + 1)  + "/3<br>"
      document.getElementById("title").innerHTML = info + results;
      document.getElementById("copy").style.display = "inline";

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

function copy() {
  c = document.getElementById("title").innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = c + "https://henrybass.github.io/wikile/index.html";
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}