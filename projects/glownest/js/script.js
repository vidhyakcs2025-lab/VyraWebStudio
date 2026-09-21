/**
 * GLOWNEST Beauty Sanctuary - Interactions & Dynamic Treatment Menu
 * Designed & Built by VYRA Web Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Treatment Pricing Database
  const pricingData = {
    hair: [
      { name: 'Balayage & Dimensional Gloss', cost: '₹8,500', desc: 'Custom hand-painted French balayage, Olaplex molecular bond builder, custom gloss toning, signature blowout.', meta: '150 mins • Senior Colorist' },
      { name: 'Master Haircut & Styling Blowout', cost: '₹2,800', desc: 'Consultation, scalp wellness wash, precision architectural cut, hot tool finish.', meta: '60 mins • Director Stylist' },
      { name: 'K-Water Glass Hair Treatment', cost: '₹3,200', desc: 'Lamellar technology resurfacing treatment providing weightless magnetic shine and frizz eradication.', meta: '45 mins • Instant Results' },
      { name: 'Organic Keratin Smoothing Infusion', cost: '₹7,200', desc: 'Formaldehyde-free vegetal keratin smoothing treatment that relaxes texture for up to 4 months.', meta: '180 mins • Long Lasting' },
      { name: 'Root Conceal & Gloss Refresh', cost: '₹3,900', desc: 'Ammonia-free organic grey coverage paired with luminous gloss glaze through ends.', meta: '75 mins • Maintenance' },
      { name: 'Japanese Head Spa Ritual', cost: '₹4,500', desc: 'Holistic deep scalp exfoliation, steam infusion, acupressure neck massage, lavender sound bath.', meta: '90 mins • Meditative' }
    ],
    skin: [
      { name: 'HydraGlow Botanical Infusion', cost: '₹5,500', desc: 'Medical-grade vortex pore vacuum, AHA/BHA exfoliation, peptide infusion, cryo-sculpting.', meta: '75 mins • Glass Skin' },
      { name: 'Buccal Sculpting Facial Massage', cost: '₹6,200', desc: 'Intra-oral and facial muscle lifting massage to contour jawline, release tension, and drain lymph.', meta: '80 mins • Natural Lift' },
      { name: 'Red-Light Collagen Reset', cost: '₹4,200', desc: 'Targeted photobiomodulation LED therapy combined with plant stem cell hydration mask.', meta: '50 mins • Anti-Aging' },
      { name: 'Pure Clarity Clarifying Treatment', cost: '₹4,800', desc: 'Gentle ultrasonic extractions, tea tree & salicylic peel, high-frequency anti-bacterial wand.', meta: '60 mins • Acne Calm' }
    ],
    nails: [
      { name: 'Japanese Gel Manicure & Russian Care', cost: '₹2,600', desc: 'Dry e-file precision cuticle prep, non-toxic Japanese builder gel, long-wear high gloss.', meta: '75 mins • Lasts 4+ Weeks' },
      { name: 'Rose Quartz Spa Pedicure', cost: '₹3,000', desc: 'Himalayan salt soak, brown sugar scrub, hot stone calf massage, non-toxic breathable lacquer.', meta: '65 mins • Ultra Relaxing' },
      { name: 'Minimalist Gold Leaf Nail Art', cost: '₹1,200', desc: 'Bespoke micro-minimalist accents: foil, chrome glaze, or hand-painted negative space geometry.', meta: 'Add-on • 20 mins' }
    ],
    bridal: [
      { name: 'Dewy Editorial Bridal Glam', cost: '₹18,000', desc: 'High-definition waterproof complexion, bespoke lash cluster architecture, preview trial session.', meta: 'Full Day Concierge' },
      { name: 'Red Carpet Event Styling', cost: '₹6,500', desc: 'Celebrity hair styling and radiant dewy red carpet makeup application in our private suite.', meta: '120 mins • Private Suite' },
      { name: 'Bridal Party Glow Suite (3 Guests)', cost: '₹32,000', desc: 'Exclusive access to our private arch suite with champagne, blowouts, and full-face makeup.', meta: 'Half Day • Exclusive' }
    ]
  };

  // 2. Render Pricing Table
  const pricingContainer = document.getElementById('pricingContainer');
  const pricingTabs = document.querySelectorAll('.pricing-tab');

  function renderPricing(category) {
    if (!pricingContainer || !pricingData[category]) return;
    const items = pricingData[category];
    pricingContainer.innerHTML = items.map(item => `
      <div class="price-item-row">
        <div class="price-item-head">
          <span class="price-item-name">${item.name}</span>
          <span class="price-item-cost">${item.cost}</span>
        </div>
        <p class="price-item-desc">${item.desc}</p>
        <span class="price-item-meta">${item.meta}</span>
      </div>
    `).join('');
  }

  // Initial render
  renderPricing('hair');

  pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pricingTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const cat = tab.getAttribute('data-tab');
      renderPricing(cat);
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

  // 4. Modal Booking Logic
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = [
    document.getElementById('openBookModalBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('bottomBookBtn'),
    document.getElementById('mobileBookBtn')
  ].filter(Boolean);
  const closeModalBtn = document.getElementById('closeModalBtn');
  const appointmentForm = document.getElementById('appointmentForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const treatmentSelect = document.getElementById('treatmentSelect');

  function openBookingModal(presetService = null) {
    if (!bookingModal) return;
    if (presetService && treatmentSelect) {
      // Find matching or add option
      let found = false;
      for (let i = 0; i < treatmentSelect.options.length; i++) {
        if (treatmentSelect.options[i].value.includes(presetService) || presetService.includes(treatmentSelect.options[i].value)) {
          treatmentSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        const opt = new Option(presetService, presetService, true, true);
        treatmentSelect.add(opt);
      }
    }
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (bookingSuccess) bookingSuccess.classList.add('hidden');
      if (appointmentForm) {
        appointmentForm.style.display = 'flex';
        appointmentForm.reset();
      }
    }, 300);
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', () => openBookingModal()));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeBookingModal);

  // Quick book triggers on cards
  const bookTriggers = document.querySelectorAll('.book-trigger');
  bookTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = trigger.getAttribute('data-service');
      openBookingModal(serviceName);
    });
  });

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appointmentForm.style.display = 'none';
      if (bookingSuccess) {
        bookingSuccess.classList.remove('hidden');
      }
    });
  }

  // Pre-fill tomorrow
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowStr = today.toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.value = tomorrowStr;
    input.min = tomorrowStr;
  });
});
