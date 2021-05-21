function day18() {
    show('Day18')
    let din = loadLines('day18.txt').map(x => x.trim())

    function makesums(s) {
        let st = [...s]
        let idx = st.indexOf('+')
        while (idx >= 0) {
            st.splice(idx - 1, 3, st[idx - 1] + st[idx + 1])
            idx = st.indexOf('+')
        }
        return st
    }

    function evals(st) {
        let v = st[0]
        for (let i = 1; i < st.length; i++) {
            let op = st[i++], a = st[i]
            if (op == '+') v += a
            if (op == '*') v *= a
        }
        return v
    }

    function evals2(s) {
        let st = makesums(s)
        let v = st[0]
        for (let i = 1; i < st.length; i++) {
            let op = st[i++], a = st[i]
            if (op == '+') {
                throw new Error()
            }
            if (op == '*') v *= a
        }
        return v
    }

    function leval(line, evalsf = evals) {
        let ptr = 0
        let stack = []
        let istack = []
        while (ptr < line.length) {
            while (line[ptr] == ' ') ptr++
            let t0 = line[ptr++]
            if (t0.match(/\d/))
                stack.push(parseInt(t0))
            if (t0 == '+' || t0 == '*' || t0 == '(')
                stack.push(t0)
            if (t0 == ')') {
                let t1 = stack.pop()
                let expr = 0
                while (t1 != '(') {
                    istack.push(t1)
                    t1 = stack.pop()
                }
                stack.push(evalsf(istack.reverse()))
                istack = []
            }
        }
        return evalsf(stack)
    }

    show(sum(din.map(x => leval(x))))
    show(sum(din.map(x => leval(x, evals2))))
}
day18();

