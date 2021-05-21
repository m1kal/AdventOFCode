
function day2() {
  let pattern = /(\d+)-(\d+) (\S): (.*)/
  function validatePart1(line) {
    let [min, max, char, password] = pattern.exec(line).slice(1)
    let occ = password.split('').filter(c => c == char).length
    return (min <= occ && occ <= max)
  }

  function validatePart2(line) {
    let [p1, p2, char, password] = pattern.exec(line).slice(1)
    return [p1, p2].filter(pos=>password[pos-1]==char).length == 1
  }

  let din = loadLines("day2.txt")
  show('Day 2')
  show('Part 1', din.map(validatePart1).reduce((a,b)=>a+b))
  show('Part 2', din.map(validatePart2).reduce((a,b)=>a+b))
}
day2()
