// funcionalidad del Sidebar

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    // Abrir el sidebar
    openBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // función para cerrar el sidebar
    const closeSidebar = function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Enable scrolling
    };

    // Eventos para cerrar el sidebar
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Cerrar el sidebar al hacer click en un link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeSidebar();

            // Hacer un scroll suave hasta la sección
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Cerrar sidebar cuando se oprime el ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});