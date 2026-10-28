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

  // Demo login checks the hardcoded credentials. Not real authentication.
  const login = $('#login-btn');
  const passwordInput = $('#password');
  $('#togglePassword')?.addEventListener('click', function () {
    if (!passwordInput) return;
    const visible = passwordInput.type === 'password';
    passwordInput.type = visible ? 'text' : 'password';
    this.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  });
  if (login) {
    login.closest('form')?.addEventListener('submit', event => {
      event.preventDefault();
      const valid = window.SILRSAuth?.login($('#username')?.value || '', passwordInput?.value || '');
      const error = $('#loginError');
      if (!valid) {
        if (error) { error.hidden = false; error.textContent = 'Incorrect demo username or password.'; }
        if (passwordInput) { passwordInput.value = ''; passwordInput.focus(); }
        return;
      }
      location.replace('dashboard.html');
    });
  }

  // Pencarian hasil hanya memfilter kartu yang sudah ada di halaman.
  const search = $('.search-container input');
  const cards = $$('.results-list .result-card');
  const filterButtons = $$('.filter-pills .filter-btn');
  const updateResults = () => {
    const keyword = (search?.value || '').trim().toLocaleLowerCase('en');
    const filter = filterButtons.find(button => button.classList.contains('active'))?.textContent.trim() || 'All';
    const now = new Date();
    cards.forEach(card => {
      const label = card.textContent.toLocaleLowerCase('en');
      const dateText = $('.date', card)?.textContent.trim() || '';
      const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };
      const match = dateText.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);
      const date = match && months[match[2]] !== undefined ? new Date(Number(match[3]), months[match[2]], Number(match[1])) : null;
      let inPeriod = true;
      if (filter === 'This Week') {
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
        const end = new Date(start); end.setDate(end.getDate() + 7);
        inPeriod = !!date && date >= start && date < end;
      } else if (filter === 'This Month') {
        inPeriod = !!date && date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      } else if (filter === 'Completed') {
        inPeriod = !!$('.status-pill', card) && $('.status-pill', card).textContent.trim() === 'Completed';
      }
      card.hidden = !(label.includes(keyword) && inPeriod);
      card.style.display = card.hidden ? 'none' : '';
    });
    let empty = $('#resultEmptyState');
    if (cards.length && !empty) {
      empty = document.createElement('p');
      empty.id = 'resultEmptyState';
      empty.setAttribute('role', 'status');
      empty.textContent = 'No matching lab results found.';
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
    button.setAttribute('aria-label', 'Open notifications');
    button.setAttribute('aria-expanded', 'false');
    button.style.cssText = 'background:none;border:0;color:inherit;cursor:pointer;font:inherit;padding:6px';
    bell.replaceWith(button);
    button.appendChild(bell);
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999;display:none';
    const dialog = document.createElement('section');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Notifications');
    dialog.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(90vw,400px);background:white;color:#222;padding:24px;border-radius:14px;box-shadow:0 12px 36px #0003;z-index:1000;display:none';
    dialog.innerHTML = '<h2 style="margin-top:0">Notifications</h2><p>Keep track of laboratory results and upcoming appointments.</p><p style="font-size:small">Preview notifications shown for the demo account.</p><button type="button" class="close-demo-notification">Close</button>';
    document.body.append(overlay, dialog);
    const close = () => { overlay.style.display = dialog.style.display = 'none'; button.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; button.focus(); };
    button.addEventListener('click', () => { overlay.style.display = 'block'; dialog.style.display = 'block'; button.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('.close-demo-notification', dialog).focus(); });
    $('.close-demo-notification', dialog).addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && dialog.style.display === 'block') close(); });
  }

  // Shared profile state is stored locally in the browser for this demo only.
  const PROFILE_KEY = 'silrs-demo-profile';
  const defaults = { name: 'Demo Patient', email: 'demo@example.com', phone: '0800-0000-0000' };
  const getProfile = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
      return { ...defaults, ...stored };
    } catch { return { ...defaults }; }
  };
  const profile = getProfile();
  const textOf = selector => $(selector);
  const infoRows = $$('.info-list li');
  const setText = (selector, value) => { const element = textOf(selector); if (element) element.textContent = value; };
  if ($('.profile-header h3')) {
    setText('.profile-header h3', profile.name);
    if (infoRows[1]) $('span', infoRows[1]).textContent = profile.email;
    if (infoRows[2]) $('span', infoRows[2]).textContent = profile.phone;
  }
  setText('.user-info span', profile.name);
  if ($('.welcome-text')) $('.welcome-text').textContent = 'Welcome, ' + profile.name;

  function toast(message) {
    document.querySelector('.silrs-toast')?.remove();
    const t = document.createElement('div');
    t.className = 'silrs-toast';
    t.setAttribute('role', 'status');
    t.textContent = message;
    document.body.appendChild(t);
    window.setTimeout(() => t.remove(), 3500);
  }

  function modal(title, bodyBuilder, onSave) {
    const backdrop = document.createElement('div');
    backdrop.className = 'silrs-modal-backdrop';
    const panel = document.createElement('section');
    panel.className = 'silrs-modal';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', title);
    const heading = document.createElement('h2');
    heading.textContent = title;
    const form = document.createElement('form');
    bodyBuilder(form);
    const actions = document.createElement('div');
    actions.className = 'actions';
    const cancel = document.createElement('button');
    cancel.type = 'button'; cancel.textContent = 'Cancel';
    const submit = document.createElement('button');
    submit.type = 'submit'; submit.textContent = 'Save';
    actions.append(cancel, submit);
    form.append(actions);
    panel.append(heading, form);
    backdrop.appendChild(panel);
    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
    const previous = document.activeElement;
    const dismiss = () => {
      backdrop.remove(); document.body.style.overflow = '';
      if (previous?.isConnected) previous.focus();
      document.removeEventListener('keydown', handleKeys);
    };
    const handleKeys = event => {
      if (event.key === 'Escape') dismiss();
      if (event.key === 'Tab') {
        const items = [...panel.querySelectorAll('button,input')];
        if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault(); items[items.length - 1].focus();
        } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
          event.preventDefault(); items[0].focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeys);
    cancel.addEventListener('click', dismiss);
    backdrop.addEventListener('click', event => { if (event.target === backdrop) dismiss(); });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (onSave(form) !== false) dismiss();
    });
    form.querySelector('input,button')?.focus();
  }
  const field = (form, label, name, value, type = 'text') => {
    const wrapper = document.createElement('label');
    wrapper.textContent = label;
    const input = document.createElement('input');
    input.name = name;
    input.type = type;
    input.value = value;
    input.required = true;
    input.maxLength = 100;
    wrapper.appendChild(input); form.appendChild(wrapper);
  };
  $('#editProfile')?.addEventListener('click', () => modal('Edit Profile', form => {
    field(form, 'Name', 'name', profile.name);
    field(form, 'Email', 'email', profile.email, 'email');
    field(form, 'Phone', 'phone', profile.phone, 'tel');
  }, form => {
    const data = new FormData(form);
    const edited = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim()
    };
    if (!edited.name || !edited.email || !edited.phone) return false;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(edited));
    location.reload();
  }));
  $('#changePassword')?.addEventListener('click', () => toast('Demo account settings cannot change the sign-in password.'));
  $('#logout')?.addEventListener('click', () => window.SILRSAuth?.logout());
  $('#viewHistory')?.addEventListener('click', () => location.assign('hasil.html'));
  $('#markRead')?.addEventListener('click', event => {
    event.currentTarget.textContent = 'Read';
    event.currentTarget.disabled = true;
    toast('Report marked as read for this session.');
  });
  // Request action stays a simulated interaction, never a real medical order.
  const requestLink = $$('.menu-card').find(el => el.textContent.includes('Request a Test'));
  requestLink?.addEventListener('click', event => {
    event.preventDefault();
    modal('Request a Test', form => {
      field(form, 'Test Type', 'test', 'Routine Blood Test');
    }, form => {
      const test = String(new FormData(form).get('test') || '').trim();
      if (!test) return false;
      toast('Request for "' + test + '" added to this preview.');
    });
  });

});
