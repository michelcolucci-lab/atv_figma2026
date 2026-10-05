const produtos = [...document.querySelectorAll(".produto")];

const brandFiltersContainer =
    document.getElementById("brandFilters");

const sortOrder =
    document.getElementById("sortOrder");

const btnLimpar =
    document.getElementById("btnLimpar");

const countProdutos =
    document.getElementById("countProdutos");

const noResults =
    document.getElementById("noResults");

const cartIcon =
    document.getElementById("cartIcon");

const cartWrap =
    document.querySelector(".cart-wrap");

const cartBadge =
    document.getElementById("cartBadge");

const inputBusca =
    document.getElementById("inputBusca");

const listaPesquisa =
    document.getElementById("listaPesquisa");


let temItemNoCarrinho = false;

let termoPesquisa = "";

function atualizarCarrinho() {

    cartWrap.classList.toggle(
        "has-item",
        temItemNoCarrinho
    );


    if (temItemNoCarrinho) {

        cartIcon.src =
            "carrinho2-removebg.png";

        cartBadge.textContent = "!";

        cartBadge.style.opacity = "1";

    } else {

        cartIcon.src =
            "carrinho.png";

        cartBadge.textContent = "";

        cartBadge.style.opacity = "0";

    }

}


document
    .querySelectorAll(".add-cart")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                temItemNoCarrinho = true;

                atualizarCarrinho();


                button.textContent =
                    "Adicionado";

                button.disabled = true;


                setTimeout(() => {

                    button.textContent =
                        "Adicionar ao carrinho";

                    button.disabled = false;

                }, 1000);

            }
        );

    });

const marcasUnicas = [
    ...new Set(
        produtos.map(
            (produto) =>
                produto.dataset.brand
        )
    )
].sort();


marcasUnicas.forEach((marca) => {

    const label =
        document.createElement("label");

    label.className =
        "check-item";


    const input =
        document.createElement("input");

    input.type = "checkbox";

    input.value = marca;

    input.dataset.filter = "brand";


    const span =
        document.createElement("span");

    span.textContent = marca;


    label.appendChild(input);

    label.appendChild(span);

    brandFiltersContainer.appendChild(label);

});

function getSelectedValues(filterName) {

    return [
        ...document.querySelectorAll(
            `input[data-filter="${filterName}"]:checked`
        )
    ].map(
        (input) => input.value
    );

}

function rangeMatches(
    price,
    rangeValue
) {

    switch (rangeValue) {

        case "0-100":

            return price <= 100;


        case "101-250":

            return (
                price > 100 &&
                price <= 250
            );


        case "251-400":

            return (
                price > 250 &&
                price <= 400
            );


        case "401-9999":

            return price > 400;


        default:

            return true;

    }

}

function produtoCombinaComPesquisa(
    produto
) {

    if (!termoPesquisa) {

        return true;

    }


    const nome =
        produto.dataset.name.toLowerCase();


    return nome.includes(
        termoPesquisa
    );

}

function aplicarFiltros() {

    const categoriaSelecionada =
        getSelectedValues("category");


    const faixaSelecionada =
        getSelectedValues("price");


    const marcasSelecionadas =
        getSelectedValues("brand");


    const ordem =
        sortOrder.value;


    let produtosFiltrados =
        produtos.filter((produto) => {


            const categoriaOk =
                categoriaSelecionada.length === 0 ||
                categoriaSelecionada.includes(
                    produto.dataset.category
                );


            const precoOk =
                faixaSelecionada.length === 0 ||
                faixaSelecionada.some(
                    (faixa) =>
                        rangeMatches(
                            Number(
                                produto.dataset.price
                            ),
                            faixa
                        )
                );


            const marcaOk =
                marcasSelecionadas.length === 0 ||
                marcasSelecionadas.includes(
                    produto.dataset.brand
                );


            const pesquisaOk =
                produtoCombinaComPesquisa(
                    produto
                );


            return (
                categoriaOk &&
                precoOk &&
                marcaOk &&
                pesquisaOk
            );

        });
    if (ordem === "menor-preco") {

        produtosFiltrados.sort(
            (a, b) =>
                Number(a.dataset.price) -
                Number(b.dataset.price)
        );

    }


    else if (ordem === "maior-preco") {

        produtosFiltrados.sort(
            (a, b) =>
                Number(b.dataset.price) -
                Number(a.dataset.price)
        );

    }


    else if (ordem === "nome") {

        produtosFiltrados.sort(
            (a, b) =>
                a.dataset.name.localeCompare(
                    b.dataset.name
                )
        );

    }

    produtos.forEach((produto) => {

        produto.classList.toggle(
            "hidden",
            !produtosFiltrados.includes(
                produto
            )
        );

    });


    countProdutos.textContent =
        produtosFiltrados.length;



    noResults.classList.toggle(
        "hidden",
        produtosFiltrados.length > 0
    );

    atualizarSugestoes();

}

function atualizarSugestoes() {

    const termo =
        inputBusca.value
            .trim()
            .toLowerCase();


    listaPesquisa.innerHTML = "";


    if (!termo) {

        listaPesquisa.classList.remove(
            "ativo"
        );

        return;

    }


    const encontrados =
        produtos.filter(
            (produto) =>
                produto.dataset.name
                    .toLowerCase()
                    .includes(termo)
        );

    encontrados.forEach((produto) => {

        const li =
            document.createElement("li");


        const button =
            document.createElement("button");


        button.type = "button";


        button.textContent =
            produto.dataset.name;


        button.addEventListener(
            "click",
            () => {

                inputBusca.value =
                    produto.dataset.name;


                termoPesquisa =
                    produto.dataset.name
                        .toLowerCase();


                aplicarFiltros();


                listaPesquisa.classList.remove(
                    "ativo"
                );

            }
        );


        li.appendChild(button);


        listaPesquisa.appendChild(li);

    });



    listaPesquisa.classList.toggle(
        "ativo",
        encontrados.length > 0
    );

}


function filtrar() {

    termoPesquisa =
        inputBusca.value
            .trim()
            .toLowerCase();


    aplicarFiltros();

}

document
    .querySelectorAll(
        "input[type='checkbox']"
    )
    .forEach((checkbox) => {

        checkbox.addEventListener(
            "change",
            aplicarFiltros
        );

    });


sortOrder.addEventListener(
    "change",
    aplicarFiltros
);


btnLimpar.addEventListener(
    "click",
    () => {

        document
            .querySelectorAll(
                "input[type='checkbox']"
            )
            .forEach((input) => {

                input.checked = false;

            });


        sortOrder.value =
            "relevancia";


        inputBusca.value =
            "";


        termoPesquisa =
            "";


        aplicarFiltros();


        listaPesquisa.classList.remove(
            "ativo"
        );

    }
);


document.addEventListener(
    "click",
    (event) => {

        if (
            !event.target.closest(
                ".buscar"
            )
        ) {

            listaPesquisa.classList.remove(
                "ativo"
            );

        }

    }
);

aplicarFiltros();