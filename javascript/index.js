import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  limit,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let contenidoMostrado = false;
let allComments = []; //
let newComment = false;
let dateCreation;
let showDatePost = [];
let comentariosLimitados = [];
let indexComment = 0
let isOpenFullComments = false
// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrF8HJGhy-Ayfgvht-Hvf0D3co9STMSiY",
  authDomain: "portfolios-f8860.firebaseapp.com",
  projectId: "portfolios-f8860",
  storageBucket: "portfolios-f8860.appspot.com",
  messagingSenderId: "901489273438",
  appId: "1:901489273438:web:a5ecea3fe11a336aa6a2cf",
  measurementId: "G-WV9GWCXTQP",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




// Función para cambiar pestañas
export const changeTabs = () => {
  const tabs = document.querySelectorAll("[id^='menu-list-tabs-']");
  tabs[0].classList.add("menu-list-tabs-active");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      // Quitar la clase 'menu-list-tabs-active' de todas las pestañas
      tabs.forEach((t) => {
        t.classList.remove("menu-list-tabs-active");
      });

      // Agregar la clase 'menu-list-tabs-active' solo a la pestaña clicada
      e.target.classList.add("menu-list-tabs-active");
    });
  });
};

// Función para mostrar datos de usuario
export const showDataUser = async () => {
  const name = document.querySelector(".wrapper-imagen-nombre h1");
  const perfil = document.querySelector(".wrapper-imagen-perfil img");
  const search = document.querySelector(".search-proyects-input .search-proyects-avatar img");
  perfil.setAttribute("src", "./img/julian.jpg");
  search.setAttribute("src", "./img/julian.jpg");
  name.innerHTML = "Julián Ontiveros Ramirez";
};

const createCommentElement = (comentario,index) => {
  let arrPost = []
  if(isOpenFullComments) {
     arrPost = [...new Set(showDatePost)];
  } else {
    arrPost = showDatePost.reverse()
  }
  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment");
  const commentHeader = document.createElement("div");
  commentHeader.classList.add("comment-header");

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
  const bodyWrapper = document.createElement("div");
  body.classList.add("comment-body");
  body.textContent = comentario;
  const p = document.createElement("p");
  p.textContent = arrPost[index]

  bodyWrapper.appendChild(body);
  bodyWrapper.appendChild(p);
  bodyWrapper.classList.add("wrapper-date");

  commentHeader.appendChild(avatar);
  commentHeader.appendChild(author);
  commentContainer.appendChild(commentHeader);
  commentContainer.appendChild(bodyWrapper);

  return commentContainer;
};


const templateGrids = (link, index, clicked, comments, currentLikes, dateCreation) => {
  return `
  <div class="wrapper-publication">
  <div class="wrapper-publication">
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
      <img src="./img/proyect-${index}.png" alt="">
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
    <button class="like hoverComment">
    <i class="fa-thin fa-thumbs-up"></i>
      <p>Me gusta</p>
      </button>
      <button class="comment hoverComment">
      <i class="fa-thin fa-message"></i>
      <p>Comentar</p>
      </button>
      </div>
      <div class="showComments">
      <div class="showComments-comments">
      <i class="fa-light fa-arrow-turn-down-right icon-comment"></i>
      <p class="watching-more-comments">Ver mas comentarios</p>
      </div>
      </div>
  <div class="search-proyects search-proyects-comment">
    <div class="search-proyects-input">
      <div class="search-proyects-avatar">
        <img class="avatar-comment" src="./img/julian.jpg" alt="">
      </div>
      <input type="search" name="search" id="" placeholder="Escribe un comentario...">
    </div>
    </div>
    </div>
</div>

</div>
`;
};

const settingDatePost = async (post) => {
  post.forEach((el,index) => {
    showDatePost.push(setDatePost(el.seconds, el.nanoseconds))
  })
}

export const showWorksOnWall = async () => {
  const data = await getData(); // Obtener el array de objetos de la colección
  const publication = document.querySelector(".publication");
  const gridWorks = document.querySelectorAll(".grid-item");
  const gridWorksImage = document.querySelectorAll(".grid-item img");
  const clicked = localStorage.getItem("likes");
  const hasLiked = localStorage.getItem("hasLiked");

  gridWorks.forEach(async(el, index) => {
    const element = data[index];
    allComments = element.comentarios;
    const currentLikes = element.likes;
    const longitudComentarios = element.longitudComentarios;
    const fechaCreacion = element.fechaCreacion
    const datePost = element.fechaPost
    settingDatePost(datePost)    
    gridWorksImage[index].setAttribute("src", `./img/proyect-${index}.png`);
    dateCreation = setDateCreation(fechaCreacion.seconds, fechaCreacion.nanoseconds)
    const template = templateGrids(
      element.link,
      index,
      clicked,
      element.longitudComentarios,
      currentLikes,
      dateCreation
    );
    publication.insertAdjacentHTML("beforebegin", template);
    if (!el.classList.contains("item-" + index) || contenidoMostrado) {
      return; // Salir de la función si el elemento ya tiene la clase o el contenido ya se mostró
    }
    const showComments = document.querySelector(".showComments");
    const inputComment = document.querySelector(".search-proyects-comment input");
    const inputHidde = document.querySelector(".search-proyects-comment");
    const comment = document.querySelector(".comment");
    showAllComments(allComments)
    counterLikes(element.id, element.likes, hasLiked);
    hiddeInputComment(showComments, longitudComentarios, inputHidde, comment)
    hiddeIconMoreComment(showComments),  
    sendInputComment(inputComment, showComments, element) 
  });
};

const hiddeIconMoreComment  = (showComments)=> {
  const moreComments = document.querySelector(".watching-more-comments");
  const iconComment = document.querySelector(".icon-comment");
  let watchingAllComments = false;
  moreComments.addEventListener("click", async (e) => {
    watchingAllComments = true;
    isOpenFullComments = true
    moreComments.style.display = "none";
    iconComment.style.display = "none";
    showComments.style.paddingTop = "10px";
    await getData(watchingAllComments);
    removeFirstComment()
  });

  function removeFirstComment() {
    const firstComment = document.querySelector(".showComments .comment");
    if (firstComment) {
      // Si se encuentra el primer comentario, se elimina
      firstComment.remove();
    }
  }


}

const sendInputComment = (inputComment, showComments, element) => {
  inputComment.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      showComments.style.visibility = "visible";
      sendComment(inputComment.value, element.id,  element.longitudComentarios,); //No se envia hasta que haya un enter
    inputComment.value = ""; // Limpiar el input después de enviar el comentario
    showComments.style.display = "flex";
  }
  });
}

const hiddeInputComment = (showComments, longitudComentarios, inputHidde, comment) => {
  console.log(comment, "comment")
  let long = false;
  console.log(comment, "commnert")
  if (longitudComentarios == 0) {
    showComments.style.display = "none";
    long = true;
    inputHidde.style.display = "none";
    comment.addEventListener("click", (e) => {
      inputHidde.style.display = "block";
    });
  } else {
    showComments.style.display = "flex";
  }
  if (long) {
    long = false;
  }
};

const showAllComments= (allComments) => {
  allComments.forEach((comentario, index) => {
    indexComment = index
    const commentContainer = createCommentElement(comentario, index);
    const showCommentsContainer = document.querySelector(".showComments");
    showCommentsContainer.appendChild(commentContainer);
  });
 
}

const setDateCreation = (seconds, nanoseconds) => {
  const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  timeZone: 'America/Mexico_City'
  };
  const firebaseTimestamp = { seconds: seconds, nanoseconds: nanoseconds };
  const date = new Date(firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000);
  const formattedDate = date.toLocaleDateString('es-MX', options);
  return formattedDate
}

const setDatePost = (seconds, nanoseconds) => {
  const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  timeZone: 'America/Mexico_City'
  };
  const firebaseTimestamp = { seconds: seconds, nanoseconds: nanoseconds };
  const date = new Date(firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000);
  const formattedDate = date.toLocaleDateString('es-MX', options);
  return formattedDate
}

const hiddeMoreComments = (long) => {
  const moreComments = document.querySelector(".watching-more-comments");
  const iconComment = document.querySelector(".icon-comment")
  if(long <=1) {
    moreComments.style.display = "none";
    iconComment.style.display = "none";
  } else {
    moreComments.style.display = "flex";
    iconComment.style.display = "block";
  }
}

const counterLikes = async (id, likes, hasLiked) => {
  const like = document.querySelector(".like"); //para hacer clic
  if (hasLiked) {
    like.classList.add("active-like");
  }

  like.addEventListener("click", async (e) => {
    const hasLiked = like.classList.contains("active-like");
    console.log(hasLiked, "hasliked");
    if (hasLiked) {
      // nola tiene
      likes--;
      like.classList.remove("active-like");
      try {
        localStorage.removeItem("hasLiked");
      } catch (error) {
        console.log(error);
      }
    } else {
      // si la tiene
      likes++;
      localStorage.setItem("hasLiked", "false");
      like.classList.add("active-like");
    }

    localStorage.setItem("likes", likes.toString());
    const currentLikes = localStorage.getItem("likes");
    const counterLikesElement = document.querySelector(".counter-likes p");
    counterLikesElement.textContent = currentLikes;
    // Actualizar el contador en la interfaz

    const docRef = doc(db, "publicacion", id);
    await updateDoc(docRef, { likes });
  });
};

const sendComment = async (comment, id) => {
  if (comment !== "") {
    try {
      const docRef = doc(db, "publicacion", id);
      const timestamp = {
        seconds: 1576118400, // Convertir la fecha actual a segundos
        nanoseconds: 0  // Los nanosegundos pueden ser 0 si no los necesitas precisos
      };
       

      await updateDoc(docRef, {
        comentarios: arrayUnion(comment),
        // Agregar la fecha actual a un array separado en Firestore
        fechaPost: arrayUnion(timestamp)
      });
    
      // No necesitas formatear la fecha aquí, puedes hacerlo cuando recuperas los datos

      newComment = true
      const showCommentsContainer = document.querySelector(".showComments");
      const x = await getData()
      hiddeMoreComments(x[0].longitudComentarios)
      settingDatePost(x[0].fechaPost)
      const newCommentElement = createCommentElement(comment, indexComment);
      if (showCommentsContainer.firstChild) {
        if(newComment) {
          newComment = false
          let res = document.querySelector(".longComments")
          res.textContent = x[0].longitudComentarios
          showCommentsContainer.removeChild(showCommentsContainer.lastChild);
          showCommentsContainer.appendChild(newCommentElement,showCommentsContainer.firstChild);
        }

      } else {
        showCommentsContainer.appendChild(newCommentElement);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};


export const getData = async (watchingAllComments) => {
  const q = query(collection(db, "publicacion"));
  const querySnapshot = await getDocs(q);
  let usuarios = [];
  querySnapshot.forEach((doc) => {
    const commentLong = doc.data().comentarios.length;
    if (watchingAllComments) {
      comentariosLimitados = doc.data().comentarios.reverse().slice(0, commentLong);
      showAllComments(comentariosLimitados)
    } else {
      comentariosLimitados = doc.data().comentarios.reverse().slice(0,1);
    }

    usuarios.push({
      id: doc.id,
      nombre: doc.data().nombre,
      apellido: doc.data().apellido,
      imagen: doc.data().imagen,
      imagenPerfil: doc.data().img_perfil,
      link: doc.data().link,
      comentarios: comentariosLimitados,
      longitudComentarios: commentLong,
      likes: doc.data().likes,
      fechaCreacion: doc.data().fechaCreacion,
      fechaPost: doc.data().fechaPost
    });
  });
  return usuarios;
};


// Llamar a las funciones necesarias
