const loadBtn = document.querySelector(".js-load");
const resultsContainer = document.querySelector(".js-results");
const searchInput = document.querySelector(".js-input");

let responseGithub = document.createElement('div');
let responsePost = document.createElement('div');

responseGithub.className = 'response-container'
responsePost.className = 'response-container'

const dataInnerGithub = (data) => {

  responseGithub.innerHTML = 
    `<div class="response-container__github">
      <img src="${data.avatar_url}">
      <p> Имя: <span>${data.name}</span><p>
      <p> О себе: <span>${data.bio}</span><p>
      <p> Кол-во репозиториев: <span>${data.public_repos}</span><p>
    </div>`
  
    resultsContainer.append(responseGithub)
} 

const dataInnerPosts = (data) => {
  let postItem = ''

    data.forEach((elem) => {
      postItem += `
        <li>
          <span>${elem.id}</span>
          <p>${elem.title}</p>
          <p>${elem.body}</p>
        </li>
      `;
  });
  
  responsePost.innerHTML = 
    `<ul class="response-container__posts-list">
      ${postItem}
    </ul>`
  
    resultsContainer.append(responsePost)
} 

const dataError = () => {
  const errorText = 'Ничего не нашлось'

  resultsContainer.innerHTML = 
    `<div class="response-container">
      <p>${errorText}<p>
    </div>`
}

const getDataUser = () => {
  let searchValue = searchInput.value.trim().toLowerCase();
  fetch(`https://api.github.com/users/${searchValue}`)
  .then((result) => {
    if(result.status === 404) {
      dataError()
    } else {
      let res = result.json()
      return res
    }})
  .then(
    (data) => {
      try {
        dataInnerGithub(data);
        getDataPost()
      }
      catch (err) {
        console.log(err)
      }
  })
}

const getDataPost = () => {
  axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
    try {
      if(response.status === 404) {
        dataError()
      } else {
        dataInnerPosts(response.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  })
}

loadBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  getDataUser();
  getDataPost();
});
