document.addEventListener('DOMContentLoaded', () => {
    let metodoSelecionado = null;
  
    const btnPix = document.getElementById('btn-pix');
    const btnCartao = document.getElementById('btn-cartao');
    const btnBoleto = document.getElementById('btn-boleto');
    const formInicial = document.getElementById('form-inicial');
    const inputCpf = document.getElementById('cpf');
  
    if (btnPix && btnCartao && formInicial) {
      btnPix.addEventListener('click', () => {
        metodoSelecionado = 'pix';
        btnPix.classList.add('active');
        btnCartao.classList.remove('active');
        if (btnBoleto) btnBoleto.classList.remove('active');
      });
  
      btnCartao.addEventListener('click', () => {
        metodoSelecionado = 'cartao';
        btnCartao.classList.add('active');
        btnPix.classList.remove('active');
        if (btnBoleto) btnBoleto.classList.remove('active');
      });
  
      formInicial.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!metodoSelecionado) {
          alert('Por favor, selecione um método de pagamento (PIX ou Cartão).');
          return;
        }
  
        if (metodoSelecionado === 'pix') {
          window.location.href = 'pagamentopix.html';
        } else if (metodoSelecionado === 'cartao') {
          window.location.href = 'pagamentocartao.html';
        }
      });
  
      if (inputCpf) {
        inputCpf.addEventListener('input', (e) => {
          let v = e.target.value.replace(/\D/g, '');
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
          e.target.value = v;
        });
      }
    }
  
    const btnCopiarPix = document.getElementById('btn-copiar-pix');
    const btnFinalizarPix = document.getElementById('btn-finalizar-pix');
  
    if (btnCopiarPix) {
      btnCopiarPix.addEventListener('click', () => {
        const codigo = "00020126360014BR.PlaymashX011..";
        navigator.clipboard.writeText(codigo);
        alert("Código PIX copiado para a área de transferência!");
      });
    }
  
    if (btnFinalizarPix) {
      btnFinalizarPix.addEventListener('click', () => {
        alert('Pagamento PIX realizado com sucesso!');
      });
    }
  
    const selectParcelas = document.getElementById('select-parcelas');
    const formCartao = document.getElementById('form-cartao');
    const valorTotal = 750.00;
  
    if (selectParcelas && formCartao) {
      for (let i = 1; i <= 12; i++) {
        const valorParcela = (valorTotal / i).toFixed(2).replace('.', ',');
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}x de R$ ${valorParcela}`;
        selectParcelas.appendChild(option);
      }
  
      formCartao.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Compra no cartão de crédito realizada com sucesso!');
      });
    }
  });