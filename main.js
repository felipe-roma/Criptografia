const input = document.querySelector('#input')
const output = document.querySelector('#output')
var arrayTabelaAscii = []
var arrayTabelaCripto = []
var arrayTextoDecimal = []
var arrayTexto = []
var arrayChave = []
var arrayChaveDecimal = []
var arrayTextoSomado = []

// Upload e leitura do arquivo .txt
input.addEventListener('change', function () {
  // Após sofrer alteração
  const arquivo = this.files[0]
  const leitor = new FileReader()
  leitor.addEventListener('load', function () {
    // Depois de carregar
    output.value = leitor.result // Exibir conteúdo do arquivo txt
    texto = output.value
  })
  if (arquivo) {
    // Verifica se tem algum arquivo selecionado
    leitor.readAsText(arquivo) // ler como texto o conteúdo do arquivo
  }
})

function caracteresArrayTabelaAscii() {
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i <= 255; i++) {
      arrayTabelaAscii.push(String.fromCharCode(i))
      if (i >= 32 && i <= 126) {
        arrayTabelaCripto.push(String.fromCharCode(i))
      } else if (i >= 161 && i <= 172) {
        arrayTabelaCripto.push(String.fromCharCode(i))
      } else if (i >= 174 && i <= 255) {
        arrayTabelaCripto.push(String.fromCharCode(i))
      }
    }
  }
  // console.log(arrayTabelaAscii)
  // console.log(arrayTabelaCripto)
}

function inserirLetraArrayTexto() {
  let letra
  for (let i = 0; i < texto.length; i++) {
    letra = texto.substring(i, i + 1)
    arrayTexto.push(letra)
    arrayTextoDecimal.push(letra)
  }
  // console.log('ArrayTexto: ' + arrayTexto)
}

function converterTextoParaDecimal() {
  for (let i = 0; i < arrayTexto.length; i++) {
    for (let j = 2; j <= 188; j++) {
      if (arrayTextoDecimal[i] == " ") {
        arrayTextoDecimal[i] = 0
      } else if (arrayTextoDecimal[i] == "!") {
        arrayTextoDecimal[i] = 1
      } else if (arrayTextoDecimal[i] == arrayTabelaCripto[j]) {
        arrayTextoDecimal[i] = j
      }
    }
  }
  // console.log('ArrayTextoDecimal: ' + arrayTextoDecimal)
}

function inserirLetraArrayChave() {
  const chaveInput = document.querySelector('#chaveInput')
  const chave = chaveInput.value
  let letra
  for (let i = 0; i < chave.length; i++) {
    letra = chave.substring(i, i + 1)
    arrayChave.push(letra)
    arrayChaveDecimal.push(letra)
  }
  // console.log('ArrayChave: ' + arrayChave)
}


function converterChaveParaDecimal() {
  for (let i = 0; i < arrayChave.length; i++) {
    for (let j = 0; j <= 188; j++) {
      if (arrayChaveDecimal[i] == arrayTabelaCripto[j]) {
        arrayChaveDecimal[i] = j
      }
    }
  }
  // console.log('ArrayChaveDecimal: ' + arrayChaveDecimal)
}

function igualarArrayChaveComTamanhoTexo() {
  let tamanhoChave = arrayChave.length
  let tamanhoTexto = arrayTexto.length
  if (tamanhoTexto > tamanhoChave) {
    for (let i = 0; i < tamanhoTexto; i++) {
      arrayChaveDecimal.push(arrayChaveDecimal[i])
    }
    let a = arrayChaveDecimal.length - tamanhoChave
    let b = arrayChaveDecimal.length
    arrayChaveDecimal.splice(a, b)
  } else if (tamanhoTexto < tamanhoChave) {
    let a = tamanhoTexto
    let b = arrayChaveDecimal.length
    arrayChaveDecimal.splice(a, b)
  }
  // console.log('ArrayChaveDecimal: ' + arrayChaveDecimal)
}

function somarTextoChave() {
  for (let i = 0; i < arrayTexto.length; i++) {
    arrayTextoSomado[i] = arrayTextoDecimal[i] + arrayChaveDecimal[i]
  }
  // console.log('ArrayTextoSomado: ' + arrayTextoSomado)
}

function subtrairTextoChave() {
  for (let i = 0; i < arrayTexto.length; i++) {    
      arrayTextoSomado[i] = arrayTextoDecimal[i] - arrayChaveDecimal[i]
      if (arrayTextoSomado[i] < 0) {
        arrayTextoSomado[i] = arrayTextoSomado[i] + 189
      }
  }
  // console.log('ArrayTextoSubtraído: ' + arrayTextoSomado)
}

function converterDecimalParaASCII() {
  let textoAlterado = ''
  for (let i = 0; i < arrayTexto.length; i++) {
    for (let j = 0; j < arrayTabelaCripto.length; j++) {
      if (arrayTextoSomado[i] == j) {
        textoAlterado = textoAlterado + arrayTabelaCripto[j]
      }
    }
  }
  // console.log('TextoAlterado: ' + textoAlterado)
  return textoAlterado
}

function criptografar() {
  caracteresArrayTabelaAscii()
  inserirLetraArrayTexto()
  converterTextoParaDecimal()
  inserirLetraArrayChave()
  converterChaveParaDecimal()
  igualarArrayChaveComTamanhoTexo()
  somarTextoChave()
  let criptografia = converterDecimalParaASCII()
  gerarTxt(criptografia)
  reiniciar()
}

function descriptografar() {
  caracteresArrayTabelaAscii()
  inserirLetraArrayTexto()
  converterTextoParaDecimal()
  inserirLetraArrayChave()
  converterChaveParaDecimal()
  igualarArrayChaveComTamanhoTexo()
  subtrairTextoChave()
  let descriptografia = converterDecimalParaASCII()
  gerarTxt(descriptografia)
  reiniciar()
}

// Gerar arquivo .txt
function gerarTxt(textoAlterado) {
  let data = textoAlterado
  let blob = new Blob([data], { type: 'text/plain;charset=utf-8;' })
  const link = window.document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'arquivo_modificado.txt'
  link.click()
  window.URL.revokeObjectURL(link.href)
}

function reiniciar() {
  arrayTabelaAscii = []
  arrayTabelaCripto = []
  arrayTextoDecimal = []
  arrayTexto = []
  arrayChave = []
  arrayChaveDecimal = []
  arrayTextoSomado = []
}
