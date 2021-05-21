import re

def nice(s):
    two = re.compile(r'(.)\1')
    no = re.compile('(ab)|(cd)|(pq)|(xy)')
    a = len([x for x in s if x in 'aeiou']) > 2
    b = two.search(s)
    c = no.search(s)
    return 1 if a and b and not c else 0

def nice2(s):
    two = re.compile(r'(..).*\1')
    three = re.compile(r'(.).\1')
    b = two.search(s)
    c = three.search(s)
    return 1 if b and c else 0


with open('day5.tx') as input:
    data = input.readlines()
    print(sum([nice(l) for l in data]))
    print(sum([nice2(l) for l in data]))
    
# 16 minutes
# 5 minutes
