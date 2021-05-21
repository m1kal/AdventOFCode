function day22() {
let din = loadLines('day22.txt')
let s = din.indexOf('')
let pl = [din.slice(1,s).map(r=>parseInt(r)),din.slice(s+2).map(r=>parseInt(r))]


let rn = (pl)=> {
  let [c1,c2] = pl.map(s=>s[0])
  if (c1>c2)
    return [pl[0].slice(1).concat([c1,c2]),pl[1].slice(1)]
  else
    return [pl[0].slice(1),pl[1].slice(1).concat([c2,c1])]
}

let cnt =0
while (cnt < 10000 && pl[0].length && pl[1].length){
 pl = rn(pl)
 cnt++
 }

show(pl.flat().reverse().reduce((a,v,i)=>a+v*(i+1)))

var lg

var mdep = 0
var dep = 0
var gcnt = 0

function game(pl_) {
 dep +=1
 gcnt +=1
 if ((gcnt & 0x3ff) == 0) console.log(' '+(gcnt >> 10) + 'k')
 if (dep > mdep) {
  mdep = dep
  console.log('depth '+mdep)
 }
 let pl = pl_
 let positions = [JSON.stringify(pl)]
 function check_positions(pl,positions) {
  let p = JSON.stringify(pl)
  if (positions.includes(p)) return 1
  positions.push(p)
  return 0
 } 
 let cnt = 0
 while (cnt < 100000 && pl[0].length && pl[1].length){
  pl = roun(pl)
  if (check_positions(pl,positions)){
   lg = pl
   dep -= 1
   return 1
  }
  cnt++
 }
 lg = pl
 dep -=1
 return pl[0].length
}


function roun(pl) {
  let [c1,c2] = pl.map(s=>s[0])
  if (pl[0].length <= c1 || pl[1].length <= c2)
    if (c1 > c2)
      return [pl[0].slice(1).concat([c1,c2]),pl[1].slice(1)]
    else
      return [pl[0].slice(1),pl[1].slice(1).concat([c2,c1])]
  else
   if (game([pl[0].slice(1,1+c1),pl[1].slice(1,1+c2)]))
      return [pl[0].slice(1).concat([c1,c2]),pl[1].slice(1)]
    else
      return [pl[0].slice(1),pl[1].slice(1).concat([c2,c1])]
}

let g0 = [[43,19],[2,29,14]]
let g1 = [[9,2,6,3,1],[5,8,4,7,10]]

pl = [din.slice(1,s).map(r=>parseInt(r)),din.slice(s+2).map(r=>parseInt(r))]



}
day22()
