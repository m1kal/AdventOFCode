def inc_char(c):
    nc = ((ord(c)-97) + 1) % 26 + 97
    return chr(nc + 1 if nc in [105, 108, 111] else nc)

def inc_str(s):
    o = ''
    carry = True
    for c in s[::-1]:
        o += inc_char(c) if carry else c
        carry = o =='a'*len(o)
    return o[::-1]

def match(s):
    n = True
    c1 = 0
    c2 = 0
    for i in range(len(s)-2):
        if ord(s[i]) + 1 == ord(s[i+1]) and ord(s[i])+2 ==ord(s[i+2]):
            c2 += 1
    if c2 == 0:
        return False
    for i in range(len(s)-1):
      if n:
          if s[i]==s[i+1]:
              c1 += 1
              n = False
      else:
          n = True
    return c1 > 1

p = 'hepxcrrq'

while not(match(p)):
    p = inc_str(p)
print(p)
p = inc_str(p)
while not(match(p)):
    p = inc_str(p)
print(p)

# 77 minutes
# 1 minute
