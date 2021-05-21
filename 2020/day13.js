function day13() {
show('Day13')
let din = loadLines('day13.txt')

let t0 = parseInt(din[0])
let lines = din[1].split(',').map(x=>parseInt(x)).filter(identity)

let firstDepartureAfterT0 = (line) => Math.ceil(t0/line)*line

let departures = lines.map(line => [line, firstDepartureAfterT0(line)])
let firstDepartureTime = Math.min(...(departures.map(l=>l[1])))
let line = departures.find(x=>x[1]==firstDepartureTime)[0]
show(line*(firstDepartureTime-t0))

let indexedLines = din[1].split(',').map((x,i)=>[parseInt(x),i]).filter(x=>x[0])
let found = false, n=1, p = Math.max(...lines)


function modinv(a,b,c) {
  let n = 0, aa = a % c
  while ( (b*n %c) != aa) n++;
  return n
}

//let red = ([x, y],[n, i]) => y > i? [x*n,modinv(y-i,x,n)*x - y] : [x*n, modinv(i-y, n, x)*n-i]

let iter = ([mul,wwolny],[v, shift]) => [v*mul, modinv(wwolny+shift,v,mul)-shift]

let [v0,v1] = indexedLines.slice(0,6).reduce(iter)

let check = n => indexedLines.map(([v,s])=>(v0*n+v1+s) % v)

n = 0
found = false
while (!found && n <1000000) {
  if (check(n).find(x=>x!=0)) {
    n++
  } else {
    found=true
  }
}
show(v0*n+v1)
}
day13()


