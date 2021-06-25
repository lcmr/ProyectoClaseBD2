
import { MESES, COLORS } from "./Variables"

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

const get_dataset_from_data = (from, to, ...data) => {
    const from_date = parse_date(from);
    const to_date = parse_date(to);
    return data.map(item => {
        const fechas = item.fecha;
        const new_data = item.data.map((jtem, jndex) => {
            const d = fechas[jndex];
            return d >= from_date && d <= to_date ? jtem : 0;
        });
        return { ...item, data: new_data }
    });
}

const get_labels = (from, to) => {
    return get_months(from, to).map(item => `${item.year} - ${MESES[item.month]}`);
}

const group_by = (key, list) => {
    const tt = {}
    list.forEach((item, index) => {
        var jtem = tt[item[key]];
        if (!jtem) {
            jtem = { list: [] }
            tt[item[key]] = jtem;
        }
        jtem["list"].push(item)
    });
    return tt;
}

const get_clean_data = (body) => {
    const tt = {}
    if(body){

        body.forEach((item, index) => {
            var jtem = tt[item.nombre];
            if (!jtem) {
                const color = COLORS[index];
                jtem = { label: item.nombre, data: [], fecha: [], activo: [], borderColor: color, backgroundColor: color }
                tt[item.nombre] = jtem;
            }
    
            // const fecha = new Date(item.fecha).toISOString().slice(0, 10);
            const fecha = parse_date(item.fecha);
            jtem["data"].push(item.posicion)
            jtem["fecha"].push(fecha)
            jtem["activo"].push(item.Activo)
        });
    }

    const bancos = [];
    for (const key in tt) {
        if (Object.hasOwnProperty.call(tt, key)) {
            const item = tt[key];
            bancos.push(item)
        }
    }
    return bancos;
}

export {
    generate_data, random, numbers,
    get_diff_in_months,
    get_months, parse_date,
    get_dataset_from_data,
    get_labels,
    group_by,
    get_clean_data,
}