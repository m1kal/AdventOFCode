import itertools

with open('day9.txt') as input:
    data = input.readlines()
    lines = [line.split(' ')[0:5:2] for line in data]
    un = set([line[0] for line in lines] + [line[1] for line in lines])
    sd = 9999999999
    ld = 0
    for it in itertools.permutations(un):
        d = 0
        for idx in range(7):
            dd = [line[2] for line in lines if (line[1] == it[idx] and line[0] == it[idx+1]) or (line[0]==it[idx] and line[1] ==it[idx+1]) ][0]
            d += int(dd)
        sd = sd if sd < d else d
        ld = ld if ld > d else d
    print(sd, ld)

# 16 minutes
# 1 minute
