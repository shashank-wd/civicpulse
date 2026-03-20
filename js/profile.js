// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  populateCountries();
  loadSaved();
});

// ── Populate country dropdown ─────────────────
function populateCountries() {
  const sel = document.getElementById('country-select');
  if (!sel) return;
  COUNTRIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = `${c.flag}  ${c.name}`;
    sel.appendChild(opt);
  });
}

// ── Country change → update dial code + states ─
function onCountryChange() {
  const code = document.getElementById('country-select').value;
  const country = COUNTRIES.find(c => c.code === code);

  const flagEl  = document.getElementById('phone-flag');
  const codeEl  = document.getElementById('phone-code');
  const stateSel = document.getElementById('state-select');

  if (!country) {
    flagEl.textContent  = '🌐';
    codeEl.textContent  = '+__';
    stateSel.innerHTML  = '<option value="">Select country first</option>';
    stateSel.disabled   = true;
    return;
  }

  // Update phone code display
  flagEl.textContent = country.flag;
  codeEl.textContent = country.dialCode;

  // Populate states
  stateSel.innerHTML = '<option value="">Select state</option>';
  country.states.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    stateSel.appendChild(opt);
  });
  stateSel.disabled = false;

  liveUpdate();
}

// ── State change → update avatar city ─────────
function onStateChange() {
  liveUpdate();
}

// ── Live update avatar card ───────────────────
function liveUpdate() {
  const firstName = document.getElementById('first-name')?.value.trim() || '';
  const lastName  = document.getElementById('last-name')?.value.trim()  || '';
  const city      = document.getElementById('city')?.value.trim()       || '';
  const stateVal  = document.getElementById('state-select')?.value      || '';

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Your Name';
  const initials = [firstName[0], lastName[0]].filter(Boolean).join('').toUpperCase() || 'CP';
  const location = [city, stateVal].filter(Boolean).join(', ') || 'City, State';

  const avatarDisplay    = document.getElementById('avatar-display');
  const avatarNameDisplay = document.getElementById('avatar-name-display');
  const avatarCityDisplay = document.getElementById('avatar-city-display');
  const headerAvatar     = document.getElementById('header-avatar');
  const headerName       = document.getElementById('header-name');

  if (avatarDisplay)     avatarDisplay.textContent     = initials;
  if (avatarNameDisplay) avatarNameDisplay.textContent = fullName;
  if (avatarCityDisplay) avatarCityDisplay.textContent = location;
  if (headerAvatar)      headerAvatar.textContent      = initials;
  if (headerName)        headerName.textContent        = firstName || 'Profile';
}

// ── Validation ────────────────────────────────
function validate() {
  let valid = true;

  const required = [
    { id: 'first-name',     label: 'First name'    },
    { id: 'last-name',      label: 'Last name'     },
    { id: 'email',          label: 'Email'         },
    { id: 'country-select', label: 'Country'       },
    { id: 'phone',          label: 'Phone number'  },
    { id: 'state-select',   label: 'State'         },
  ];

  required.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el) return;
    el.classList.remove('error');
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    }
  });

  const emailEl = document.getElementById('email');
  if (emailEl && emailEl.value && !emailEl.value.includes('@')) {
    emailEl.classList.add('error');
    valid = false;
  }

  return valid;
}

// ── Save to localStorage ──────────────────────
function saveProfile() {
  if (!validate()) {
    const firstError = document.querySelector('.field-input.error');
    if (firstError) firstError.focus();
    return;
  }

  const country = COUNTRIES.find(c => c.code === document.getElementById('country-select').value);

  const profile = {
    firstName:   document.getElementById('first-name').value.trim(),
    lastName:    document.getElementById('last-name').value.trim(),
    email:       document.getElementById('email').value.trim(),
    countryCode: document.getElementById('country-select').value,
    countryName: country?.name || '',
    dialCode:    country?.dialCode || '',
    phone:       document.getElementById('phone').value.trim(),
    state:       document.getElementById('state-select').value,
    city:        document.getElementById('city').value.trim(),
    pincode:     document.getElementById('pincode').value.trim(),
    savedAt:     new Date().toISOString()
  };

  localStorage.setItem('civicpulse_profile', JSON.stringify(profile));

  const toast = document.getElementById('save-toast');
  if (toast) {
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3500);
  }
}

// ── Load from localStorage ────────────────────
function loadSaved() {
  const raw = localStorage.getItem('civicpulse_profile');
  if (!raw) return;

  let p;
  try { p = JSON.parse(raw); } catch { return; }

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  };

  set('first-name', p.firstName);
  set('last-name',  p.lastName);
  set('email',      p.email);
  set('phone',      p.phone);
  set('city',       p.city);
  set('pincode',    p.pincode);

  if (p.countryCode) {
    set('country-select', p.countryCode);
    onCountryChange();
    setTimeout(() => {
      set('state-select', p.state);
      onStateChange();
    }, 50);
  }
}

// ── Clear form ────────────────────────────────
function clearForm() {
  const inputs = document.querySelectorAll('.field-input');
  inputs.forEach(el => {
    el.value = '';
    el.classList.remove('error');
  });

  const flagEl = document.getElementById('phone-flag');
  const codeEl = document.getElementById('phone-code');
  const stateSel = document.getElementById('state-select');

  if (flagEl) flagEl.textContent = '🌐';
  if (codeEl) codeEl.textContent = '+__';
  if (stateSel) {
    stateSel.innerHTML = '<option value="">Select country first</option>';
    stateSel.disabled = true;
  }

  localStorage.removeItem('civicpulse_profile');
  liveUpdate();
}
