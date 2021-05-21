function day24() {
let din = loadLines('day24.txt')

let pl = l => l.split(/(?<=e|w)/)

let i = din.map(l=>pl(l))

let dir = ins => {
 if (ins =='e') return [1,0]
 if (ins =='ne') return [0,1]
 if (ins =='nw') return [-1,1]
 if (ins =='w') return [-1,0]
 if (ins =='sw') return [0,-1]
 if (ins =='se') return [1,-1]
}

let tiles = i.map(t=>t.map(dir).reduce(s2d))

let t1d = tiles.map(s=>s.join(','))//.map(([x,y])=>x*128+y) 

let tt = t1d.map(s=>t1d.filter(el=>el==s).length)

show(tt.filter(s=>s==1).length)

let black = t1d.filter(s=>t1d.filter(el=>el==s).length==1)

let adj = tile=>  [[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]].map(s=>s2d(s,tile.split(',').map(x=>parseInt(x)))).map(r=>r.join(','))

let allTiles = range(256).flatMap(x=>range(256).map(y=>[x-128,y-128].join(',')))

let rn = blac =>
allTiles.map(s=> {
 let y = adj(s).filter(r=>blac.includes(r)).length
 return ((blac.includes(s) && (y == 1 || y == 2)) ||
        (!blac.includes(s) && (y == 2))) ? s : false
}).filter(identity)


show(range(100).reduce((a,b)=>rn(a),black).length)

}
day24()