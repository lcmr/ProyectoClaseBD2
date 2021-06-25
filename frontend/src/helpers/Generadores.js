
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


const parse_date = str => {
    const [year, month] = str.split("-");
    return new Date(year, parseInt(month - 1));
}

const get_diff_in_months = (from, to) => {
    const from_date = parse_date(from)
    const to_date = parse_date(to)

    let months = to_date.getFullYear() - from_date.getFullYear()
    months *= 12;
    months += to_date.getMonth();
    months -= from_date.getMonth();
    return ++months;
}

const get_months = (from, to) => {
    const from_date = parse_date(from)
    const to_date = parse_date(to)

    const months = [];

    const from_year = from_date.getFullYear();
    const to_year = to_date.getFullYear()
    const from_month = from_date.getMonth();
    const to_month = to_date.getMonth();

    for (let index = from_year; index <= to_year; index++) {
        for (let jndex = (index === from_year ? from_month : 0); jndex <= (index === to_year ? to_month : 11); jndex++) {
            months.push({ year: index, month: jndex })
        }
    }

    return months;
}

export {
    generate_data, random, numbers, get_diff_in_months, get_months, parse_date,
}