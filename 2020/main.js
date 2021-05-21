
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const lower = document.getElementById("lower")
const cwidth = canvas.width
const cheight = canvas.height

var axis = null

let identity = input=>input

let count = (array) => array.filter(identity).length
let sum = (array) => array.reduce((acc, elem) => acc + elem)

let s2d = ([x,y],[z,t])=>[x+z,y+t]

function comp(arr1,arr2) {
  let diff = false
  if (arr1.length != arr2.length) return false
  for (let i = 0; i<arr1.length;i++)
    if (arr1[i]!=arr2[i])
      diff = true
  return !diff
}

function esc(text) {
  return text.toString().replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function fmt(input, digits = 1) {
  return (10**digits * input | 0 ) / 10**digits
}

function show(data) {
  let text = arguments.length == 1 ? data : Array.from(arguments).join(', ')
  lower.innerHTML +='<div><div style="display:inline;float:left">'+
                     esc(text)+'</div>'+
                     '<div style="display:inline;float:right">'+
                     (new Error().stack.split('\n')[1]) +
                    '</div></div><br/>'
  lower.scrollTop = lower.scrollHeight;
}


function debug(data) {
  let text = arguments.length == 1 ?
             JSON.stringify(data) :
             Array.from(arguments).map(i=>JSON.stringify(i)).join(', ')
  lower.innerHTML += esc(text)+'<br/>'
  lower.scrollTop = lower.scrollHeight;
}

function range(limit) {
  let y = []
  for (let i=0;i<limit;i++)
    y.push(i)
  return y
}

function setPixel(x, y, color, dx =1, dy = 1) {
  ctx.fillStyle = color
  ctx.fillRect(x-((dx/2) |0), y-((dx/2)|0), dx, dy)
}

function clearCanvas() {
  let color = ctx.fillStyle
  ctx.fillStyle = 'rgb(255,255,255)'
  ctx.fillRect(0, 0, 500, 400)
  ctx.fillStyle = color
  axis = null
  pathTo()
}

let cls = clearCanvas

let pathTo = function() {
  let lastPoint = false
  return function (x, y, color) {
    if (x === undefined) {lastPoint = false;return;}
    if (color !== undefined) {ctx.strokeStyle =  color}
    if (lastPoint) {ctx.lineTo(x, y);ctx.stroke();}
    lastPoint = [x, y]
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
}()

function setPoint(x, y, pattern, color = 'rgb(0,0,0)') {
  if (pattern === undefined || pattern.indexOf('-') != -1) {pathTo(x, y, color)}
  if (pattern) {
    if (pattern.indexOf('.') != -1) setPixel(x, y, color)
    if (pattern.indexOf('o') != -1) setPixel(x, y, color, 5, 5)
    if (pattern.indexOf('x') != -1) {
      ctx.font='20px Arial'
      ctx.fillStyle = color
      ctx.fillText('x',x-5,y+5)
    }
  }
}

function plotxy(x, y, style) {
  var y = y.map(i=>-i)
  let xs = [...x].sort((i,j)=>i-j)
  let ys = [...y].sort((i,j)=>i-j)
  let xmin = xs[0], ymin=ys[0], xmax = xs[xs.length-1], ymax = ys[ys.length-1]
  let xscale = cwidth / ((xmax-xmin) || 1)*0.8
  let yscale = cheight / ((ymax-ymin) || 1)*0.8
  let color = style != undefined ? (
              style.indexOf('g') != -1 ? 'green' :
              style.indexOf('r') != -1 ? 'red' :
              style.indexOf('b') != -1 ? 'blue' : 'black') : 'black'
  for (let i=0;i<ys.length;i++)
    setPoint((x[i]-xmin)*xscale+cwidth/10,
             (y[i]-ymin)*yscale+cheight/10, style, color)
  if (axis === null) {
    axis = [xmin, xmax, ymin, ymax]
    let font = ctx.font
    ctx.font = '8px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText(fmt(xmin),20,10)
    ctx.fillText(fmt(xmax),cwidth-20,10)
    ctx.fillText(fmt(-ymin), 5, 15)
    ctx.fillText(fmt(-ymax), 5, cheight-10)
    ctx.setLineDash([5,15])
    ctx.strokeStyle='black'
    ctx.moveTo(cwidth/10,cheight/10)
    ctx.lineTo(cwidth*0.9,cheight*0.1)
    ctx.lineTo(cwidth*0.9,cheight*0.9)
    ctx.lineTo(cwidth*0.1,cheight*0.9)
    ctx.lineTo(cwidth*0.1,cheight*0.1)
    ctx.stroke()
    ctx.closePath()
    ctx.setLineDash([])
    ctx.font = font
  }
}

function plot(data, style) {
  if (typeof(data)=='object')
    if (typeof(data[0])=='number')
      plotxy(range(data.length),data, style)
    if (typeof(data[0])=='object' && data.length > 2 && data[0].length == 2)
      plotxy(data.map(i=>i[0]),data.map(i=>i[1]), style)
    if (typeof(data[0])=='object' && data.length == 2)
      plotxy(data[0],data[1], style)
}


function getFileFromFS(filename) {
  let xhr = new XMLHttpRequest()
  xhr.overrideMimeType('text/plain')
  xhr.open('GET',filename,false)
  xhr.send()
  return xhr.responseText.trim()
}

function loadLines(filename) {
  if (filename === undefined)
    filename = new Error().stack.split('\n')[1].match(/(\w+)@/)[1]+'.txt'
  return getFileFromFS(filename).split('\n').map(line=>line.trim())
}

function loadNumbers(filename) {
  if (filename === undefined)
    filename = new Error().stack.split('\n')[1].match(/(\w+)@/)[1]+'.txt'
  return loadLines(filename).map(line=>parseInt(line))
}

function bench(f,...a){
 let t0 = performance.now()
 let res = f(...a)
 show('time',performance.now()-t0)
 return res
}



