function day4() {
  show('Day4')
  let din = loadLines("day4.txt")

  let data = din.join(";").split(";;").map(x=>x.split(/[\s;]/))

  let kkeys = pair => pair.replace(/:.*/,"")
  let allkeys = passport => passport.map(kkeys).sort()

  let expected = ["byr","iyr","eyr","hgt","hcl","ecl","pid","cid"].sort()
  let expected2 = ["byr","iyr","eyr","hgt","hcl","ecl","pid"].sort()
  
  let kv = pair => pair.split(":")
  let filtered = data.map(allkeys).filter(k=>comp(k,expected)||comp(k,expected2))

  show('Part1',count(filtered))

  let byr = elem=>elem[0]=="byr" && /^\d{4}$/.exec(elem[1]) && 1920 <= parseInt(elem[1]) && parseInt(elem[1]) <= 2002
  let iyr = elem=>elem[0]=="iyr" && /^\d{4}$/.exec(elem[1]) && 2010 <= parseInt(elem[1]) && parseInt(elem[1]) <= 2020
  let eyr = elem=>elem[0]=="eyr" && /^\d{4}$/.exec(elem[1]) && 2020 <= parseInt(elem[1]) && parseInt(elem[1]) <= 2030
  let hgti = elem=> /^\d{2}in$/.exec(elem) && 59 <= parseInt(elem) && parseInt(elem) <= 76
  let hgtc = elem=> /^\d{3}cm$/.exec(elem) && 150 <= parseInt(elem) && parseInt(elem) <= 193
  let hgt = elem=>elem[0]=="hgt" && (hgti(elem[1]) || hgtc(elem[1]))

  let hcl = elem=>elem[0]=="hcl" && /^#[0-9a-f]{6}$/.exec(elem[1])
  let ecl = elem=>elem[0]=="ecl" && /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/.exec(elem[1])

  let pid = elem=>elem[0]=="pid" && /^\d{9}$/.exec(elem[1])

  let field = x=>byr(x)||iyr(x)||eyr(x)||hgt(x)||hcl(x)||ecl(x)||pid(x)

  let validated = data.filter(elem=>elem.map(kv).filter(field).length == 7)
  show('Part2',validated.length)
}
day4()
