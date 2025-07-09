const container  = document.querySelector('.stories-grid');
const sortSelect = document.getElementById('sortOrder');

let originalTestimonials = [];

// 1) Load & render original
fetch('data/testimonials.json')
  .then(res => res.json())
  .then(data => {
    originalTestimonials = data.slice();  
    renderTestimonials(originalTestimonials);
  })
  .catch(err => console.error('Failed to load testimonials:', err));

// 2) Render helper
function renderTestimonials(list) {
  container.innerHTML = '';
  list.forEach(item => {
    const story = document.createElement('div');
    story.className = 'story-item';
    story.innerHTML = `
      <div class="story-logo">
        <img src="${item.logo}" alt="${item.brand}">
      </div>
      <blockquote>${item.quote}</blockquote>
      <div class="story-author">
        <img src="${item.author.avatar}" alt="${item.author.name}">
        <div class="author-info">
          <span class="author-name">${item.author.name}</span>
          <span class="author-role">${item.author.role}</span>
        </div>
      </div>
    `;
    container.appendChild(story);
  });
}

// 3) Handle select changes
sortSelect.addEventListener('change', () => {
  const mode = sortSelect.value;
  let toRender;

  if (mode === 'asc') {
    toRender = originalTestimonials
      .slice()
      .sort((a, b) => a.brand.localeCompare(b.brand));
  }
  else if (mode === 'desc') {
    toRender = originalTestimonials
      .slice()
      .sort((a, b) => b.brand.localeCompare(a.brand));
  }
  else {  // "none"
    toRender = originalTestimonials.slice();
  }

  renderTestimonials(toRender);
});
