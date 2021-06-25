import { get_months, group_by } from "../helpers/Generadores"
import { MESES } from "../helpers/Variables";

export default function Tabla({ data = {}, from = "2020-05", to = "2021-05" }) {

    const months = get_months(from, to);
    const years = group_by("year", months);
    return (
        <div className="tabla">
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            {Object.keys(years).map((item, index) => <th style={{ textAlign: "center" }} key={index} colSpan={years[item].list.length}>{item}</th>)}
                        </tr>
                        <tr>
                            <th>Perfil financiero</th>
                            {months.map((item, index) => <th key={index}>{MESES[item.month]}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => <ItemTabla data={item} key={item.label}></ItemTabla>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export function ItemTabla({ data }) {
    return (
        <tr>
<<<<<<< HEAD
            <td>{label}</td>
            {meses.map((item, index) => <td key={index}>{item}</td>)}
=======
            <td>{data.label}</td>
            {data.data.map((item, index) => <td key={index}>{item}</td>)}
>>>>>>> develop
        </tr>
    )
}