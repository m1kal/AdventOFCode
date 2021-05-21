function day11() {
show('Day11')
let din = loadLines('day11.txt')

let getval = ([x,y]) => din[y] && din[y][x]
let ns = [-1,0,1].flatMap(x=>[-1,0,1].map(y=>[x,y])).filter(([x,y])=>x!=0 || y!=0)

let neighbors = ([x,y]) => ns.map(([i,j])=>[i+x,j+y])


function updateSeat(state,pos, newState) {
 if (state[pos]) {
  newState[pos] = neighbors(pos).filter(n=>state[n]).length < 4
 } else {
  newState[pos] = neighbors(pos).filter(n=>state[n]).length == 0
 }
}


let allPos = range(din.length).flatMap(y=>range(din[0].length).map(x=>[x,y]))

let seats = allPos.filter(pos=>getval(pos)=='L')

let states=[new Map(), new Map()]

let step = (iter) => seats.forEach(pos=>updateSeat(states[iter % 2],pos,states[(iter + 1) % 2]))

let changed = () => seats.filter(pos => states[0][pos] !=states[1][pos])

let iter = 0
step(iter++)
while (changed().length > 0) step(iter++)
show('Part1',seats.filter(pos=>states[0][pos]).length)


let visible = seats.map(([x,y])=> {
  let visibleSeats = []
  for (i=0;i<8;i++) {
    [dx,dy] =ns[i]
    let s = 1
    let nn = [x+dx*s,y+dy*s]
    while (getval(nn) == '.') {
      s +=1
      nn = [x+dx*s,y+dy*s]
    }
   visibleSeats.push(nn)
  }
  return visibleSeats
})


function updateSeatPart2(state,pos, newState,idx) {
 if (state[pos]) {
  newState[pos] = visible[idx].filter(n=>state[n]).length < 5
 } else {
  newState[pos] = visible[idx].filter(n=>state[n]).length == 0
 }
}


states=[new Map(), new Map()]

let stepPart2 = (iter) => seats.forEach((pos,idx)=>updateSeatPart2(states[iter % 2],pos,states[(iter + 1) % 2],idx))

iter = 0
stepPart2(iter++)
while (changed().length > 0) stepPart2(iter++)
show('Part2',seats.filter(pos=>states[0][pos]).length)
}
day11()
