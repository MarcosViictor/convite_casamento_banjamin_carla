/**
 * CONFIGURAÇÃO DO CONVITE INTERATIVO - BENJAMIM & CARLA
 * -----------------------------------------------------
 * 1. GOOGLE_FORM_PREFILLED_URL: Já configurada com o seu Google Forms atual!
 * 2. GOOGLE_SHEETS_WEBAPP_URL: (Opcional) Caso queira atualizar direto nas linhas da planilha
 *    usando o código do arquivo google-apps-script.js.
 * 3. GIFTS_LIST_URL: Link da Lista de Presentes quando estiver pronta.
 */
const CONFIG = {
  GOOGLE_FORM_PREFILLED_URL:
    'https://docs.google.com/forms/d/e/1FAIpQLSeFA8II7NAyql8vrPR4LR3_5jYhvFWZfQr1PT3DESUCmkdsRg/viewform?usp=pp_url&entry.1555882=Sim&entry.1743792628=teste',
  GOOGLE_SHEETS_WEBAPP_URL: '',
  GIFTS_LIST_URL:
    'https://www.amazon.com.br/hz/wishlist/ls/3E4QPQ1WZNYHX?ref_=wl_share',
};

/**
 * LISTA OFICIAL DE CONVIDADOS E SUAS FAMÍLIAS / ACOMPANHANTES
 * Extraída exatamente da sua planilha (linhas 1 a 159).
 */
const GUEST_GROUPS = [
  {
    id: 1,
    tipo: 'Família',
    membros: [
      { id: 1, nome: 'Marlene Maria dos Santos' },
      { id: 2, nome: 'Tadeu Martins Moisés' },
      { id: 3, nome: 'Clara Talita Santos Moisés' },
      { id: 4, nome: 'Tailon Magno Santos Moisés' },
      { id: 5, nome: 'Ludmila Alves Claudino' },
      { id: 6, nome: 'Pedro Henrique Santos Moisés' },
      { id: 7, nome: 'Ana Paula' },
      { id: 8, nome: 'Maria Isabelle Santos Moisés' },
      { id: 9, nome: 'João Gabriel Santos Moisés' },
    ],
  },
  {
    id: 2,
    tipo: 'Individual',
    membros: [{ id: 10, nome: 'Maria Juvenilde dos Santos' }],
  },
  {
    id: 3,
    tipo: 'Família',
    membros: [
      { id: 11, nome: 'Maria Juciene dos Santos Silva' },
      { id: 11, nome: 'Warlley Keven dos Santos Silva', isAcompanhante: true },
      { id: 12, nome: 'Antônio Wilton da Silva' },
      { id: 13, nome: 'Williany Jehnifer dos Santos Silva' },
      { id: 14, nome: 'Wellyda Késia dos Santos Silva' },
    ],
  },
  {
    id: 4,
    tipo: 'Família',
    membros: [
      { id: 15, nome: 'Jucinete Pereira dos Santos' },
      { id: 16, nome: 'S. Antônio dos Santos' },
      { id: 17, nome: 'Raimon Ramison Araújo Batista Filho' },
      { id: 18, nome: 'Ravila Jaisa Araújo dos Santos' },
    ],
  },
  {
    id: 5,
    tipo: 'Família',
    membros: [
      { id: 19, nome: 'Benaia dos Santos' },
      { id: 19, nome: 'Jailson', isAcompanhante: true },
      { id: 20, nome: 'Cilene' },
      { id: 20, nome: 'Nicolas', isAcompanhante: true },
      { id: 21, nome: 'Calleby Samuel Silva Santos' },
      { id: 22, nome: 'Wesley Charles Silva Santos' },
    ],
  },
  {
    id: 6,
    tipo: 'Família',
    membros: [
      { id: 23, nome: 'Jucilibe Pereira Dos Santos' },
      { id: 24, nome: 'Emily Beatriz Dos Santos Mota' },
      { id: 25, nome: 'Luciano Eliazar Sousa' },
    ],
  },
  {
    id: 7,
    tipo: 'Família',
    membros: [
      { id: 26, nome: 'Benilton Pereira dos Santos' },
      { id: 26, nome: 'Byanka Davila dos Santos', isAcompanhante: true },
      { id: 27, nome: 'Damiana Jaqueline dos Santos Nascimento' },
      { id: 27, nome: 'Brenda Louisy dos Santos', isAcompanhante: true },
    ],
  },
  {
    id: 8,
    tipo: 'Individual',
    membros: [{ id: 28, nome: 'Maria Alcinete Da Conceição' }],
  },
  {
    id: 9,
    tipo: 'Família',
    membros: [
      { id: 29, nome: 'Aurilio Costa' },
      { id: 30, nome: 'Isabel Costa' },
      { id: 30, nome: 'Ana Laísa Costa', isAcompanhante: true },
    ],
  },
  {
    id: 10,
    tipo: 'Família',
    membros: [
      { id: 31, nome: 'Josué Antônio dos Santos' },
      { id: 32, nome: 'Maria Mirtene Santos Figueiredo' },
      { id: 33, nome: 'Mabel dos Santos' },
      { id: 34, nome: 'Maele dos Santos' },
    ],
  },
  {
    id: 11,
    tipo: 'Família',
    membros: [
      { id: 35, nome: 'Daniel Antonio dos Santos' },
      { id: 36, nome: 'Cicera Feliciano dos Santos' },
      { id: 37, nome: 'Barbara Ivina Dos Santos' },
      { id: 38, nome: 'Marco Danilo dos Santos' },
    ],
  },
  {
    id: 12,
    tipo: 'Família',
    membros: [
      { id: 39, nome: 'Adeilson Pereira' },
      { id: 40, nome: 'Maria Pereira' },
    ],
  },
  {
    id: 13,
    tipo: 'Individual',
    membros: [{ id: 41, nome: 'José Adesio Pereira' }],
  },
  {
    id: 14,
    tipo: 'Família',
    membros: [
      { id: 42, nome: 'Alberto Antonio Dos Santos' },
      { id: 43, nome: 'Maria Adriana de Lucena Dias' },
      { id: 43, nome: 'Asafe Berto Dias dos Santos', isAcompanhante: true },
      { id: 44, nome: 'Avina Jamile Dias dos Santos' },
      { id: 44, nome: 'Alefe Berto Dias dos Santos', isAcompanhante: true },
    ],
  },
  {
    id: 15,
    tipo: 'Família',
    membros: [
      { id: 45, nome: 'Renata Jacó' },
      { id: 46, nome: 'Marcelo' },
      { id: 45, nome: 'Matheus', isAcompanhante: true },
    ],
  },
  {
    id: 16,
    tipo: 'Família',
    membros: [
      { id: 47, nome: 'Ana Géssica Jacó Pereira' },
      { id: 47, nome: 'Anabel Pereira', isAcompanhante: true },
      { id: 48, nome: 'João' },
      { id: 48, nome: 'Amós Pereira', isAcompanhante: true },
    ],
  },
  {
    id: 17,
    tipo: 'Família',
    membros: [
      { id: 49, nome: 'Maria de Loudes Jacó Pereira' },
      { id: 50, nome: 'Damião Pereira' },
    ],
  },
  {
    id: 18,
    tipo: 'Família',
    membros: [
      { id: 51, nome: 'Sizilande Alvilino dos Santos' },
      { id: 52, nome: 'Ester Alves Pereira' },
      { id: 53, nome: 'Sofia Alvilino' },
    ],
  },
  {
    id: 19,
    tipo: 'Individual',
    membros: [{ id: 54, nome: 'Deusivan Cesário Dos Santos' }],
  },
  {
    id: 20,
    tipo: 'Individual',
    membros: [{ id: 55, nome: 'Edinaldo Inácio dos Santos' }],
  },
  {
    id: 21,
    tipo: 'Família',
    membros: [
      { id: 56, nome: 'RITA DE CASSIA RODRIGUES COSTA' },
      { id: 57, nome: 'Felipe' },
      { id: 58, nome: 'Dante Caputo' },
    ],
  },
  {
    id: 22,
    tipo: 'Família',
    membros: [
      { id: 59, nome: 'Geovane de Oliveira Lopes' },
      { id: 60, nome: 'Camila' },
      { id: 60, nome: 'Davine', isAcompanhante: true },
    ],
  },
  {
    id: 23,
    tipo: 'Família',
    membros: [
      { id: 61, nome: 'Maria Rosemar Lemos Pereira' },
      { id: 62, nome: 'Kelon' },
      { id: 63, nome: 'Ana Isis' },
    ],
  },
  {
    id: 24,
    tipo: 'Família',
    membros: [
      { id: 64, nome: 'Jaqueline de Jesus Lima' },
      { id: 65, nome: 'Willians' },
      { id: 65, nome: 'Laura', isAcompanhante: true },
    ],
  },
  {
    id: 25,
    tipo: 'Individual',
    membros: [{ id: 66, nome: 'VANESSA DE LIMA NASCIMENTO' }],
  },
  {
    id: 26,
    tipo: 'Individual',
    membros: [{ id: 67, nome: 'MARCOS VICTOR DANTAS DE SOUZA' }],
  },
  {
    id: 27,
    tipo: 'Individual',
    membros: [{ id: 68, nome: 'Kailane Severo' }],
  },
  {
    id: 28,
    tipo: 'Individual',
    membros: [{ id: 69, nome: 'BRENDA EVELYN DA SILVA VIEIRA' }],
  },
  {
    id: 29,
    tipo: 'Individual',
    membros: [{ id: 70, nome: 'Wille' }],
  },
  {
    id: 30,
    tipo: 'Família',
    membros: [
      { id: 71, nome: 'CRISTIANE FILOMENA MARTINAZZO' },
      { id: 72, nome: 'FABIO REGIS DE ALBUQUERQUE' },
    ],
  },
  {
    id: 31,
    tipo: 'Família',
    membros: [
      { id: 73, nome: 'Antônio Martiniano Neto' },
      { id: 74, nome: 'Sandra Maria Matias' },
    ],
  },
  {
    id: 32,
    tipo: 'Família',
    membros: [
      { id: 75, nome: 'Cristiano do Nascimento' },
      { id: 75, nome: 'João Victor Pereira do Nascimento', isAcompanhante: true },
      { id: 76, nome: 'Pollyana Pereira' },
      { id: 76, nome: 'Lorenço Pereira do Nascimento', isAcompanhante: true },
    ],
  },
  {
    id: 33,
    tipo: 'Família',
    membros: [
      { id: 77, nome: 'Pr. Clederson Conceição' },
      { id: 78, nome: 'D. Jane Simplício Conceição' },
    ],
  },
  {
    id: 34,
    tipo: 'Família',
    membros: [
      { id: 79, nome: 'Fábio Rodrigues' },
      { id: 80, nome: 'Daine' },
    ],
  },
  {
    id: 35,
    tipo: 'Família',
    membros: [
      { id: 81, nome: 'José Everaldo Eugenio Filho' },
      { id: 81, nome: 'Miguel', isAcompanhante: true },
      { id: 82, nome: 'Naiara Gomes' },
      { id: 82, nome: 'Bento', isAcompanhante: true },
      { id: 83, nome: 'Gildete' },
    ],
  },
  {
    id: 36,
    tipo: 'Família',
    membros: [
      { id: 84, nome: 'Danielle de Sousa Brito' },
      { id: 85, nome: 'Fábio Brito de Oliveira' },
      { id: 86, nome: 'Ester de Sousa Brito' },
      { id: 86, nome: 'Estêvão de Sousa Brito', isAcompanhante: true },
    ],
  },
  {
    id: 37,
    tipo: 'Família',
    membros: [
      { id: 87, nome: 'Wellington Soares' },
      { id: 87, nome: 'Davi Campelo', isAcompanhante: true },
      { id: 88, nome: 'Larissa Campelo' },
      { id: 88, nome: 'Saulo Campelo', isAcompanhante: true },
    ],
  },
  {
    id: 38,
    tipo: 'Família',
    membros: [
      { id: 89, nome: 'Marta Fernandes Alencar' },
      { id: 90, nome: 'Kerley Alencar Araújo' },
    ],
  },
  {
    id: 39,
    tipo: 'Família',
    membros: [
      { id: 91, nome: 'Levi Assunção' },
      { id: 91, nome: 'Alice Assunção', isAcompanhante: true },
      { id: 92, nome: 'Vitória Assunção' },
      { id: 93, nome: 'Liara Assunção' },
    ],
  },
  {
    id: 40,
    tipo: 'Individual',
    membros: [{ id: 94, nome: 'Naian Francisco dos Santos' }],
  },
  {
    id: 41,
    tipo: 'Individual',
    membros: [{ id: 95, nome: 'Maria Isabel dos Santos' }],
  },
  {
    id: 42,
    tipo: 'Família',
    membros: [
      { id: 96, nome: 'Maria do Socorro Santos' },
      { id: 97, nome: 'Ana Jéssica da Silva' },
      { id: 98, nome: 'Maria Clara da Silva Barbosa' },
    ],
  },
  {
    id: 43,
    tipo: 'Família',
    membros: [
      { id: 99, nome: 'Josefa Maria Dantas' },
      { id: 100, nome: 'Francisco Diego Santos' },
      { id: 101, nome: 'Francisco Tiago dos Santos Dantas' },
      { id: 101, nome: 'Aurora Florentino Dantas', isAcompanhante: true },
      { id: 102, nome: 'Leidiane Florentino' },
      { id: 102, nome: 'Flora Florentino Dantas', isAcompanhante: true },
    ],
  },
  {
    id: 44,
    tipo: 'Individual',
    membros: [{ id: 103, nome: 'Gilson Rodrigues dos Santos' }],
  },
  {
    id: 45,
    tipo: 'Família',
    membros: [
      { id: 104, nome: 'David Henrique da Silva' },
      { id: 105, nome: 'Fabiana Veridiana Da Silva' },
      { id: 105, nome: 'Daineres Vitorio Da Silva', isAcompanhante: true },
      { id: 106, nome: 'Eva Laís Da Silva' },
    ],
  },
  {
    id: 46,
    tipo: 'Família',
    membros: [
      { id: 107, nome: 'Abimael de Sousa Santos' },
      { id: 108, nome: 'Gilmara Ferreira dos Santos' },
      { id: 108, nome: 'Rute Sofia Ferreira dos Santos', isAcompanhante: true },
      { id: 109, nome: 'Ana Beatriz Ferreira dos Santos' },
    ],
  },
  {
    id: 47,
    tipo: 'Família',
    membros: [
      { id: 110, nome: 'José Antônio dos Santos' },
      { id: 111, nome: 'Maria de Lurdes dos Santos' },
      { id: 112, nome: 'Ana Beatriz dos Santos' },
      { id: 113, nome: 'Ana Letícia dos Santos' },
    ],
  },
  {
    id: 48,
    tipo: 'Família',
    membros: [
      { id: 114, nome: 'Francisca Pereira de Lemos' },
      { id: 115, nome: 'Jussinágila de Souza Lima' },
      { id: 115, nome: 'Gabriel de Souza Lima', isAcompanhante: true },
      { id: 116, nome: 'Maximiano Jefferson Lima' },
      { id: 117, nome: 'Sophia de Souza Lima' },
    ],
  },
  {
    id: 49,
    tipo: 'Família',
    membros: [
      { id: 118, nome: 'Jair Ferreira dos Santos' },
      { id: 119, nome: 'Simone Maria da Silva Santos' },
      { id: 120, nome: 'Levi Judá Santos Silva' },
      { id: 121, nome: 'Ana Larissa Santos Silva' },
    ],
  },
  {
    id: 50,
    tipo: 'Família',
    membros: [
      { id: 122, nome: 'César Junio' },
      { id: 123, nome: 'Cicera Karolyne Coelho' },
    ],
  },
  {
    id: 51,
    tipo: 'Família',
    membros: [
      { id: 124, nome: 'Aline Amorim' },
      { id: 124, nome: 'Alice Amorim', isAcompanhante: true },
      { id: 125, nome: 'Adgerian Junio de Sousa Freitas' },
      { id: 126, nome: 'Ana Amorim' },
    ],
  },
  {
    id: 52,
    tipo: 'Individual',
    membros: [{ id: 127, nome: 'Vitória Lis Gomes Fernandes' }],
  },
  {
    id: 53,
    tipo: 'Individual',
    membros: [{ id: 128, nome: 'Maria Cristiane dos Santos' }],
  },
  {
    id: 54,
    tipo: 'Família',
    membros: [
      { id: 129, nome: 'Rosiane da Silva' },
      { id: 130, nome: 'Bárbara Vitória da Silva Rocha' },
    ],
  },
  {
    id: 55,
    tipo: 'Família',
    membros: [
      { id: 131, nome: 'Camila de Sousa Nogueira' },
      { id: 132, nome: 'Juliana de Sousa Nogueira' },
    ],
  },
  {
    id: 56,
    tipo: 'Individual',
    membros: [{ id: 133, nome: 'Josefa Darc de Souza' }],
  },
  {
    id: 57,
    tipo: 'Individual',
    membros: [{ id: 134, nome: 'Maria Verônica Lima' }],
  },
  {
    id: 58,
    tipo: 'Família',
    membros: [
      { id: 135, nome: 'Antonio Caetano' },
      { id: 136, nome: 'Antonia Márcia Caetano' },
      { id: 137, nome: 'Antonio Levi Caetano' },
      { id: 138, nome: 'Cicero Kaiki Caetano' },
      { id: 139, nome: 'João Lucas Caetano' },
    ],
  },
  {
    id: 59,
    tipo: 'Família',
    membros: [
      { id: 140, nome: 'Francisca Cláudia Lima' },
      { id: 141, nome: 'Maria Clara Lima' },
    ],
  },
  {
    id: 60,
    tipo: 'Família',
    membros: [
      { id: 142, nome: 'Josilene Batista' },
      { id: 142, nome: 'Natanael Batista', isAcompanhante: true },
      { id: 143, nome: 'Francisco Ribeiro de Brito' },
      { id: 144, nome: 'Ruan Batista' },
    ],
  },
  {
    id: 61,
    tipo: 'Família',
    membros: [
      { id: 145, nome: 'Ricardo Ferreira Leite' },
      { id: 146, nome: 'Rosângela Leite' },
    ],
  },
  {
    id: 62,
    tipo: 'Individual',
    membros: [{ id: 147, nome: 'Maria Clara Vasconcelos' }],
  },
  {
    id: 63,
    tipo: 'Família',
    membros: [
      { id: 148, nome: 'Gilvan Generoso' },
      { id: 149, nome: 'Maria das Dores de Sousa' },
    ],
  },
  {
    id: 64,
    tipo: 'Família',
    membros: [
      { id: 150, nome: 'Ana Lúcia dos Santos' },
      { id: 151, nome: 'Ana Caroline dos Santos' },
      { id: 152, nome: 'Isaque Canindé' },
    ],
  },
  {
    id: 65,
    tipo: 'Família',
    membros: [
      { id: 153, nome: 'Dávila Bezerra Mello' },
      { id: 154, nome: 'Italo Bruno Mello' },
    ],
  },
  {
    id: 66,
    tipo: 'Família',
    membros: [
      { id: 155, nome: 'José Rodrigues da Costa' },
      { id: 156, nome: 'Cicera Rodrigues' },
      { id: 157, nome: 'Felipe Esdras Rodrigues' },
    ],
  },
  {
    id: 67,
    tipo: 'Família',
    membros: [
      { id: 158, nome: 'CAROLINE RIBEIRO DE SOUSA' },
      { id: 159, nome: 'Pedro' },
    ],
  },
];

/**
 * Remove acentos e deixa minúsculo para facilitar a busca pelo nome
 */
function normalizeText(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

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

  // Elementos do Formulário e Busca
  const rsvpForm = document.getElementById('rsvp-form');
  const searchStep = document.getElementById('search-step');
  const guestSearchInput = document.getElementById('guest-search');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const searchResults = document.getElementById('search-results');

  // Elementos da Família Selecionada
  const familySection = document.getElementById('family-section');
  const familyBadge = document.getElementById('family-badge');
  const familyTitle = document.getElementById('family-title');
  const btnChangeGuest = document.getElementById('btn-change-guest');
  const familyMembersList = document.getElementById('family-members-list');

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

  let selectedGroup = null;
  let selectedMemberName = '';

  // Se o link da lista de presentes já estiver configurado, aponta direto para ele
  if (CONFIG.GIFTS_LIST_URL && CONFIG.GIFTS_LIST_URL.trim() !== '') {
    btnGifts.href = CONFIG.GIFTS_LIST_URL;
    btnGifts.target = '_blank';
    btnGifts.rel = 'noopener noreferrer';
  }

  function resetModalState() {
    selectedGroup = null;
    selectedMemberName = '';
    rsvpForm.reset();
    guestSearchInput.value = '';
    btnClearSearch.hidden = true;
    searchResults.hidden = true;
    searchResults.innerHTML = '';
    searchStep.hidden = false;
    familySection.hidden = true;
    familyMembersList.innerHTML = '';
    btnSubmit.disabled = true;
    rsvpSuccess.hidden = true;
    rsvpForm.hidden = false;
    hideFeedback();
  }

  // Abrir / Fechar Modal RSVP
  function openRsvpModal() {
    rsvpModal.classList.add('is-open');
    rsvpModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => guestSearchInput.focus(), 100);
  }

  function closeRsvpModal() {
    rsvpModal.classList.remove('is-open');
    rsvpModal.setAttribute('aria-hidden', 'true');
  }

  btnRsvp.addEventListener('click', openRsvpModal);
  modalClose.addEventListener('click', closeRsvpModal);
  btnDone.addEventListener('click', () => {
    closeRsvpModal();
    setTimeout(resetModalState, 300);
  });

  // Abrir / Fechar Modal de Presentes
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

  // Busca de Convidados na Lista Oficial
  guestSearchInput.addEventListener('input', () => {
    hideFeedback();
    const rawQuery = guestSearchInput.value;
    const query = normalizeText(rawQuery);

    btnClearSearch.hidden = rawQuery.length === 0;

    if (query.length < 2) {
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      return;
    }

    // Procura todos os membros cujo nome contenha o texto digitado
    const matches = [];
    for (const group of GUEST_GROUPS) {
      for (const member of group.membros) {
        if (normalizeText(member.nome).includes(query)) {
          matches.push({ group, member });
        }
      }
    }

    searchResults.innerHTML = '';

    if (matches.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'search-empty';
      emptyDiv.textContent = 'Nenhum convidado encontrado com esse nome. Tente digitar apenas o primeiro nome.';
      searchResults.appendChild(emptyDiv);
      searchResults.hidden = false;
      return;
    }

    matches.slice(0, 12).forEach(({ group, member }) => {
      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.className = 'search-result-item';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'search-result-name';
      nameSpan.textContent = member.nome;

      const metaSpan = document.createElement('span');
      metaSpan.className = 'search-result-meta';
      const totalMembros = group.membros.length;
      if (totalMembros === 1) {
        metaSpan.textContent = 'Convite Individual';
      } else {
        const outros = group.membros
          .filter((m) => m.nome !== member.nome)
          .map((m) => m.nome.split(' ')[0])
          .slice(0, 3)
          .join(', ');
        metaSpan.textContent = `Convite ${group.tipo} (${totalMembros} pessoas: com ${outros}${totalMembros > 4 ? '...' : ''})`;
      }

      itemBtn.appendChild(nameSpan);
      itemBtn.appendChild(metaSpan);

      itemBtn.addEventListener('click', () => {
        selectGuestGroup(group, member.nome);
      });

      searchResults.appendChild(itemBtn);
    });

    searchResults.hidden = false;
  });

  btnClearSearch.addEventListener('click', () => {
    guestSearchInput.value = '';
    btnClearSearch.hidden = true;
    searchResults.hidden = true;
    searchResults.innerHTML = '';
    guestSearchInput.focus();
  });

  // Selecionar Grupo / Família e exibir lista de membros para marcar Vai / Não vai
  function selectGuestGroup(group, triggeredName) {
    selectedGroup = group;
    selectedMemberName = triggeredName;
    hideFeedback();

    searchStep.hidden = true;
    familySection.hidden = false;
    btnSubmit.disabled = false;

    const total = group.membros.length;
    familyBadge.textContent =
      total === 1 ? 'Convite Individual' : `Convite ${group.tipo} • ${total} pessoas`;
    familyTitle.textContent = triggeredName;

    familyMembersList.innerHTML = '';

    group.membros.forEach((member, idx) => {
      const card = document.createElement('div');
      card.className = 'member-card';

      const info = document.createElement('div');
      info.className = 'member-info';

      const nameEl = document.createElement('span');
      nameEl.className = 'member-name';
      nameEl.textContent = member.nome;

      const roleEl = document.createElement('span');
      roleEl.className = 'member-role';
      roleEl.textContent = member.isAcompanhante
        ? `Acompanhante (Nº ${member.id})`
        : `Convidado Nº ${member.id}`;

      info.appendChild(nameEl);
      info.appendChild(roleEl);

      const toggleGroup = document.createElement('div');
      toggleGroup.className = 'member-status-toggle';

      const radioName = `member_status_${idx}`;

      // Opção "Vai"
      const labelSim = document.createElement('label');
      labelSim.className = 'status-pill';
      const inputSim = document.createElement('input');
      inputSim.type = 'radio';
      inputSim.name = radioName;
      inputSim.value = 'Sim';
      inputSim.checked = true;
      const spanSim = document.createElement('span');
      spanSim.textContent = 'Vai';
      labelSim.appendChild(inputSim);
      labelSim.appendChild(spanSim);

      // Opção "Não vai"
      const labelNao = document.createElement('label');
      labelNao.className = 'status-pill';
      const inputNao = document.createElement('input');
      inputNao.type = 'radio';
      inputNao.name = radioName;
      inputNao.value = 'Não';
      const spanNao = document.createElement('span');
      spanNao.textContent = 'Não vai';
      labelNao.appendChild(inputNao);
      labelNao.appendChild(spanNao);

      toggleGroup.appendChild(labelSim);
      toggleGroup.appendChild(labelNao);

      card.appendChild(info);
      card.appendChild(toggleGroup);
      familyMembersList.appendChild(card);
    });
  }

  btnChangeGuest.addEventListener('click', () => {
    selectedGroup = null;
    selectedMemberName = '';
    familySection.hidden = true;
    searchStep.hidden = false;
    btnSubmit.disabled = true;
    guestSearchInput.focus();
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

  // Envio da Confirmação da Família para o Google Forms e/ou Google Apps Script
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideFeedback();

    if (!selectedGroup) {
      showError('Por favor, pesquise e selecione seu nome na lista de convidados.');
      guestSearchInput.focus();
      return;
    }

    const respostasMembros = selectedGroup.membros.map((member, idx) => {
      const checked = familyMembersList.querySelector(
        `input[name="member_status_${idx}"]:checked`
      );
      return {
        id: member.id,
        nome: member.nome,
        isAcompanhante: Boolean(member.isAcompanhante),
        vai: checked ? checked.value : 'Sim',
      };
    });

    const confirmados = respostasMembros.filter((m) => m.vai === 'Sim');
    const naoVao = respostasMembros.filter((m) => m.vai === 'Não');
    const vaiAlguem = confirmados.length > 0 ? 'Sim' : 'Não';

    const resumoConfirmados =
      confirmados.length > 0
        ? `Confirmados (${confirmados.length}): ${confirmados.map((m) => `${m.nome} (#${m.id})`).join(', ')}`
        : 'Ninguém irá comparecer';

    const resumoNaoVao =
      naoVao.length > 0
        ? ` | Não irão (${naoVao.length}): ${naoVao.map((m) => `${m.nome} (#${m.id})`).join(', ')}`
        : '';

    const textoCompletoPlanilha = `[Quem confirmou: ${selectedMemberName}] ${resumoConfirmados}${resumoNaoVao}`;

    const hasGoogleForm =
      CONFIG.GOOGLE_FORM_PREFILLED_URL && CONFIG.GOOGLE_FORM_PREFILLED_URL.trim() !== '';
    const hasAppsScript =
      CONFIG.GOOGLE_SHEETS_WEBAPP_URL && CONFIG.GOOGLE_SHEETS_WEBAPP_URL.trim() !== '';

    if (!hasGoogleForm && !hasAppsScript) {
      showError('A planilha ainda não foi conectada no arquivo script.js.');
      return;
    }

    setLoading(true);

    try {
      // 1) Se tiver Google Forms configurado, envia UMA LINHA POR PESSOA da família
      //    para que na planilha cada convidado fique em sua própria linha, super organizado!
      if (hasGoogleForm) {
        const parsed = parseGoogleFormPrefilledUrl(CONFIG.GOOGLE_FORM_PREFILLED_URL);
        if (parsed) {
          const sampleFirst = parsed.sampleValues[parsed.entries[0]] || '';

          for (const membro of respostasMembros) {
            const formData = new URLSearchParams();
            let statusMembro = membro.vai; // "Sim" ou "Não"

            if (sampleFirst === sampleFirst.toUpperCase() && sampleFirst.length > 0) {
              statusMembro = statusMembro.toUpperCase();
            } else if (sampleFirst === sampleFirst.toLowerCase() && sampleFirst.length > 0) {
              statusMembro = statusMembro.toLowerCase();
            }

            const tipoLabel = membro.isAcompanhante ? 'Acompanhante' : selectedGroup.tipo;
            const nomeLimpoParaPlanilha =
              selectedGroup.membros.length > 1
                ? `${membro.nome} (Nº ${membro.id} - ${tipoLabel} | Confirmado por: ${selectedMemberName})`
                : `${membro.nome} (Nº ${membro.id} - Individual)`;

            if (parsed.entries.length === 1) {
              formData.append(
                parsed.entries[0],
                `${statusMembro} - ${nomeLimpoParaPlanilha}`
              );
            } else {
              // Coluna 1 do Forms: Sim ou Não (individual daquela pessoa)
              formData.append(parsed.entries[0], statusMembro);
              // Coluna 2 do Forms: Nome individual daquela pessoa
              formData.append(parsed.entries[1], nomeLimpoParaPlanilha);
              if (parsed.entries[2]) {
                formData.append(parsed.entries[2], membro.vai === 'Sim' ? '1' : '0');
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
          }
        }
      }

      // 2) Se tiver Google Apps Script configurado, envia os dados estruturados da família
      if (hasAppsScript) {
        const formData = new URLSearchParams();
        formData.append('quemConfirmou', selectedMemberName);
        formData.append('tipoGrupo', selectedGroup.tipo);
        formData.append('membrosJson', JSON.stringify(respostasMembros));
        formData.append('quantidadeConfirmados', String(confirmados.length));
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

      // Personaliza mensagem de sucesso
      const successTitle = rsvpSuccess.querySelector('.success-title');
      const successText = rsvpSuccess.querySelector('.success-text');
      if (confirmados.length > 0) {
        successTitle.textContent = 'Presença Confirmada!';
        successText.innerHTML = `Muito obrigado, <strong>${selectedMemberName}</strong>! Registramos a confirmação de <strong>${confirmados.length} pessoa(s)</strong> do seu convite para o dia <strong>09 de Janeiro de 2027 às 16h</strong>.`;
      } else {
        successTitle.textContent = 'Resposta Registrada!';
        successText.innerHTML = `Obrigado por nos avisar, <strong>${selectedMemberName}</strong>. Sentiremos sua falta!`;
      }

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
