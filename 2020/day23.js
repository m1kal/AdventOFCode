function day23() {
let din = '712643589'.split('').map(s=>parseInt(s))

let idx = 0

let spl = data=>[data[0],data.slice(4),data.slice(1,4)]

let nextidx = (v,data) => {
  let cv = v
  while(data.indexOf(cv) < 0) {
    cv = (cv == 0) ? Math.max(...data) : (cv - 1)
 }
  return data.indexOf(cv)
}

let rou = (data) => {
  let [a, b, c] = spl(data)
  let s = nextidx(a,b)
  return [b.slice(0,s+1),c,b.slice(s+1),a].flat()
}

let res = d => {
 let y = d.indexOf(1)
 return d.slice(y+1).concat(d.slice(0,y)).join('')
}


show(res(range(100).reduce((a,b)=>rou(a),din)))

let d = []

let head, pp

let mkr = (din,r) => {
 for (let i = r; i > 9; i--)
  d.push({v:i,n:d[d.length-1]})
 head = d[din[0]+1]
 for (let i = din.length - 1; i >=0 ;i--)
  d.push({v:din[i], n:d[d.length-1]})
 d.reverse()
 head = d[0]
 d[d.length - 1].n = d[0]
 pp = [...d]
 pp.sort((i,j)=>i.v-j.v)
 return head
}


let roun = (data) => {
  let s1 = head.n
  let rem = [s1.v, s1.n.v, s1.n.n.v]
  let idx = head.v == 1 ? pp.length : head.v-1
  while (rem.includes(idx))
   idx = (idx <= 1) ? pp.length : idx - 1
  head.n = head.n.n.n.n
  let ss = pp[idx-1].n
  pp[idx-1].n = s1
  s1.n.n.n = ss
  head = head.n
}

let toA = (h,len = d.length) => {
  let y = [], hh = h
  for (idx = 0; idx<len;idx++) {
    y.push(hh.v)
    hh = hh.n

  }
  return y
}

mkr(din,1000000)
range(10000000).reduce((a,e)=>roun(a),d)
let i = head
while (i.v != 1) i = i.n
show(i.n.v*i.n.n.v)

}
day23()
