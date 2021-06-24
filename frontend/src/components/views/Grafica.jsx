import Layout from "../layout/Layout"
import Graph from "../Graph"
import { generate_data } from "../../helpers/Generadores"

const from = 0;
const to = 11;
const data = {
    from
    , to
    , bancos: generate_data(from, to, "Banrural", "GyT", "BI")

}

function Grafica(){
    return (
        <Layout>
            <h1>Grafica</h1>
            <Graph data={data}/>
        </Layout>
    )
}

export {Grafica}