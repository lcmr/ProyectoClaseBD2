import { useEffect, useRef } from "react"

import { MESES } from "../helpers/Variables"
export default function Graph({ data }) {

    const { from = 0, to = 11, bancos: datasets = [] } = data
    const canvas_el = useRef(null)

    const get_data = () => {
        const labels = MESES.filter((item, index) => index >= from && index <= to);
        return {
            labels,
            datasets
        };
    }

    const get_config = () => {
        return {
            type: 'line',
            data: get_data(),
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
        console.log(data);
        new window.Chart(canvas_el.current, get_config())
    }, [])

    return (
        <div className="graph">
            <div>
                <canvas ref={canvas_el}></canvas>
            </div>
        </div>
    )
}