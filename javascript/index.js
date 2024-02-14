

import createCommentElement from "./createCommentElement.js";
import templateGrids from "./templateGrids.js";
import aboutMe from "./aboutMe.js";
import {sendInputComment,hiddeIconMoreComment, hiddeInputComment} from "./listeners.js";
import getData from "./getData.js";
import showAllComments from "./showAllComments.js";
import { settingDatePost } from "./sendComment.js";
import { changeTabs } from "./listeners.js";
import counterLikes from "./CounterLikes.js";

let contenidoMostrado = false;
let allComments = []; //
let dateCreation;
let indexComment = 0
let commentCounter = 0;
let gridLong;

export const showWorksOnWall = async () => {
  const publication = document.querySelector(".publication");
  const gridWorks = document.querySelectorAll(".grid-item");
  const hasLiked = localStorage.getItem("hasLiked");

  const data = await getData(); // Obtener el array de objetos de la colección
  gridWorks.forEach(async(el, index) => {

    gridLong = index
    const element = data[index];
    allComments = element.comentarios;

    const currentLikes = element.likes;
    const id = element.id
    const longitudComentarios = element.longitudComentarios;
    const fechaCreacion = element.fechaCreacion
    const datePost = element.fechaPost
    settingDatePost(datePost)    
    const template = templateGrids(
      element.link,
      index,
      element.longitudComentarios,
      currentLikes,
      fechaCreacion,
      element.id
    );
    if (publication) {
      publication.insertAdjacentHTML("beforebegin", template);
    } else {
      console.error("El elemento publication es null");
    }
    if (!el.classList.contains("item-" + index) || contenidoMostrado) {
      return; // Salir de la función si el elemento ya tiene la clase o el contenido ya se mostró
    }

    const showComments = document.querySelector(`.showComments-${index}`);
    const inputComment = document.querySelector(`.search-proyects-comment-${index}  input`);
    const inputHidde = document.querySelector(`.search-proyects-comment-${index}`);
    const comment = document.querySelector(`.comment-${index}`);
    showAllComments(allComments, index, true)
    counterLikes(element.id, element.likes, hasLiked, index, id);
    hiddeInputComment(showComments, longitudComentarios, inputHidde, comment)
    hiddeIconMoreComment(showComments, index),  
    sendInputComment(inputComment, showComments, element, index) 
   
  });
};


// Llamar a las funciones necesarias

export const selectMenuMobile = () => {
  const menuMobile = document.querySelector(".menu-mobile");
  menuMobile.addEventListener("click", e => {
    if(e.target.innerText !== "Trabajos" && e.target.innerText !== "Skills") {
      aboutMe()
      removePublication()
    } else if(e.target.innerText !== "Skills" && e.target.innerText !== "Acerca de") {
      removePublication()
      showWorksOnWall()
    } else if(!isClicked) {
     isClicked = true
     setLenguagesSkillsIcons()
    } else {
      quitLenguagesSkillsIcons()
    }
  })
}

