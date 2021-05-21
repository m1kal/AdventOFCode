function day10(){
show('Day10')
let din = loadNumbers('day10.txt').sort((a,b)=>a-b)

let diff = idx => din[idx]-(din[idx-1]||0)
let d = range(din.length).map(diff)
let n3 = d.filter(i=>i==3).length
let n1 = d.filter(i=>i==1).length

show('Part1',n1*(n3+1))

let x = {0:1,1:1,2:2,3:4,4:7}
let it = d.join('').split('3').map(el=>[1,1,2,4,7][el.length])
show('Part2',it.reduce((a,b)=>a*b))
}
day10()
