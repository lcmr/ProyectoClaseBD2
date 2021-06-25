import { useState } from "react";
import { useEffect, useRef } from "react"
import { get_months, parse_date } from "../helpers/Generadores";

import { MESES } from "../helpers/Variables"
export default function Graph({ from = "2020-05", to = "2020-05", data = [] }) {

    const canvas_el = useRef(null)
    const [chart, set_chart] = useState(null)
    const get_data = () => {
        const from_date = parse_date(from);
        const to_date = parse_date(to);
        const labels = get_months(from, to).map(item => `${item.year} - ${MESES[item.month]}`);
        const datasets = data.map(item => {
            const fechas = item.fecha;
            const new_data = item.data.map((jtem, jndex) => {
                const d = fechas[jndex];
                return d >= from_date && d <= to_date ? jtem : 0;
            });
            return { ...item, data: new_data }
        });
        return {
            labels,
            datasets
        };
    }
    const get_config = () => {
        const data = get_data()
        console.log(data);
        return {
            type: 'line',
            data,
            options: {
                scales: {
                    y: {
                        reverse: true,
                        ticks: {
                            // forces step size to be 50 units
                            stepSize: 1
                        }
                    },
                    x: {
                        position: "top",
                    },
                }
                , plugins: {
                    legend: {
                        position: "right"
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (chart) {
            chart.destroy();
        }
        set_chart(new window.Chart(canvas_el.current, get_config()))
    }, [data])


    return (
        <div className="graph">
            <div>
                <canvas ref={canvas_el}></canvas>
            </div>
        </div>
    )
}