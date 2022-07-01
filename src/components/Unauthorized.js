import { useHistory } from "react-router-dom"
import { Button } from "./Button";

const Unauthorized = () => {
    let history = useHistory();
    return (
        <>
         <div className="wrapper">
            <div className="section">
                <div className="header">
                    <div>
                        <div className="title">Akses Ditolak</div>
                        <div className="subtitle">Anda tidak memiliki akses ke halaman ini</div>
                    </div>
                </div>
                <div className="content">
                    <div className="flexGrow">
                        <Button onClick={history.goBack}>Kembali</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Unauthorized