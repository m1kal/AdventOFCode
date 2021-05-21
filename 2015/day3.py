from collections import defaultdict

def visit_all(data, number_of_santas):
    positions = defaultdict(int)
    curpos = [[0,0] for s in range(number_of_santas)]
    positions['[0, 0]'] = 1
    s = 0
    for char in data:
        curpos[s][0] += 1 if char=='<' else -1 if char=='>' else 0
        curpos[s][1] += 1 if char=='^' else -1 if char=='v' else 0
        positions[str(curpos[s])]+=1
        s = (s + 1) % number_of_santas
    return len(list(positions.keys()))


with open('day3.txt') as input:
    data = input.read()
    print(visit_all(data,1), visit_all(data,2))

#10 minutes
#5 minutes
