import { isValid } from './utils';
import './style.css';

const form = document.getElementById('form');
const input = form.querySelector('input[type="text"]');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', submitFormHendler);
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

		// assync request

		console.log('Question', question);

		input.value = '';
		input.className = '';
	}

}