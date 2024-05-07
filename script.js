        // Vamos iniciar pelo script de envio, declarando algumas variáveis com informações provenientes dos campos do formulário utilizado no processo.
        var idFluig = getValue("WKNumProces") + ''
        var emails = hAPI.getCardValue('emails');
        var nome_solicitante = hAPI.getCardValue('solicitante');
        var nome_gerente = hAPI.getCardValue('nomeGerente');
        var nome_supervisor = hAPI.getCardValue('nomeSupervisor');
        var valor_total = hAPI.getCardValue('total');
        
    try {
        // Em seguida, crio uma lista java, chamada PARAMETROS.
        var parametros = new java.util.HashMap();

        // Nessa lista PARAMETROS, insiro as informações que eu preciso passar para o template de email, utilizando o padrão (CHAVE, VALOR)
        parametros.put("NOME_USUARIO", nome_solicitante);
        parametros.put("NOME_SOLICITANTE", nome_solicitante);
        parametros.put("NOME_GERENTE", nome_gerente);
        parametros.put("NOME_SUPERVISOR", nome_supervisor);
        parametros.put("VALOR_TOTAL", valor_total);

        // Essa chave SUBJECT, em específico, é a responsável pelo assunto do email. 
        // Nesse exemplo, estou informando o pagamento de uma solicitação, e concatenando algumas variáveis.
        parametros.put("subject", "Pagamento Efetuado para a solicitação (" + idFluig + ") / colaborador (" + nome_solicitante + ")");

        // Agora, vamos aos destinatários. Para isso, eu crio um array java, chamado DESTINATARIOS.
        var destinatarios = new java.util.ArrayList();

        // Utilizo o método SPLIT para dividir os emails inseridos no campo do formulário separados por ";".
        var emails = emails.split(';')

        // Rodo um FOR a partir da quantidade de emails detectados na variável EMAILS.
        for (var i = 0; i < emails.length; i++) {
            //A cada email detectado, adiciono eles ao array DESTINATARIOS.
            destinatarios.add(emails[i]);
        }

        //Pra finalizar o script e enviar o email, utilizamos a função NOTIFY, alimentando os 5 parâmetros, com as seguintes informações:

        //  Parâmetro 1: Matricula Fluig do usuário remetente deste email. 
        //  Recomendamos a criação de um usuário especialmente para utilização como remetente, e que no cadastro dele, seja inserido o mesmo 
        //  endereço de email da conta cadastrada para envios no WCMADMIN, pois, alguns servidores de email, como o OUTLOOK, não aceitam que 
        //  uma conta envie mensagens utilizando um endereço de remetente diferente do endereço dela.

        //Parâmetro 2: Código do TEMPLATE DE EMAIL cadastrado no Painel de Controle do Fluig. Ainda nesse post, exibo um template exemplo.

        //Parâmetro 3: A variável PARAMETROS, com as informações que serão utilizadas no Template de Email.

        //Parâmetro 4: A variável DESTINATÁRIOS com a lista de endereços que receberão o email.

        //Parâmetro 5: Formato do email enviado.

        notifier.notify("fluig_email", "tpl_confirmacao_pgto", parametros, destinatarios, "text/html");

    } catch (e) {
        log.info(e);
    }