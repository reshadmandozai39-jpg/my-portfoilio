const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		hamburger.classList.remove('active');
		navLinks.classList.remove('open');
	});
});

const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
	const current = document.documentElement.getAttribute('data-theme');
	const next = current === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', next);
	localStorage.setItem('theme', next);
});

// ===== Kontaktformular =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const setError = (id, msg) => {
	document.getElementById(id + 'Error').textContent = msg;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

contactForm?.addEventListener('submit', (e) => {
	e.preventDefault();

	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const message = document.getElementById('message');
	let valid = true;

	setError('name', '');
	setError('email', '');
	setError('message', '');
	formStatus.textContent = '';
	formStatus.classList.remove('success');

	if (name.value.trim() === '') {
		setError('name', 'Bitte gib deinen Namen ein.');
		valid = false;
	}
	if (!isValidEmail(email.value.trim())) {
		setError('email', 'Bitte gib eine gültige E-Mail ein.');
		valid = false;
	}
	if (message.value.trim() === '') {
		setError('message', 'Bitte schreib eine Nachricht.');
		valid = false;
	}

	if (valid) {
		const recipient = 'reshad.mandozai@swisscom.com';
		const subject = `Portfolio-Kontakt von ${name.value.trim()}`;
		const body = `Name: ${name.value.trim()}\nE-Mail: ${email.value.trim()}\n\n${message.value.trim()}`;
		const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

		window.location.href = mailtoLink;

		formStatus.textContent =
			'Dein E-Mail-Programm wird geöffnet. Bitte noch auf "Senden" klicken.';
		formStatus.classList.add('success');
		contactForm.reset();
	}
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
