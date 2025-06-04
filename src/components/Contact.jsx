export default function Contact() {
    return (
        <div>
            <h1>Наша команда</h1>
            <div style={{display: "flex", gap: "5%",marginLeft: "8%"}}>
                <div style={{display: "flex-column"}}>
                    <img src="gera.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/geruniasun" target="_blank">герардас шне</a></h2>
                </div>
                <div style={{display: "flex-column"}}>
                    <img src="pima.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/p11menova" target="_blank">катюха ПИМ</a></h2>
                </div>
                <div style={{display: "flex-column"}}>
                    <img src="danik.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/deadxraver" target="_blank">данёк чими</a></h2>
                </div>

                <div style={{display: "flex-column"}}>
                    <img src="alena.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/dllnnx" target="_blank">алёна</a></h2>
                </div>

            </div>
            <br/>
            <div style={{ textAlign: "center", fontWeight: "bolder", fontSize: "24px" }}><a href="https://github.com/deadxraver/physics-2" target="_blank">исходный код</a></div>

        </div>
    );
}