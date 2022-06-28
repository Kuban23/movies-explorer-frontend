// const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';
import { beatfilmsUrl } from '../constants';


// Метод проверки ответа
const checkResponse = (res) => {
   if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`); // если ошибка, отклоняем промис
   }
   return res.json();
};

// Запрос фильмов с сервиса beatfilm-movies
export const getMovies = () => {
   return fetch(beatfilmsUrl, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then(checkResponse);
}