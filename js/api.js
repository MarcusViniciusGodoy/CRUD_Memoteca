const URL_BASE = "http://localhost:3000";

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-");
    //2025-03-29 = [2025, 3, 29]
    return new Date(Date.UTC(ano, mes, dia));
}

const api = {
    //Padrão utiliza GET
    async buscarPensamentos(){
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`);
            return await response.data;
        } catch {
            alert('Erro ao buscar pensamentos.');
            throw error;
        }
    },

    async postPensamento(pensamento){
        try {
            const data = converterStringParaData(pensamento.data);
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data
            });
            return await response.data;
        } catch {
            alert('Erro ao salvar pensamento.');
            throw error;
        }
    },

    async buscarPensamentoPorId(id){
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
            return await response.data;
        } catch {
            alert('Erro ao buscar pensamento.');
            throw error;
        }
    },

    async editarPensamento(pensamento){
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento);
            return await response.data;
        } catch {
            alert('Erro ao editar pensamento.');
            throw error;
        }
    },

    async excluirPensamento(id){
        try {
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
        } catch {
            alert('Erro ao excluir pensamento.');
            throw error;
        }
    },

    async buscarPensamentosPorTermo(termo){
        try {
            const pensamentos = await this.buscarPensamentos();
            const termoMinusculo = termo.toLowerCase();
    
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoMinusculo) ||
                pensamento.autoria.toLowerCase().includes(termoMinusculo));  
            });  
            return pensamentosFiltrados ;
        } catch (error){
            alert("Erro ao filtrar pensamentos.");
            throw error;
        }
    },

    async atualizarFavorito(id, favorito){
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, {favorito});
            return response.data;
        } catch {
            alert('Erro ao atualizar favorito.');
            throw error;
        }
    },
};

export default api;