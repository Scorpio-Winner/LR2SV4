// Ссылка на Flickr API и API ключ
const apiUrl = 'https://api.flickr.com/services/rest/';
const apiKey = '1febc1f31c0768da279d56263b6fec8a';

// Ссылка на элементы DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const gallery = document.querySelector('.gallery');



const clearInput = document.getElementById('clear-input');


const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeButton = document.getElementById('close-button');

// Функция для открытия модального окна и вывода сообщения
function openModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
    modal.style.display = 'none';
}

// Обработчик события для кнопки закрытия
closeButton.addEventListener('click', () => {
    closeModal();
});




// Обработчик события для кнопки поиска
searchButton.addEventListener('click', () => {
    searchPhotos();
});

// Обработчик события для нажатия Enter в поле ввода
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchPhotos();
    }
});

clearInput.addEventListener('click', () => {
    searchInput.value = '';
});


function getRandomPhotos() {

    const randomUrl = `${apiUrl}?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=12&format=json&nojsoncallback=1&safe_search=1`;

    // Отправляем запрос
    fetch(randomUrl)
        .then((response) => response.json())
        .then((data) => {
            const photos = data.photos.photo;        
            photos.forEach((photo) => {
                const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                const imageAlt = photo.title;
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = imageAlt;

                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.appendChild(image);

                gallery.appendChild(galleryItem);
            });
        })
        .catch((error) => {
            console.error('Ошибка при загрузке изображений:', error);
        });
}

getRandomPhotos();

// Функция для выполнения поискового запроса к Flickr API
function searchPhotos() {
    const searchText = searchInput.value;
    if (searchText.trim() === '') {
        return;
    }

    // Очистка галереи перед новым поиском
    gallery.innerHTML = '';

    // Формируем URL для запроса к Flickr API
    const url = `${apiUrl}?method=flickr.photos.search&api_key=${apiKey}&text=${searchText}&per_page=12&format=json&nojsoncallback=1&safe_search=1`;

    // Отправляем запрос
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const photos = data.photos.photo;
             if (photos.length === 0) {
                // Если нет результатов, открываем модальное окно с сообщением
                openModal('Нет результатов для вашего запроса.');
            }
            photos.forEach((photo) => {
                const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                const imageAlt = photo.title;
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = imageAlt;

                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.appendChild(image);

                gallery.appendChild(galleryItem);
            });
        })
        .catch((error) => {
            console.error('Ошибка при загрузке изображений:', error);
        });
}
