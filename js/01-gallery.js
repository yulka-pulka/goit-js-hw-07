import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.table(galleryItems);
const galleryEl = document.querySelector('.gallery'); 

const createGalleryEl = ({ preview, original, description }) => {
    return `
    <div class='gallery__item'>
        <a class='gallery__link' href='${original}'>
            <img class='gallery__image' src='${preview}' data-source='${original}' alt='${description}'>
        </a>
    </div>`
}
const galleryElements = galleryItems.map(createGalleryEl).join('');
galleryEl.insertAdjacentHTML('beforeend', galleryElements);

galleryEl.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    const instance = basicLightbox.create( `
        <img class='gallery__image-big' src='${e.target.dataset.source}' alt='${e.target.getAttribute('alt')}'>`,
        {
            onShow: () => { document.addEventListener('keydown', closeModal) },
            onClose: () => { document.removeEventListener('keydown', closeModal)}
        }
    );
    
    instance.show();

    function closeModal (e) {
            if (e.code === 'Escape') {
            instance.close();
         }
    }
    
});

