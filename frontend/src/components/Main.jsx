import { get_clean_data } from "../helpers/Generadores"
import Graph from "./Graph"
import Tabla from "./Tabla"
import { get_ranking } from "../api"
import { useEffect } from "react";
import { useState } from "react";

export default function Main() {

    const [data, set_data] = useState([])
    // no modificar no esta programado para otras fechas
    const [range,] = useState({ from: "2020-04", to: "2021-04" });

    useEffect(() => {
        get_ranking().then(body => set_data(get_clean_data(body)));
    }, [])

    return (
        <main className="main  px-md-4">
            <Graph data={data} from={range.from} to={range.to}></Graph>
            <h2>Section title</h2>
            <Tabla data={data} from={range.from} to={range.to}></Tabla>
        </main>
    )
}