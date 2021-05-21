function day15(){
function run(limit, din) {
  let lastseen = {}
  din.slice(0,din.length-1).forEach((x,idx)=>lastseen[x]=idx)
  let v = din[din.length-1]
  for (idx = din.length; idx < limit;idx++) {
    if (lastseen[v] != undefined) {
      let tmp = v
      v = idx - lastseen[v] - 1
      lastseen[tmp] = idx-1
    } else {
      lastseen[v]=idx-1
      v = 0
    }
  }
  return v
}

show('Day15')
let din = [0,1,5,10,3,12,19]

let lastseen = {}
din.slice(0,din.length-1).forEach((x,idx)=>lastseen[x]=idx)
let v = din[din.length-1]
v = run(2020,din)

show('Part1',v)

lastseen = {}
din.slice(0,din.length-1).forEach((x,idx)=>lastseen[x]=idx)
 v = din[din.length-1]
for (idx = din.length; idx < 30000000; idx++) {
  if (lastseen[v] != undefined) {
    let tmp = v
    v = idx - lastseen[v] - 1
    lastseen[tmp] = idx-1
  } else {
    lastseen[v]=idx-1
    v = 0
  }
}

show('Part2',v)
}
day15()
