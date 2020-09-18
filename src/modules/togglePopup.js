const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = document.querySelector('.popup-content');

    let interval = 0;
    let height = popupContent.clientHeight;

    const popupAnimation = () => {
        interval++;
        popup.style.display = 'block';
        popupContent.style.top = interval + '%';
        let request = requestAnimationFrame(popupAnimation);
        if (interval >= 30) {
            cancelAnimationFrame(request);
        }
    };

    const closePopup = () => {
        interval = 0;
        popupContent.style.top = -height + 'px';
        popup.style.display = '';
    };

    popupBtn.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                popupAnimation();
            } else {
                popup.style.display = 'block';
                popupContent.style.top = '80px';
            }
        });
    });
    popupClose.addEventListener('click', closePopup);

    popup.addEventListener('click', (event) => {
        let addClose = event.target;
        addClose = addClose.closest('.popup-content');
        if (!addClose) closePopup();
    });
};
export default togglePopup;