/**
 * ============================================================================
 * CÓDIGO PARA COLAR NO GOOGLE APPS SCRIPT DA SUA PLANILHA (GOOGLE SHEETS)
 * ============================================================================
 *
 * Este script funciona de 2 formas automáticas:
 * 1. Se você colar ele na mesma planilha onde já estão os convidados (linhas 1 a 159),
 *    ele procura o número/nome de cada membro da família e marca "Confirmado (Vai)" ou
 *    "Não irá" direto na linha da pessoa (nas colunas E e F)!
 * 2. Além disso, ele também registra cada confirmação em uma aba "Confirmacoes" para
 *    você ter o histórico completo com data e hora.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var mainSheet = ss.getSheets()[0];

    var params = e.parameter || {};
    var dataHora = params.dataHora || new Date().toLocaleString('pt-BR');
    var quemConfirmou = params.quemConfirmou || params.nome || '';
    var membrosJson = params.membrosJson || '[]';
    var membros = [];

    try {
      membros = JSON.parse(membrosJson);
    } catch (err) {
      membros = [];
    }

    // 1. Atualiza diretamente na tabela principal (caso ela tenha a lista de 1 a 159)
    var lastRow = mainSheet.getLastRow();
    if (lastRow > 0 && membros.length > 0) {
      var values = mainSheet.getRange(1, 1, lastRow, 6).getValues();

      for (var i = 0; i < membros.length; i++) {
        var m = membros[i];
        var statusTexto = m.vai === 'Sim' ? 'VAI' : 'NÃO VAI';

        for (var r = 0; r < values.length; r++) {
          var colConvidado = String(values[r][1] || '').trim().toLowerCase();
          var colAcompanhante = String(values[r][2] || '').trim().toLowerCase();
          var colId = String(values[r][3] || '').trim();
          var nomeBusca = String(m.nome || '').trim().toLowerCase();

          if (colId === String(m.id) || colConvidado === nomeBusca || colAcompanhante === nomeBusca) {
            if (colAcompanhante === nomeBusca && m.isAcompanhante) {
              // Coluna F (6): Status do Acompanhante daquela linha
              mainSheet.getRange(r + 1, 6).setValue(m.nome + ': ' + statusTexto + ' (' + dataHora + ')');
            } else {
              // Coluna E (5): Status do Convidado daquela linha
              mainSheet.getRange(r + 1, 5).setValue(m.nome + ': ' + statusTexto + ' (' + dataHora + ')');
            }
            break;
          }
        }
      }
    }

    // 2. Registra também na aba "Histórico de Confirmações" para controle fácil
    var logSheet = ss.getSheetByName('Confirmacoes');
    if (!logSheet) {
      logSheet = ss.insertSheet('Confirmacoes');
      logSheet.appendRow([
        'Data / Hora',
        'Quem Respondeu',
        'Nº na Lista',
        'Nome do Convidado / Familiar',
        'Tipo',
        'Confirmou Presença?'
      ]);
      logSheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    if (membros.length > 0) {
      for (var j = 0; j < membros.length; j++) {
        var item = membros[j];
        logSheet.appendRow([
          dataHora,
          quemConfirmou,
          item.id,
          item.nome,
          item.isAcompanhante ? 'Acompanhante' : 'Titular/Família',
          item.vai === 'Sim' ? 'Sim (Vai)' : 'Não vai'
        ]);
      }
    }

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
