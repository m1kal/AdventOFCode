function day21() {
let din = loadLines('day21.txt')

let pl = l => l.replace(')','').split(' (contains ').map(r=>r.split(/,? +/))

let foods = din.map(pl)
let allergens = [...(new Set(foods.map(s=>s[1]).flat()))]
let contains = (food,allergen) => food[1].includes(allergen)
let allWith = (allergen) => foods.filter(r=>contains(r,allergen))
let intersect = (l) => l.reduce((a,b)=>a.filter(e=>b.includes(e)))
let candidates = (allergen) => intersect(allWith(allergen).map(s=>s[0]))

let ac = allergens.map(a=>[a,candidates(a)])
ac.sort((x,y)=>x[1].length-y[1].length)
//manual elimination gives:
let y = [['eggs','kgbzf'],['dairy','fllssz'],['peanuts','pzmg'],
         ['soy','dqbjj'],['nuts','zcdcdf'],['sesame','kpsdtv'],
         ['shellfish','fvvrc'],['wheat','qpxhfp']]
  
let zz = allergens.flatMap(candidates)

show(foods.map(s=>s[0]).flat().filter(a=>!zz.includes(a)).length)
show(y.map(r=>r[1]).join(','))

}
day21()