import { apiConfig } from "./api-config.js";

export async function searchId({ id }) {
    try {
        const response = await fetch(`${apiConfig.baseURL}/clients`);
        const data = await response.json();

        // Log para debug
        console.log("ID buscado:", id);
        console.log("Dados recebidos:", data);

        // Filtrar o objeto pelo id e retornar os campos desejados
        const foundClient = data.find((schedule) => {
            console.log(`Comparando ${schedule.id} com ${id}`);
            return schedule.id.trim() === id.trim();
        });

        if (foundClient) {
            
            return {
                id: foundClient.id,
                name: foundClient.name,  
                clientSince: foundClient.clientSince,
                totalCuts: foundClient.loyaltyCard.totalCuts,
                imagem: foundClient.imagem,
                arrayCuts: foundClient.appointmentHistory 
            };
        } else {
            alert("ID não encontrado");
            return {
                id: "",
                name: "",
                clientSince: "",
                totalCuts: 0,
                imagem: "",
                arrayCuts: []
            }; 
        }
    } catch (error) {
        alert("Não foi possível realizar a consulta");
        throw error; // Lança o erro para ser tratado em submit.js
    }
}
