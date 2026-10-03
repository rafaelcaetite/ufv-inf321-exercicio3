// Exercício 3 - JavaScript (INF 321)
// Aluno: Rafael Caetité

document.addEventListener("DOMContentLoaded", () => {
    // Carrinho de compras
    let carrinho = [];

    const modal = document.querySelector("#modal-carrinho");
    const alerta = document.querySelector("#alerta-carrinho");
    const contador = document.querySelector("#contador-carrinho");
    const listaItens = document.querySelector("#itens-carrinho");
    const totalElemento = document.querySelector("#total-carrinho");
    const carrinhoVazio = document.querySelector("#carrinho-vazio");

    function atualizarCarrinho() {
        if (!contador || !listaItens) return;

        // Atualiza contador de itens
        const totalQtd = carrinho.reduce((total, item) => total + item.qtd, 0);
        contador.textContent = `(${totalQtd})`;

        // Renderiza itens no modal
        listaItens.innerHTML = "";

        if (carrinho.length === 0) {
            if (carrinhoVazio) carrinhoVazio.classList.remove("hidden");
            if (totalElemento) totalElemento.textContent = "R$ 0,00";
            return;
        }

        if (carrinhoVazio) carrinhoVazio.classList.add("hidden");
        let totalValor = 0;

        carrinho.forEach(item => {
            const subtotal = item.preco * item.qtd;
            totalValor += subtotal;

            const div = document.createElement("div");
            div.className = "item-carrinho";
            div.innerHTML = `
                <div class="item-carrinho-detalhes">
                    <img src="${item.imagem}" alt="${item.nome}" class="item-carrinho-img">
                    <div>
                        <p class="item-carrinho-nome">${item.nome}</p>
                        <p class="item-carrinho-unitario">R$ ${item.preco.toFixed(2)} un.</p>
                    </div>
                </div>
                <div class="item-carrinho-acoes">
                    <div class="controles-quantidade">
                        <button type="button" class="btn-qtd btn-menos" data-id="${item.id}">-</button>
                        <span class="qtd-valor">${item.qtd}</span>
                        <button type="button" class="btn-qtd btn-mais" data-id="${item.id}">+</button>
                    </div>
                    <span class="item-carrinho-subtotal">R$ ${subtotal.toFixed(2)}</span>
                    <button type="button" class="btn-remover-item" data-id="${item.id}">&times;</button>
                </div>
            `;

            div.querySelector(".btn-menos").addEventListener("click", () => alterarQtd(item.id, -1));
            div.querySelector(".btn-mais").addEventListener("click", () => alterarQtd(item.id, 1));
            div.querySelector(".btn-remover-item").addEventListener("click", () => removerItem(item.id));

            listaItens.append(div);
        });

        if (totalElemento) {
            totalElemento.textContent = `R$ ${totalValor.toFixed(2)}`;
        }
    }

    function alterarQtd(id, delta) {
        const item = carrinho.find(i => i.id == id);
        if (!item) return;
        item.qtd += delta;
        if (item.qtd <= 0) {
            carrinho = carrinho.filter(i => i.id != id);
        }
        atualizarCarrinho();
    }

    function removerItem(id) {
        carrinho = carrinho.filter(i => i.id != id);
        atualizarCarrinho();
    }

    // Botões Comprar dos cards de produtos
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        const btn = card.querySelector(".btn-comprar");
        if (!btn) return;

        btn.addEventListener("click", () => {
            const id = card.dataset.id || (index + 1);
            const nome = card.querySelector("h3") ? card.querySelector("h3").textContent : "Produto";
            const precoTexto = card.querySelector(".preco") ? card.querySelector(".preco").textContent.replace(/[^0-9,.]/g, "").replace(".", "").replace(",", ".") : "0";
            const preco = parseFloat(precoTexto) || 0;
            const imagem = card.querySelector(".card-img") ? card.querySelector(".card-img").getAttribute("src") : "img/notebook.jpg";

            const item = carrinho.find(i => i.id == id);
            if (item) {
                item.qtd++;
            } else {
                carrinho.push({ id, nome, preco, imagem, qtd: 1 });
            }

            atualizarCarrinho();

            // Exibe notificação e abre modal
            if (alerta) {
                const msg = alerta.querySelector("#alerta-mensagem");
                if (msg) msg.textContent = `Produto "${nome}" adicionado ao carrinho!`;
                alerta.classList.remove("hidden");
            }
            if (modal) modal.classList.remove("hidden");
        });
    });

    // Abrir e fechar modal do carrinho
    const btnAbrir = document.querySelector("#btn-abrir-carrinho");
    const btnFechar = document.querySelector("#btn-fechar-modal");
    const btnContinuar = document.querySelector("#btn-continuar-comprando");
    const btnLimpar = document.querySelector("#btn-limpar-carrinho");
    const btnFinalizar = document.querySelector("#btn-finalizar-compra");
    const btnFecharAlerta = document.querySelector("#btn-fechar-alerta");

    if (btnAbrir && modal) btnAbrir.addEventListener("click", () => modal.classList.remove("hidden"));
    if (btnFechar && modal) btnFechar.addEventListener("click", () => modal.classList.add("hidden"));
    if (btnContinuar && modal) btnContinuar.addEventListener("click", () => modal.classList.add("hidden"));
    if (btnFecharAlerta && alerta) btnFecharAlerta.addEventListener("click", () => alerta.classList.add("hidden"));

    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            carrinho = [];
            atualizarCarrinho();
        });
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            if (carrinho.length === 0) {
                alert("O carrinho está vazio!");
                return;
            }
            alert("Compra finalizada com sucesso!");
            carrinho = [];
            atualizarCarrinho();
            if (modal) modal.classList.add("hidden");
        });
    }

    // Fechar modal ao clicar fora da caixa
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.add("hidden");
        });
    }

    // Busca e filtragem de produtos
    const campoBusca = document.querySelector("#campo-busca");
    const btnBuscar = document.querySelector("#btn-buscar");
    const btnLimparBusca = document.querySelector("#btn-limpar-busca");
    const semResultados = document.querySelector("#busca-sem-resultados");

    function filtrar() {
        if (!campoBusca) return;
        const texto = campoBusca.value.toLowerCase().trim();

        if (btnLimparBusca) {
            if (texto !== "") {
                btnLimparBusca.classList.remove("hidden");
            } else {
                btnLimparBusca.classList.add("hidden");
            }
        }

        let encontrou = false;
        cards.forEach(card => {
            const nome = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
            const desc = card.querySelector(".descricao") ? card.querySelector(".descricao").textContent.toLowerCase() : "";

            if (texto === "" || nome.includes(texto) || desc.includes(texto)) {
                card.classList.remove("hidden");
                encontrou = true;
            } else {
                card.classList.add("hidden");
            }
        });

        if (semResultados) {
            if (!encontrou) {
                semResultados.classList.remove("hidden");
            } else {
                semResultados.classList.add("hidden");
            }
        }
    }

    if (btnBuscar) btnBuscar.addEventListener("click", filtrar);
    if (campoBusca) campoBusca.addEventListener("keyup", filtrar);
    if (btnLimparBusca) {
        btnLimparBusca.addEventListener("click", () => {
            campoBusca.value = "";
            filtrar();
        });
    }

    // Validação do formulário de contato
    const form = document.querySelector("#form-contato");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = form.querySelector("#nome");
            const email = form.querySelector("#email");
            const mensagem = form.querySelector("#mensagem");

            const erroNome = form.querySelector("#erro-nome");
            const erroEmail = form.querySelector("#erro-email");
            const erroMensagem = form.querySelector("#erro-mensagem");
            const sucesso = form.querySelector("#sucesso-contato");

            let temErro = false;

            // Validação de nome
            if (nome && nome.value.trim() === "") {
                nome.classList.add("campo-invalido");
                if (erroNome) erroNome.classList.add("visivel");
                temErro = true;
            } else if (nome) {
                nome.classList.remove("campo-invalido");
                if (erroNome) erroNome.classList.remove("visivel");
            }

            // Validação de email
            if (email && (email.value.trim() === "" || !email.value.includes("@"))) {
                email.classList.add("campo-invalido");
                if (erroEmail) erroEmail.classList.add("visivel");
                temErro = true;
            } else if (email) {
                email.classList.remove("campo-invalido");
                if (erroEmail) erroEmail.classList.remove("visivel");
            }

            // Validação de mensagem
            if (mensagem && mensagem.value.trim() === "") {
                mensagem.classList.add("campo-invalido");
                if (erroMensagem) erroMensagem.classList.add("visivel");
                temErro = true;
            } else if (mensagem) {
                mensagem.classList.remove("campo-invalido");
                if (erroMensagem) erroMensagem.classList.remove("visivel");
            }

            if (!temErro) {
                if (sucesso) {
                    sucesso.classList.remove("hidden");
                    setTimeout(() => sucesso.classList.add("hidden"), 4000);
                }
                form.reset();
            }
        });
    }

    // Demonstração classList
    const btnAdd = document.querySelector("#btn-demo-add");
    const btnRemove = document.querySelector("#btn-demo-remove");
    const btnToggle = document.querySelector("#btn-demo-toggle");

    const statusAdd = document.querySelector("#status-demo-add");
    const statusRemove = document.querySelector("#status-demo-remove");
    const statusToggle = document.querySelector("#status-demo-toggle");

    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            btnAdd.classList.add("ativo");
            if (statusAdd) statusAdd.textContent = "Estado: ativo";
        });
    }

    if (btnRemove) {
        btnRemove.addEventListener("click", () => {
            btnRemove.classList.remove("ativo");
            if (statusRemove) statusRemove.textContent = "Estado: padrão";
        });
    }

    if (btnToggle) {
        btnToggle.addEventListener("click", () => {
            const ativo = btnToggle.classList.toggle("ativo");
            if (statusToggle) statusToggle.textContent = ativo ? "Estado: ativo" : "Estado: padrão";
        });
    }
});
