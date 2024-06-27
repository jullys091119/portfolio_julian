

import createCommentElement from "./createCommentElement.js";
import templateGrids from "./templateGrids.js";
import aboutMe from "./aboutMe.js";
import { sendInputComment, hiddeIconMoreComment, hiddeInputComment } from "./listeners.js";
import getData from "./getData.js";
import showAllComments from "./showAllComments.js";
import counterLikes from "./CounterLikes.js";
import { imagesTransition,quitLenguagesSkillsIcons } from "./transition.js";

let contenidoMostrado = false;
let allComments = []; //
let gridLong;
let id = ""
let longitudComentarios = ""
let template = null
let data = {}
let isClicked = false

export const showWorksOnWall = async () => {
  const publication = document.querySelector(".publication");
  const gridWorks = document.querySelectorAll(".grid-item");
  const hasLiked = localStorage.getItem("hasLiked");
  console.log(hasLiked, "index")
  // Obtener el array de objetos de la colección
  
  

  const settingDataPost = async (index = "") => {
      data = await getData();
      template = templateGrids(
        data[index].links,
        index,
        data[index].longitudComentarios,
        data[index].likes,
        data[index].fechaCreacion,
        data[index].id,
        data[index].imagenPerfil

      );
    return template
  }

  gridWorks.forEach(async (el, index) => {
    const settingData  = await settingDataPost(index) // recoge el template
    gridLong = index
    allComments = data[index].comentarios
    longitudComentarios = data[index].longitudComentarios
    id = data[index].id
         

    publication?publication.insertAdjacentHTML("beforebegin", settingData):console.error("El elemento publication es null"); 
    if (!el.classList.contains("item-" + index) || contenidoMostrado) {
      return; // Salir de la función si el elemento ya tiene la clase o el contenido ya se mostró
    }
    const showComments = document.querySelector(`.showComments-${index}`);
    const inputComment = document.querySelector(`.search-proyects-comment-${index} input`);
    const inputHidde = document.querySelector(`.search-proyects-comment-${index}`);
    const comment = document.querySelector(`.comment-${index}`);
    showAllComments(allComments, index, true)
    counterLikes(data[index].id, data[index].likes, hasLiked, index, id);
    hiddeInputComment(showComments, longitudComentarios, inputHidde, comment)
    hiddeIconMoreComment(showComments, index)
    sendInputComment(inputComment, showComments, id, index, longitudComentarios)

  });

};

export const removePublication = () => {
  const removeWrapper = document.querySelectorAll(".wrapper-publication")[0]
  removeWrapper.remove()
}

const duplicateDomNodePublication = () => {
  const removeWrapper = document.querySelectorAll(".wrapper-publication")[0]
  if(removeWrapper !== undefined) {
    removeWrapper.remove()
  }
}


export const selectMenuMobile = () => {
  const menuMobile = document.querySelector(".menu-mobile");
  menuMobile.addEventListener("click", (e) => {
    const targetText = e.target.innerText.trim();
    if(targetText === "Acerca de") {
      quitLenguagesSkillsIcons(targetText)
      aboutMe()
      removePublication()
      duplicateDomNodePublication()
    } else if(targetText === "Trabajos") {
      quitLenguagesSkillsIcons(targetText)
      showWorksOnWall()
      removePublication()
      duplicateDomNodePublication()
    } 
    
    if(targetText === "Skills") {
      quitLenguagesSkillsIcons(targetText)
    }
    
  });
};
