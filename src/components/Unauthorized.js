import { useHistory } from "react-router-dom"

const Unauthorized = () => {
    let history = useHistory();
    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>Anda tidak memiliki akses ke halaman ini</p>
            <div className="flexGrow">
                <button onClick={history.goBack}>Kembali</button>
            </div>
        </section>
    )
}

export default Unauthorized