const games = [
  {
    id: 1,
    title: 'EA SPORTS UFC 6',
    status: 'Jogado',
    cover: 'ufc6bpesq.webp'
  },
  {
    id: 2,
    title: 'Valorant',
    status: 'Em progresso',
    cover: 'valorant.webp'
  },
  {
    id: 3,
    title: 'GTA VI',
    status: 'Na lista',
    cover: 'gta6.png'
  },
  {
    id: 4,
    title: 'EA FC 27',
    status: 'Jogado',
    cover: 'eafc27.jpg'
  },
  {
    id: 5,
    title: 'NBA 2K26',
    status: 'Novo',
    cover: 'nba2k26.jpg'
  },
  {
    id: 6,
    title: 'Car Mechanic Simulator',
    status: 'Jogado',
    cover: 'cobuk6.webp'
  }
];

const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('librarySearch');

function renderGames() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredGames = games.filter((game) => {
    return game.title.toLowerCase().includes(searchTerm);
  });

  if (filteredGames.length === 0) {
    gamesGrid.innerHTML = '<div class="empty-state">Nenhum jogo encontrado na sua biblioteca.</div>';
    return;
  }

  gamesGrid.innerHTML = filteredGames.map((game) => `
    <article class="game-card">
      <img class="game-cover" src="${game.cover}" alt="${game.title}">
      <div class="game-info">
        <span class="meta-status">${game.status}</span>
        <h3 class="game-title">${game.title}</h3>

        <div class="game-actions">
          <button type="button" class="btn-primary">Abrir</button>
          <button type="button" class="btn-secondary">Detalhes</button>
        </div>
      </div>
    </article>
  `).join('');
}

searchInput.addEventListener('input', renderGames);
renderGames();

const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartWrap = document.querySelector('.cart-wrap');

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('playmash_cart') || '[]');
  const total = cart.reduce((sum, item) => sum + Number(item.qty || 1), 0);

  if (total > 0) {
    cartWrap.classList.add('has-item');
    cartBadge.textContent = total;
  } else {
    cartWrap.classList.remove('has-item');
    cartBadge.textContent = '';
  }
}

if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    window.location.href = 'carrinho.html';
  });
}

if (document.getElementById('perfilBtn')) {
  document.getElementById('perfilBtn').addEventListener('click', () => {
    window.location.href = 'confperfil.html';
  });
}

updateCartBadge();