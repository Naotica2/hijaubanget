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
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnIcon = document.getElementById('btnIcon');
            const btnLoader = document.getElementById('btnLoader');
            const formMessage = document.getElementById('formMessage');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.classList.add('hidden');
            btnLoader.classList.remove('hidden');

            const mailtoLink = `mailto:rashyaygmi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            setTimeout(() => {
                window.location.href = mailtoLink;
                formMessage.innerHTML = `
                    <div class="success-message bg-green-50 border-2 border-green-500 text-green-800 px-4 py-3 rounded-xl">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="font-semibold">Your email client has been opened! Please send the email to complete your message.</span>
                        </div>
                    </div>
                `;
                formMessage.classList.remove('hidden');
                this.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = 'Send Message';
                    btnIcon.classList.remove('hidden');
                    btnLoader.classList.add('hidden');
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                }, 1000);
            }, 1500);
        });

        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });