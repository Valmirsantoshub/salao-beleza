const produtos = [
    { id: 1, nome: "Camisa Social Slim", categoria: "masculino", preco: 159.90, precoAntigo: null, imagem: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600", descricao: "Camisa social slim fit premium", novo: true, promocao: false },
    { id: 2, nome: "Vestido Floral", categoria: "feminino", preco: 189.90, precoAntigo: 249.90, imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", descricao: "Vestido floral elegante", novo: false, promocao: true },
    { id: 3, nome: "Conjunto Infantil", categoria: "infantil", preco: 89.90, precoAntigo: null, imagem: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600", descricao: "Conjunto confortável para crianças", novo: true, promocao: false },
    { id: 4, nome: "Relógio Clássico", categoria: "acessorios", preco: 299.90, precoAntigo: 399.90, imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600", descricao: "Relógio clássico sofisticado", novo: false, promocao: true },
    { id: 5, nome: "Calça Jeans Masculina", categoria: "masculino", preco: 199.90, precoAntigo: null, imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600", descricao: "Jeans masculino premium", novo: false, promocao: false },
    { id: 6, nome: "Blusa Tricot Feminina", categoria: "feminino", preco: 129.90, precoAntigo: 179.90, imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600", descricao: "Blusa de tricot confortável", novo: true, promocao: true },
    { id: 7, nome: "Tênis Infantil", categoria: "infantil", preco: 119.90, precoAntigo: null, imagem: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600", descricao: "Tênis colorido para crianças", novo: false, promocao: false },
    { id: 8, nome: "Óculos de Sol", categoria: "acessorios", preco: 159.90, precoAntigo: 219.90, imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", descricao: "Óculos de sol moderno", novo: false, promocao: true },
    { id: 9, nome: "Blazer Masculino", categoria: "masculino", preco: 349.90, precoAntigo: null, imagem: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600", descricao: "Blazer elegante premium", novo: true, promocao: false },
    { id: 10, nome: "Saia Midi", categoria: "feminino", preco: 139.90, precoAntigo: null, imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600", descricao: "Saia midi versátil", novo: true, promocao: false },
    { id: 11, nome: "Mochila Infantil", categoria: "infantil", preco: 79.90, precoAntigo: 99.90, imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600", descricao: "Mochila colorida para escola", novo: false, promocao: true },
    { id: 12, nome: "Bolsa Feminina", categoria: "acessorios", preco: 249.90, precoAntigo: 329.90, imagem: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600", descricao: "Bolsa elegante de couro", novo: false, promocao: true }
];

let carrinho = [];

document.addEventListener('DOMContentLoaded', function() {
    inicializarSite();
});

function inicializarSite() {
    configurarMenu();
    configurarBusca();
    configurarCarrinho();
    carregarProdutos();
    configurarFormularios();
    carregarCarrinhoLocalStorage();
}

function configurarMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => { navLinks.classList.remove('active'); });
    });
}

function configurarBusca() {
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    searchIcon.addEventListener('click', () => { searchBar.classList.add('active'); searchInput.focus(); });
    closeSearch.addEventListener('click', () => { searchBar.classList.remove('active'); searchInput.value = ''; });
    searchInput.addEventListener('input', (e) => { buscarProdutos(e.target.value); });
}

function configurarCarrinho() {
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    cartIcon.addEventListener('click', () => { cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); });
    closeCart.addEventListener('click', () => { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); });
    cartOverlay.addEventListener('click', () => { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); });
}

function carregarProdutos() {
    const novidadesGrid = document.getElementById('novidades-grid');
    const promocoesGrid = document.getElementById('promocoes-grid');
    const produtosGrid = document.getElementById('produtos-grid');
    const novidades = produtos.filter(p => p.novo).slice(0, 4);
    const promocoes = produtos.filter(p => p.promocao).slice(0, 4);
    novidadesGrid.innerHTML = novidades.map(produto => criarCardProduto(produto)).join('');
    promocoesGrid.innerHTML = promocoes.map(produto => criarCardProduto(produto)).join('');
    produtosGrid.innerHTML = produtos.map(produto => criarCardProduto(produto)).join('');
}

function criarCardProduto(produto) {
    const badge = produto.novo ? '<div class="produto-badge">Novo</div>' : produto.promocao ? '<div class="produto-badge">Promoção</div>' : '';
    const precoAntigo = produto.precoAntigo ? `<span class="old-price">R$ ${produto.precoAntigo.toFixed(2)}</span>` : '';
    return `<div class="produto-card" data-categoria="${produto.categoria}"><div class="produto-image" style="background-image: url('${produto.imagem}')">${badge}</div><div class="produto-info"><h3>${produto.nome}</h3><p>${produto.descricao}</p><div class="produto-price"><div><span class="price">R$ ${produto.preco.toFixed(2)}</span>${precoAntigo}</div></div><button class="btn-add-cart" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button></div></div>`;
}

function filterProducts(categoria) {
    const produtosGrid = document.getElementById('produtos-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    const produtosFiltrados = categoria === 'todos' ? produtos : categoria === 'promocao' ? produtos.filter(p => p.promocao) : produtos.filter(p => p.categoria === categoria);
    produtosGrid.innerHTML = produtosFiltrados.map(produto => criarCardProduto(produto)).join('');
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}

function buscarProdutos(termo) {
    const produtosGrid = document.getElementById('produtos-grid');
    const termoLower = termo.toLowerCase();
    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(termoLower) || p.descricao.toLowerCase().includes(termoLower) || p.categoria.toLowerCase().includes(termoLower));
    if (termo.length > 0) {
        produtosGrid.innerHTML = produtosFiltrados.map(produto => criarCardProduto(produto)).join('');
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    } else {
        produtosGrid.innerHTML = produtos.map(produto => criarCardProduto(produto)).join('');
    }
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) { itemExistente.quantidade++; } else { carrinho.push({ ...produto, quantidade: 1 }); }
    atualizarCarrinho();
    salvarCarrinhoLocalStorage();
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999;">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        cartCount.textContent = '0';
        return;
    }
    cartItems.innerHTML = carrinho.map(item => `<div class="cart-item"><div class="cart-item-image" style="background-image: url('${item.imagem}')"></div><div class="cart-item-info"><h4>${item.nome}</h4><div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div><div class="cart-item-quantity"><button onclick="alterarQuantidade(${item.id}, -1)">-</button><span>${item.quantidade}</span><button onclick="alterarQuantidade(${item.id}, 1)">+</button></div></div><i class="fas fa-trash cart-item-remove" onclick="removerDoCarrinho(${item.id})"></i></div>`).join('');
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    cartCount.textContent = totalItens;
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) { removerDoCarrinho(id); } else { atualizarCarrinho(); salvarCarrinhoLocalStorage(); }
    }
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
    salvarCarrinhoLocalStorage();
}

function salvarCarrinhoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinhoLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) { carrinho = JSON.parse(carrinhoSalvo); atualizarCarrinho(); }
}

function configurarFormularios() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    contactForm.addEventListener('submit', (e) => { e.preventDefault(); alert('Mensagem enviada com sucesso! Entraremos em contato em breve.'); contactForm.reset(); });
    newsletterForms.forEach(form => { form.addEventListener('submit', (e) => { e.preventDefault(); alert('Obrigado por se inscrever em nossa newsletter!'); form.reset(); }); });
    const checkoutBtn = document.querySelector('.btn-checkout');
    checkoutBtn.addEventListener('click', () => { if (carrinho.length === 0) { alert('Seu carrinho está vazio!'); return; } alert('Redirecionando para o checkout...'); });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});
