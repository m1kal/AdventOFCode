function day7() {
  show('Day7')
  let re = /(\w+ \w+) bags contain (?:(no)|(.*$))/
  let lines = loadLines('day7.txt')

  let par = line => line.match(re).slice(1)
  let bags = str => str[2].split(", ").map(f=>f.match(/(\d+) (\w+ \w+) bags?/).slice(1))

  let empty_bags = lines.map(par).filter(x=>x[1]).map(x=>x[0])
  let nonempty_bags = lines.map(par).filter(x=>x[2]).map(x=>[x[0],bags(x)])

  function find_containing(type) {
    return nonempty_bags.filter(x=>x[1].filter(y=>y[1]==type).length > 0).map(x=>x[0])
  }

  let soFar = []
  let currentCount = -1
  let current = ['shiny gold']
  while (currentCount < soFar.length) {
    currentCount = soFar.length
    current = current.flatMap(find_containing)
    soFar = [...(new Set(soFar.concat(current)))]
  } 

  function countInside(type) {
    if (empty_bags.includes(type))
      return 0
    else {
      let elems = nonempty_bags.find(x=>x[0]==type)[1].map(x=>parseInt(x[0])*(1+ countInside(x[1])))
      return sum(elems)
   }
  }

  show('Part1', soFar.length)
  show('Part2', countInside('shiny gold'))
}
day7()

