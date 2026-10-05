const form = document.getElementById("formJogo");

if (form) {
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const preco = document.getElementById("preco");
const tecnologia = document.getElementById("tecnologia");
const codigo = document.getElementById("codigo");

const imagem = document.getElementById("imagem");
const previewImagem = document.getElementById("previewImagem");



imagem.addEventListener("change", function () {

    const arquivo = this.files[0];

    if (!arquivo) {
        return;
    }

    if (!arquivo.type.startsWith("image/")) {

        alert("Selecione um arquivo de imagem válido.");

        imagem.value = "";

        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {

        previewImagem.src = evento.target.result;

    };

    leitor.readAsDataURL(arquivo);

});


form.addEventListener("submit", function (evento) {

    evento.preventDefault();



    if (
        nome.value.trim() === "" ||
        descricao.value.trim() === "" ||
        preco.value === "" ||
        tecnologia.value.trim() === "" ||
        codigo.value.trim() === ""
    ) {

        alert("Preencha todos os campos antes de enviar.");

        return;
    }


    if (Number(preco.value) < 0) {

        alert("O preço não pode ser negativo.");

        return;
    }



    const jogo = {

        nome: nome.value.trim(),

        descricao: descricao.value.trim(),

        preco: Number(preco.value),

        tecnologia: tecnologia.value.trim(),

        codigo: codigo.value.trim(),

        imagem: previewImagem.src,

        status: "Em avaliação"

    };


    let jogos = JSON.parse(
        localStorage.getItem("jogosPlaymash")
    ) || [];



    jogos.push(jogo);



    localStorage.setItem(
        "jogosPlaymash",
        JSON.stringify(jogos)
    );

    alert(
        "Jogo enviado para avaliação com sucesso!"
    );


    form.reset();


    previewImagem.src =
        "https://placehold.co/500x300/222/fff?text=Imagem+do+Jogo";

    window.location.href = "dev2.html";

});
}

const listaJogos = document.getElementById("listaJogos");

const semJogos = document.getElementById("semJogos");

const totalJogos = document.getElementById("totalJogos");
const emAvaliacao = document.getElementById("emAvaliacao");
const aprovados = document.getElementById("aprovados");
const recusados = document.getElementById("recusados");

const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");



if (listaJogos) {
function pegarJogos() {

    return JSON.parse(
        localStorage.getItem("jogosPlaymash")
    ) || [];

}



function mostrarJogos() {

    const jogos = pegarJogos();

    const textoPesquisa =
        pesquisa.value.toLowerCase().trim();

    const statusSelecionado =
        filtroStatus.value;


    const jogosFiltrados = jogos.filter(function (jogo) {

        const correspondeNome =
            jogo.nome
                .toLowerCase()
                .includes(textoPesquisa);


        const correspondeStatus =
            statusSelecionado === "todos" ||
            jogo.status === statusSelecionado;


        return correspondeNome && correspondeStatus;

    });


    listaJogos.innerHTML = "";



    if (jogosFiltrados.length === 0) {

        listaJogos.style.display = "none";

        semJogos.style.display = "block";

        atualizarEstatisticas(jogos);

        return;
    }


    listaJogos.style.display = "flex";

    semJogos.style.display = "none";



    jogosFiltrados.forEach(function (jogo) {

        const indiceOriginal =
            jogos.indexOf(jogo);


        const card =
            document.createElement("div");

        card.classList.add("jogo");



        const imagem =
            document.createElement("img");

        imagem.classList.add("jogo-imagem");

        imagem.src =
            jogo.imagem ||
            "https://placehold.co/500x300/222/fff?text=Sem+imagem";

        imagem.alt =
            jogo.nome;


        const info =
            document.createElement("div");

        info.classList.add("jogo-info");


        const titulo =
            document.createElement("h3");

        titulo.textContent =
            jogo.nome;


        const descricao =
            document.createElement("p");

        descricao.textContent =
            jogo.descricao;


        const detalhes =
            document.createElement("div");

        detalhes.classList.add("detalhes");


        const preco =
            document.createElement("span");

        preco.textContent =
            "💰 R$ " +
            Number(jogo.preco).toFixed(2).replace(".", ",");


        const tecnologia =
            document.createElement("span");

        tecnologia.textContent =
            "💻 " +
            jogo.tecnologia;


        detalhes.appendChild(preco);

        detalhes.appendChild(tecnologia);


        info.appendChild(titulo);

        info.appendChild(descricao);

        info.appendChild(detalhes);

        const statusContainer =
            document.createElement("div");

        statusContainer.classList.add("jogo-status");


        const status =
            document.createElement("span");

        status.classList.add("status");


        if (jogo.status === "Aprovado") {

            status.classList.add("aprovado");

        } else if (jogo.status === "Recusado") {

            status.classList.add("recusado");

        } else {

            status.classList.add("avaliacao");

        }


        status.textContent =
            jogo.status || "Em avaliação";


        statusContainer.appendChild(status);

        const acoes =
            document.createElement("div");

        acoes.classList.add("acoes-jogo");



        const editar =
            document.createElement("button");

        editar.classList.add(
            "btn",
            "btn-editar"
        );

        editar.innerHTML = "✏️";

        editar.title = "Editar jogo";


        editar.addEventListener(
            "click",
            function () {

                editarJogo(indiceOriginal);

            }
        );

        const excluir =
            document.createElement("button");

        excluir.classList.add(
            "btn",
            "btn-excluir"
        );

        excluir.innerHTML = "🗑️";

        excluir.title = "Excluir jogo";


        excluir.addEventListener(
            "click",
            function () {

                excluirJogo(indiceOriginal);

            }
        );


        acoes.appendChild(editar);

        acoes.appendChild(excluir);


        card.appendChild(imagem);

        card.appendChild(info);

        card.appendChild(statusContainer);

        card.appendChild(acoes);


        listaJogos.appendChild(card);

    });


    atualizarEstatisticas(jogos);

}

function atualizarEstatisticas(jogos) {

    totalJogos.textContent =
        jogos.length;


    const avaliacao =
        jogos.filter(function (jogo) {

            return jogo.status === "Em avaliação";

        }).length;


    const aprovadosTotal =
        jogos.filter(function (jogo) {

            return jogo.status === "Aprovado";

        }).length;


    const recusadosTotal =
        jogos.filter(function (jogo) {

            return jogo.status === "Recusado";

        }).length;


    emAvaliacao.textContent =
        avaliacao;


    aprovados.textContent =
        aprovadosTotal;


    recusados.textContent =
        recusadosTotal;

}


function excluirJogo(indice) {

    const jogos = pegarJogos();


    const confirmar =
        confirm(
            `Deseja realmente excluir "${jogos[indice].nome}"?`
        );


    if (!confirmar) {
        return;
    }


    jogos.splice(indice, 1);


    localStorage.setItem(
        "jogosPlaymash",
        JSON.stringify(jogos)
    );


    mostrarJogos();

}


function editarJogo(indice) {

    const jogos = pegarJogos();

    const jogo = jogos[indice];

    localStorage.setItem(
        "jogoEditando",
        indice
    );

    localStorage.setItem(
        "dadosEdicao",
        JSON.stringify(jogo)
    );


    window.location.href =
        "dev.html";

}


pesquisa.addEventListener(
    "input",
    mostrarJogos
);


filtroStatus.addEventListener(
    "change",
    mostrarJogos
);

mostrarJogos();
}