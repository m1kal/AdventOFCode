function day6() {
  show('Day6')
  let lines = loadLines()
  let groups = lines.join().split(',,').map(g=>g.split(',').map(e=>e.split('')))
  let intersect = (a, b) => a.filter(elem => b.includes(elem))
  let union = (a, b) => [...(new Set(a.concat(b)))]
  let reducer = fn => group => group.reduce(fn).length

  show('Part1', sum(groups.map(reducer(union))))
  show('Part2', sum(groups.map(reducer(intersect))))
}
day6()

