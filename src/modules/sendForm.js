const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');

    statusMessage.style.cssText = `font-size:2rem;`;
    document.addEventListener('submit', (event) => {
        event.preventDefault();
        let target = event.target;

        const formData = new FormData(target);
        let phoneInput = target.querySelector('input.form-phone');

        let body = {};

        formData.forEach((val, key) => {
            body[key] = val;
        });
        if (/^\+?[78]*\d{10}$/.test(phoneInput.value)) {
            phoneInput.style.border = '';
            target.appendChild(statusMessage);
            statusMessage.insertAdjacentHTML('afterbegin', loadMessage);

            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 3000);
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        } else {
            target.style.cssText = 'border:2px solid red;background:#fff';
            return;
        }
        clearInputsForms(target);
    });

    //clearInputsForms
    const clearInputsForms = (target) => {
        let targetFormInputs = target.querySelectorAll('input');
        targetFormInputs.forEach((item) => {
            item.value = '';
        });
    };

    //InputsValidate
    const inputsValidate = () => {
        document.addEventListener('input', (event) => {
            let target = event.target;
            if (target.matches('[name="user_name"]')) {
                target.value = target.value.replace(/[^^А-Яа-я ]/i, "");
            }
            if (target.matches('[name="user_message"]')) {
                target.value = target.value.replace(/[^^А-Яа-я\W ]/i, "");
            } else if (target.matches('[name="user_phone"]')) {
                target.value = target.value.replace(/[^\+?[0-9]/i, '');
                if (/^\+?[78][0-9]{10}$/.test(target.value)) {
                    target.style.cssText = 'border:2px solid green';
                    target.setCustomValidity('');
                } else if (target.value.length === 0) {
                    target.style.border = '';
                } else {
                    target.setCustomValidity('Введите значение в формате +79260010101 или 89851508484');
                    target.style.cssText = 'border:2px solid red;';
                }
            }
        });
    };
    inputsValidate();

    const postData = (body) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            credentials: 'include' //проверка cookie на сервере
        });
    }
};

export default sendForm;