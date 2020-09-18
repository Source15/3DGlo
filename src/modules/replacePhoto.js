const replacePhoto = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');
    let photoSrc;

    commandPhoto.forEach(item => {
        item.addEventListener('mouseover', (event) => {
            let target = event.target;
            photoSrc = target.src;
            target.src = target.dataset.img;
        });
        item.addEventListener('mouseout', (event) => {
            let target = event.target;
            target.src = photoSrc;
        });
    });
};
export default replacePhoto;