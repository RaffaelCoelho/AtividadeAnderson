import logo from './logo.svg';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';
import { useEffect, useState } from 'react';

function App() {

  <div>
    <Formulario botao={btnCadastrar}/>
    <Tabela vetor={carros} />
  </div>

  //Remover Produto
  const remover = () => {
    fetch("http://localhost8080/remover/" + objCarro.codigo, {
      method: "delete",

      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        //Mensagem

        alert(retorno_convertido.mensagem);

        //copia do vetor carros
        let vetorTemp = [...carros];

        //indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objCarro.codigo;
        });

        //Remover produto do vetor
        vetorTemp.splice(indice, 1);

        //Atualizar o vetor de produtos

        setCarros(vetorTemp);

        //Limpar formulario
        limparFormulario();
      })

  }

  //Objeto carro
  const carro = {
    modelo: "",
    marca: "",
    codigo: 0,
    ano: 0

  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [carros, setCarros] = useState([]);
  const [objCarro, setObjcarro] = useState(carro);


  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setCarros(retorno_convertido));


  }, []);


  const aoDigitar = (e) => {

    setObjcarro({ ...objCarro, [e.target.name]: e.target.value })
  }

  //Alterar Carro

  const alterar = () => {
    fetch("http://localhost8080/alterar", {
      method: "put",
      body: JSON.stringify(objCarro),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {

          //Mensagem

          alert("Produto alterado com sucesso");

          //copia do vetor carros
          let vetorTemp = [...carros];

          //indice
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objCarro.codigo;
          });

          //Alterar produto do vetor
          vetorTemp[indice] = objCarro;

          //Atualizar o vetor de produtos

          setCarros(vetorTemp);

          //Limpar formulario
          limparFormulario();
        }
      })

  }



  //Cadastrar Carro
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: "post",
      body: JSON.stringify(objCarro),
      headers: {
        "Content-type": "aplication/json",
        "Accept": "aplication/json"
      }
    })



      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setCarros([...carros, retorno_convertido]);
          alert("Produto cadastrado com sucesso")
          limparFormulario();
        }
      })
  }


  //limpar Formulario
  const limparFormulario = () => {
    setObjcarro(carro);
    setBtnCadastrar(true);
  }


  //Selecionar carro
  const selecionarCarro = (indice) => {
    setObjcarro(carros[indice]);
    setBtnCadastrar(false);

  }

  return (
    <div>
      <p>{JSON.stringify(objCarro)}</p>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objCarro} cancelar={limparFormulario} alterar={alterar} remover={remover}/>
      <Tabela vetor={carros} />
    </div>
  );



}

export default App;