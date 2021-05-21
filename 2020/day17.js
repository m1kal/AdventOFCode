function day17() {
show('Day17')
let din = loadLines('day17.txt').map(r=>r.split('').map(c=>c=='#'))

let active = new Set()

din.forEach((row,y)=>row.forEach((char,x)=>{if (char) active.add([x,y,0].join(','))}))

let n0 = [-1,0,1].flatMap(dx=>[-1,0,1].flatMap(dy=>[-1,0,1].map(dz=> [dx,dy,dz]))).filter(([i,j,k])=>i!=0||j!=0||k!=0)

function neighbors(pos) {
  let [x,y,z] = pos.split(',').map(x=>parseInt(x))
  return n0.map(([i,j,k])=> [x+i,y+j,z+k].join(','))
}


function cycle(state) {
 let vals = [...state.keys()]
 let vneighbors = vals.flatMap(x=>neighbors(x))
 let allCandidates = vals.concat(vneighbors)
 let candidates = [...new Set(allCandidates)]
 let ret = new Set()
 for (let i = 0; i < candidates.length;i++) {
   let v = candidates[i]
   let vv = state.has(v)
   let n1 = neighbors(v)
   let n2 = n1.filter(x=>state.has(x)).length
   if ((vv && (n2 == 2 || n2 == 3)) || (!vv && (n2 == 3)))
     ret.add(v)
 }
 return ret
}

show(range(6).reduce((a,i)=>cycle(a),active).size)


active = new Set()

din.forEach((row,y)=>row.forEach((char,x)=>{if (char) active.add([x,y,0,0].join(','))}))

n0 = [-1,0,1].flatMap(dx=>[-1,0,1].flatMap(dy=>[-1,0,1].flatMap(dz=>[-1,0,1].map(dt=> [dx,dy,dz,dt])))).filter(([i,j,k,l])=>i!=0||j!=0||k!=0||l!=0)

function neighbors4(pos) {
  let [x,y,z,t] = pos.split(',').map(x=>parseInt(x))
  return n0.map(([i,j,k,l])=> [x+i,y+j,z+k,t+l].join(','))
}


function cycle4(state) {
 let vals = [...state.keys()]
 let vneighbors = vals.flatMap(x=>neighbors4(x))
 let allCandidates = vals.concat(vneighbors)
 let candidates = [...new Set(allCandidates)]
 let ret = new Set()
 for (let i = 0; i < candidates.length;i++) {
   let v = candidates[i]
   let vv = state.has(v)
   let n1 = neighbors4(v)
   let n2 = n1.filter(x=>state.has(x)).length
   if ((vv && (n2 == 2 || n2 == 3)) || (!vv && (n2 == 3)))
     ret.add(v)
 }
 return ret
}

show(range(6).reduce((a,i)=>cycle4(a),active).size)

}
day17()

