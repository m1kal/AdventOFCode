function day20() {
let din = loadLines('day20.txt')

let ts = 10
let numbers = []
let tiles = []

for (let i = 0; i < din.length; i+=(ts+2)) {
  tiles.push([din[i],din.slice(i+1,i+ts+1)])

}

//10x10 tiles, 144 tiles

let ston = s=> s.split('').reduce((a,b)=>a*2+(b=='#'),0)

function borders(tile) {
  return [tile[0],
          tile.map(r=>r[0]).join(''),
          tile.map(r=>r[r.length-1]).join(''),
          tile[tile.length-1]].map(x=>ston(x))
}


function rot([n,tile]) {
 let ret = []
 for (let i = 0;i<tile[0].length;i++) {
  let row = []
  for (let j=0;j<tile.length;j++) {
   row[j] = tile[j][i]
  }
  ret.push(row.reverse().join(''))
 }
 return [n,ret]
}

function tra(tile) {
 let ret = []
 for (let i = 0;i<tile[0].length;i++) {
  let row = []
  for (let j=0;j<tile.length;j++) {
   row[j] = tile[j][i]
  }
  ret.push(row)
 }
 return ret
}


let flip = ([n,tile])=>[n,[...tile].reverse()]

let revn = xn => {
 let n = xn.toString(2)
 return parseInt(('' + '0'.repeat(10-n.length)+n).split('').reverse().join(''),2)
}

function allBorders(tile) {
 let b = borders(tile)
 return b.concat(b.map(x=>revn(x)))
}

let tb = tiles.map(([n,x])=>allBorders(x))

function findBorder([n,tile]) {
 let f = allBorders(tile).map(x=> {
  return tiles.filter(([n,t])=>allBorders(t).includes(x)).length
 })
 return [n,f.filter(s=>s==1)]

}


show(tiles.map(findBorder).filter(r=>r[1].length>2).map(s=>parseInt(s[0].slice(5,9))).reduce((a,b)=>a*b))


let grid = [[],[],[],[],[],[],[],[],[],[],[],[]]

let st = rot(rot(rot(tiles[48])))
grid[0][0]=st

function fits(grid,[y,x],tile) {
 let ab = allBorders(tile[1])
 if (x == 0) {

 let up = grid[y-1][x]
 let fitting = allBorders(up[1])[3]//+4]
 let pos = ab.indexOf(fitting)
 if (pos == -1) return false
 if (pos == 2) return rot(rot(rot(tile)))
 if (pos == 0) return tile
 if (pos == 7) return rot(rot(tile))
 if (pos == 5) return rot(tile)
 let ttile = flip(tile)
 if (pos == 3) return ttile
 if (pos == 1) return rot(ttile)
 if (pos == 4) return rot(rot(ttile))
 if (pos == 6) return rot(rot(rot(ttile)))
 throw new Error('problem with tile'+tile[0]+y+','+x)

 }
 let left = grid[y][x-1]
 let fitting = allBorders(left[1])[2]
 let pos = ab.indexOf(fitting)
 if (pos == -1) return false
 if (pos == 4) return rot(rot(rot(tile))) //obrot w lewo
 if (pos == 1) return tile //nie ruszac
 if (pos == 6) return rot(rot(tile)) //obrot odwraca
 if (pos == 3) return rot(tile) //dol - ruszyc raz
 let ttile = flip(tile)
 if (pos == 5) return ttile //z lewej - flip
 if (pos == 0) return rot(ttile) //gora -> na dol i obrot
 if (pos == 2) return rot(rot(ttile)) //2 obroty i flip
 if (pos == 7) return rot(rot(rot(ttile))) //na gore i 3 obroty
 throw new Error('problem with tile'+tile[0]+y+','+x)
}


let notInGrid = grid => {
 let tnames = grid.flat().filter(identity).map(s=>s[0])
 return i => !tnames.includes(i[0])
}

function addToGrid(grid,pos) {
  let n = tiles.map(e=>fits(grid,pos,e)).filter(identity).filter(notInGrid(grid))
  if (n.length != 1) {
    console.log(pos, n)
    throw new Error('not matching')
  }
  grid[pos[0]][pos[1]] = n[0]
}


function fill1(grid,row) {
 for (let i = 1; i < 12; i++)
  addToGrid(grid,[row,i])

}

function fill2(grid) {
 for (let row=1;row<12;row++) {
  addToGrid(grid,[row,0])
  fill1(grid,row)
 }
}

fill1(grid,0)
fill2(grid)

function cut(tile) {
 let s = tile[1]
 return s.slice(1,9).map(t=>t.slice(1,9))
}

function joinrow(row) {
 return range(8).map(l=> row.map(s=>s[l]).join(''))
}

let gr = grid.map(r=>r.map(c=>cut(c)))

let y = gr.flatMap(joinrow)

let mon = ['                  # ',
           '#    ##    ##    ###',
           ' #  #  #  #  #  #   '].map(ston)

function isMon(grid,y,x) {
  let r = grid.slice(y,y+3).map(s=>s.slice(x,x+20)).map(ston)
  let found = (((r[0] & mon[0]) == mon[0]) &&
  ((r[1] & mon[1]) == mon[1]) &&
  ((r[2] & mon[2]) == mon[2])) 
  if (found)  console.log('Found at '+y+','+x)
  return found

}

let z = y=> range(96).map(r=>range(96).map(c=>isMon(y,r,c)))

let fmon = z(rot(rot([-1,y]))[1]).flat().filter(identity).length

console.log(y.join('').split('').filter(s=>s=='#').length -fmon*15)

}
day20()