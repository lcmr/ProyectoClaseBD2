import { useState } from "react";
import { useEffect, useRef } from "react"
import { get_labels } from "../helpers/Generadores";

export default function Graph({ from = "2020-05", to = "2020-05", data = [] }) {

    const canvas_el = useRef(null)
    const [chart, set_chart] = useState(null)
    const get_data = () => {
        return {
            labels: get_labels(from, to),
            datasets: data
        };
    }
    const get_config = () => {
        const data = get_data()
        // console.log(data);
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