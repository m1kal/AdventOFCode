function day1() {
  show("Day1")

  let data = loadNumbers('day1.txt')
  let dataset = new Set(data)
  let elem = data.filter(elem=>dataset.has(2020 - elem))[0]
  let part1 = elem * (2020 - elem)
  show('Part1', part1)

  let part2 = data.map(first => {
    let second = data.filter(elem => dataset.has(2020 - first - elem))[0]
    if (second) return first * second * (2020 - first - second)
  }).filter(identity)[0]
                  
  show('Part2',part2)
}
day1()
