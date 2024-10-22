import { searchId } from "../services/search.js";

const form = document.querySelector("form");
const idCartao = document.getElementById("idcartao");
const nomeAssociado = document.getElementById("nomeCliente");
const fotoAssociado = document.getElementById("fotoAssociado");
const historico = document.getElementById("historicoCorte");
const historicoAnalitico = document.getElementById("historico_analitico");
const idEncontrado = document.getElementById("labelID");
const historicoFidelidade = document.getElementById("itensFidelidade");
const cortesRestantes = document.getElementById("cortesFaltantes");

form.onsubmit = async (event) => {
    event.preventDefault();

    console.log("aguarde");

    try {
        const id = idCartao.value;

        // Chamando a função searchId 
        const clientData = await searchId({ id });

        idCartao.innerHTML = "";

        console.log(clientData);

        if (clientData.id !== "") {
            const idLabel = document.createElement("span");
            const fotoElement = document.createElement("img");
            const nameElement = document.createElement("span");
            const clientSinceElement = document.createElement("span");
            const historicoRecente = document.createElement("span");
            const historicoQuantidade = document.createElement("span");
            const cortesParaBrinde = document.createElement("div");

            // Criei um contêiner para exibir os cortes
            const listaCortes = document.createElement("div"); 
            const listaFidelidade = document.createElement("div");

            fotoElement.setAttribute("src", `./src/images/${clientData.imagem}`);
            fotoElement.setAttribute("alt", "Foto");
            
            idLabel.classList.add("v2125_388");
            idLabel.textContent = `ID: ${clientData.id}`; 

            nameElement.classList.add("v2125_312");
            nameElement.textContent = clientData.name;
            
            clientSinceElement.classList.add("v2125_313");
            clientSinceElement.textContent = clientData.clientSince !== "" ? `Cliente desde: ${clientData.clientSince}` : "";

            historicoRecente.classList.add("v2125_316");
            historicoRecente.textContent = "Histórico";

            historicoQuantidade.classList.add("v2125_317");
            historicoQuantidade.textContent = `Total: ${clientData.arrayCuts.length}`; 
            
            historico.innerHTML = "";
            historico.append(historicoRecente, historicoQuantidade);
            
            // Percorrer o arrayCuts e criar um item para cada corte
            let margin = 12;
            let top = 0;
            let topF = 0;
            let left = 0;
            let nContador = 1;
            let contFid = 368;
            let numeroItens = 1;
            
            clientData.arrayCuts.forEach(corte => {
                let contIni = 318;
                contFid = 368;
                
                const itemCorte = document.createElement("div");
                itemCorte.classList.add("v2125_" + contIni.toString()); 
                contIni += 3;
            
                const diaCorte = document.createElement("span");
                diaCorte.classList.add("v2125_" + contIni.toString()); 
                diaCorte.textContent = corte.date; 
                contIni += 1;
                diaCorte.style.top = `${top.toString()}px`;
            
                const horaCorte = document.createElement("span");
                horaCorte.classList.add("v2125_" + contIni.toString());
                horaCorte.textContent = corte.time; 
                contIni += 1;
                horaCorte.style.top = `${(top + 20).toString()}px`;
            
                const imagemCorte = document.createElement("div");
                imagemCorte.classList.add("v2125_" + contIni.toString(), "name");
                
                const imagemCut1 = document.createElement("img");
                imagemCut1.setAttribute("src", "./src/images/Vector.png");
                imagemCut1.setAttribute("alt", "Vector");
            
                imagemCorte.style.left = '200px';
                imagemCorte.style.margin = `${margin.toString()}px`;
                imagemCorte.style.top = `${(top - 10).toString()}px`;
                top += 50;
            
                imagemCorte.appendChild(imagemCut1);
                itemCorte.appendChild(diaCorte);
                itemCorte.appendChild(horaCorte);
                itemCorte.appendChild(imagemCorte);
                listaCortes.appendChild(itemCorte);
            
                const itemFidelidade = document.createElement("div");
                itemFidelidade.classList.add("v2125_" + contFid.toString());
            
                itemFidelidade.style.top = `${topF}px`;
                itemFidelidade.style.left = `${left}px`;
                left += nContador < 5 ? 104 : 0;
            
                contFid++;
                const subItemFidelidade = document.createElement("div");
                subItemFidelidade.classList.add("v2125_" + contFid.toString());
            
                subItemFidelidade.style.display = "flex";
                subItemFidelidade.style.alignItems = "center";
                subItemFidelidade.style.top = '0px';
                
                const imagemCut2 = document.createElement("img");
                imagemCut2.setAttribute("src", "./src/images/Vector2.png");
                imagemCut2.setAttribute("alt", "Vector2");
            
                subItemFidelidade.appendChild(imagemCut2);
                itemFidelidade.appendChild(subItemFidelidade);
                
                listaFidelidade.appendChild(itemFidelidade);
            
                // Atualiza variáveis de controle
                nContador++;
                if (nContador > 5) {
                    nContador = 1;
                    topF += 104;  // Ajusta a distância vertical entre as linhas
                    left = 0;
                }
                numeroItens++;
                
            });

            console.log(numeroItens);
            
            let lTrocou = numeroItens <= 5 ? false : true;

            if (numeroItens < 10) {
                for (let index = numeroItens; index <= 11; index++) {
                    contFid = 368;
                    const itemFidelidade = document.createElement("div");
                    itemFidelidade.classList.add("v2125_" + contFid.toString());
                    
                    itemFidelidade.style.top = `${topF}px`;
                    itemFidelidade.style.left = `${left}px`;
                    left += nContador < 5 ? 104 : 0;
                
                    contFid++;
                    const subItemFidelidade = document.createElement("div");
                    subItemFidelidade.classList.add("v2125_" + contFid.toString());
                
                    subItemFidelidade.style.display = "flex";
                    subItemFidelidade.style.alignItems = "center";
                    subItemFidelidade.style.top = '0px';
                    
                    if (numeroItens===10){ 
                        const imagemCut2 = document.createElement("img");
                        imagemCut2.setAttribute("src", "./src/images/Brinde.png");
                        imagemCut2.setAttribute("alt", "Brinde");
                    
                        subItemFidelidade.appendChild(imagemCut2);
                    }
                    itemFidelidade.appendChild(subItemFidelidade);
                    
                    listaFidelidade.appendChild(itemFidelidade);
                    numeroItens++;
                    
                    if (index > 5 && !lTrocou) {
                        lTrocou = true;
                        topF += 104;  // Ajusta a distância vertical entre as linhas
                        left = 0;
                    }
                    
                }
            }


            cortesParaBrinde.classList.add("v2125_390");
            const itensFaltantes = document.createElement("span");
            itensFaltantes.classList.add("v2125_392");
            
            itensFaltantes.textContent = `${10-clientData.arrayCuts.length} corte(s) faltante(s)`; 

            const subItem1 = document.createElement("div");
            subItem1.classList.add("v2125_394");
            const resumoFaltante = document.createElement("span");
            resumoFaltante.classList.add("v2125_397");

            resumoFaltante.textContent = `${clientData.arrayCuts.length} de 10`;

            subItem1.appendChild(resumoFaltante);

            
            const subItem2 = document.createElement("div");
            subItem2.classList.add("v2125_395");
            const subItem3 = document.createElement("div");
            subItem3.classList.add("v2125_396");

            const subItem4 = document.createElement("div");
            subItem4.classList.add("v2125_398");
            const subItem5 = document.createElement("div");
            subItem5.classList.add("v2125_399");

            const imagemBrinde2 = document.createElement("img");
            imagemBrinde2.setAttribute("src", "./src/images/Brinde2.png");
            imagemBrinde2.setAttribute("alt", "Brinde2");
            
            subItem5.appendChild(imagemBrinde2);
            subItem4.appendChild(subItem5);
            
            subItem2.appendChild(subItem3);
            subItem1.appendChild(subItem2);
            
            cortesParaBrinde.appendChild(itensFaltantes);
            cortesParaBrinde.appendChild(subItem1);
            cortesParaBrinde.appendChild(resumoFaltante);
            
            cortesRestantes.appendChild(cortesParaBrinde);
            cortesRestantes.appendChild(subItem4);
            
            idEncontrado.innerHTML = "";
            idEncontrado.appendChild(idLabel);

            historicoAnalitico.innerHTML = ""; 
            historicoAnalitico.appendChild(listaCortes); 

            historicoFidelidade.innerHTML = "";
            historicoFidelidade.appendChild(listaFidelidade);
            
            nomeAssociado.innerHTML = "";  
            nomeAssociado.appendChild(nameElement);
            nomeAssociado.appendChild(clientSinceElement); 
            
            fotoAssociado.innerHTML = "";
            fotoAssociado.append(fotoElement);
        }

    } catch (error) {
        alert("Não foi possível carregar o formulário.");
        console.log(error);
    }
};
