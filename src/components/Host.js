import React, { Component } from "react";
import BifrostCors from "bifrost-cors";

class Host extends Component {
  state = {
    nombre: "",
  };

  componentDidMount() {
    localStorage.setItem(
      "prueba",
      "esto es una variable desde el dominio localhost:8000 "
    );

    var bifrostCors = new BifrostCors("http://localhost:8000/", false);
    console.log(bifrostCors);
    bifrostCors.requestMessageThread(Listner);
    var createHost = require("cross-domain-storage/host");

    createHost([
      {
        origin: "http://localhost:2000",
        allowedMethods: ["get", "set", "remove"],
      },
    ]);

    //storageHost.close();
  }

  buscarVariable = () => {
    /*console.log("busco las variables");

    var createGuest = require("cross-domain-storage/guest");

    var bazStorage = createGuest("http://localhost:2000");

    bazStorage.get("nuevoValorDominio3000", function (error, value) {
      // El valor de la clave de 'prueba' se recuperará de localStorage en http://localhost:3000
      console.log("valor ", value);
      alert("LOCALSTORAGE 2000" + value);
      localStorage.setItem("prueba", value);
    });*/
    //bazStorage.close();
  };
  render() {
    return (
      <div>
        <h1>pagina de inicio</h1>

        <button onClick={this.buscarVariable}>Buscar variables</button>

        <br></br>
        <strong>{localStorage.getItem("prueba")}</strong>
      </div>
    );
  }
}

export default Host;
