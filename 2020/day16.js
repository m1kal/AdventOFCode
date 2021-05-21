function day16() {
show('Day16')

let din = loadLines('day16.txt')

let rule = /.*: (\d+)-(\d+) or (\d+)-(\d+)/
let rules = din.map(x=>x.match(rule)).filter(identity).map(x=>x.slice(1))
let idx = din.indexOf('your ticket:') 

let t0 = din[idx+1].split(',')
let tt = din.slice(idx+4,din.length).map(l=>l.split(','))

let numbers = tt.flat().map(x=>parseInt(x))
let nnumbers = tt.map(y=>y.map(x=>parseInt(x)))
let rs = rules.flatMap(r=>[r[0],r[2]])
let re = rules.flatMap(r=>[r[1],r[3]])

let valid = n=> range(rs.length).find(idx=>n>=rs[idx]&&n<=re[idx])


show(sum(numbers.filter(n=>valid(n)==undefined)))

function meets(v,idx) {
  return ((rs[2*idx] <= v && v <= re[2*idx]) ||
         (rs[2*idx+1] <= v && v <= re[2*idx+1]))
}

function matchingrules(idx) {
 let vfields = nnumbers.map(r=>r[idx]).filter(n=>valid(n)!=undefined)
 return range(rs.length/2).filter(rule=> {
   return vfields.every(n=> meets(n, rule))
 })
}

let indexes = range(20).map(matchingrules).map((x,idx)=>[idx,x.length])
let ru = []
let ma = range(20).map(matchingrules)
for (let n = 1; n<21; n++) {
 let v = ma.find(r=>r.length == 1)
 let ii = indexes.find(s=>s[1]==n)[0]
 ru.push([v[0],ii])
 ma = ma.map(r=>r.filter(vv=>vv!=v))

}

let departures = ru.sort((a,b)=>a[0]-b[0]).map(x=>x[1])

show('Part2',departures.map(s=>t0[s]).slice(0,6).reduce((a,b)=>a*b))
}

day16()
