import Sidebar from "../Sidebar"
import Header from "../Header"

export default function Layout({children}){
    return (
        <div className="app">
            <Header/>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-3 col-lg-2  h-100">
                        <Sidebar></Sidebar>
                    </div>
                    <div className="col-md-9 ms-sm-auto col-lg-10 h-100">
                        <main className="main  px-md-4  mt-5">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}