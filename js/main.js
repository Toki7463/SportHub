// Основной JavaScript файл для сайта SportHub
console.log('✅ main.js загружен!');

// Бургер-меню для мобильной версии
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    
    if (burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Анимация бургера
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Плавная прокрутка к якорям
const links = document.querySelectorAll('a[href^="#"]');

if (links.length > 0) {
    links.forEach(link => {
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}
    
    // Подсветка активного пункта меню при скролле
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === '#sports')) {
                link.classList.add('active');
            }
        });
    });
    
    // Обработка формы подписки
    const subscribeForm = document.getElementById('subscribeForm');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Здесь можно добавить отправку данных на сервер
                alert(`Спасибо за подписку! Мы будем присылать новости на ${email}`);
                emailInput.value = '';
            }
        });
    }
    
    // Анимация карточек при наведении
    const sportCards = document.querySelectorAll('.sport-card');
    
    sportCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Счетчик посещений (простой пример)
    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
        console.log('Первый визит на сайт!');
    }
    
    // Динамическое приветствие в зависимости от времени суток
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const hours = new Date().getHours();
        let greeting = '';
        
        if (hours >= 5 && hours < 12) {
            greeting = 'Доброе утро';
        } else if (hours >= 12 && hours < 18) {
            greeting = 'Добрый день';
        } else {
            greeting = 'Добрый вечер';
        }
        
        // Можно добавить приветствие, но оставим основной заголовок
        console.log(`${greeting}, спортсмен!`);
    }
});
// Кнопка "Наверх"
const scrollButton = document.getElementById('scrollToTop');

if (scrollButton) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// Счётчик посетителей (простая версия)
const visitorSpan = document.getElementById('visitorCount');

if (visitorSpan) {  // <--- Добавили проверку!
    function updateCounter() {
        // Получаем текущее значение из localStorage
        let count = localStorage.getItem('visitorCount');
        
        if (count === null) {
            // Первый посетитель
            count = 1;
        } else {
            // Увеличиваем счётчик
            count = parseInt(count) + 1;
        }
        
        // Сохраняем и отображаем
        localStorage.setItem('visitorCount', count);
        visitorSpan.textContent = count;
    }
    
    // Запускаем при загрузке
    updateCounter();
}
// Цитаты спортсменов
const quotes = [
    {
        text: "Победа важна, но важнее всего — участие",
        author: "Пьер де Кубертен"
    },
    {
        text: "Чем сложнее победа, тем больше радости она приносит",
        author: "Пеле"
    },
    {
        text: "Никогда не говорите «никогда», потому что пределы, как и страхи, часто оказываются лишь иллюзией",
        author: "Майкл Джордан"
    },
    {
        text: "Если ты не веришь в себя, никто другой не поверит",
        author: "Криштиану Роналду"
    },
    {
        text: "Ты можешь проиграть, но ты не можешь сдаться",
        author: "Мохаммед Али"
    },
    {
        text: "Золото не делает чемпиона, чемпиона делает характер",
        author: "Елена Исинбаева"
    },
    {
        text: "Тяжело в учении — легко в бою",
        author: "Александр Суворов"
    },
    {
        text: "Без проигрыша не видать победы",
        author: "Народная мудрость"
    },
    {
        text: "Каждый проигрыш — это опыт, и с ним ты обязательно выиграешь",
        author: "Спортивная мудрость"
    }
];

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

// Проверяем, что ВСЕ элементы существуют на странице
if (quoteText && quoteAuthor && newQuoteBtn) {
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    function displayRandomQuote() {
        const quote = getRandomQuote();
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `— ${quote.author}`;
    }

    newQuoteBtn.addEventListener('click', displayRandomQuote);
    displayRandomQuote();
}


// Переключение тёмной темы
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        console.log('Кнопка нажата!');
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});