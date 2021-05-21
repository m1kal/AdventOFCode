function day25() {
let v1 = 13135480
let v2 = 8821721

let m = 20201227

let i = 1
let c = 1

while (c != v1) {
  c = (c * 7) % m
  i++
}

let mulmod = (a,b,m) => {
  let c = 1
  for (let idx = 0; idx < b; idx++)
    c = (a * c) % m
  return c
}

show(mulmod(v2,i-1,m))
}
day25()