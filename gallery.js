// Ссылка на Flickr API и ваш API ключ
const apiUrl = 'https://api.flickr.com/services/rest/';
const apiKey = '1febc1f31c0768da279d56263b6fec8a';

// Ссылка на элементы DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const gallery = document.querySelector('.gallery');

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

// Функция для выполнения поискового запроса к Flickr API
function searchPhotos() {
    const searchText = searchInput.value;
    if (searchText.trim() === '') {
        return;
    }

    // Очистка галереи перед новым поиском
    gallery.innerHTML = '';

    // Формируем URL для запроса к Flickr API
    const url = `${apiUrl}?method=flickr.photos.search&api_key=${apiKey}&text=${searchText}&per_page=12&format=json&nojsoncallback=1`;

    // Отправляем запрос
    fetch(url)
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
