function day3() {
  show('Day3')
  let map = loadLines("day3.txt")
  let tree = ([x, y]) => y < map.length && map[y][x % (map[0].length)] == '#'
  let jump = slope => n=> slope.map( coord=> coord * n)
  let trees = slope => sum(range(map.length).map(jump(slope)).map(tree))
  let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

  show(' Part1', trees([3,1]))
  show('Part2', slopes.map(trees).reduce((a, b) => a * b))
 
}
day3()
