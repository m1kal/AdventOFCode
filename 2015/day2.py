with open('day2.txt') as input:
    data = input.readlines()
    area = 0
    length = 0
    for line in data:
        [a, b, c] = sorted([int(dim) for dim in line.strip().split('x')])
        sides = [a * b, b * c, c * a]
        area += sides[0] + 2 * sum(sides)
        length += 2 * a + 2 * b + a * b * c
    print(area)
    print(length)

# 11 minutes
# 3 minutes
