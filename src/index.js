document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-2xl');
        header.classList.remove('shadow-lg');
    } else {
        header.classList.add('shadow-lg');
        header.classList.remove('shadow-2xl');
    }
});
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'stem-blue': '#1a4480',
                'stem-red': '#d32f2f',
                'stem-green': '#2e7d32',
                'stem-purple': '#6a1b9a',
                'stem-yellow': '#ffc107',
            },
            animation: {
                'fade-in-down': 'fadeInDown 1s ease',
                'fade-in-up': 'fadeInUp 1s ease',
                'fade-in': 'fadeIn 1.5s ease',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}