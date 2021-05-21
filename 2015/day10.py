input = 3113322113

def sequence(data):
     n = []
     c = 1
     for i in range(len(data)-1):
         if data[i] == data[i+1]:
             c += 1
         else:
             n += [c,data[i]]
             c = 1
     n += [c,data[-1]]
     return n

d = [int(s) for s in str(input)]
for iter in range(40):
    d = sequence(d)
print(len(d))

for iter in range(10):
    d = sequence(d)
print(len(d))

# 8 minutes
# 3 minutes
