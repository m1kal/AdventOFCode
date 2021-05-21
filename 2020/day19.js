function day19() {

let din = loadLines('day19.txt')

let rules

let n42 = 0


function Simple(v) {
  this.v = v;
  this.parse = function(din,rules) {
    if (din.indexOf(v)==0) return v.length
    return false
  }
}
function Seq(v) {
  this.v = v;
  this.parse = function(din,rules) {
    let iidx = 0;
    for (let ridx = 0;ridx<v.length;ridx++) {
      let r = rules[v[ridx]].parse(din.slice(iidx),rules)
      if (r == false) return false
      iidx += r
    }
    return iidx
  }
}

function Greedy(v) {
  this.v = v;
  this.parse = function(din,rules) {
    let iidx = 0;
    let r = -1
    let ridx = 0
    for (ridx = 0; r && ridx < 32 ;ridx++) {//keep the loop finite?
      let r = rules[v].parse(din.slice(iidx),rules)
      if (r == false) break
      iidx += r
    }
    if (iidx == 0) return false
    if (v == 42) n42 = ridx
    if (v == 31 && (ridx >= n42)) iidx = (n42-1)*8
    return iidx
  }
}

function Or(v) {
  this.v = v;
  this.parse = function(din) {
    for (let ridx = 0; ridx < v.length;ridx++) {
      let r = v[ridx].parse(din,rules)
      if (r) return r
    }
    return false
  }
}

function prhs(rhs) {
  if (rhs.match(/\"(.)\"/))
    return new Simple(rhs[1])
  let or = rhs.indexOf('|') 
  if (or > -1)
    return new Or(rhs.split('|').map(r=>prhs(r)))
  return new Seq(rhs.trim().split(' '))
}

function rrule(line) {
  let [l, idx, rhs] = line.match(/^(\d+): (.*)$/)
  return [idx, prhs(rhs)]
}

let l0 = din.indexOf('')

rules = din.slice(0,l0).map(r=>rrule(r)).sort((r,s)=>r[0]-s[0]).map(r=>r[1])

let data = din.slice(l0+1)

show(data.filter(r=>rules[0].parse(r,rules)==r.length).length)

//Part 2: override the rules
rules[8] = new Greedy(42)
rules[11] = new Greedy(31)

show(data.filter(r=>rules[0].parse(r,rules)==r.length).length)

}
day19()
