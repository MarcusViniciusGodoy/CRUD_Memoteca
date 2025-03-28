import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();
    ui.limparFormulario();

    const formularioPensamento = document.getElementById("pensamento-form");
    const botaoCancelar = document.getElementById("botao-cancelar");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", manipularCancelamento);
});

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        if(id){
            await api.editarPensamento({id, conteudo, autoria});
        } else {
            await api.postPensamento({conteudo, autoria});
        }
        ui.renderizarPensamentos();
    } catch {
        alert("Erro ao salvar pensamento.");
    }
};

function manipularCancelamento(){
    ui.limparFormulario();
};