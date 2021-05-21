function day8() {
  show('Day8')
  let din = loadLines('day8.txt')

  let pl = line => {let [a, b] = line.split(' '); return [a, parseInt(b)]}

  function attempt(line) {

    let code = din.map(pl) //reload each time
    let oop = code[line] ? code[line][0] : 0
    if (oop == 'jmp')
      code[line][0] = 'nop'
    if (oop == 'nop')
      code[line][0] = 'jmp'

    let acc = 0
    let pc = 0
    let visited = []

    function execute([a,b]) {
      if (visited.includes(pc)) {
        throw new Error(acc)
      }
      visited.push(pc) 
      pc += a=='jmp' ? b : 1
      if (a=='acc')
        acc += b
    }

    while (pc < code.length)
      execute(code[pc])
    show('Part2',acc)
  }
  try {attempt(-1)} catch(e) {show('Part1',e.toString().split(" ")[1])}

  range(din.length).forEach(line=> {try {attempt(line)} catch(e) {}})
}
day8()
