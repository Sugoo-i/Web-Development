const dados = document.getElementById("valor");
const resetarLista = document.getElementById("resetar");
const remover = document.getElementById("remover");
const removerItemEs = document.getElementById("itemEspecifico");
const calcular = document.getElementById("calcular");

const PermutacaoS = document.getElementById("PermutacaoSimples");
const ArranjosS = document.getElementById("ArranjosSimples");
const CombinacoesS = document.getElementById("CombinacoesSimples");
const PermutacaoR = document.getElementById("PermutacaoRepeticao");
const ArranjosR = document.getElementById("ArranjosRepeticao");
const CombinacoesR = document.getElementById("CombinacoesRepeticao");
const ValorP = document.getElementById("valorP");
const dadosVet = document.getElementById("dadosVet");
const voltar = document.getElementById("voltar");
const voltar2 = document.getElementById("voltar2");
const alterarValorP = document.getElementById("valorP");
var ativado = 0;

const listaDeDadosLi = document.getElementById("lista");
const resetarcalcular = document.getElementsByClassName("reset");
var contadorItens = 0;
const ListaDeDadosAmostrais = [];
const quantidadeDados = document.getElementById("quantidadeDados");

function atualizarContador() {
  quantidadeDados.innerHTML = contadorItens + " Dados";
}

function adicionarValor() {
  var novoValor = document.getElementById("valor").value;
  if (novoValor.trim() !== "") {
    var novoItem = document.createElement("li");
    novoItem.textContent = novoValor;
    listaDeDadosLi.appendChild(novoItem);
    var novoItemID = "item_" + contadorItens;
    novoItem.id = novoItemID;
    contadorItens++;
    document.getElementById("valor").value = "";
    ListaDeDadosAmostrais.push(novoValor);
    console.log(ListaDeDadosAmostrais);
  }
}

function resetar() {
  contadorItens = 0;
  ListaDeDadosAmostrais.length = 0;
  listaDeDadosLi.innerHTML = "";
  quantidadeDados.innerHTML = "";
  dadosVet.style.display = "none";
  resultado.innerHTML = "";
  document.getElementById("valorP").value = "";
  alterarValorP.readOnly = false;
  listaTabela();
}

function removerItemLista() {
  ListaDeDadosAmostrais.splice(ListaDeDadosAmostrais.length - 1, 1);
  listaDeDadosLi.removeChild(listaDeDadosLi.lastElementChild);
  contadorItens--;
  atualizarContador();
}

function removerItemEspecifico() {
  var UL = document.getElementById("lista");
  var quantidadeli = UL.getElementsByTagName("li");
  var indice = ListaDeDadosAmostrais.indexOf(removerItemEs.value);
  if (indice !== -1) {
    ListaDeDadosAmostrais.splice(indice, 1);
  }
  for (var i = 0; i < quantidadeli.length; i++) {
    var li = quantidadeli[i];
    if (li.textContent.trim() === removerItemEs.value) {
      UL.removeChild(li);
      document.getElementById("itemEspecifico").value = "";
      break;
    }
  }
  if (contadorItens == 0) {
    contadorItens = 0;
  } else {
    contadorItens--;
  }
  atualizarContador();
}
PermutacaoSimples();
function PermutacaoSimples() {
  let permutacao = ListaDeDadosAmostrais.length;
  return fatorial(permutacao);
}
function ArranjosSimples() {
  let p = document.getElementById("valorP").value;
  let arranjos =
    fatorial(ListaDeDadosAmostrais.length) /
    fatorial(ListaDeDadosAmostrais.length - p);
  return arranjos;
}
function CombinacoesSimples() {
  let p = document.getElementById("valorP").value;
  let combinacoes =
    fatorial(ListaDeDadosAmostrais.length) /
    (fatorial(ListaDeDadosAmostrais.length - p) * fatorial(p));

  return combinacoes;
}
function PermutacaoRepeticao() {
  let elementos = ListaDeDadosAmostrais.length;
  let elementosRepetidos = PegarElementosRepetidos();
  let denominador = 1;
  let elementoIndex = elementosRepetidos.filter(
    (elemento) => elemento !== undefined
  );
  for (let i = 0; i < elementoIndex.length; i++) {
    denominador *= fatorial(elementoIndex[i]);
  }

  let permutacaoRep = fatorial(elementos) / denominador;

  return permutacaoRep;
}

function ArranjosRepeticao() {
  let p = document.getElementById("valorP").value;
  let n = ListaDeDadosAmostrais.length;
  let arranjoRepeticao = Math.pow(n, p);
  return arranjoRepeticao;
}

function CombinacoesRepeticao() {
  let p = parseInt(document.getElementById("valorP").value);
  let combinacoes =
    fatorial(ListaDeDadosAmostrais.length + p - 1) /
    (fatorial(p) * fatorial(ListaDeDadosAmostrais.length - 1));
  return combinacoes;
}

function fatorial(N) {
  let fatorial = 1;
  for (let i = 1; i <= N; i++) {
    fatorial *= i;
  }
  return fatorial;
}

function PegarElementosRepetidos() {
  let contarElementoRepetido = [];
  ListaDeDadosAmostrais.forEach((cont) => {
    contarElementoRepetido[cont] = (contarElementoRepetido[cont] || 0) + 1;
  });
  return contarElementoRepetido;
}
function Apagarbotoes() {
  if (ativado == 1) {
    ArranjosS.style.display = "none";
    CombinacoesS.style.display = "none";
    PermutacaoR.style.display = "none";
    ArranjosR.style.display = "none";
    CombinacoesR.style.display = "none";

    voltar.style.display = "none";
    voltar2.style.display = "block";
  } else if (ativado == 2) {
    PermutacaoS.style.display = "none";
    CombinacoesS.style.display = "none";
    PermutacaoR.style.display = "none";
    ArranjosR.style.display = "none";
    CombinacoesR.style.display = "none";

    voltar.style.display = "none";
    voltar2.style.display = "block";
  } else if (ativado == 3) {
    PermutacaoS.style.display = "none";
    ArranjosS.style.display = "none";
    PermutacaoR.style.display = "none";
    ArranjosR.style.display = "none";
    CombinacoesR.style.display = "none";

    voltar.style.display = "none";
    voltar2.style.display = "block";
  } else if (ativado == 4) {
    PermutacaoS.style.display = "none";
    ArranjosS.style.display = "none";
    CombinacoesS.style.display = "none";
    ArranjosR.style.display = "none";
    CombinacoesR.style.display = "none";

    voltar.style.display = "none";
    voltar2.style.display = "block";
  } else if (ativado == 5) {
    PermutacaoS.style.display = "none";
    ArranjosS.style.display = "none";
    CombinacoesS.style.display = "none";
    PermutacaoR.style.display = "none";
    CombinacoesR.style.display = "none";

    voltar.style.display = "none";
    voltar2.style.display = "block";
  } else if (ativado == 6) {
    PermutacaoS.style.display = "none";
    ArranjosS.style.display = "none";
    CombinacoesS.style.display = "none";
    PermutacaoR.style.display = "none";
    ArranjosR.style.display = "none";
    voltar.style.display = "none";
    voltar2.style.display = "block";
  }
}

dados.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    adicionarValor();
    atualizarContador();
    dadosVet.style.display = "block";
  }
});

resetarLista.addEventListener("click", (event) => {
  resetar();
  dadosVet.style.display = "none";
});

remover.addEventListener("click", (event) => {
  removerItemLista();
});

removerItemEs.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    removerItemEspecifico();
  }
});

function MostrarDisplay() {
  let dy = document.getElementById("p");
  if (dy.style.display == "none") {
    dy.style.display == "block";
  } else if ((dy.style.display = "block")) {
    dy.style.display == "none";
  }
}
function MostrarDisplayMenu() {
  let dy = document.getElementById("menuDados");
  if (dy.style.display == "none") {
    dy.style.display == "block";
  } else if ((dy.style.display = "block")) {
    dy.style.display == "none";
  }
}

PermutacaoS.addEventListener("click", (event) => {
  ativado = 1;
  MostrarDisplayMenu();
  Apagarbotoes();
});
ArranjosS.addEventListener("click", (event) => {
  ativado = 2;
  MostrarDisplayMenu();
  MostrarDisplay();
  Apagarbotoes();
});
CombinacoesS.addEventListener("click", (event) => {
  ativado = 3;
  MostrarDisplayMenu();
  MostrarDisplay();
  Apagarbotoes();
});
PermutacaoR.addEventListener("click", (event) => {
  ativado = 4;
  MostrarDisplayMenu();
  Apagarbotoes();
});
ArranjosR.addEventListener("click", (event) => {
  ativado = 5;
  MostrarDisplayMenu();
  MostrarDisplay();
  Apagarbotoes();
});
CombinacoesR.addEventListener("click", (event) => {
  ativado = 6;
  MostrarDisplayMenu();
  MostrarDisplay();
  Apagarbotoes();
});

ValorP.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    let P = document.getElementById("valorP").value;
    if (isNaN(P)) {
      alert("Insira um valor Numerico");
      alterarValorP.readOnly = false;
      document.getElementById("valorP").value = "";
    } else {
      alterarValorP.readOnly = true;
    }
  }
});

calcular.addEventListener("click", (event) => {
  let resultado = document.getElementById("resultado");
  if (ativado == 1) {
    resultado.innerHTML = "Resultado: " + PermutacaoSimples();
  } else if (ativado == 2) {
    resultado.innerHTML = "Resultado: " + ArranjosSimples();
  } else if (ativado == 3) {
    resultado.innerHTML = "Resultado: " + CombinacoesSimples();
  } else if (ativado == 4) {
    resultado.innerHTML = "Resultado: " + PermutacaoRepeticao();
  } else if (ativado == 5) {
    resultado.innerHTML = "Resultado: " + ArranjosRepeticao();
  } else if (ativado == 6) {
    resultado.innerHTML = "Resultado: " + CombinacoesRepeticao();
  }
});
