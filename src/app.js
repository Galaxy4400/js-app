import { QuestionService } from './questionService';
import { createModal, isValid } from './utils';
import { authWithEmailAndPassword, getAuthForm } from './auth';
import './style.css';

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('input[type="text"]');
const submitBtn = form.querySelector('button[type="submit"]');

window.addEventListener('load', QuestionService.renderList);
form.addEventListener('submit', submitFormHendler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', function () {
	submitBtn.disabled = !isValid(this.value);
});

function submitFormHendler(e) {
	e.preventDefault();
	
	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON(),
		}

		submitBtn.disabled = true;

		QuestionService.create(question).then(() => {
			input.value = '';
			input.className = '';
		})

	}
}



function openModal() {
	createModal('Авторизация', getAuthForm());
	document
		.getElementById('auth-form')
		.addEventListener('submit', authFormHendler, {once: true});
}

function authFormHendler(e) {
	e.preventDefault();
	
	const btn = e.target.querySelector('button');
	const email = e.target.querySelector('input[type="email"]').value;
	const password = e.target.querySelector('input[type="password"]').value;

	btn.disabled = true;

	authWithEmailAndPassword(email, password)
		.then(QuestionService.fetch)
		.then(renderModalAfterAuth)
		.then(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
	if (typeof content === 'string') {
		createModal('Error', content);
	} else {
		createModal('List of questions', QuestionService.listToHTML(content));
	}
}