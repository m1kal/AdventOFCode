function day14(){
let din = loadLines('day14.txt')

let mem = {}
let mask =range(36).map(x=>'X')

function write(add,val) {
 let v = val.toString(2).split('').reverse()
 mem[add] = mask.map((bit,idx)=> bit=='1' ? '1' : bit=='0' ? '0' : v[idx] || 0)
}

function parseline(line) {
  if (line.slice(0,4)=='mask') mask = line.split(' = ')[1].split('').reverse()
  if (line.slice(0,3)=='mem') {
    let [a,d] = line.match(/\[(\d+)\] = (\d+)/).slice(1)
    write(a,parseInt(d))
  }
}
function addresses(ss, idx) {
  if (idx >= ss.length)
    return ss
  if (ss[idx] != 'X')
    return addresses(ss, idx+1)
  return [ss.replace(/X/,'0'),ss.replace(/X/,'1')].flatMap(v=>addresses(v,idx+1))
}


function write2(add,val) {
 let addr0 = add.toString(2).split('').reverse()
 let addr1 = mask.map((bit,idx)=> bit=='1' ? '1' : bit=='0' ? addr0[idx] || 0 :
                                  'X').join('')
 let addr2 = addresses(addr1,0)
 addr2.forEach(a=>mem[a] = val)
}

function parseline2(line) {
  if (line.slice(0,4)=='mask') mask = line.split(' = ')[1].split('').reverse()
  if (line.slice(0,3)=='mem') {
    let [a,d] = line.match(/\[(\d+)\] = (\d+)/).slice(1)
    write2(parseInt(a),parseInt(d))
  }
}

din.forEach(parseline)
show(sum(Object.entries(mem).map(([a,v])=>v.reverse().join('')).map(x=>parseInt(x,2))))

mem = {}
mask = ""
din.forEach(parseline2)

show(sum(Object.entries(mem).map(([a,v])=>v)))

}
day14()

