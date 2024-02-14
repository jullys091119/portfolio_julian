let showDatePost = [];
const createCommentElement = (comentario, index, key, isvisibleComments) => {
  console.log(key, "key", index);
  const idPublication = document.querySelectorAll(`.wrapper-publication`);
  const id = idPublication[index].getAttribute("id");

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");
  // Verifica si `comentario` es un array o un objeto
  if (Array.isArray(comentario)) {
    // Si es un array, iteramos sobre cada elemento
    comentario.forEach((com, i) => {
      if (id === key || isvisibleComments) {
        const commentHeader = document.createElement("div");
        commentHeader.classList.add("header-comment");
        const avatar = document.createElement("img");
        avatar.classList.add("comment-avatar");
        avatar.src = "./img/avatar.png";
        avatar.alt = "Avatar";
        avatar.style.width = "40px";
        avatar.style.height = "40px";
        avatar.style.borderRadius = "100%";

        const author = document.createElement("div");
        author.classList.add("comment-author");
        author.textContent = "Anonim@";

        const body = document.createElement("div");
        body.classList.add(`comment-body-${index}`);
        body.textContent = com;

        const p = document.createElement("p");
        p.textContent = showDatePost[index]; // Assuming showDatePost is an array of dates
        const bodyWrapper = document.createElement("div");
        bodyWrapper.appendChild(body);
        bodyWrapper.appendChild(p);
        bodyWrapper.classList.add("wrapper-date");
        commentHeader.appendChild(avatar);
        commentHeader.appendChild(author);
        const singleCommentContainer = document.createElement("div");
        singleCommentContainer.classList.add("single-comment");
        singleCommentContainer.appendChild(commentHeader);
        singleCommentContainer.appendChild(bodyWrapper);
        commentContainer.appendChild(singleCommentContainer);
      }
    });
  } else {
    // Si no es un array, asumimos que es un objeto individual
    if (id === key || isvisibleComments) {
      const commentHeader = document.createElement("div");
      commentHeader.classList.add("header-comment");
      const avatar = document.createElement("img");
      avatar.classList.add("comment-avatar");
      avatar.src = "./img/avatar.png";
      avatar.alt = "Avatar";
      avatar.style.width = "40px";
      avatar.style.height = "40px";
      avatar.style.borderRadius = "100%";

      const author = document.createElement("div");
      author.classList.add("comment-author");
      author.textContent = "Anonim@";

      const body = document.createElement("div");
      body.classList.add(`comment-body-${index}`);
      body.textContent = comentario;

      const p = document.createElement("p");
      p.textContent = showDatePost[index]; // Assuming showDatePost is an array of dates
      const bodyWrapper = document.createElement("div");
      bodyWrapper.appendChild(body);
      bodyWrapper.appendChild(p);
      bodyWrapper.classList.add("wrapper-date");
      commentHeader.appendChild(avatar);
      commentHeader.appendChild(author);
      const singleCommentContainer = document.createElement("div");
      singleCommentContainer.classList.add("single-comment");
      singleCommentContainer.appendChild(commentHeader);
      singleCommentContainer.appendChild(bodyWrapper);
      commentContainer.appendChild(singleCommentContainer);
    }
  }

  return commentContainer;
};

export default createCommentElement