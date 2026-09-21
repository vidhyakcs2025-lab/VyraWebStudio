/**
 * LUMA Coffee & Kitchen - Frontend Interactions
 * Designed & Built by VYRA Web Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Items Data
  const menuData = {
    espresso: [
      { name: 'Double Shot Cortado', price: '₹220', desc: 'Equal parts single-estate espresso and textured silky steamed milk served in a faceted Gibraltar glass.', tags: ['Specialty Coffee', 'House Roast'] },
      { name: 'Silky Flat White', price: '₹240', desc: 'Double ristretto with micro-textured velvety whole milk (or organic oat milk). Delicate caramel & roasted hazelnut notes.', tags: ['Customer Favorite', 'Velvety'] },
      { name: 'Spanish Honey Latte', price: '₹260', desc: 'Espresso pulled over wild forest honey, condensed milk, and cinnamon dust.', tags: ['Sweet & Spiced'] },
      { name: 'Cascara Tonic Espresso', price: '₹280', desc: 'Chilled artisanal Indian tonic topped with a floating double espresso and fresh blood orange peel.', tags: ['Cold', 'Refreshing'] },
      { name: 'Classic Cappuccino', price: '₹230', desc: 'Traditional dry or wet foam with dusted dark Valrhona cocoa.', tags: ['Traditional'] },
      { name: 'Iced Vanilla Oat Shakerato', price: '₹270', desc: 'Espresso vigorously hand-shaken with Madagascar vanilla syrup, ice, and cold oat milk.', tags: ['Iced', 'Plant Milk'] }
    ],
    pourover: [
      { name: 'V60 Ethiopian Yirgacheffe G1', price: '₹290', desc: 'Washed process. Bergamot, jasmine blossom aroma, juicy peach acidity and clean black tea finish.', tags: ['Light Roast', 'Floral'] },
      { name: 'Chemex Chikmagalur Estate Reserve', price: '₹270', desc: 'Anaerobic slow fermentation. Ripe plum, raw sugarcane, dark chocolate, and spiced molasses.', tags: ['Direct Trade', 'Medium Body'] },
      { name: 'Aeropress Kennebunk Honey Process', price: '₹280', desc: 'Full-bodied extraction highlighting candied orange, brown butter, and almond praline.', tags: ['Rich', 'Single Origin'] },
      { name: 'Slow Cold Drip (20hr Steep)', price: '₹310', desc: 'Ice-drip tower extraction served on an artisanal sphere ice block. Extremely smooth with zero bitterness.', tags: ['Limited Batch', 'Intense'] }
    ],
    bakery: [
      { name: 'Cardamom & Orange Morning Bun', price: '₹240', desc: 'Slow-laminated flaky croissant dough infused with cracked green cardamom and orange zest.', tags: ['Baked Daily', 'Signature'] },
      { name: 'Twice-Baked Almond Croissant', price: '₹280', desc: 'Filled with rich frangipane almond cream, soaked in vanilla syrup, topped with toasted flaked almonds.', tags: ['Bestseller'] },
      { name: 'Valrhona Dark Chocolate Babka', price: '₹260', desc: 'Braided brioche ribboned with 70% dark chocolate ganache, sea salt flakes, and hazelnut crumb.', tags: ['Decadent'] },
      { name: 'Seeded Wild Sourdough Loaf (Take Home)', price: '₹320', desc: 'Whole artisan loaf fermented for 36 hours. Crisp crackling blistered crust with airy open crumb.', tags: ['Whole Loaf', 'Vegan'] }
    ],
    kitchen: [
      { name: 'Poached Egg & Avocado Tartine', price: '₹420', desc: 'Thick sliced sourdough, creamy Hass avocado, poached farm eggs, chili crunch, micro-coriander.', tags: ['Vegetarian', 'Breakfast Classic'] },
      { name: 'Truffled Wild Mushroom Toast', price: '₹440', desc: 'Pan-roasted oyster & shiitake mushrooms, garlic confit, cashew thyme spread on toasted sourdough.', tags: ['Vegan', 'Earthy'] },
      { name: 'Whipped Ricotta & Honey Pancakes', price: '₹390', desc: 'Fluffy soufflé hotcakes topped with whipped lemon ricotta, wild honey honeycomb, and seasonal berries.', tags: ['Sweet Brunch'] },
      { name: 'Turkish Cilbir Poached Eggs', price: '₹380', desc: 'Two soft poached eggs nestled on garlicky Greek yogurt, swimming in warm Aleppo chili browned butter with warm flatbread.', tags: ['Savory', 'House Special'] }
    ]
  };

  // 2. Render Menu Items
  const menuContainer = document.getElementById('menuItemsContainer');
  const menuTabs = document.querySelectorAll('.menu-tab');

  function renderMenu(category) {
    if (!menuContainer || !menuData[category]) return;
    
    const items = menuData[category];
    menuContainer.innerHTML = items.map(item => `
      <div class="menu-line-item">
        <div class="line-item-top">
          <span class="item-name">${item.name}</span>
          <span class="item-dots"></span>
          <span class="item-price">${item.price}</span>
        </div>
        <p class="item-desc">${item.desc}</p>
        <div class="item-tags">
          ${item.tags.map(tag => `<span class="item-tag">• ${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderMenu('espresso');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const cat = tab.getAttribute('data-category');
      renderMenu(cat);
    });
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 4. Table Reservation Modal Logic
  const reserveModal = document.getElementById('reserveModal');
  const openModalBtns = [
    document.getElementById('openReserveModalBtn'),
    document.getElementById('heroReserveBtn'),
    document.getElementById('mobileReserveBtn')
  ].filter(Boolean);
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalForm = document.getElementById('modalReservationForm');
  const reservationSuccess = document.getElementById('reservationSuccess');

  function openModal() {
    if (reserveModal) {
      reserveModal.classList.add('open');
      reserveModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (reserveModal) {
      reserveModal.classList.remove('open');
      reserveModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      // Reset form view after delay
      setTimeout(() => {
        if (reservationSuccess) reservationSuccess.classList.add('hidden');
        if (modalForm) {
          modalForm.style.display = 'flex';
          modalForm.reset();
        }
      }, 300);
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (reserveModal) {
    reserveModal.addEventListener('click', (e) => {
      if (e.target === reserveModal) closeModal();
    });
  }

  // Form submission simulated
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalForm.style.display = 'none';
      if (reservationSuccess) {
        reservationSuccess.classList.remove('hidden');
      }
    });
  }

  // Inline form submission
  const inlineForm = document.getElementById('inlineReservationForm');
  if (inlineForm) {
    inlineForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your table request has been received. (Demonstration project built by VYRA Web Studio)');
      inlineForm.reset();
    });
  }

  // Auto set tomorrow's date for date inputs
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowStr = today.toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.value = tomorrowStr;
    input.min = tomorrowStr;
  });
});
