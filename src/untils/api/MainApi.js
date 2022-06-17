const baseUrl = 'https://api.backend.diplom.nomoreparties.sbs';

// Метод проверки ответа
const checkResponse = (res) => {
   if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`); // если ошибка, отклоняем промис
   }
   return res.json();
};

// Функция для запроса регистрации пользователя
export const register = (name, email, password) => fetch(`${baseUrl}/signup`, {
   method: 'POST',
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify({ name, email, password })
})
   .then(checkResponse)

// Функция для запроса авторизации пользователя
export const login = (email, password) => fetch(`${baseUrl}/signin`, {
   method: 'POST',
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify({ password, email })
})
   .then(checkResponse)

// Сохранение фильмов
export const saveMovies = (movie) => fetch(`${baseUrl}/movies`, {
   method: 'POST',
   headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
   },
   body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: String(movie.movieId),
   })
})
   .then(checkResponse)

// Загрузка фильмов с сервера
export const getMovies = () => fetch(`${baseUrl}/movies`, {
   method: 'GET',
   headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
   }
})
   .then(checkResponse)

// Удаление сохраненного фильма
export const deleteSavedMovies = (id) => fetch(`${baseUrl}/movies/${id}`, {
   method: 'DELETE',
   headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
   }
})
   .then(checkResponse)

// Редактирование профиля
export const editProfile = (name, email) => fetch(`${baseUrl}/users/me`, {
   method: 'PATCH',
   headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
   },
   body: JSON.stringify({ name, email })
})
   .then(checkResponse)

// Загрузка информации о пользователе
export const getUserInformation = () => fetch(`${baseUrl}/users/me`, {
   method: 'GET',
   headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
   }
})
   .then(checkResponse)
