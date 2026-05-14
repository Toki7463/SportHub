// Звёзды рейтинга
document.addEventListener('DOMContentLoaded', function() {
    console.log('feedback.js загружен!');
    
    // ОЧИЩАЕМ СТАРЫЕ ДЕМО-ОТЗЫВЫ
    clearOldReviews();
    
    // Инициализация звёзд
    initRatingStars();
    
    // Обработка формы
    const feedbackForm = document.getElementById('feedbackForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (feedbackForm) {
        console.log('Форма найдена');
        
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверяем, выбрана ли оценка
            const ratingValue = document.getElementById('rating').value;
            if (ratingValue === '0') {
                alert('Пожалуйста, поставьте оценку сайту!');
                return;
            }
            
            // Получаем данные формы
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                rating: ratingValue,
                sport: document.getElementById('sport').value,
                message: document.getElementById('message').value,
                date: new Date().toLocaleDateString('ru-RU')
            };
            
            // Сохраняем отзыв
            saveReview(formData);
            
            // Показываем сообщение об успехе
            feedbackForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Обновляем список отзывов
            loadReviews();
            
            // Плавно прокручиваем к списку отзывов
            setTimeout(() => {
                const reviewsSection = document.querySelector('.reviews-list-section');
                if (reviewsSection) {
                    reviewsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
            
            // Сбрасываем форму через 3 секунды
            setTimeout(() => {
                feedbackForm.reset();
                feedbackForm.style.display = 'block';
                formSuccess.style.display = 'none';
                resetStars();
                document.getElementById('rating').value = '0';
            }, 3000);
        });
    }
    
    // Загружаем отзывы
    loadReviews();
});

// Функция для очистки старых демо-отзывов
function clearOldReviews() {
    // Получаем отзывы из localStorage
    let reviews = localStorage.getItem('reviews');
    
    if (reviews) {
        reviews = JSON.parse(reviews);
        
        // Проверяем, есть ли среди них демо-отзывы
        const hasDemoReviews = reviews.some(review => 
            review.name === 'Анна Петрова' || 
            review.name === 'Иван Сидоров' || 
            review.name === 'Михаил Тренер'
        );
        
        if (hasDemoReviews) {
            console.log('Очищаем демо-отзывы');
            // Если есть демо-отзывы, очищаем всё
            localStorage.removeItem('reviews');
        }
    }
}

// Инициализация звёзд
function initRatingStars() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    if (stars.length === 0) return;
    
    stars.forEach(star => {
        // Клик на звезду
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            console.log('Выбрана оценка:', rating);
            ratingInput.value = rating;
            updateStars(rating);
        });
        
        // Наведение на звезду
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        // Убираем наведение
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingInput.value);
            if (currentRating > 0) {
                updateStars(currentRating);
            } else {
                resetStars();
            }
        });
    });
    
    // Проверяем, есть ли уже сохранённая оценка
    if (ratingInput.value !== '0') {
        updateStars(parseInt(ratingInput.value));
    }
}

// Обновление звёзд после выбора
function updateStars(rating) {
    console.log('Обновление звёзд, рейтинг:', rating);
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const starNumber = index + 1;
        star.classList.remove('active');
        if (starNumber <= rating) {
            star.classList.add('active');
            star.style.color = '#ffd700';
        } else {
            star.style.color = '#ddd';
        }
    });
}

// Подсветка звёзд при наведении
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const starNumber = index + 1;
        if (starNumber <= rating) {
            star.style.color = '#ffd700';
        } else {
            star.style.color = '#ddd';
        }
    });
}

// Сброс звёзд
function resetStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('active');
        star.style.color = '#ddd';
    });
}

// Сохранение отзыва
function saveReview(review) {
    let reviews = localStorage.getItem('reviews');
    if (reviews) {
        reviews = JSON.parse(reviews);
    } else {
        reviews = [];
    }
    
    reviews.unshift(review);
    if (reviews.length > 20) {
        reviews = reviews.slice(0, 20);
    }
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Загрузка отзывов
function loadReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
    
    let reviews = localStorage.getItem('reviews');
    if (reviews) {
        reviews = JSON.parse(reviews);
        reviewsContainer.innerHTML = '';
        
        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p class="no-reviews">Пока нет отзывов. Будьте первым!</p>';
            return;
        }
        
        reviews.forEach(review => {
            displayReview(review);
        });
    } else {
        // Если нет отзывов, показываем сообщение
        reviewsContainer.innerHTML = '<p class="no-reviews">Пока нет отзывов. Будьте первым!</p>';
    }
}

// Отображение одного отзыва
function displayReview(review) {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
    
    const sportNames = {
        'volleyball': 'Волейбол',
        'football': 'Футбол',
        'basketball': 'Баскетбол',
        'athletics': 'Лёгкая атлетика',
        'powerlifting': 'Пауэрлифтинг',
        'fitness': 'Фитнес',
        'all': 'Все виды',
        '': 'Не указан'
    };
    
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += i <= review.rating ? 
            '<span style="color: #ffd700;">★</span>' : 
            '<span style="color: #ddd;">☆</span>';
    }
    
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
        <div class="review-header">
            <span class="review-author">${review.name}</span>
            <span class="review-rating">${starsHtml}</span>
        </div>
        <span class="review-sport">${sportNames[review.sport] || 'Спорт'}</span>
        <p class="review-text">${review.message}</p>
        <div class="review-date">${review.date}</div>
    `;
    
    reviewsContainer.prepend(reviewCard);
}