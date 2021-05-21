with open('day1.txt') as input:
    data = input.read().strip()
    d1 = len([x for x in data if x=='('])
    print(2*d1-len(data))
    pos = 0
    cnt = 1
    for char in data:
        pos = pos + 1 if char == '(' else pos-1
        if pos < 0:
           break
        cnt += 1
    print(cnt)

# 8 minutes
# 5 minutes

