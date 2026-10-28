/* SILRS Mobile — interaksi demonstrasi.
   Tidak ada autentikasi, database, atau data medis sungguhan. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Splash screen. Timer dibersihkan jika pengguna melewati animasi.
  const splash = $('#splashScreen');
  if (splash) {
    let redirected = false;
    const navigate = () => {
      if (redirected) return;
      redirected = true;
      window.location.assign('login.html');
    };
    const timer = window.setTimeout(navigate, 3000);
    splash.addEventListener('click', () => {
      window.clearTimeout(timer);
      navigate();
    }, { once: true });
  }

  // Form login hanya memindahkan pengguna ke tampilan demo.
  const login = $('#login-btn');
  if (login) {
    const form = login.closest('form');
    if (form) form.addEventListener('submit', (event) => {
      event.preventDefault();
      window.location.assign('dashboard.html');
    });
  }

  // Pencarian hasil hanya memfilter kartu yang sudah ada di halaman.
  const search = $('.search-container input');
  const cards = $$('.results-list .result-card');
  const filterButtons = $$('.filter-pills .filter-btn');
  const updateResults = () => {
    const keyword = (search?.value || '').trim().toLocaleLowerCase('id');
    const filter = filterButtons.find(button => button.classList.contains('active'))?.textContent.trim() || 'Semua';
    const now = new Date();
    cards.forEach(card => {
      const label = card.textContent.toLocaleLowerCase('id');
      const dateText = $('.date', card)?.textContent.trim() || '';
      const months = { Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5, Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11 };
      const match = dateText.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);
      const date = match && months[match[2]] !== undefined ? new Date(Number(match[3]), months[match[2]], Number(match[1])) : null;
      let inPeriod = true;
      if (filter === 'Minggu Ini') {
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
        const end = new Date(start); end.setDate(end.getDate() + 7);
        inPeriod = !!date && date >= start && date < end;
      } else if (filter === 'Bulan Ini') {
        inPeriod = !!date && date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      } else if (filter === 'Selesai') {
        inPeriod = !!$('.status-pill', card) && $('.status-pill', card).textContent.trim() === 'Selesai';
      }
      card.hidden = !(label.includes(keyword) && inPeriod);
    });
    let empty = $('#resultEmptyState');
    if (cards.length && !empty) {
      empty = document.createElement('p');
      empty.id = 'resultEmptyState';
      empty.setAttribute('role', 'status');
      empty.textContent = 'Tidak ada hasil pemeriksaan yang sesuai.';
      $('.results-list')?.after(empty);
    }
    if (empty) empty.hidden = cards.some(card => !card.hidden);
  };
  if (search) search.addEventListener('input', updateResults);
  filterButtons.forEach((button, i) => {
    if (i === 0) button.classList.add('active');
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      updateResults();
    });
  });
  if (cards.length) updateResults();

  // Kalender statis: memilih tanggal tidak mengubah jadwal contoh.
  $$('.calendar-grid .date-number:not(.other-month)').forEach(day => {
    day.setAttribute('role', 'button');
    day.setAttribute('tabindex', '0');
    const select = () => {
      $$('.calendar-grid .date-number').forEach(item => item.classList.remove('selected'));
      day.classList.add('selected');
    };
    day.addEventListener('click', select);
    day.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); }
    });
  });

  // Popup notifikasi demo, dibuat hanya pada halaman yang memiliki ikon lonceng.
  const bell = $('.fa-bell');
  if (bell) {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Buka notifikasi');
    button.setAttribute('aria-expanded', 'false');
    button.style.cssText = 'background:none;border:0;color:inherit;cursor:pointer;font:inherit;padding:6px';
    bell.replaceWith(button);
    button.appendChild(bell);
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999;display:none';
    const dialog = document.createElement('section');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Notifikasi demo');
    dialog.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(90vw,400px);background:white;color:#222;padding:24px;border-radius:14px;box-shadow:0 12px 36px #0003;z-index:1000;display:none';
    dialog.innerHTML = '<h2 style="margin-top:0">Notifikasi</h2><p>Contoh notifikasi hasil laboratorium dan jadwal pemeriksaan.</p><p style="font-size:small">Informasi pada layar ini hanya untuk demonstrasi.</p><button type="button" class="close-demo-notification">Tutup</button>';
    document.body.append(overlay, dialog);
    const close = () => { overlay.style.display = dialog.style.display = 'none'; button.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; button.focus(); };
    button.addEventListener('click', () => { overlay.style.display = 'block'; dialog.style.display = 'block'; button.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('.close-demo-notification', dialog).focus(); });
    $('.close-demo-notification', dialog).addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && dialog.style.display === 'block') close(); });
  }
});
