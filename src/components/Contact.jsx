export default function Contact() {
    return (

        <div>
            <h2>------</h2>

            <h1>Наша команда</h1>
            <div style={{display: "flex", gap: "60px",marginLeft: "10%"}}>
                <div style={{display: "flex-column"}}>
                    <img src="gera.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/geruniasun">герардас шне</a></h2>
                </div>
                <div style={{display: "flex-column"}}>
                    <img src="pima.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/p11menova">катюха ПИМ</a></h2>
                </div>
                <div style={{display: "flex-column"}}>
                    <img src="danik.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/deadxraver">данёк чими</a></h2>
                </div>

                <div style={{display: "flex-column"}}>
                    <img src="alena.png" alt="null"/>
                    <h2 style={{textAlign: "center"}}><a href="https://github.com/dllnnx">алена (беременна)</a></h2>
                </div>

            </div>
            <br/>
            <div style={{ textAlign: "center", fontWeight: "bolder", fontSize: "24px" }}><a href="https://github.com/deadxraver/physics-2">исходный код</a></div>

        </div>
    );
}