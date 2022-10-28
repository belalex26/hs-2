const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");

const dataInner = (data) => {

  resultsContainer.innerHTML = 
    `<div class="response-container">
      <img src="${data.avatar_url}">
      <p> Имя: <span>${data.name}</span><p>
      <p> О себе: <span>${data.bio}</span><p>
      <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
    </div>`
} 

const dataError = () => {
  const errorText = 'Пользователь не найден'

  resultsContainer.innerHTML = 
    `<div class="response-container">
      <p>${errorText}<p>
    </div>`
} 

loadBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  let searchValue = searchInput.value.trim().toLowerCase();
  fetch(`https://api.github.com/users/${searchValue}`)
  .then((result) => {
    console.log(result)
    if(result.status === 404) {
      dataError()
    } else {
      let res = result.json()
      return res
    }
    })
  .then(
    (data) => {
      try {
        dataInner(data);
      }
      catch (err) {
        console.log(err)
      }
      
    })
});
