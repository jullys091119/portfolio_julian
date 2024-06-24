const templateGrids = (
  link,
  index,
  comments,
  currentLikes,
  dateCreation,
  id,
  img
) => {

  return `
    <div class="wrapper-publication" id=${id}>
    
    <div class="wrapper-publication-header">
    <div class="search-proyects-avatar">
    <img src="./img/julian.jpg" alt="">
          </div>
        <div class="wrapper-publication-header-name">
          <p>Julián Ontiveros Ramírez</p> 
          <span>${dateCreation}</span>
        </div>
      </div>
      <div class="picture-wall">
      <a href="${link}">
          <img src="${img}" alt="">
        </a>
      </div>
      <div class="counter-likes">
      <div class="counter-likes_likes">
        <i class="fa-duotone fa-thumbs-up"></i>
        <p>${currentLikes}</p>
  
        </div>
        <p> <span class="longComments">${comments}</span> comentarios</p>
      </div>
      <div class="like-comment ">
        <button class="like-${index} hoverComment">
          <i class="fa-thin fa-thumbs-up"></i>
          <p>Me gusta</p>
        </button>
          <button class="comment-${index} hoverComment">
          <i class="fa-thin fa-message"></i>
          <p>Comentar</p>
          </button>
          </div>
          <div class="showComments-${index}">
          <div class="comments">
          <i class="fa-light fa-arrow-turn-down-right icon-comment-${index}"></i>
          <p class="watching-more-comments-${index}">Ver mas comentarios</p>
          </div>
      </div>
      <div class="search-proyects search-proyects-comment-${index}">
        <div class="search-proyects-input">
          <div class="search-proyects-avatar">
            <img class="avatar-comment" src="./img/julian.jpg" alt="">
          </div>
          <input type="search" name="search" id=input-${index} placeholder="Escribe un comentario...">
        </div>
        </div>
      </div>
    </div>
  `;
};

export default templateGrids