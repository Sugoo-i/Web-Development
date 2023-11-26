const dados = document.getElementById("valor");
const listaDeDadosLi = document.getElementById("lista");
const resetarLista = document.getElementById("resetar");
const remover = document.getElementById("remover");
const removerItemEs = document.getElementById("itemEspecifico");
const calcular = document.getElementById("calcular");
const resetarcalcular = document.getElementsByClassName("reset");
var contadorItens = 0;
let ListaDeDadosAmostrais = [];
const quantidadeDados = document.getElementById("quantidadeDados");
const tbody = document.getElementById("tbody");
const dadosAdicionados = document.getElementById("dadosAdicionados");

function atualizarContador() {
  quantidadeDados.innerHTML = contadorItens + " Dados";
}

function adicionarValor() {
  var novoValor = document.getElementById("valor").value;
  if (VerificarNamber(novoValor) === true) {
    document.getElementById("valor").value = "";
  } else {
    if (novoValor.trim() !== "") {
      var novoItem = document.createElement("li");
      novoItem.textContent = novoValor;
      listaDeDadosLi.appendChild(novoItem);
      var novoItemID = "item_" + contadorItens;
      novoItem.id = novoItemID;
      contadorItens++;
      document.getElementById("valor").value = "";
      ListaDeDadosAmostrais.push(novoValor);
    }
  }
}

function resetar() {
  ListaDeDadosAmostrais = [];
  document.getElementById("content").style.display = "none";
  listaDeDadosLi.innerHTML = "";
  contadorItens = 0;
  quantidadeDados.innerHTML = "";
  tbody.innerHTML = "";
  tbody.innerHTML = "";
  limparGrafico();
}

function removerItemLista() {
  document.getElementById("content").style.display = "none";
  ListaDeDadosAmostrais.splice(ListaDeDadosAmostrais.length - 1, 1);
  listaDeDadosLi.removeChild(listaDeDadosLi.lastElementChild);
  contadorItens--;
  atualizarContador();
  tbody.innerHTML = "";
  limparGrafico();
}

function removerItemEspecifico() {
  document.getElementById("content").style.display = "none";
  let verifica = document.getElementById("itemEspecifico").value;
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
  } else if (isNaN(verifica) == false) {
    contadorItens--;
  }

  atualizarContador();
  limparGrafico();
  tbody.innerHTML = "";
}

function calcularMedia() {
  let valTotal = 0;
  for (let i = 0; i < ListaDeDadosAmostrais.length; i++) {
    valTotal += parseFloat(ListaDeDadosAmostrais[i]);
  }
  let media = valTotal / ListaDeDadosAmostrais.length;
  return media.toFixed(2);
}

function calcularMediana() {
  for (var i = 0; i < ListaDeDadosAmostrais.length - 1; i++) {
    for (var j = 0; j < ListaDeDadosAmostrais.length - 1 - i; j++) {
      if (ListaDeDadosAmostrais[j] > ListaDeDadosAmostrais[j + 1]) {
        var temp = ListaDeDadosAmostrais[j];
        ListaDeDadosAmostrais[j] = ListaDeDadosAmostrais[j + 1];
        ListaDeDadosAmostrais[j + 1] = temp;
      }
    }
  }
  const tamanho = ListaDeDadosAmostrais.length;
  if (tamanho % 2 === 0) {
    const centro1 = tamanho / 2 - 1;
    const centro2 = tamanho / 2;
    return (
      (parseFloat(ListaDeDadosAmostrais[centro1]) +
        parseFloat(ListaDeDadosAmostrais[centro2])) /
      2
    );
  } else {
    const centro = Math.floor(tamanho / 2);
    return parseFloat(ListaDeDadosAmostrais[centro]);
  }
}

function calcularmoda() {
  let contar = [];
  let Modais = [];
  let temp = 0;

  parseFloat(
    ListaDeDadosAmostrais.forEach((cont) => {
      contar[cont] = (contar[cont] || 0) + 1;
    })
  );
  for (let i = 0; i < contar.length; i++) {
    if (temp < contar[i]) {
      temp = contar[i];
      var index = contar.indexOf(temp);
    }
  }
  while (index != -1) {
    Modais.push(index);
    index = contar.indexOf(temp, index + 1);
  }
  if (Modais.length > 4) {
    return "Multimodal";
  } else return Modais;
}

function calcularvariancia() {
  let media = calcularMedia();
  let soma = 0;
  for (let i = 0; i < ListaDeDadosAmostrais.length; i++) {
    soma += Math.pow(ListaDeDadosAmostrais[i] - media, 2);
  }
  return (soma / contadorItens).toFixed(2);
}

function calculardesvioPadrao() {
  return Math.sqrt(calcularvariancia()).toFixed(2);
}
function calcularcoeficienteDeVariacao() {
  return ((calculardesvioPadrao() / calcularMedia()) * 100).toFixed(2);
}
function PermutacaoSimples() {
  let permutacao = ListaDeDadosAmostrais.length;
  return fatorial(permutacao);
}
function ArranjosSimples() {
  let p = 2;
  let arranjos =
    fatorial(ListaDeDadosAmostrais.length) /
    fatorial(ListaDeDadosAmostrais.length - p);
  return arranjos;
}
function CombinacoesSimples() {
  let p = 2;
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
  let p = 2;
  let n = ListaDeDadosAmostrais.length;
  let arranjoRepeticao = Math.pow(n, p);
  return arranjoRepeticao;
}

function CombinacoesRepeticao() {
  let p = 2;
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

function listaTabela() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  if (ListaDeDadosAmostrais.length > 0) {
    let coluna = tbody.insertRow();
    let linha_media = coluna.insertCell();
    let linha_mediana = coluna.insertCell();
    let linha_calcModa = coluna.insertCell();
    let linha_Variancia = coluna.insertCell();
    let linha_DesvioPadrao = coluna.insertCell();
    let linha_CoeficienteDeVariacao = coluna.insertCell();

    linha_media.innerText = calcularMedia();
    linha_mediana.innerText = calcularMediana();
    linha_calcModa.innerText = calcularmoda();
    linha_Variancia.innerHTML = calcularvariancia();
    linha_DesvioPadrao.innerHTML = calculardesvioPadrao();
    linha_CoeficienteDeVariacao.innerHTML =
      calcularcoeficienteDeVariacao() + " %";
  }
}

function VerificarNamber(verificador) {
  if (isNaN(verificador)) {
    alert("Insira um valor Numerico");
    return true;
  } else {
    return false;
  }
}

dados.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    adicionarValor();
    atualizarContador();
    dadosAdicionados.style.display = "block";
    limparGrafico();
  }
});

resetarLista.addEventListener("click", (event) => {
  dadosAdicionados.style.display = "none";
  resetar();
  ativado = true;
});

remover.addEventListener("click", (event) => {
  removerItemLista();
});

removerItemEs.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    removerItemEspecifico();
  }
});
calcular.addEventListener("click", (event) => {
  document.getElementById("content").style.display = "block";
  listaTabela();
  criarHistograma();
});

//-----------------------------------------histograma---------------------------------------------------------
function mostrarCategoriaHistograma() {
  let contar = {};
  ListaDeDadosAmostrais.forEach((cont) => {
    contar[cont] = (contar[cont] || 0) + 1;
  });
  console.log(contar);
  return contar;
}

function pegarPosicao() {
  let array = mostrarCategoriaHistograma();
  let array2 = [];
  for (let i = 0; i < array.length; i++) {
    array2.push(i);
  }
  console.log(array2);
  return array2;
}

let myChart;

function criarHistograma() {
  var ctx = document.getElementById("histograma").getContext("2d");
  var array = mostrarCategoriaHistograma();
  var arrayPosicoes = pegarPosicao();
  var data = {
    labels: arrayPosicoes,
    datasets: [
      {
        label: "Frequencia",
        backgroundColor: "rgba(6,173,145,1.000)",
        borderColor: "rgba(2,121,101,1.000)",
        borderWidth: 1,
        data: array,
      },
    ],
  };

  var options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });
}
function limparGrafico() {
  if (myChart) {
    myChart.destroy();
  }
}
