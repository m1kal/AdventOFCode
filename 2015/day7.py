def parse(line, d):
    [*l, sep, r] = line.split(' ')
    d[r] = l

def eval(entry, d):
    if not (entry in d):
        return int(entry)
    v = d[entry]
    if not(isinstance(v,list)):
        return v
    if len(v) == 1:
        return eval(v[0],d) if v[0] in d else int(v[0])
    elif v[0] == 'NOT':
        d[entry] = 0xffff & (~eval(v[1],d))
    elif v[1] == 'AND':
        d[entry] = eval(v[0],d) & eval(v[2],d)
    elif v[1] == 'OR':
        d[entry] = eval(v[0],d) | eval(v[2],d)
    elif v[1] == 'RSHIFT':
        d[entry] = eval(v[0],d) >> int(v[2])
    elif v[1] == 'LSHIFT':
        d[entry] = (eval(v[0],d) << int(v[2])) & 0xffff
    else:
        raise Exception((entry,v))
    return d[entry]

with open('day7.txt') as input:
    data = input.readlines()
    d = {}
    for line in data:
        parse(line.strip(), d)
    dd = d.copy()
    print(eval('a',d))
    dd['b'] = eval('a',d)
    print(eval('a',dd))

#34 minutes
#2 minutes
