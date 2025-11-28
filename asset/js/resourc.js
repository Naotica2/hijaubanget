       let isMenuOpen = false;

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            const body = document.body;

            if (isMenuOpen) {
                mobileMenu.style.transform = 'translateX(0)';
                menuOverlay.style.opacity = '1';
                menuOverlay.style.pointerEvents = 'auto';
                body.style.overflow = 'hidden';
            } else {
                mobileMenu.style.transform = 'translateX(100%)';
                menuOverlay.style.opacity = '0';
                menuOverlay.style.pointerEvents = 'none';
                body.style.overflow = 'unset';
            }
        }

        document.getElementById('menu-overlay').addEventListener('click', toggleMenu);

        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');

            if (window.scrollY > 50) {
                navbar.classList.remove('bg-white/10', 'backdrop-blur-sm');
                navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
            } else {
                navbar.classList.add('bg-white/10', 'backdrop-blur-sm');
                navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg');
            }
        });