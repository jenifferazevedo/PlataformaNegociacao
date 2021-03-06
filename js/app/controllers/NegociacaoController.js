class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._ordemAtual = '';
    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvaziar','ordena', 'inverteOrdem');
    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
  }
  adicionar(event) {  
    event.preventDefault();
    try {
      this._listaNegociacoes.adiciona(this._criaNegociacao());
      this._mensagem.texto = 'Negociação adicionada com sucesso';
      this._limpaFormulario();
    } catch(erro) {
      this._mensagem.texto = erro;
    }
  }
  importarNegociacoes() {
    let service = new NegociacaoService();
    service.obterNegociacoes()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso!';
        console.log(negociacoes);
      })
      .catch(error => this._mensagem.texto = error);
  }
  apagar() {
    this._listaNegociacoes.esvaziar();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }
  ordenar(coluna) {
    if(this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
        this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }
  _criaNegociacao() {
    return new Negociacao(
      DateConverter.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value,
      );
    }
    _limpaFormulario() {
      this._inputData.value = '';
      this._inputQuantidade.value = 1;
      this._inputValor.value = 0.0;
      this._inputData.focus();
    }
  }