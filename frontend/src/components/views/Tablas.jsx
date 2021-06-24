import Layout from "../layout/Layout"
import Tabla from "../Tabla"
import { generate_data } from "../../helpers/Generadores"

const from = 0;
const to = 11;
const data = {
    from
    , to
    , bancos: generate_data(from, to, "Banrural", "GyT", "BI")

}

function Tablas(){
    return (
        <Layout>
            <h1>Tabla</h1>
            <Tabla data={data}/>
        </Layout>
    )
}

export {Tablas}