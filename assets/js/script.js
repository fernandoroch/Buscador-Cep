const input = document.querySelector("#cep");
const buscar = document.querySelector(".button");
let conteudo = document.querySelector(".conteudo .dados");
let conteudoErro = document.querySelector(".conteudo h1");
conteudoErro.style.display = 'none'

buscar.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    buscarLocal(input.value);
  } else {
    alert("digite o CEP");
  }
});

async function buscarLocal(cep) {
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  let value = await fetch(url);
  let jsonRes = await value.json();
  if (jsonRes.localidade === undefined) {
    conteudo.style.display = 'none'
    conteudoErro.style.display = 'block'
  }else {
    conteudoErro.style.display = 'none'
    conteudo.style.display = 'block'
    manipularDom(jsonRes)
  }
}

function manipularDom(jsonRes) {
  document.querySelector(".localidade").innerHTML = jsonRes.localidade;
  document.querySelector(".bairro").innerHTML = jsonRes.bairro;
  document.querySelector(".logradouro").innerHTML = jsonRes.logradouro;
  document.querySelector(".uf").innerHTML = jsonRes.uf;
}
