
document.addEventListener('DOMContentLoaded', async function() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImages = document.querySelector('.lightbox-images');
    const lightboxThumbnails = document.querySelector('.lightbox-thumbnails');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const galleryData = await getGalleryData();

    console.log(galleryData);

    let currentEvent = '';
    let currentIndex = 0;

    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const event = this.getAttribute('data-event');
            const index = this.getAttribute('data-index') || 0;
            
            openLightbox(event, parseInt(index), galleryData);
        });
    });

    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    prevBtn.addEventListener('click', function() {
        navigateLightbox(-1, galleryData);
    });
    
    nextBtn.addEventListener('click', function() {
        navigateLightbox(1, galleryData);
    });

    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1, galleryData);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1, galleryData);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    function openLightbox(event, index, galleryData) {
        lightboxImages.innerHTML = '';
        lightboxThumbnails.innerHTML = '';

        currentEvent = event;
        currentIndex = index;

        const eventData = galleryData[event];
        eventData.forEach((img, idx) => {
            const imgElement = document.createElement('img');

            const fullPath = `${staticUrl}img/gallery/events/${event}/${img.src}`;
            imgElement.src = fullPath;
            imgElement.alt = img.alt;
            imgElement.className = idx === index ? 'active' : '';
            lightboxImages.appendChild(imgElement);

            const thumbnail = document.createElement('div');
            thumbnail.className = `lightbox-thumbnail ${idx === index ? 'active' : ''}`;
            thumbnail.setAttribute('data-index', idx);

            const thumbImg = document.createElement('img');
            thumbImg.src = fullPath;
            thumbImg.alt = img.alt;

            thumbnail.appendChild(thumbImg);
            lightboxThumbnails.appendChild(thumbnail);

            thumbnail.addEventListener('click', function() {
                const clickedIndex = parseInt(this.getAttribute('data-index'));
                setActiveLightboxImage(clickedIndex, galleryData);
            });
        });

        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function navigateLightbox(direction, galleryData) {
        const eventData = galleryData[currentEvent];
        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = eventData.length - 1;
        } else if (newIndex >= eventData.length) {
            newIndex = 0;
        }

        setActiveLightboxImage(newIndex);
    }

    function setActiveLightboxImage(index) {
        currentIndex = index;

        const images = lightboxImages.querySelectorAll('img');
        images.forEach((img, idx) => {
            img.className = idx === index ? 'active' : '';
        });

        const thumbnails = lightboxThumbnails.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, idx) => {
            thumb.className = `lightbox-thumbnail ${idx === index ? 'active' : ''}`;
        });

        thumbnails[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
});