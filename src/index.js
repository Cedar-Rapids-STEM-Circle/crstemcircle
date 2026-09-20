document.addEventListener('DOMContentLoaded', () => {
            const carousel = document.getElementById('image-carousel');
            const track = document.getElementById('carousel-track');
            const slides = Array.from(track.children);
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            let currentSlide = 0;
            const slideCount = slides.length;
            const updateCarousel = () => {
                const offset = -currentSlide * 100;
                track.style.transform = `translateX(${offset}%)`;
            };
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateCarousel();
            });
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateCarousel();
            });
            async function loadEvents(){
                try{
                    const res = await fetch('src/events.json');
                    if(!res.ok) return;
                    const events = await res.json();
                    const container = document.getElementById('events-container');
                    if(!container) return;

                    const today = new Date();
                    function parseDate(str){
                        if(!str) return null;
                        const parts = str.split('/').map(s=>s.trim());
                        if(parts.length < 3) return null;
                        let mm = parseInt(parts[0],10) - 1;
                        let dd = parseInt(parts[1],10);
                        let yy = parseInt(parts[2],10);
                        if(yy < 100) yy += 2000;
                        return new Date(yy, mm, dd);
                    }

                    events.forEach(ev => {
                        const eventDate = parseDate(ev.date);
                        if(!eventDate) return;
                        const formattedDate = eventDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
                        const diffDays = Math.floor((today - eventDate) / (1000*60*60*24));
                        if(diffDays > 1) return; // hide events more than 1 day past

                        const card = document.createElement('div');
                        card.className = 'bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl';
                        const title = ev.Workshop || ev.workshop || ev.title || '';
                        card.innerHTML = `
                            <div class="bg-gradient-to-r from-stem-blue to-stem-purple text-white p-6 text-center">
                                <div class="text-2xl font-bold mb-1">${formattedDate}</div>
                                <div class="text-[1.1rem] opacity-90">${ev.time || ''}</div>
                            </div>
                            <div class="p-6 flex-grow flex flex-col">
                               <h3 class="text-xl font-bold text-stem-blue mb-4 text-center">${title}</h3>
                               <p class="text-gray-600 mb-6">${ev.description || ''}</p>
                               <ul class="space-y-3 mb-6">
                                   <li class="flex items-center text-gray-600"><i class="fas fa-map-marker-alt text-stem-blue mr-3"></i>${ev.location || ''}</li>
                                   <li class="flex items-center text-gray-600"><i class="fas fa-users text-stem-blue mr-3"></i>${ev.age || ''}</li>
                               </ul>
                               <li class="flex items-center text-gray-600"><i class="fas fa-laptop text-green-600 mr-3"></i>${ev.materials || ''}</li>
                               <div class="text-center mt-auto">
                                   ${ev.link ? `<a href="${ev.link}" target="_blank" rel="noopener noreferrer" class="inline-block bg-stem-yellow text-gray-800 px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:bg-yellow-600 hover:-translate-y-1">Register here!</a>` : ''}
                               </div>
                            </div>
                        `;
                        container.appendChild(card);
                    });

                }catch(err){
                    console.error('Failed loading events', err);
                }
            }

            loadEvents();
            updateCarousel();
 });
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