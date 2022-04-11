pages = ["Among Us", "Frog", "Stack Overflow", "Feynman Diagram", "Reddit", "Taiwan"]

var r = Math.floor(Math.random() * pages.length);
console.log(r)
page = pages[r]

const request = new Request(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${page.replace(" ", "%20")}&origin=*&indexpageids`);

var summary
var title
var id
var casetitle
var redacted
var len

fetch(request).then(response => {
  response.json().then(data => {
  id = data.query.pageids;
  summary = (data.query.pages[id].extract)
  title = (data.query.pages[id].title)
  updatetext()
});
})

function updatetext() {
  casetitle = new RegExp(title, 'ig');
  redacted = summary.replaceAll(casetitle, "&#129001".repeat(title.length))

  document.getElementById("summary").innerHTML = redacted.slice(0, 300) + "...";
}

document.getElementById("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("")
  }
})