import getData from "./getData.js";
import {sendComment} from "./sendComment.js";
import aboutMe from "./aboutMe.js";
import { showWorksOnWall } from "./index.js";
import { quitLenguagesSkillsIcons,setLenguagesSkillsIcons } from "./lenguageSkills.js";

let isOpenFullComments = false;
let isVisible = false;
let isClicked = false
// Variable para almacenar el último tab activo
let lastActiveTab = null;

const hiddeIconMoreComment = (showComments, index) => {
  const moreComments = document.querySelector(
    `.watching-more-comments-${index}`
  );
  const iconComment = document.querySelector(`.icon-comment-${index}`);
  let watchingAllComments = false;

  moreComments.addEventListener("click", async (e) => {
    watchingAllComments = true;
    isOpenFullComments = true;
    moreComments.style.display = "none";
    iconComment.style.display = "none";
    showComments.style.paddingTop = "10px";
    await getData(watchingAllComments, index);
    removeFirstComment();
  });

  function removeFirstComment() {
    const firstComment = document.querySelector(
      `.showComments-${index} .comment`
    );
    if (firstComment) {
      // Si se encuentra el primer comentario, se elimina
      firstComment.remove();
    }
  }
};


const sendInputComment = async (inputComment, containerComments,id,index, longitudComentarios) => {

  inputComment.addEventListener("keyup", (event) => {
    const msj = inputComment.value;
    if (event.key === "Enter") {
      containerComments.style.visibility = "visible";
      sendComment(msj, id, index,longitudComentarios); //No se envia hasta que haya un enter
      inputComment.value = ""; // Limpiar el input después de enviar el comentario
      containerComments.style.display = "flex";
    }
    
  });
}


const hiddeInputComment = (showComments, longitudComentarios, inputHidde, comment) => {
  let long = false;
  if (longitudComentarios === 0) {
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

const changeTextOnPublication = (txt) => {
  const filter = document.querySelector(".filters .filters-title")
  if(txt === "Trabajos") {
    filter.innerText = "Publicaciones"
  } else {
    filter.innerText = "Acerca de mi"
  }
}


const removePublication = () => {
  const wrapperPublications = document.querySelectorAll(".wrapper-publication");
  wrapperPublications.forEach(wrapperPublication => {
      wrapperPublication.remove();
  });
}

const showPublication = () => {
  const wrapperPublication = document.querySelector(".wrapper-publication")
}

const openMenu = () => {
  const iconMenu = document.querySelector(".icon-menu");
  const menuMobile = document.querySelector(".menu-mobile")
 
  iconMenu.addEventListener("click", e => {
   menuMobile.classList.toggle("active-menu-mobile")
  })
}

// Función para cambiar pestañas
const changeTabs = () => {
  const tabs = document.querySelectorAll("[id^='menu-list-tabs-']");
  tabs[0].classList.add("menu-list-tabs-active");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      // Verificar si el tab actual es diferente al último tab activo
    
        if (e.target.innerText === "Acerca de") {
          removePublication();
          aboutMe();
          changeTextOnPublication(e.target.innerText);
          // console.log(isVisible, "en acerca de")
        } else if (e.target.innerText === "Trabajos") {
         
          showWorksOnWall();
          removePublication();
          changeTextOnPublication(e.target.innerText);
          // console.log(isVisible, "en trabajo")
        } else  if(e.target.innerText === "Skills") {  
          if(!isVisible) {
            isVisible=true
            setLenguagesSkillsIcons()
          }
        } 
      
        if(e.target.innerText !== "Skills") {  
          if(isVisible == false) {
            isVisible= false
           quitLenguagesSkillsIcons()
          }
        } 
      
        // Remover la clase 'menu-list-tabs-active' de todos los tabs
        tabs.forEach((t) => {
          t.classList.remove("menu-list-tabs-active");
        });

        // Agregar la clase 'menu-list-tabs-active' solo al tab clicado
        e.target.classList.add("menu-list-tabs-active");

        isVisible = false
    });
  });
};

export  {sendInputComment, hiddeIconMoreComment, hiddeInputComment, changeTabs, openMenu}