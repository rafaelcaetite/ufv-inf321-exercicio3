# Exercício 3 - JavaScript (INF 321)

Atividade prática de JavaScript da disciplina **INF 321 - Projeto e Desenvolvimento de Sistemas para a Web** (Universidade Federal de Viçosa - UFV).

- **Aluno:** Rafael Caetité
- **Professor:** Lucas Vegi

---

## Links

- **Repositório no GitHub:** https://github.com/rafaelcaetite/ufv-inf321-exercicio3
- **Visualização (GitHub Pages):** https://rafaelcaetite.github.io/ufv-inf321-exercicio3/

---

## Arquivos do Projeto

- `index.html`: Página principal integrando as seções da disciplina e da loja de produtos, com todas as funcionalidades de JavaScript.
- `produtos.html`: Página dedicada com catálogo de produtos, busca, carrinho com modal e demonstração de classList.
- `disciplina.html`: Página dedicada com horários e formulário de contato com validação.
- `style.css`: Folha de estilos da aplicação e dos componentes interativos.
- `app.js`: Script responsável pelas interações de busca, carrinho, modal e validação do formulário.
- `img/`: Imagens utilizadas nos produtos e na página.

---

## Funcionalidades Implementadas

1. **Carrinho de compras com modal:**
   - Adiciona produtos ao carrinho ao clicar em "Comprar".
   - Exibe mensagem de confirmação e atualiza o contador no cabeçalho.
   - Abre modal para visualizar os itens adicionados, alterar quantidades, ver o valor total e finalizar compra.

2. **Busca e filtragem de produtos:**
   - Campo de pesquisa que filtra os cards em tempo real por nome e descrição.
   - Botão para limpar a busca e mensagem caso nenhum produto seja encontrado.

3. **Validação do formulário de contato:**
   - Valida o preenchimento obrigatório dos campos Nome, E-mail e Mensagem.
   - Exibe mensagens de erro abaixo dos campos caso estejam vazios ou com e-mail inválido.
   - Mensagem de sucesso após envio correto.

4. **Manipulação com classList:**
   - Botões de exemplo demonstrando o funcionamento de `classList.add()`, `classList.remove()` e `classList.toggle()`.
