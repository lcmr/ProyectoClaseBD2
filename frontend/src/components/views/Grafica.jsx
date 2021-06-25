import Layout from "../layout/Layout"
import Graph from "../Graph"
import { get_clean_data } from "../../helpers/Generadores"
import { get_ranking } from "../../api"
import { useState } from "react";
import { useEffect } from "react";

function Grafica(){
    const [data, set_data] = useState([])
    // no modificar no esta programado para otras fechas
    const [range,] = useState({ from: "2020-04", to: "2021-04" });

    useEffect(() => {
        get_ranking().then(body => set_data(get_clean_data(body)));
    }, [])
    return (
        <Layout>
            <h1>Grafica</h1>
            <Graph data={data} from={range.from} to={range.to}/>
        </Layout>
    )
}

export {Grafica}