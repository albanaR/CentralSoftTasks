(async function initCompanyInfo() {

  // 1) load data
  let companies;
  try {
    const res = await fetch('data/companies.json');
    companies = await res.json();
    console.log(`🔸 Loaded ${companies.length} companies`);
  } catch (err) {
    console.error('❌ Could not load companies.json', err);
    return;
  }

  // 2) grab DOM nodes
  const modal    = document.getElementById('company-modal');
  const imgEl    = document.getElementById('modal-image');
  const nameEl   = document.getElementById('modal-name');
  const descEl   = document.getElementById('modal-description');
  const closeBtn = document.getElementById('modal-close');
  const trackEl  = document.querySelector('.trusted-slider-track');

  if (!modal || !trackEl) {
    console.error('❌ Missing required DOM elements');
    return;
  }

  // helper to open modal
  function openModal(id) {
    const company = companies.find(c => c.id === id);
    if (!company) return console.warn('⚠️ No company for id', id);
    imgEl.src          = company.image;
    imgEl.alt          = company.name;
    nameEl.textContent = company.name;
    descEl.textContent = company.description;
    modal.classList.remove('hidden');
  }

  // 3) delegate click on track
  trackEl.addEventListener('click', e => {
    const img = e.target.closest('img[data-id]');
    if (!img) return;
    console.log('🔍 clicked image id=', img.dataset.id);
    openModal(Number(img.dataset.id));
  });

  // 4) close handlers
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

})();

