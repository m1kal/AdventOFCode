function day12() {
show('Day12')
let din = loadLines('day12.txt')

let ic = [[0, 0], 'E']
let dirs = {'N':[0, 1], 'S':[0,-1], 'E':[1, 0], 'W':[-1, 0]}

let turn = {'L':{'E':'N','N':'W','W':'S','S':'E'},
            'R':{'E':'S','S':'W','W':'N','N':'E'}}

let ins = din.map(x=>x.match(/(.)(.*)/).slice(1))


let step = ([pos,dir], i) => {
 let a = i[0], n = parseInt(i[1])
 if ('NSEW'.indexOf(a) != -1) {
  return [[pos[0]+dirs[a][0]*n,pos[1]+dirs[a][1]*n],dir]
 } else if (a == 'F') {
  return [[pos[0]+dirs[dir][0]*n,pos[1]+dirs[dir][1]*n],dir]
 } else {
  let an = ((n/90)|0) % 4
  if (an == 1) return [pos,turn[a][dir]]
  if (an == 2) return [pos,turn[a][turn[a][dir]]]
  if (an == 3) return [pos,turn[a][turn[a][turn[a][dir]]]]
  return [pos,dir] 
 }
 
}

show('Part1',sum(ins.reduce(step, ic)[0].map(a=>Math.abs(a))))


let itoan = (l,a) => {
  let aa = ((a/90)|0) % 4
  return l=='L' ? aa : (4-aa) % 4
}

let rot = ([x, y],a) => {
  if (a==1) return [-y,x]
  else if (a==2) return [-x, -y]
  else return [y, -x]

}

let add = (x,y,n=1) => x.map((v,i)=>v+y[i]*n)

let ic2 = [[0,0],[10,1]]

let step2 = ([pos, wp], [a, n]) => {
  if ('NSEW'.indexOf(a) != -1)
    return [pos, [wp[0]+dirs[a][0]*parseInt(n), wp[1]+dirs[a][1]*parseInt(n)]]
  else if (a == 'F')
    return [add(pos,wp,parseInt(n)), wp]
  else {
    return [pos, rot(wp, itoan(a, parseInt(n)))]
  }

}

show('Part2',sum(ins.reduce(step2,ic2)[0].map(x=>Math.abs(x))))

}
day12()
