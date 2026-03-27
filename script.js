const fileInput = document.getElementById("fileInput")
const subtitlesDiv = document.getElementById("subtitles")
const timeline = document.getElementById("timeline")
const search = document.getElementById("search")

let subtitles = []

fileInput.addEventListener("change", e=>{
const file = e.target.files[0]

const reader = new FileReader()

reader.onload = function(){
parseSRT(reader.result)
render()
}

reader.readAsText(file)
})

function parseTime(time){

const parts = time.replace(",",":").split(":")
return (
parseInt(parts[0])*3600+
parseInt(parts[1])*60+
parseInt(parts[2])+
parseInt(parts[3])/1000
)

}

function parseSRT(data){

subtitles = []

const blocks = data.split("\n\n")

blocks.forEach(block=>{

const lines = block.split("\n")

if(lines.length>=3){

const time = lines[1].split(" --> ")

subtitles.push({
start:parseTime(time[0]),
end:parseTime(time[1]),
text:lines.slice(2).join(" ")
})

}

})

}

function render(){

subtitlesDiv.innerHTML=""
timeline.innerHTML=""

const total = subtitles[subtitles.length-1].end

subtitles.forEach(sub=>{

const div = document.createElement("div")
div.className="subtitle"

div.innerHTML = `
<div class="time">${sub.start} → ${sub.end}</div>
<div>${sub.text}</div>
`

subtitlesDiv.appendChild(div)

const bar = document.createElement("div")
bar.className="bar"

bar.style.left = (sub.start/total*100)+"%"
bar.style.width = ((sub.end-sub.start)/total*100)+"%"

timeline.appendChild(bar)

})

}

search.addEventListener("input", ()=>{

const value = search.value.toLowerCase()

document.querySelectorAll(".subtitle").forEach(el=>{

if(el.innerText.toLowerCase().includes(value)){
el.style.display="block"
}else{
el.style.display="none"
}

})

})
