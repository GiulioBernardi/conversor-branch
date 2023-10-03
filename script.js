let nomeBranch = '';
let botaoBug = document.getElementById('button-bug');
let botaoFast = document.getElementById('button-fast');
let botaoMelhoria = document.getElementById('button-melhoria');
let botaoDebito = document.getElementById('button-debito');
let nomeBranchParaCopiar = document.getElementById('pre-nome-ticket-convertido');
let comandoGitParaCopiar = document.getElementById('pre-comando-git-ticket-span');
let button = document.getElementById('button');

let tiposDeTicket = [];
let caracteresParaRemover = [];
let letrasMaiusculas = [];
let letrasComAcento = [];

let nomeTicket = '';
let nomeTicketConvertidoParaBranch = '';

button.onclick = function(){
    let ticketConvertidoParaBranch = '';
    // nomeTicketPalavras = ['#327049', '-', ' ', '[M obile', 'Inventário]', 'Ao', 'informar', 'um', 'GTIN', 'que', 'está', 'no', 'endereço', 'não', 'é', 'possível', 'informar', 'apenas', 'a', 'Qtd', 'Bug']

            

    obtemNomeDoTicket();

    if(nomeTicket === ''){
        alert('Informe um nome de ticket');
        return;
    }

    configuraListasStringUtils();
    
    
    // let nomeTicketPalavras = nomeTicket.split(' ').map(palavra => palavra.trim());

    removeEspacosEmBrancoCaseiro();


    


    

    //remove caracteres especiais
    // ticketConvertidoParaBranch = nomeTicketPalavras.filter(palavra => !caracteresParaRemover.includes(palavra));
    nomeTicketPalavrasSemCaracteresEspeciais = []
    for(let j=0; j<nomeTicketPalavras.length; j++){
        let palavra = nomeTicketPalavras[j];
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
    nomeTicketPalavras = nomeTicketPalavrasSemCaracteresEspeciais;


    //remove o tipo de ticket do nome
    // ticketConvertidoParaBranch = nomeTicketPalavras.filter(palavra => !tiposDeTicket.includes(palavra));
    let ticketSemTipo = []
    let indexDoTicketQueContemTipo= null
    for(let i=0; i<nomeTicketPalavras.length; i++){
        palavra = nomeTicketPalavras[i];
        
        for(let j=0; j<=tiposDeTicket.length; j++){
            if(palavra === tiposDeTicket[j]){
                indexDoTicketQueContemTipo = i;
            }
        }
    }    
    for(let k=0; k<nomeTicketPalavras.length; k++){
        if(k !== indexDoTicketQueContemTipo){
            ticketSemTipo.push(nomeTicketPalavras[k]);
        }
    }
    nomeTicketPalavras = ticketSemTipo;



    //remove todos os espacos vazios
    // ticketConvertidoParaBranch = ticketConvertidoParaBranch.filter(palavra => palavra.replace(' ', ''));
    let ticketSemEspacosEmBranco = []
    for(let i = 0; i<nomeTicketPalavras.length; i++){
        let palavra = nomeTicketPalavras[i]
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
    ticketConvertidoParaBranch = ticketSemEspacosEmBranco;
    
    //transforma todas as palavras para lower case
    // ticketConvertidoParaBranch = ticketConvertidoParaBranch.map(palavra => palavra.toLowerCase());
    ticketComLetrasVazias = []

    for(let i=0; i<ticketConvertidoParaBranch.length; i++){
        let palavra = ticketConvertidoParaBranch[i];
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
    
    ticketConvertidoParaBranch = ticketComLetrasVazias;

    let ticketSemLetraComAcento = [];
    for(let i=0; i<ticketConvertidoParaBranch.length; i++){
        palavra = ticketConvertidoParaBranch[i];
        let palavraSemAcento = '';
        for(let l=0; l<palavra.length; l++){
            letra = palavra[l];
            let isLetraComAcento = letrasComAcento.includes(letra);
            debugger;
            if(isLetraComAcento){
                letra = removeLetraComAcento(letra);
            }
            palavraSemAcento += letra;
        }
        ticketSemLetraComAcento.push(palavraSemAcento);
    }


    ticketConvertidoParaBranch = ticketSemLetraComAcento;



    let nomeBranch = ticketConvertidoParaBranch.join('-')


    document.getElementById('nome-ticket-span').innerHTML = nomeBranch;
    botaoBug.disabled = false;
    botaoFast.disabled = false;
    botaoMelhoria.disabled = false;
    botaoDebito.disabled = false;

    

    let classe= document.querySelector('#div-segundo-passo');
    classe.classList.remove("segundo-passo-cores");

}


nomeBranch = document.getElementById('nome-ticket-span').innerHTML;



botaoBug.onclick = function(){
    let nomeBranch = document.getElementById('nome-ticket-span').innerHTML

    prefixo = 'bug/';
    document.getElementById('nome-ticket-convertido').innerHTML = prefixo + nomeBranch;
    document.getElementById('comando-git-ticket-span').innerHTML = 'git checkout -b ' + prefixo + nomeBranch;
    document.getElementsByTagName('p').disabled = false;
    nomeBranchParaCopiar.hidden = false;
    comandoGitParaCopiar.hidden = false;

}
botaoFast.onclick = function(){

    let nomeBranch = document.getElementById('nome-ticket-span').innerHTML;

    prefixo = 'feature/';
    document.getElementById('nome-ticket-convertido').innerHTML = prefixo + nomeBranch;
    document.getElementById('comando-git-ticket-span').innerHTML = 'git checkout -b ' + prefixo + nomeBranch;

    comandoGitParaCopiar.hidden = false;
    nomeBranchParaCopiar.hidden = false;
}
botaoMelhoria.onclick = function(){

    let nomeBranch = document.getElementById('nome-ticket-span').innerHTML;

    prefixo = 'feature/';
    document.getElementById('nome-ticket-convertido').innerHTML = prefixo + nomeBranch;
    document.getElementById('comando-git-ticket-span').innerHTML = 'git checkout -b ' + prefixo + nomeBranch;

    comandoGitParaCopiar.hidden = false;
    nomeBranchParaCopiar.hidden = false;
}
botaoDebito.onclick = function(){

    let nomeBranch = document.getElementById('nome-ticket-span').innerHTML;

    prefixo = 'debt/';
    document.getElementById('nome-ticket-convertido').innerHTML = prefixo + nomeBranch;
    document.getElementById('comando-git-ticket-span').innerHTML = 'git checkout -b ' + prefixo + nomeBranch;
    comandoGitParaCopiar.hidden = false;
    nomeBranchParaCopiar.hidden = false;
}



removeLetraComAcento = function(letra){
    if(letra === 'á'){
        return 'a';
    }
    else if(letra === 'à'){
        return 'a';
    }else if(letra === 'â'){
        return 'a';
    }else if(letra === 'ã'){
        return 'a';
    }else if(letra === 'ç'){
        return 'c';
    }else if(letra === 'é'){
        return 'e';
    }else if(letra === 'ê'){
        return 'e';
    }else if(letra === 'ẽ'){
        return 'e';
    }else if(letra === 'í'){
        return 'i';
    }else if(letra === 'ó'){
        return 'o';
    }else if(letra === 'õ'){
        return 'o';
    }else if(letra === 'ô'){
        return 'o';
    }else if(letra === 'ú'){
        return 'u';
    }

    let letrasComAcento = ['á', 'à', 'â', 'ã', 'ç', 'é', 'ê', 'ẽ', 'í', 'ó', 'ô', 'õ', 'ú', 'ü'];
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
        ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'
    ];
    letrasMaiusculas = ['A', 'B', 'C','D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U','V', 'W', 'X', 'Y', 'Z']
    letrasComAcento = ['á', 'à', 'â', 'ã', 'ç', 'é', 'ê', 'ẽ', 'í', 'ó', 'ô', 'õ', 'ú', 'ü'];
}

obtemNomeDoTicket = function(){
    nomeTicket = document.getElementById('input-nome-ticket').value;
}

removeEspacosEmBrancoCaseiro = function(){
    debugger;
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