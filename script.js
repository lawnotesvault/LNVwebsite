// ─── DATA ───
const products = [
  {
    id: 1,
    name: "Constitutional Law VOL I",
    subtitle: "LNV Flagship Edition",
    emoji: "🏛️",
    color: "#8B1A1A",
    colorLight: "#B22222",
    price: 129,
    badge: "FLAGSHIP EDITION",
    samplePages: true,
    coverImg: "assets/cover.jpg",
    shortDesc: "The most comprehensive, exam-focused Constitutional Law notes for BA LL.B & LL.B students — structured, case-rich, and judiciary-ready.",
    description: "Constitutional Law VOL I by Law Notes Vault is a meticulously structured, exam-oriented PDF note covering Articles 1–32 of the Indian Constitution in depth. Designed for BA LL.B and LL.B students preparing for semester examinations and Judiciary Services, this flagship edition distils complex constitutional provisions into clear, revision-friendly content — complete with landmark Supreme Court cases, doctrinal analysis, and bare act simplification.",
    pages: 50,
    whatsInside: [
      "Articles 1–32 Covered",
      "Fundamental Rights Explained",
      "Landmark Supreme Court Cases",
      "Important Constitutional Doctrines",
      "Bare Act Language Simplified",
      "Exam-Oriented Questions & Answers",
      "Quick Revision Notes & Charts",
      "Judiciary & University Exam Friendly"
    ],
    topics: ["Preamble & Nature of Constitution", "Fundamental Rights (Art. 12–32)", "Right to Equality (Art. 14–18)", "Right to Freedom (Art. 19–22)", "Right Against Exploitation (Art. 23–24)", "Right to Freedom of Religion (Art. 25–28)", "Cultural & Educational Rights (Art. 29–30)", "Right to Constitutional Remedies (Art. 32)", "Judicial Review & Basic Structure Doctrine", "Landmark Supreme Court Cases"],
    features: ["50+ landmark case summaries with ratio decidendi", "Article-wise explanations in plain language", "Doctrines: Basic Structure, Harmonious Construction", "Previous year question hints embedded", "Revision tables for quick recap", "Exam pattern-aligned structure"],
    faqs: [
      { q: "Is this suitable for 1st year LLB students?", a: "Yes, this note covers the Constitutional Law syllabus for both LLB (3rd/4th semester) and BA LLB 5-year programs. It is also useful for Judiciary aspirants." },
      { q: "Does it cover the latest amendments?", a: "Yes, the notes are updated to include recent constitutional amendments and significant Supreme Court judgements." },
      { q: "How will I receive the PDF?", a: "After you place your order and complete payment via WhatsApp, the PDF will be delivered to your WhatsApp number immediately." },
      { q: "Is VOL 2 available?", a: "VOL I covers Articles 1–32. VOL II covering DPSP, Fundamental Duties, and Emergency Provisions is coming soon. Stay tuned." }
    ]
  }
];

const faqs = [
  { q: "How do I receive my notes after payment?", a: "After you click 'Buy Now' or 'Proceed to Checkout', you'll be directed to WhatsApp with a pre-filled message. Share your payment confirmation and your PDF notes will be delivered to you on WhatsApp within hours." },
  { q: "What payment methods do you accept?", a: "We accept all major payment modes including UPI (GPay, PhonePe, Paytm), bank transfer, and other common payment methods. Payment details are shared via WhatsApp when you place your order." },
  { q: "Can I buy multiple subjects together?", a: "Yes! You can add multiple subjects to your cart and place a combined order. The WhatsApp message will automatically include all subjects and the total amount." },
  { q: "Are these notes updated with the latest laws?", a: "Yes, our notes are regularly updated to reflect recent amendments, new legislation (like BNS 2023), and significant Supreme Court judgements." },
  { q: "Are these notes sufficient for Judiciary exams?", a: "Our notes are designed to cover both university semester exams and Judiciary Services examinations. They include landmark case laws, important doctrines, and exam-relevant distinctions that judiciary aspirants need." },
  { q: "What format are the notes in?", a: "All notes are provided as PDF files. They are optimised for both mobile and desktop viewing and can be printed if desired." },
  { q: "Is there a refund policy?", a: "As our products are digital files, we do not offer refunds once the PDF has been delivered. Please read the product description carefully before purchasing. If you have any concerns, contact us on WhatsApp before ordering." },
  { q: "Can I share these notes with others?", a: "No. Our notes are for personal use only. Sharing, selling, or reproducing the notes without permission is a violation of our terms and copyright law." }
];

// ─── STATE ───
let cart = [];
let currentProduct = null;

// ─── NAVIGATION ───
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId + '-page');
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
  }
  // Render cart when shown
  if (pageId === 'cart') renderCart();
  // Render FAQ when shown
  if (pageId === 'faq') renderFAQ();
}

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
}

function scrollToCatalogue() {
  showPage('home');
  setTimeout(() => {
    document.getElementById('catalogue-section').scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// ─── CATALOGUE ───
function renderCatalogue() {
  const grid = document.getElementById('catalogueGrid');
  const p = products[0]; // Flagship only
  grid.innerHTML = `
    <div class="flagship-card" onclick="openProduct(${p.id})">

      <!-- Left: Cover Visual -->
      <div class="flagship-cover">
        <div class="flagship-cover-inner" style="${p.coverImg ? 'background:none;padding:0;' : 'background: linear-gradient(145deg, ' + p.color + ' 0%, ' + p.colorLight + ' 60%, #C0392B 100%);'}">
          ${p.coverImg
            ? '<img src="' + p.coverImg + '" alt="' + p.name + ' Cover" style="width:100%;height:100%;object-fit:cover;display:block;">'
            : '<div class=\"flagship-cover-emblem\">' + p.emoji + '</div><div class=\"flagship-cover-vol\">VOL I</div><div class=\"flagship-cover-brand\">LNV</div>'
          }
        </div>
        <div class="flagship-badge-wrap">
          <span class="flagship-badge">★ ${p.badge}</span>
        </div>
      </div>

      <!-- Right: Content -->
      <div class="flagship-body">

        <div class="flagship-eyebrow">Constitutional Law · Digital PDF Notes</div>
        <h3 class="flagship-title">${p.name} <span class="flagship-title-sub">– LNV</span></h3>
        <p class="flagship-desc">${p.shortDesc}</p>

        <!-- Meta pills -->
        <div class="flagship-meta">
          <div class="flagship-meta-pill">📄 ${p.pages}+ Pages</div>
          <div class="flagship-meta-pill">⚖️ ${p.topics.length} Topics</div>
          <div class="flagship-meta-pill">📱 Instant PDF</div>
        </div>

        <!-- What's Inside -->
        <div class="flagship-inside">
          <div class="flagship-inside-title">What's Inside</div>
          <div class="flagship-inside-grid">
            ${p.whatsInside.map(item => `
              <div class="flagship-inside-item">
                <span class="flagship-check">✓</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Footer -->
        <div class="flagship-footer">
          <div class="flagship-price-block">
            <div class="flagship-price">₹${p.price}</div>
            <div class="flagship-price-note">One-time · Lifetime Access</div>
          </div>
          <div class="flagship-actions">
            <button class="flagship-btn-primary" onclick="event.stopPropagation(); openCheckout(${p.id})">Buy Now</button>
            <button class="flagship-btn-secondary" onclick="event.stopPropagation(); openProduct(${p.id})">View Details</button>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ─── PRODUCT DETAIL ───
function openProduct(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;
  const p = currentProduct;

  document.getElementById('detailLayout').innerHTML = `
    <div class="detail-cover">
      <div class="detail-cover-img" style="${p.coverImg ? 'background:none;padding:0;overflow:hidden;' : 'background: linear-gradient(135deg, ' + p.color + ', ' + p.colorLight + ');'}">
        ${p.coverImg
          ? '<img src="' + p.coverImg + '" alt="' + p.name + ' Cover" style="width:100%;height:100%;object-fit:cover;display:block;">'
          : '<div style=\"font-size:5rem; opacity:0.9;\">' + p.emoji + '</div>'
        }
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn-buynow" style="flex:1;" onclick="openCheckout(${p.id})">Buy Now – ₹${p.price}</button>
        <button class="btn-addcart" style="flex:1;" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
      <div style="margin-top:12px; padding:14px; background:var(--ivory); border-radius:2px; font-size:0.8rem; color:var(--grey-mid); line-height:1.55;">
        📲 Order via WhatsApp. PDF delivered instantly after payment.
      </div>
    </div>
    <div class="detail-info">
      <div class="section-label">${p.badge || 'Premium Notes'}</div>
      <h1 class="detail-title">${p.name}</h1>
      <div class="detail-price-row">
        <div class="detail-price">₹${p.price}</div>
        <div class="detail-price-note">Digital PDF</div>
      </div>
      <p class="detail-desc">${p.description}</p>

      <!-- Sample Pages Block (shown only when product has samplePages) -->
      ${p.samplePages ? `
      <div class="sample-preview-block">
        <p class="sample-preview-intro">Preview actual pages from <strong>${p.name} – LNV</strong> before purchasing. See the exact structure, depth, and quality of the notes.</p>
        <button class="btn-sample-pages" onclick="openSampleModal()">
          <span class="sample-icon">📄</span> View Sample Pages
        </button>
      </div>
      ` : ''}

      <div class="detail-meta">
        <div class="detail-meta-item">
          <div class="detail-meta-num">${p.pages}+</div>
          <div class="detail-meta-label">Pages</div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-num">${p.topics.length}</div>
          <div class="detail-meta-label">Topics</div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-num">PDF</div>
          <div class="detail-meta-label">Format</div>
        </div>
      </div>

      <div class="detail-section-title">Topics Covered</div>
      <div class="topics-grid" style="margin-bottom:32px;">
        ${p.topics.map(t => `<div class="topic-item">${t}</div>`).join('')}
      </div>

      <div class="detail-section-title">Key Features</div>
      <div class="features-list" style="margin-bottom:32px;">
        ${p.features.map(f => `<div class="feature-item">${f}</div>`).join('')}
      </div>

      <div class="detail-section-title">FAQ</div>
      ${p.faqs.map((faq, i) => `
        <div class="faq-item">
          <button class="faq-q" onclick="toggleFAQ(this)">
            ${faq.q}
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-a">${faq.a}</div>
        </div>
      `).join('')}
    </div>
  `;

  showPage('product-detail');
}

function toggleFAQ(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  if (answer.style.display === 'block') {
    answer.style.display = 'none';
    icon.textContent = '+';
    icon.style.transform = '';
  } else {
    answer.style.display = 'block';
    icon.textContent = '−';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ─── FAQ PAGE ───
function renderFAQ() {
  document.getElementById('faqList').innerHTML = faqs.map(f => `
    <div class="faq-item">
      <button class="faq-q" onclick="toggleFAQ(this)">
        ${f.q}
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

// ─── CART ───
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (cart.find(x => x.id === id)) {
    showToast(`"${p.name}" is already in your cart.`);
    return;
  }
  cart.push(p);
  updateCartCount();
  showToast(`"${p.name}" added to cart! 🛒`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summaryContainer = document.getElementById('cartSummary');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p class="cart-empty-text">Your cart is empty. Browse our notes to add subjects.</p>
        <button class="btn-primary" style="margin-top:24px;" onclick="showPage('home'); scrollToCatalogue()">Explore Notes</button>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(p => `
    <div class="cart-item">
      <div class="cart-item-icon" style="background: linear-gradient(135deg, ${p.color}, ${p.colorLight});">
        ${p.emoji}
      </div>
      <div class="cart-item-name">${p.name}</div>
      <div class="cart-item-price">₹${p.price}</div>
      <button class="cart-item-remove" onclick="removeFromCart(${p.id})">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  summaryContainer.innerHTML = `
    <div class="cart-summary">
      <div class="cart-total-row">
        <div class="cart-total-label">Total (${cart.length} subject${cart.length > 1 ? 's' : ''})</div>
        <div class="cart-total-amount">₹${total}</div>
      </div>
      <button class="btn-checkout" onclick="checkoutCart()">Proceed to Checkout via WhatsApp</button>
    </div>
  `;
}

// ─── WHATSAPP ───
function buyNow(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const msg = `Hello Law Notes Vault,

I would like to place an order.

Subject: ${p.name}
Price: ₹${p.price}

Please share the payment details.

Thank you.`;
  openWhatsApp(msg);
}

function checkoutCart() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const productLines = cart.map(p => `- ${p.name} – ₹${p.price}`).join('\n');
  const msg = `Hello Law Notes Vault,

I would like to place an order.

Products:
${productLines}

Total: ₹${total}

Please share the payment details.

Thank you.`;
  openWhatsApp(msg);
}

function openWhatsApp(msg) {
  const number = '918052950790';
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${number}?text=${encoded}`, '_blank');
}

// ─── TOAST ───
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}


// ─── SCROLL REVEAL for testimonials ───
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function observeCards() {
    document.querySelectorAll('.testimonial-card').forEach(card => {
      observer.observe(card);
    });
  }

  // Run on DOM ready and whenever page changes
  observeCards();
  const origShowPage = window.showPage;
  if (origShowPage) {
    window.showPage = function(id) {
      origShowPage(id);
      setTimeout(observeCards, 100);
    };
  }
})();


// ─── HOME FAQ ACCORDION ───
function toggleHomeFAQ(btn) {
  const item = btn.closest('.home-faq-item');
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.home-faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}







// ─── SAMPLE PAGES MODAL ───
const smSlides = [{num:"01",topic:"Constitutionalism",sub:"Foundation & Constitutional Concepts",src:"assets/sample_0.png"},{num:"02",topic:"Article 32",sub:"Heart & Soul of the Constitution",src:"assets/sample_1.png"},{num:"03",topic:"Article 19",sub:"Protection of Freedom",src:"assets/sample_2.png"},{num:"04",topic:"Landmark Cases",sub:"Under Article 19",src:"assets/sample_3.png"},{num:"05",topic:"Article 21",sub:"Right to Life",src:"assets/sample_4.png"},{num:"06",topic:"Article 13",sub:"Laws Inconsistent with Fundamental Rights",src:"assets/sample_5.png"}];
let smCurrent = 0;

function openSampleModal() {
  smGoTo(0);
  document.getElementById('sample-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSampleModal() {
  document.getElementById('sample-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function smOutsideClose(e) {
  if (e.target.id === 'sample-modal') closeSampleModal();
}
function smNav(dir) {
  smGoTo((smCurrent + dir + smSlides.length) % smSlides.length);
}
function smGoTo(i) {
  smCurrent = i;
  const s = smSlides[i];
  const img = document.getElementById('smMainImg');
  img.classList.add('fading');
  setTimeout(() => {
    img.src = s.src;
    img.classList.remove('fading');
  }, 150);
  document.getElementById('smPageNum').textContent  = 'Page ' + s.num;
  document.getElementById('smPageTopic').textContent = s.topic;
  document.getElementById('smPageSub').textContent   = s.sub;
  document.getElementById('smCounter').textContent   = 'Page ' + (+s.num) + ' of ' + smSlides.length;
  // Thumbnails
  document.querySelectorAll('.sm-thumb').forEach((t,j)  => t.classList.toggle('active', j===i));
  // Sidebar list
  document.querySelectorAll('.sm-page-item').forEach((t,j)=> t.classList.toggle('active', j===i));
  // Scroll active thumb into view
  const strip = document.getElementById('smThumbStrip');
  const thumb = strip.querySelectorAll('.sm-thumb')[i];
  if (thumb) thumb.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
}
document.addEventListener('keydown', e => {
  const modal = document.getElementById('sample-modal');
  if (!modal.classList.contains('open')) return;
  if (e.key === 'ArrowRight') smNav(1);
  if (e.key === 'ArrowLeft')  smNav(-1);
  if (e.key === 'Escape')     closeSampleModal();
});


// ─── CHECKOUT MODAL ───
let coProduct = null;
let upiOpen = false, cardOpen = false;

function openCheckout(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  coProduct = p;
  document.getElementById('coTitle').textContent      = p.name + ' – LNV';
  document.getElementById('coPriceAmount').textContent = '₹' + p.price;
  document.getElementById('coProdName').textContent    = p.name;
  document.getElementById('coProdIcon').textContent    = p.emoji;
  document.getElementById('coUpiAmt').textContent      = p.price;
  // Reset panels
  upiOpen = false; cardOpen = false;
  document.getElementById('upiPanel').classList.remove('open');
  document.getElementById('cardPanel').classList.remove('open');
  document.getElementById('upiArrow').textContent = '↓';
  document.getElementById('cardArrow').textContent = '↓';
  document.getElementById('checkout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
  document.body.style.overflow = '';
}
function checkoutOutsideClose(e) {
  if (e.target.id === 'checkout-modal') closeCheckout();
}
function checkoutWhatsApp() {
  if (!coProduct) return;
  closeCheckout();
  const msg = `Hello Law Notes Vault,

I would like to place an order.

Subject: ${coProduct.name}
Price: ₹${coProduct.price}

Please share the payment details.

Thank you.`;
  openWhatsApp(msg);
}
function toggleUPI() {
  upiOpen = !upiOpen;
  document.getElementById('upiPanel').classList.toggle('open', upiOpen);
  document.getElementById('upiArrow').textContent = upiOpen ? '↑' : '↓';
  if (cardOpen) {
    cardOpen = false;
    document.getElementById('cardPanel').classList.remove('open');
    document.getElementById('cardArrow').textContent = '↓';
  }
}
function toggleCard() {
  cardOpen = !cardOpen;
  document.getElementById('cardPanel').classList.toggle('open', cardOpen);
  document.getElementById('cardArrow').textContent = cardOpen ? '↑' : '↓';
  if (upiOpen) {
    upiOpen = false;
    document.getElementById('upiPanel').classList.remove('open');
    document.getElementById('upiArrow').textContent = '↓';
  }
}
// Keyboard close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCheckout();
  }
});

// ─── INIT ───
renderCatalogue();
renderFAQ();