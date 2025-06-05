import '../styles/introduction/main.css'
const EjsEmbed = () => {
    return (
        <div>
            <h1>Визуализация колебаний заряженных частиц</h1>
      <div style={{ width: '100%', height: '600px', border: 'none' }}>

        <iframe
          src="/ejs/index.html"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="EJS Embed"
        ></iframe>
      </div>
            <h2 style={{ margin: '50px', color: 'red'}}> заряды указаны в Кулонах!</h2>
        </div>
    );
  };
  
  export default EjsEmbed;