import Sidebar from "./Sidebar"
import Main from "./Main"
export default function Body() {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2 ">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-9 ms-sm-auto col-lg-10">
                    <Main></Main>
                </div>
            </div>
        </div>

    )
}