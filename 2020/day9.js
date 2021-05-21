function day9(){
  show('Day9')
  let numbers = loadNumbers('day9.txt')

  function diffs(idx) {
    let v = numbers[idx]
    let d = numbers.slice(idx - 25, idx)
    let dd = new Set(d.map(vv => v - vv))
    return d.filter(vv => dd.has(vv) && v != 2 * v).length
  }

  let idx1 = range(numbers.length).slice(25).find(x=>diffs(x)==0)
  let p1 = numbers[idx1]
  show(p1)


  let idx = 0
  let s = [0]
  while (sum(s) != p1) {
    if (sum(s) > p1)
      s.shift()
    else {
      s.push(numbers[idx++])
    }
  }
  s.sort((a,b)=>a-b)
  show(s[0]+s[s.length-1])
}
day9()

