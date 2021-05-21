with open('day8.txt') as input:
    data = input.readlines()
    cnt = 0
    for line in data:
        cnt += 2
        n = 1
        for idx in range(len(line)-1):
            if line[idx]=='\\':
                if n:
                    cnt += 3 if line[idx+1]=='x' else 1
                n = 1 - n
            else:
                n = 1
    print(cnt)
    cnt = 0
    for line in data:
        cnt += 2
        for idx in range(len(line)):
            if line[idx] in ['\\','\"']:
                cnt += 1
    print(cnt)

# 18 minutes
# 4 minutes
