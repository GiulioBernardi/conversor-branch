let nomeBranch = '';
let botaoBug = document.getElementById('button-bug');
let botaoFast = document.getElementById('button-fast');
let botaoMelhoria = document.getElementById('button-melhoria');
let botaoDebito = document.getElementById('button-debito');
let nomeBranchParaCopiar = document.getElementById('pre-nome-ticket-convertido');
let comandoGitParaCopiar = document.getElementById('pre-comando-git-ticket-span');
let button = document.getElementById('button');
let removerConjuncoes = document.getElementById('remover-conjuncoes-checkbox');
let prefixo = '';

let tiposDeTicket = [];
let caracteresParaRemover = [];
let letrasMaiusculas = [];
let letrasComAcento = [];

let nomeTicket = '';
let nomeTicketConvertidoParaBranch = '';

button.onclick = function(){
    obtemNomeDoTicket();

    if(nomeTicket === ''){
        alert('Informe um nome de ticket');
        return;
    }

    configuraListasStringUtils();
    removeEspacosEmBrancoCaseiro();
    removeCaracteresEspeciais();
    removeTipoDoTicket();
    removeEspacosEmBranco();
    removeLetrasComAcento();
    removeConjuncoesSimples();
    converteLetrasParaMinuscula();
    concatenaNomeTicketListaSeparandoPorHifen();

    document.getElementById('nome-ticket-span').innerHTML = nomeTicketConvertidoParaBranch;
    botaoBug.disabled = false;
    botaoFast.disabled = false;
    botaoMelhoria.disabled = false;
    botaoDebito.disabled = false;

    let classe= document.querySelector('#div-segundo-passo');
    classe.classList.remove("segundo-passo-cores");

}

nomeBranch = document.getElementById('nome-ticket-span').innerHTML;



botaoBug.onclick = function(){
    prefixo = 'bug/';
    adicionaBranchNaTela(prefixo);
    habilitarVisibilidadeDoTextoDaBranchNaTela();
}
botaoFast.onclick = function(){
    prefixo = 'feature/';
    adicionaBranchNaTela(prefixo);
    habilitarVisibilidadeDoTextoDaBranchNaTela();
}
botaoMelhoria.onclick = function(){
    prefixo = 'feature/';
    adicionaBranchNaTela(prefixo);
    habilitarVisibilidadeDoTextoDaBranchNaTela();
}
botaoDebito.onclick = function(){
    prefixo = 'debt/';
    adicionaBranchNaTela(prefixo);
    habilitarVisibilidadeDoTextoDaBranchNaTela();
}



removeLetraComAcento = function(letra){
    if(letra === 'á'){
        return 'a';
    }else if(letra === 'Á'){
        return 'A';
    }
    else if(letra === 'à'){
        return 'a';
    }
    else if(letra === 'À'){
        return 'A';
    }
    else if(letra === 'â'){
        return 'a';
    }
    else if(letra === 'Â'){
        return 'A';
    }
    else if(letra === 'ã'){
        return 'a';
    }
    else if(letra === 'Ã'){
        return 'A'
    }
    else if(letra === 'ç'){
        return 'c';
    }
    else if(letra === 'Ç'){
        return 'C';
    }
    else if(letra === 'é'){
        return 'e';
    }
    else if(letra === 'É'){
        return 'E';
    }
    else if(letra === 'ê'){
        return 'e';
    }
    else if(letra === 'Ê'){
        return 'E';
    }
    else if(letra === 'ẽ'){
        return 'e';
    }
    else if(letra === 'Ẽ'){
        return 'E';
    }
    else if(letra === 'È'){
        return 'E';
    }
    else if(letra === 'è'){
        return 'e';
    }
    else if(letra === 'í'){
        return 'i';
    }
    else if(letra === 'Í'){
        return 'I';
    }
    else if(letra === 'ó'){
        return 'o';
    }
    else if(letra === 'Ó'){
        return 'O';
    }
    else if(letra === 'õ'){
        return 'o';
    }
    else if(letra === 'Õ'){
        return 'O';
    }
    else if(letra === 'ô'){
        return 'o';
    }
    else if(letra === 'Ô'){
        return 'O';
    }
    else if(letra === 'ú'){
        return 'u';
    }
    else if(letra === 'Ú'){
        return 'U';
    }

    let letrasComAcento = ['á', 'à', 'â', 'ã', 'ç', 'é', 'ê', 'ẽ', 'è', 'í', 'ó', 'ô', 'õ', 'ú', 'ü'];
}

toLowerCaseCaseiro = function(letra) {
    if(letra === 'A'){
        return 'a';
    }
    else if(letra === 'B'){
        return 'b';
    }
    else if(letra === 'C'){
        return 'c';
    }
    else if(letra === 'D'){
        return 'd';
    }
    else if(letra === 'E'){
        return 'e';
    }
    else if(letra === 'F'){
        return 'f';
    }
    else if(letra === 'G'){
        return 'g';
    }
    else if(letra === 'H'){
        return 'h';
    }
    else if(letra === 'I'){
        return 'i';
    }
    else if(letra === 'J'){
        return 'j';
    }
    else if(letra === 'K'){
        return 'k';
    }
    else if(letra === 'L'){
        return 'l';
    }
    else if(letra === 'M'){
        return 'm';
    }
    else if(letra === 'N'){
        return 'n';
    }
    else if(letra === 'O'){
        return 'o';
    }
    else if(letra === 'P'){
        return 'p';
    }
    else if(letra === 'Q'){
        return 'q';
    }
    else if(letra === 'R'){
        return 'r';
    }
    else if(letra === 'S'){
        return 's';
    }
    else if(letra === 'T'){
        return 't';
    }
    else if(letra === 'U'){
        return 'u';
    }
    else if(letra === 'V'){
        return 'v';
    }
    else if(letra === 'W'){
        return 'w';
    }
    else if(letra === 'X'){
        return 'x';
    }
    else if(letra === 'Y'){
        return 'y';
    }
    else if(letra === 'Z'){
        return 'z';
    }

}

configuraListasStringUtils = function(){
    tiposDeTicket = ['Bug', 'Fast', 'Story', 'Melhoria', 'Debt', 'Milestone']
    caracteresParaRemover = [
        '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/',
        ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~',
        'ª', 'º', '°'
    ];
    letrasMaiusculas = ['A', 'B', 'C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U','V', 'W', 'X', 'Y', 'Z']
    letrasComAcento = ['á', 'à', 'â', 'ã', 'ç', 'é', 'ê', 'ẽ', 'è', 'í', 'ó', 'ô', 'õ', 'ú', 'ü','Á', 'À', 'Â', 'Ã', 'Ç', 'É', 'Ê', 'Ẽ', 'È', 'Í', 'Ó', 'Ô', 'Õ', 'Ú', 'Ü'];
    conjuncoesSimples = ['a', 'as', 'o', 'os', 'e', 'da', 'das', 'do', 'dos', 'de', 'de', 'ao', 'aos']
}

obtemNomeDoTicket = function(){
    nomeTicket = document.getElementById('input-nome-ticket').value;
}

removeEspacosEmBrancoCaseiro = function(){
    nomeTicketPalavras = [];
    for(let i=0; i<=nomeTicket.length; i++){
        palavra = ''
        while(nomeTicket[i] !== ' ' && nomeTicket[i] !== '' && i < nomeTicket.length ){
            palavra += nomeTicket[i];
            i++
        }

        if(palavra !== ' ' && palavra !== ''){
            nomeTicketPalavras.push(palavra)
        }
        
    }
    nomeTicketConvertidoParaBranch  = nomeTicketPalavras;
}


removeLetrasComAcento = function(){
    let ticketSemLetraComAcento = [];
    for(let i=0; i<nomeTicketConvertidoParaBranch.length; i++){
        let palavra = nomeTicketConvertidoParaBranch[i];
        let palavraSemAcento = '';
        for(let l=0; l<palavra.length; l++){
            letra = palavra[l];
            let isLetraComAcento = letrasComAcento.includes(letra);
            if(isLetraComAcento){
                letra = removeLetraComAcento(letra);
            }
            palavraSemAcento += letra;
        }
        ticketSemLetraComAcento.push(palavraSemAcento);
    }
    nomeTicketConvertidoParaBranch = ticketSemLetraComAcento;
}

removeCaracteresEspeciais = function(){
    nomeTicketPalavrasSemCaracteresEspeciais = []
    for(let j=0; j<nomeTicketConvertidoParaBranch.length; j++){
        let palavra = nomeTicketConvertidoParaBranch[j];
        let palavraSemSpecialChar = '';
        let indexComSpecialChar = null

        for(let p=0; p<palavra.length; p++){
            for(let k=0; k <= caracteresParaRemover.length; k++){
                if(palavra[p] === caracteresParaRemover[k]){
                    indexComSpecialChar = p;
                }
            }    
        }
        
        for(let l = 0; l<palavra.length; l++){
            if(l !== indexComSpecialChar && palavra != '' || indexComSpecialChar === null){
                palavraSemSpecialChar += palavra[l];
            }
        }
        if(palavraSemSpecialChar !== ''){
            nomeTicketPalavrasSemCaracteresEspeciais.push(palavraSemSpecialChar);
        }
    }
    nomeTicketConvertidoParaBranch = nomeTicketPalavrasSemCaracteresEspeciais;
}

removeConjuncoesSimples = function(){
    debugger;
    let ticketSemConjuncoesSimples = [];
    for(let i=0; i<nomeTicketConvertidoParaBranch.length; i++){
        palavra = nomeTicketConvertidoParaBranch[i];
        
        if(!conjuncoesSimples.includes(palavra)){
            ticketSemConjuncoesSimples.push(palavra);
        }
        
    }
    nomeTicketConvertidoParaBranch = ticketSemConjuncoesSimples
}

removeTipoDoTicket = function(){
    let ticketSemTipo = []
    let indexDoTicketQueContemTipo= null
    for(let i=0; i<nomeTicketConvertidoParaBranch.length; i++){
        palavra = nomeTicketConvertidoParaBranch[i];
        
        for(let j=0; j<=tiposDeTicket.length; j++){
            if(palavra === tiposDeTicket[j]){
                indexDoTicketQueContemTipo = i;
            }
        }
    }    
    for(let k=0; k<nomeTicketConvertidoParaBranch.length; k++){
        if(k !== indexDoTicketQueContemTipo){
            ticketSemTipo.push(nomeTicketConvertidoParaBranch[k]);
        }
    }
    nomeTicketConvertidoParaBranch = ticketSemTipo;
}

removeEspacosEmBranco = function(){
    let ticketSemEspacosEmBranco = []
    for(let i = 0; i<nomeTicketConvertidoParaBranch.length; i++){
        let palavra = nomeTicketConvertidoParaBranch[i]
     //   ['M', ' ', 'o', 'b', 'i', 'l', 'e'];
        let indexComPalavraVazia = null
        for(let k=0; k<palavra.length; k++){
            if(palavra[k] === ' ' || palavra[k] === ''){
                indexComPalavraVazia = k
            }
        }
        let palavraSemEspacoVazio = '';
        for(let j=0; j<palavra.length; j++){
            if(j !== indexComPalavraVazia){
                palavraSemEspacoVazio += palavra[j];
            }
        }
        if(palavraSemEspacoVazio !== ''){
            ticketSemEspacosEmBranco.push(palavraSemEspacoVazio);
        }
    }
    nomeTicketConvertidoParaBranch = ticketSemEspacosEmBranco;
}

converteLetrasParaMinuscula = function(){
    ticketComLetrasVazias = []
    for(let i=0; i<nomeTicketConvertidoParaBranch.length; i++){
        let palavra = nomeTicketConvertidoParaBranch[i];
        let palavraSemLetraMaiuscula = '';
        for(let j=0; j<palavra.length; j++){
            letra = palavra[j];
            
            
            let isLetraMaiuscula = letrasMaiusculas.includes(letra);
            if(isLetraMaiuscula){
                letra = toLowerCaseCaseiro(letra);
            }
            palavraSemLetraMaiuscula += letra;
        
        }
        ticketComLetrasVazias.push(palavraSemLetraMaiuscula);
    }
    nomeTicketConvertidoParaBranch = ticketComLetrasVazias;
}

concatenaNomeTicketListaSeparandoPorHifen = function(){

    nomeBranchSeparadoPorHifen = '';
    for(let i=0; i<nomeTicketConvertidoParaBranch.length; i++){
        if(i !== (nomeTicketConvertidoParaBranch.length - 1)){
            nomeBranchSeparadoPorHifen += nomeTicketConvertidoParaBranch[i] + '-';
        }else{
            nomeBranchSeparadoPorHifen += nomeTicketConvertidoParaBranch[i];
        }
        
    }
    nomeTicketConvertidoParaBranch = nomeBranchSeparadoPorHifen;
}

function adicionaBranchNaTela(prefixo){
    let nomeBranch = document.getElementById('nome-ticket-span').innerHTML
    document.getElementById('nome-ticket-convertido').innerHTML = prefixo + nomeBranch;
    document.getElementById('comando-git-ticket-span').innerHTML = 'git checkout -b ' + prefixo + nomeBranch;
}

habilitarVisibilidadeDoTextoDaBranchNaTela = function(){
    comandoGitParaCopiar.hidden = false;
    nomeBranchParaCopiar.hidden = false;
}