import { generate_data } from "../helpers/Generadores"
import Graph from "./Graph"
import Tabla from "./Tabla"

const from = 0;
const to = 11;
const data = {
    from
    , to
    , bancos: generate_data(from, to, "Banrural", "GyT", "BI")

}

export default function Main() {
    return (
        <main className="main  px-md-4">
            <Graph data={data}></Graph>
            <h2>Section title</h2>
            <Tabla data={data}></Tabla>
        </main>
    )
}