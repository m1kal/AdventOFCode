import json

def count(col,part):
    if type(col)==list:
        return sum(count(el, part) for el in col)
    elif type(col) == int:
        return col
    elif type(col) == dict:
        if part == 2 and 'red' in col.values():
            return 0
        else:
            return sum(count(v, part) for k,v in col.items())
    else:
        return 0

with open('day12.txt') as input:
    data = input.read()
    sigdig = "0123456789"
    nums = []
    cn = ''
    s = 0
    for idx in range(0,len(data)):
        s = 1 if data[idx]=='-' else s
        if data[idx] in sigdig:
            cn = cn+data[idx]
        elif len(cn)>0:
            v = int(cn)
            nums.append(-v if s==1 else v)
            cn = ''
            s = 0
           
    print(sum(nums))
    d2 = json.loads(data)
    print(count(d2, 1))
    print(count(d2, 2))

# 12 minutes
# 2 hours 40 minutes
