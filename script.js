let totalSimulacoes = Number(localStorage.getItem("totalSimulacoes")) || 0;
let melhorNivel = localStorage.getItem("melhorNivel") || "Nenhum";
let ultimoNivel = localStorage.getItem("ultimoNivel") || "Nenhum";

window.onload = function () {
    atualizarEstatisticas();

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("dark-mode");
        document.getElementById("botaoTema").textContent = "☀️ Modo Claro";
    }

    let tamanhoFonte = Number(localStorage.getItem("tamanhoFonte")) || 16;
    document.body.style.fontSize = tamanhoFonte + "px";

    document.getElementById("anoAtual").textContent =
        "Projeto atualizado em " + new Date().getFullYear();
};

function atualizarEstatisticas() {
    document.getElementById("totalSimulacoes").textContent = totalSimulacoes;
    document.getElementById("melhorNivel").textContent = melhorNivel;
    document.getElementById("ultimoNivel").textContent = ultimoNivel;
}

function calcular() {

    const irrigacao = Number(document.getElementById("irrigacao").value);
    const defensivos = Number(document.getElementById("defensivos").value);
    const preservacao = Number(document.getElementById("preservacao").value);

    let sustentabilidade = irrigacao + defensivos + preservacao;
    if (sustentabilidade > 100) sustentabilidade = 100;

    let producao = 50 + irrigacao / 2 + defensivos / 2;
    if (producao > 100) producao = 100;

    const impacto = 100 - sustentabilidade;

    let nivel = "";
    let mensagem = "";
    let conquista = "";

    if (sustentabilidade >= 90) {
        nivel = "🏆 Nível Ouro";
        mensagem = "Excelente!";
        conquista = "🌳 Mestre da Sustentabilidade";
    } else if (sustentabilidade >= 50) {
        nivel = "🥈 Nível Prata";
        mensagem = "Bom, mas pode melhorar.";
        conquista = "🌿 Guardião Ambiental";
    } else {
        nivel = "🥉 Nível Bronze";
        mensagem = "Precisa melhorar bastante.";
        conquista = "🌱 Aprendiz Sustentável";
    }

    totalSimulacoes++;
    localStorage.setItem("totalSimulacoes", totalSimulacoes);

    ultimoNivel = nivel;
    localStorage.setItem("ultimoNivel", ultimoNivel);

    melhorNivel = nivel;
    localStorage.setItem("melhorNivel", melhorNivel);

    atualizarEstatisticas();

    let recomendacoes = [];

    if (irrigacao < 30) recomendacoes.push("💧 Considere irrigação inteligente.");
    if (defensivos < 40) recomendacoes.push("🧪 Reduza defensivos.");
    if (preservacao < 50) recomendacoes.push("🌳 Amplie preservação.");

    let listaRecomendacoes =
        recomendacoes.length > 0
            ? recomendacoes.map(r => `<li>${r}</li>`).join("")
            : "<li>🎉 Tudo muito sustentável!</li>";

    document.getElementById("resultado").innerHTML = `
        <h3>Resultado</h3>

        <p>🌾 Produção: ${producao}%</p>
        <p>🌱 Sustentabilidade: ${sustentabilidade}%</p>
        <p>⚠️ Impacto: ${impacto}%</p>

        <h3>${nivel}</h3>
        <p class="conquista">${conquista}</p>
        <p>${mensagem}</p>

        <h4>💡 Recomendações</h4>
        <ul>${listaRecomendacoes}</ul>
    `;
}

function alternarTema() {
    document.body.classList.toggle("dark-mode");

    const botao = document.getElementById("botaoTema");

    if (document.body.classList.contains("dark-mode")) {
        botao.textContent = "☀️ Modo Claro";
        localStorage.setItem("tema", "escuro");
    } else {
        botao.textContent = "🌙 Modo Escuro";
        localStorage.setItem("tema", "claro");
    }
}

function aumentarFonte() {
    let tamanho = Number(localStorage.getItem("tamanhoFonte")) || 16;
    tamanho += 2;
    document.body.style.fontSize = tamanho + "px";
    localStorage.setItem("tamanhoFonte", tamanho);
}

function diminuirFonte() {
    let tamanho = Number(localStorage.getItem("tamanhoFonte")) || 16;
    if (tamanho > 12) {
        tamanho -= 2;
        document.body.style.fontSize = tamanho + "px";
        localStorage.setItem("tamanhoFonte", tamanho);
    }
}

function lerPagina() {

    speechSynthesis.cancel();

    const texto =
        document.querySelector("main").innerText;

    const titulo =
        document.querySelector(".hero-conteudo")?.innerText || "";

    const fala = new SpeechSynthesisUtterance(titulo + ". " + texto);

    fala.lang = "pt-BR";
    fala.rate = 1;

    speechSynthesis.speak(fala);
}

function pararLeitura() {
    speechSynthesis.cancel();
}