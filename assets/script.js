confirm("um pouco nervoso...")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/New West  Those Eyes Chapter 1.mp3');
            audio.volume = 0.2;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "10/7": titulo = "10 de julho de 2023"; mensagem = "<p>Lembro do décimo dia, na Expocrato, quando eu estava na estande, ansioso para te ver. Mesmo sem muita intimidade, após as férias, eu estava ansioso para admirar você e conversar. Naquele momento, aguardava com expectativas.</p>";break;
            case "11/7": titulo = "11 de julho de 2023"; mensagem = "<p>O dia onze foi a realização do meu desejo. Foi quando finalmente te encontrei na Expocrato, junto com sua prima. A conversa foi rápida, pois minha timidez e pressa tomaram conta de mim, mas valeu a pena ter a coragem de falar com você.</p>";break;
            case "12/7": titulo = "12 de julho de 2023"; mensagem = "<p>No dia doze, fui ao samba e passei todo o dia na Expocrato tentando te encontrar, desejando que o encontro parecesse uma feliz coincidência.</p>";break;
            case "13/7": titulo = "13 de julho de 2023"; mensagem = "<p>O dia treze marcou o momento mais triste e frustrante para mim. Vi você no brinquedo, mas não pude te abraçar ou sequer dizer adeus antes de sua viagem para João Pessoa. A tristeza de não ter falado contigo naquele momento foi avassaladora, mas foram esses os dias que moldaram a minha semana.</p>";break;
            case "14/7": titulo = "14 de julho de 2023"; mensagem = "<p>Enquanto viajava de carro, eu conversava contigo e tirava fotos aleatórias, algumas até um tanto bobas, com a esperança de compartilhá-las contigo, mesmo sabendo que esse dia nunca chegaria.</p>";break;
            case "15/7": titulo = "15 de julho de 2023"; mensagem = "<p>O dia quinze foi quando dediquei a foto do sol a você. Essa imagem mudou minha perspectiva do mundo e me inspirou a ser mais autêntico em tudo o que fazia.</p>";break;
            case "16/7": titulo = "16 de julho de 2023"; mensagem = "<p>Foi no décimo sexto dia que encontramos nosso 'filhinho', o Curiguinha, um passo significativo em nosso relacionamento. Aquele momento representou o início da jornada como 'papai' e 'mamãe' para ele, algo que tornou nosso relacionamento ainda mais especial.</p>";break;
            case "17/7": titulo = "17 de julho de 2023"; mensagem = "<p>No décimo sétimo dia, expressei meus sentimentos, compartilhando que sonhei contigo. Falar sobre meus sonhos contigo se tornou um hábito, revelando o quanto você preenche meus pensamentos e sonhos.</p>";break;
            case "11/09": titulo = "11 de setembro de 2023"; mensagem = "<p>No dia onze, tivemos nosso primeiro beijo, marcando o momento em que reuni coragem para dar esse passo importante em nosso relacionamento.</p>";break;
            case "24/6": titulo = "24 de Junho de 2023"; mensagem = "<p>No vigésimo quarto dia, percebi que meus sentimentos por você estavam se aprofundando, apesar das circunstâncias incomuns que nos levaram a essa descoberta.</p>";break;
            case "30/9": titulo = "30 de setembro de 2023"; mensagem = "<p>No trigésimo dia, decidimos tornar oficial o nosso relacionamento, considerando-nos namorados perante outras pessoas. Foi quando percebemos que nosso amor havia se tornado sério e comprometido.</p>";break;
            case "final": titulo = "26 de outubro de 2023"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em em que ela aceitou<br><span class='letra2 letra-vermelha'>ser minha MOMOLADA</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}