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
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let contenidoMostrado = false;
let allComments = []; //
let newComment = false
// let counter = 0;
// let hasClicked = false;
// let dislikeCounter = false

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
const publicacion = collection(db, "publicacion");

// Función para cambiar pestañas
export const changeTabs = () => {
  const tabs = document.querySelectorAll("[id^='menu-list-tabs-']");
  tabs[0].classList.add("menu-list-tabs-active")
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
  const search = document.querySelector(
    ".search-proyects-input .search-proyects-avatar img"
  );
  perfil.setAttribute("src", "./img/julian.jpg");
  search.setAttribute("src", "./img/julian.jpg");
  name.innerHTML = "Julián Ontiveros Ramirez";
};

// Esta función crea el HTML para un comentario
const createCommentElement = (comentario) => {
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
  body.classList.add("comment-body");
  body.textContent = comentario;

  commentHeader.appendChild(avatar);
  commentHeader.appendChild(author);
  commentContainer.appendChild(commentHeader);
  commentContainer.appendChild(body);

  return commentContainer;
};

const templateGrids = (link, index, clicked, comments, currentLikes) => {
  return `
  <div class="wrapper-publication">
  <div class="wrapper-publication">
  <div class="wrapper-publication-header">
    <div class="search-proyects-avatar">
      <img src="./img/julian.jpg" alt="">
      </div>
    <div class="wrapper-publication-header-name">
      <p>Julián Ontiveros Ramírez</p>  
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
    <p>${comments} comentarios</p>
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

}

export const showWorksOnWall = async () => {
  const data = await getData(); // Obtener el array de objetos de la colección
  const publication = document.querySelector(".publication");
  const gridWorks = document.querySelectorAll(".grid-item");
  const gridWorksImage = document.querySelectorAll(".grid-item img");
  const clicked = localStorage.getItem('likes');
  const hasLiked = localStorage.getItem("hasLiked")

  
  gridWorks.forEach((el, index) => {
    const element = data[index];
    allComments = element.comentarios;
    const currentLikes = element.likes;
    const longitudComentarios = element.longitudComentarios
    gridWorksImage[index].setAttribute("src", `./img/proyect-${index}.png`);
    const template = templateGrids(element.link, index, clicked, element.longitudComentarios, currentLikes)
    

    // el.addEventListener("click", (e) => {
    publication.insertAdjacentHTML("beforebegin", template);

    if (!el.classList.contains("item-" + index) || contenidoMostrado) {
      return; // Salir de la función si el elemento ya tiene la clase o el contenido ya se mostró
    }

    const showComments = document.querySelector(".showComments");
    const inputComment = document.querySelector(".search-proyects-comment input");
    const inputHidde = document.querySelector(".search-proyects-comment");
    counterLikes(element.id, element.likes, hasLiked)
    const comment = document.querySelector('.comment')
    let long  = false
    if(longitudComentarios == 0) {
      showComments.style.display ="none";
      long = true
      inputHidde.style.display="none"
      comment.addEventListener("click", (e) => {
        inputHidde.style.display="block"
      })
     } else {
      showComments.style.display ="flex"
    }
    if(long) {
      long = false
    } 


    inputComment.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        showComments.style.visibility = "visible";
        sendComment(inputComment.value, element.id); //No se envia hasta que haya un enter
        inputComment.value = ""; // Limpiar el input después de enviar el comentario
        showComments.style.display = "flex";
      }
    });
   
    // Marcar que el contenido ya se ha mostrado
    contenidoMostrado = true;
    let isComment = false;
    isComment = true;

    allComments.forEach((comentario, index) => {
      const commentContainer = createCommentElement(comentario);
      const showCommentsContainer = document.querySelector(".showComments");
      showCommentsContainer.appendChild(commentContainer);
    });


    const moreComments = document.querySelector(".watching-more-comments");
    const iconComment = document.querySelector(".icon-comment")
    let watchingAllComments = false;
      moreComments.addEventListener("click", async (e) => {
        watchingAllComments = true;
        moreComments.style.display="none"
        iconComment.style.display="none"
        showComments.style.paddingTop = "10px"
        await getData(watchingAllComments);
      });


  });


  
};



const counterLikes = async (id, likes, hasLiked) => {
  const like = document.querySelector(".like");//para hacer clic
  if(hasLiked) {
    like.classList.add("active-like");
  } 
  
  like.addEventListener("click", async (e) => {
    const hasLiked = like.classList.contains("active-like");
    console.log(hasLiked, "hasliked")
    if (hasLiked) { // nola tiene
      likes--
      like.classList.remove("active-like");
      try {
        localStorage.removeItem("hasLiked")
      } catch (error) {
        console.log(error)
      }
    } else { // si la tiene
      likes++;
      localStorage.setItem("hasLiked", "false")
      like.classList.add("active-like");
    }

    localStorage.setItem("likes", likes.toString());
    const currentLikes = localStorage.getItem("likes")
    const counterLikesElement = document.querySelector(".counter-likes p");
    counterLikesElement.textContent = currentLikes
    // Actualizar el contador en la interfaz

    const docRef = doc(db, "publicacion", id);
    await updateDoc(docRef, { likes });
  })


}

const sendComment = async (comment, id) => {
  
  if (comment !== "") {
    try {
      const docRef = doc(db, "publicacion", id);
      await updateDoc(docRef, {
        comentarios: arrayUnion(comment),
      });
      console.log("Document written with ID: ", docRef.id);
      const newCommentElement = createCommentElement(comment); // Suponiendo que tienes una función createCommentElement para generar el HTML del comentario
      const showCommentsContainer = document.querySelector(".showComments");
      // Insertar el nuevo comentario al principio de la lista
      if (showCommentsContainer.firstChild) {
        newComment = true
        showCommentsContainer.appendChild(newCommentElement, showCommentsContainer.firstChild);
        showCommentsContainer.childNodes[3].remove()
      } else {
        // Si no hay ningún comentario, simplemente añadirlo al final
        showCommentsContainer.appendChild(newCommentElement);
      }
      // showCommentsContainer.appendChild(newCommentElement);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }
};

const getData = async (watchingAllComments) => {

  const q = query(collection(db, "publicacion"));
  const querySnapshot = await getDocs(q);
  let usuarios = [];
  querySnapshot.forEach((doc) => {
    const commentLong = doc.data().comentarios.length ;
    let comentariosLimitados = []; 
    if (watchingAllComments) {
      comentariosLimitados = doc.data().comentarios.reverse().slice(1, commentLong);
      // console.log(comentariosLimitados, " ")
      showMoreComments(comentariosLimitados);
    } else {
      comentariosLimitados = doc.data().comentarios.reverse().slice(0, 1);
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
      likes: doc.data().likes
    });
  });
  return usuarios;
};

const showMoreComments = (comments) => {
  comments.forEach((comentario) => {
    const commentContainer = createCommentElement(comentario)
    const showCommentsContainer = document.querySelector(".showComments");
    showCommentsContainer.appendChild(commentContainer);
  });
};


// Llamar a las funciones necesarias

