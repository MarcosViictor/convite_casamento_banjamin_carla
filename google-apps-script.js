/**
 * ============================================================================
 * CÓDIGO PARA COLAR NO GOOGLE APPS SCRIPT DA SUA PLANILHA (GOOGLE SHEETS)
 * ============================================================================
 *
 * PASSO A PASSO PARA CONFIGURAR:
 * 1. Acesse https://sheets.new para criar uma nova Planilha Google.
 * 2. Dê um nome para ela (ex: "Confirmados Casamento Benjamin & Carla").
 * 3. No menu superior da planilha, clique em: Extensões > Apps Script.
 * 4. Apague qualquer código que estiver lá e cole TODO este código abaixo.
 * 5. Clique no ícone de Disquete (Salvar) no topo.
 * 6. No canto superior direito, clique no botão azul "Implantar" > "Nova implantação".
 * 7. Clique na engrenagem ao lado de "Selecionar tipo" e escolha "App da Web".
 * 8. Configure assim:
 *    - Descrição: X  
 *    - Executar como: "Eu" (seu e-mail)
 *    - Quem pode acessar: "Qualquer pessoa" (MUITO IMPORTANTE para os convidados conseguirem confirmar!)
 * 9. Clique em "Implantar", autorize o acesso com sua conta Google (Avançado > Acessar projeto).
 * 10. Copie a "URL do app da Web" gerada (termina com /exec) e cole no arquivo script.js
 *     na linha GOOGLE_SHEETS_WEBAPP_URL!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se a planilha estiver vazia, cria o cabeçalho automaticamente na linha 1
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data / Hora',
        'Nome do Convidado Principal',
        'Acompanhantes',
        'Total de Pessoas'
      ]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    var params = e.parameter || {};
    var dataHora = params.dataHora || new Date().toLocaleString('pt-BR');
    var nome = params.nome || '';
    var acompanhantes = params.acompanhantes || 'Nenhum';
    var quantidadeTotal = params.quantidadeTotal || 1;

    sheet.appendRow([
      dataHora,
      nome,
      acompanhantes,
      Number(quantidadeTotal)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'sucesso' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'erro', mensagem: erro.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
