import { MESES } from "../helpers/Variables";

export default function Tabla({ data = {} }) {

    const { from = 0, to = 11, bancos: datasets = [] } = data


    const meses = MESES.filter((item, index) => index >= from && index <= to)

    return (
        <div className="tabla">
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Perfil financiero</th>
                            {meses.map(item => <th>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {datasets.map((item)=> <ItemTabla data={item}></ItemTabla>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export function ItemTabla({ data }) {

    const { label = "", data: meses } = data;
    return (
        <tr>
            <td>{label}</td>
            {meses.map((item, index) => <td key={index}>{item}</td>)}
        </tr>
    )
}