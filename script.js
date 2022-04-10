page = "Among Us"

const request = new Request(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${page.replace(" ", "%20")}&origin=*&indexpageids`);

var summary = ""
var title = ""

fetch(request).then(response => {
  response.json().then(data => {
  var id = data.query.pageids;
  var summary = (data.query.pages[id].extract)
  var title = (data.query.pages[id].title)
  var redacted = summary.replaceAll(title, "&#129001".repeat(title.length))
  
  document.getElementById("summary").innerHTML = redacted;
});
})

