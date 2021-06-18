
const random = (length, from) => Math.floor(Math.random() * length + from)
const numbers = (from, to) => {
    const l = []
    for (let index = from; index <= to; index++) {
        l.push(random(to - from + 1, from + 1))
    }
    return l;
}

const generate_data = (from = 0, to = 11, ...names) => {
    return names.map(item => {
        return {
            label: item,
            data: numbers(from, to),
        }
    });
}



export {
    generate_data, random, numbers,
}