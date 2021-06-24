import Layout from "../layout/Layout"
function Carga(){
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <h1> Carga de Archivos</h1>
                </div>
                <div className="col">
                    <div className="form-control">
                        <label htmlFor="">Cargar Archivo
                            <input type="file" name="" id="" />
                        </label>
                    </div>
                    <div className="form-control">
                        <a href="/cargar" className="btn btn-primary">Subir</a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export {Carga}