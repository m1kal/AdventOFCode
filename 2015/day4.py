from hashlib import md5

din = 'iwrupvqb'

def adventcoin(zeros):
    for number in range(10000000):
        if md5((din+str(number)).encode()).hexdigest()[:zeros]=='0'*zeros:
           return number

print(adventcoin(5), adventcoin(6))

# 8 minutes (using Python library)
# 1 minute
