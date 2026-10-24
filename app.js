
'use strict';
const fields = [...document.querySelectorAll('[data-label]')];
const output = document.querySelector('#summary-values');
const status = document.querySelector('#request-status');
function updateSummary() {
  output.replaceChildren();
  for (const field of fields) {
    const row = document.createElement('div');
    const label = document.createElement('dt');
    const value = document.createElement('dd');
    label.textContent = field.dataset.label;
    if (field.tagName === 'FIELDSET') {
      const chosen = [...field.querySelectorAll('input:checked')].map(i => i.value);
      value.textContent = chosen.length ? chosen.join('; ') : 'A reunir antes do contacto';
    } else value.textContent = field.value || 'Por definir com a equipa';
    row.append(label, value); output.append(row);
  }
}
document.querySelectorAll('select,input').forEach(field => field.addEventListener('change', updateSummary));
document.querySelector('#review-summary').addEventListener('click', () => {
  updateSummary(); status.textContent = 'Resumo atualizado. Nada foi enviado.';
  document.querySelector('#request-summary').focus({preventScroll:true});
});
document.querySelector('#reset-request').addEventListener('click', () => {
  document.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
  document.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);
  updateSummary(); status.textContent = 'Escolhas limpas. Pode experimentar outro percurso.';
});
document.querySelectorAll('[data-reference]').forEach(button => button.addEventListener('click', () => {
  const select = document.querySelector('#reference');
  if(select){ select.value = button.dataset.reference; updateSummary(); }
  document.querySelector('#preparar').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  select?.focus({preventScroll:true});
  status.textContent = 'Exemplo acrescentado ao resumo. Pode ajustar as restantes escolhas.';
}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  let shown = 0;
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter !== 'todos' && card.dataset.category !== filter; if(!card.hidden) shown++; });
  document.querySelector('#gallery-status').textContent = shown + (shown === 1 ? ' projeto apresentado.' : ' projetos apresentados.');
}));
updateSummary();
