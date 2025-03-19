// Define gallery data for each event
const galleryData = {
    'fallrock': [
        {
            src: "img/gallery/events/fallrock/fallrock.webp",
            alt: "Recibimiento del premio FallRock"
        },
        {
            src: "img/gallery/events/fallrock/all.webp",
            alt: "Todos los integrantes"
        },
        {
            src: "img/gallery/events/fallrock/agus.webp",
            alt: "Agustín el guitarrista"
        },
        {
            src: "img/gallery/events/fallrock/basti.webp",
            alt: "Bastián el otro guitarrista"
        },
        {
            src: "img/gallery/events/fallrock/cris.webp",
            alt: "Cristobal el baterista"
        },
        {
            src: "img/gallery/events/fallrock/mati.webp",
            alt: "Matías el bajista y vocalista"
        },
        {
            src: "img/gallery/events/fallrock/rico.webp",
            alt: "Sebastián el tecladista tirando los acordes prohibidos"
        },
        {
            src: "img/gallery/events/fallrock/teclado_seba.webp",
            alt: "Sebastián y su teclado"
        }
    ],
    'arts_fest_ubb': [
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4133.webp",
            alt: "Sebastián y Bastián"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4159.webp",
            alt: "Sebastián el tecladista"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4174.webp",
            alt: "Sebastián el tecladista"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4182.webp",
            alt: "Agustín el guitarrista"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4195.webp",
            alt: "Cristobal el baterista"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4208.webp",
            alt: "Bastián el guitarrista"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4255.webp",
            alt: "Matías y su bajo"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4257.webp",
            alt: "Sebastián, Bastián y Matías en el escenario"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4277.webp",
            alt: "Guitarra de Agustín"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4298.webp",
            alt: "Agustín de perfil"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4312.webp",
            alt: "Matías cantando"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4330.webp",
            alt: "Bastián tocando el bajo"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4342.webp",
            alt: "Bastián tocando el bajo de Matías y Matías cantando"
        },
        {
            src: "img/gallery/events/arts_fest_ubb/_MG_4353.webp",
            alt: "Cristobal tocando la batería"
        }
    ],
    'chiguarock': [
        {
            src: "img/gallery/events/chiguarock/estaa.webp",
            alt: "Matías, Bastían y Agustín tirando facha suprema"
        },
        {
            src: "img/gallery/events/chiguarock/ESTA2.webp",
            alt: "Sebastián y Matías corte invícto"
        },
        {
            src: "img/gallery/events/chiguarock/IMG_1357.webp",
            alt: "Bastián, Agustín y Cristobal saludando de fondo"
        },
        {
            src: "img/gallery/events/chiguarock/IMG_1553.webp",
            alt: "En pleno show"
        },
        {
            src: "img/gallery/events/chiguarock/IMG_1604.webp",
            alt: "En plena sad"
        },
        {
            src: "img/gallery/events/chiguarock/IMG_1752.webp",
            alt: "Aestetic photo 1"
        },
        {
            src: "img/gallery/events/chiguarock/TODOS.webp",
            alt: "Finalmente salen todos"
        },
        {
            src: "img/gallery/events/chiguarock/IMG_1787.webp",
            alt: "Banda recibiendo el reconocimiento por parte del organizador de ChiguaRock"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImages = document.querySelector('.lightbox-images');
    const lightboxThumbnails = document.querySelector('.lightbox-thumbnails');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentEvent = '';
    let currentIndex = 0;

    // Setup click handlers for all gallery photos
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const event = this.getAttribute('data-event');
            const index = this.getAttribute('data-index') || 0;
            
            openLightbox(event, parseInt(index));
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
        navigateLightbox(-1);
    });
    
    nextBtn.addEventListener('click', function() {
        navigateLightbox(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        }
    });

    function openLightbox(event, index) {
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
            const fullPath = `${staticUrl}${img.src}`;
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
                setActiveLightboxImage(clickedIndex);
            });
        });

        // Set caption for the current image
        lightboxCaption.textContent = eventData[index].alt;

        // Display lightbox
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
    }

    function navigateLightbox(direction) {
        const eventData = galleryData[currentEvent];
        let newIndex = currentIndex + direction;

        // Handle wrapping around at the ends
        if (newIndex < 0) {
            newIndex = eventData.length - 1;
        } else if (newIndex >= eventData.length) {
            newIndex = 0;
        }

        setActiveLightboxImage(newIndex);
    }

    function setActiveLightboxImage(index) {
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

        // Update caption
        lightboxCaption.textContent = eventData[index].alt;
    }
});