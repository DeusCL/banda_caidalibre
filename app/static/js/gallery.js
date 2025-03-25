
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

    // Setup click handlers for all gallery photos
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const event = this.getAttribute('data-event');
            const index = this.getAttribute('data-index') || 0;
            
            openLightbox(event, parseInt(index), galleryData);
        });
    });

    // Close lightbox when clicking the X
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Previous and next buttons
    prevBtn.addEventListener('click', function() {
        navigateLightbox(-1, galleryData);
    });
    
    nextBtn.addEventListener('click', function() {
        navigateLightbox(1, galleryData);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1, galleryData);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1, galleryData);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        }
    });

    function openLightbox(event, index, galleryData) {
        // Clear previous contents
        lightboxImages.innerHTML = '';
        lightboxThumbnails.innerHTML = '';

        currentEvent = event;
        currentIndex = index;

        // Add full-size images
        const eventData = galleryData[event];
        eventData.forEach((img, idx) => {
            const imgElement = document.createElement('img');
            // Convert relative path to template format for server-side rendering
            const fullPath = `${staticUrl}img/gallery/events/${event}/${img.src}`;
            imgElement.src = fullPath;
            imgElement.alt = img.alt;
            imgElement.className = idx === index ? 'active' : '';
            lightboxImages.appendChild(imgElement);

            // Create thumbnails
            const thumbnail = document.createElement('div');
            thumbnail.className = `lightbox-thumbnail ${idx === index ? 'active' : ''}`;
            thumbnail.setAttribute('data-index', idx);

            const thumbImg = document.createElement('img');
            thumbImg.src = fullPath;
            thumbImg.alt = img.alt;

            thumbnail.appendChild(thumbImg);
            lightboxThumbnails.appendChild(thumbnail);

            // Thumbnail click handler
            thumbnail.addEventListener('click', function() {
                const clickedIndex = parseInt(this.getAttribute('data-index'));
                setActiveLightboxImage(clickedIndex, galleryData);
            });
        });

        // Display lightbox
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
    }

    function navigateLightbox(direction, galleryData) {
        const eventData = galleryData[currentEvent];
        let newIndex = currentIndex + direction;

        // Handle wrapping around at the ends
        if (newIndex < 0) {
            newIndex = eventData.length - 1;
        } else if (newIndex >= eventData.length) {
            newIndex = 0;
        }

        setActiveLightboxImage(newIndex, galleryData);
    }

    function setActiveLightboxImage(index, galleryData) {
        const eventData = galleryData[currentEvent];

        // Update current index
        currentIndex = index;

        // Update active image
        const images = lightboxImages.querySelectorAll('img');
        images.forEach((img, idx) => {
            img.className = idx === index ? 'active' : '';
        });

        // Update active thumbnail
        const thumbnails = lightboxThumbnails.querySelectorAll('.lightbox-thumbnail');
        thumbnails.forEach((thumb, idx) => {
            thumb.className = `lightbox-thumbnail ${idx === index ? 'active' : ''}`;
        });

        thumbnails[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
});