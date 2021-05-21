function day5() {
  show('Day5')
  let din = loadLines("day5.txt")
  let toNum = line => line.split("").map(x=>x=="B"||x=="R").reduce((a,b)=>a*2+b)
  let ids = din.map(toNum).sort((a,b)=>a-b)
  show('Part1',ids[ids.length-1])
  show('Part2',ids[range(ids.length-1).map(x=>ids[x+1]-ids[x]).indexOf(2)]+1)

  //solution 2
  //  show(range(1023).filter(i=>ids.includes(i-1) && ids.includes(i+1) &&
  //                              !ids.includes(i)))
}
day5()

