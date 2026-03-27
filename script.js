const fileInput = document.getElementById("fileInput")
const subtitlesDiv = document.getElementById("subtitles")
const search = document.getElementById("search")

let subtitles = []

fileInput.addEventListener("change", e => {

const file = e.target.files[0]
const reader = new FileReader()

reader.onload = function(){
parseSRT(reader.result)
render()
}

reader.readAsText(file)

})

function parseSRT(data){

subtitles = []

const blocks = data.trim().split(/\r?\n\r?\n/)

blocks.forEach(block => {

const lines = block.split(/\r?\n/)

if(lines.length >= 3){

// tekst begint altijd vanaf lijn 3
const textLines = lines.slice(2)

subtitles.push(textLines)

}

})

}

function render(){

subtitlesDiv.innerHTML=""

subtitles.forEach(lines => {

const div = document.createElement("div")
div.className="subtitle"

div.innerHTML = lines.join("<br>")

subtitlesDiv.appendChild(div)

})

}

search.addEventListener("input", () => {

const value = search.value.toLowerCase()

document.querySelectorAll(".subtitle").forEach(el => {

if(el.innerText.toLowerCase().includes(value)){
el.style.display="block"
}else{
el.style.display="none"
}

})

})
