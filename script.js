/**
 * CONFIGURAÇÃO DO CONVITE INTERATIVO - BENJAMIN & CARLA
 * -----------------------------------------------------
 * OPÇÃO MAIS FÁCIL (GOOGLE FORMS + PLANILHA GOOGLE - SEM PRECISAR AUTORIZAR APPS SCRIPT):
 * 1. Acesse https://forms.new e crie um formulário com 2 perguntas de "Resposta curta":
 *    - Pergunta 1: Nome do Convidado Principal
 *    - Pergunta 2: Acompanhantes
 *    (Opcional - Pergunta 3: Total de Pessoas)
 * 2. Na aba "Respostas" do formulário, clique em "Vincular ao Planilhas" para criar sua planilha.
 * 3. Clique nos 3 pontinhos (⋮) no canto superior direito > "Gerar link preenchido automaticamente".
 * 4. Digite qualquer texto nos campos, clique em "Gerar link" > "Copiar link" e cole abaixo em GOOGLE_FORM_PREFILLED_URL!
 */
const CONFIG = {
  GOOGLE_FORM_PREFILLED_URL:
    'https://docs.google.com/forms/d/e/1FAIpQLSeFA8II7NAyql8vrPR4LR3_5jYhvFWZfQr1PT3DESUCmkdsRg/viewform?usp=pp_url&entry.1555882=Sim&entry.1743792628=teste',
  GOOGLE_SHEETS_WEBAPP_URL: '',  // (Opcional) Caso use Apps Script
  GIFTS_LIST_URL: '',            // Link da Lista de Presentes quando estiver pronta
};

/**
 * Extrai a URL de envio (/formResponse) e os IDs dos campos (entry.XXXXX)
 * automaticamente a partir de um link pré-preenchido do Google Forms.
 */
function parseGoogleFormPrefilledUrl(prefilledUrl) {
  try {
    const url = new URL(prefilledUrl.trim());
    const actionUrl = `${url.origin}${url.pathname.replace(/\/viewform.*$/, '/formResponse')}`;
    const entries = [];
    const sampleValues = {};
    for (const [key, val] of url.searchParams.entries()) {
      if (key.startsWith('entry.') && !entries.includes(key)) {
        entries.push(key);
        sampleValues[key] = val;
      }
    }
    if (entries.length === 0) return null;
    return { actionUrl, entries, sampleValues };
  } catch {
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do Modal de Confirmação (RSVP)
  const btnRsvp = document.getElementById('btn-rsvp');
  const rsvpModal = document.getElementById('rsvp-modal');
  const modalClose = document.getElementById('modal-close');
  const btnDone = document.getElementById('btn-done');

  // Elementos do Formulário
  const rsvpForm = document.getElementById('rsvp-form');
  const guestNameInput = document.getElementById('guest-name');
  const btnAddCompanion = document.getElementById('btn-add-companion');
  const companionsList = document.getElementById('companions-list');
  const formFeedback = document.getElementById('form-feedback');
  const btnSubmit = document.getElementById('btn-submit');
  const btnText = btnSubmit.querySelector('.btn-text');
  const btnSpinner = btnSubmit.querySelector('.btn-spinner');
  const rsvpSuccess = document.getElementById('rsvp-success');

  // Elementos da Lista de Presentes
  const btnGifts = document.getElementById('btn-gifts');
  const giftsModal = document.getElementById('gifts-modal');
  const giftsClose = document.getElementById('gifts-close');
  const giftsOk = document.getElementById('gifts-ok');

  // Se o link da lista de presentes já estiver configurado, aponta direto para ele
  if (CONFIG.GIFTS_LIST_URL && CONFIG.GIFTS_LIST_URL.trim() !== '') {
    btnGifts.href = CONFIG.GIFTS_LIST_URL;
    btnGifts.target = '_blank';
    btnGifts.rel = 'noopener noreferrer';
  }

  // Abrir / Fechar Modal RSVP
  function openRsvpModal() {
    rsvpModal.classList.add('is-open');
    rsvpModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => guestNameInput.focus(), 100);
  }

  function closeRsvpModal() {
    rsvpModal.classList.remove('is-open');
    rsvpModal.setAttribute('aria-hidden', 'true');
  }

  btnRsvp.addEventListener('click', openRsvpModal);
  modalClose.addEventListener('click', closeRsvpModal);
  btnDone.addEventListener('click', () => {
    closeRsvpModal();
    // Reseta o formulário caso queira confirmar outra pessoa depois
    setTimeout(() => {
      rsvpForm.reset();
      companionsList.innerHTML = '';
      rsvpSuccess.hidden = true;
      rsvpForm.hidden = false;
      hideFeedback();
    }, 300);
  });

  // Abrir / Fechar Modal de Presentes (caso ainda não tenha URL configurada)
  btnGifts.addEventListener('click', (e) => {
    if (!CONFIG.GIFTS_LIST_URL || CONFIG.GIFTS_LIST_URL.trim() === '') {
      e.preventDefault();
      giftsModal.classList.add('is-open');
      giftsModal.setAttribute('aria-hidden', 'false');
    }
  });

  function closeGiftsModal() {
    giftsModal.classList.remove('is-open');
    giftsModal.setAttribute('aria-hidden', 'true');
  }

  giftsClose.addEventListener('click', closeGiftsModal);
  giftsOk.addEventListener('click', closeGiftsModal);

  // Fechar clicando fora do card ou apertando ESC
  window.addEventListener('click', (e) => {
    if (e.target === rsvpModal) closeRsvpModal();
    if (e.target === giftsModal) closeGiftsModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRsvpModal();
      closeGiftsModal();
    }
  });

  // Adicionar campo de acompanhante dinamicamente
  btnAddCompanion.addEventListener('click', () => {
    const count = companionsList.children.length + 1;
    const row = document.createElement('div');
    row.className = 'companion-row';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `acompanhante_${count}`;
    input.className = 'form-input companion-input';
    input.placeholder = `Nome completo do ${count}º acompanhante`;
    input.required = true;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-remove-companion';
    removeBtn.title = 'Remover acompanhante';
    removeBtn.setAttribute('aria-label', 'Remover acompanhante');
    removeBtn.innerHTML = '&times;';

    removeBtn.addEventListener('click', () => {
      row.remove();
    });

    row.appendChild(input);
    row.appendChild(removeBtn);
    companionsList.appendChild(row);
    input.focus();
  });

  const companionsGroup = document.getElementById('companions-group');
  const attendanceRadios = rsvpForm.querySelectorAll('input[name="participar"]');

  attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const isAttending =
        rsvpForm.querySelector('input[name="participar"]:checked')?.value !== 'Não';
      if (companionsGroup) {
        companionsGroup.hidden = !isAttending;
      }
      if (!isAttending) {
        companionsList.innerHTML = '';
      }
    });
  });

  function showError(message) {
    formFeedback.textContent = message;
    formFeedback.className = 'form-feedback is-error';
    formFeedback.hidden = false;
  }

  function hideFeedback() {
    formFeedback.hidden = true;
    formFeedback.textContent = '';
  }

  function setLoading(isLoading) {
    btnSubmit.disabled = isLoading;
    btnSpinner.hidden = !isLoading;
    btnText.textContent = isLoading ? 'Enviando confirmação...' : 'Confirmar Presença';
  }

  // Envio para o Google Forms (ou Google Apps Script)
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideFeedback();

    const mainName = guestNameInput.value.trim();
    if (!mainName) {
      showError('Por favor, informe o seu nome completo.');
      guestNameInput.focus();
      return;
    }

    const vaiParticipar =
      rsvpForm.querySelector('input[name="participar"]:checked')?.value || 'Sim';

    const companionInputs = companionsList.querySelectorAll('.companion-input');
    const companions = Array.from(companionInputs)
      .map((input) => input.value.trim())
      .filter((val) => val.length > 0);

    const companionsText = companions.length > 0 ? companions.join(', ') : 'Nenhum';
    const totalPeople = vaiParticipar === 'Sim' ? 1 + companions.length : 0;
    const nomesFormatados =
      vaiParticipar === 'Sim' && companions.length > 0
        ? `${mainName} | Acompanhantes: ${companions.join(', ')} (Total: ${totalPeople} pessoas)`
        : mainName;

    const hasGoogleForm =
      CONFIG.GOOGLE_FORM_PREFILLED_URL && CONFIG.GOOGLE_FORM_PREFILLED_URL.trim() !== '';
    const hasAppsScript =
      CONFIG.GOOGLE_SHEETS_WEBAPP_URL && CONFIG.GOOGLE_SHEETS_WEBAPP_URL.trim() !== '';

    if (!hasGoogleForm && !hasAppsScript) {
      showError(
        'A planilha ainda não foi conectada! Cole o link pré-preenchido do Google Forms em GOOGLE_FORM_PREFILLED_URL no arquivo script.js.'
      );
      return;
    }

    setLoading(true);

    try {
      if (hasGoogleForm) {
        const parsed = parseGoogleFormPrefilledUrl(CONFIG.GOOGLE_FORM_PREFILLED_URL);
        if (!parsed) {
          showError(
            'O link do Google Forms parece inválido. Use a opção "Gerar link preenchido automaticamente" no Google Forms.'
          );
          return;
        }

        const formData = new URLSearchParams();
        if (parsed.entries.length === 1) {
          formData.append(
            parsed.entries[0],
            `Participar: ${vaiParticipar} | ${nomesFormatados}`
          );
        } else {
          const sampleFirst = parsed.sampleValues[parsed.entries[0]] || '';
          let respostaParticipar = vaiParticipar;
          if (sampleFirst === sampleFirst.toUpperCase() && sampleFirst.length > 0) {
            respostaParticipar = vaiParticipar.toUpperCase();
          } else if (sampleFirst === sampleFirst.toLowerCase() && sampleFirst.length > 0) {
            respostaParticipar = vaiParticipar.toLowerCase();
          }
          // Pergunta 1: Você vai participar do casamento? (Sim / Não)
          formData.append(parsed.entries[0], respostaParticipar);
          // Pergunta 2: Coloque seu nome e dos seus acompanhantes
          formData.append(parsed.entries[1], nomesFormatados);
          if (parsed.entries[2]) {
            formData.append(parsed.entries[2], String(totalPeople));
          }
        }

        await fetch(parsed.actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
      } else {
        const formData = new URLSearchParams();
        formData.append('participar', vaiParticipar);
        formData.append('nome', mainName);
        formData.append('acompanhantes', companionsText);
        formData.append('quantidadeTotal', String(totalPeople));
        formData.append('dataHora', new Date().toLocaleString('pt-BR'));

        await fetch(CONFIG.GOOGLE_SHEETS_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
      }

      // Mostra mensagem de sucesso
      rsvpForm.hidden = true;
      rsvpSuccess.hidden = false;
    } catch (error) {
      console.error('Erro ao salvar confirmação:', error);
      showError('Não foi possível enviar sua confirmação agora. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  });
});
