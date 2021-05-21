from collections import defaultdict

with open('day6.txt') as input:
    data = input.readlines()
    d = defaultdict(int)
    d2 = defaultdict(int)
    for line in data:
        cmd= 0 if line[6] == 'f' else 1 if line[6]=='n' else 2
        v = line.strip().split(' ')
        coords = [2,4] if line[1]=='u' else[1,3]
        corners = [v[c].split(',') for c in coords]
        for x in range(int(corners[0][0]),int(corners[1][0])+1):
            for y in range(int(corners[0][1]),int(corners[1][1])+1):
               p = str([x,y])
               d[p] = cmd if cmd < 2 else (1 - d[p])
               d2[p] = d2[p] + cmd if cmd > 0 else max(0, d2[p] - 1)
    print(sum(list(d.values())),sum(list(d2.values())))


#61 minutes (including a break)
#3 minutes (calculation takes tens of seconds)
