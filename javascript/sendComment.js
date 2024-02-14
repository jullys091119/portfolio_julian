import {
  updateDoc,
  doc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./setting.js";
import getData from "./getData.js";
import createCommentElement from "./createCommentElement.js";


let newComment = false;
let showDatePost = [];

const sendComment = async (comment, id,  index) => {
  if (comment !== "") {
    try {
      const docRef = doc(db, "publicacion", id);
      const timestamp = {
        seconds: Math.floor(Date.now() / 1000) , // Convertir la fecha actual a segundos
        nanoseconds: 0  // Los nanosegundos pueden ser 0 si no los necesitas precisos
      };
       
      await updateDoc(docRef, {
        comentarios: arrayUnion(comment),
        fechaPost: arrayUnion(timestamp)
      });
    
      newComment = true
      const showCommentsContainer = document.querySelector(`.showComments-${index}`);
      
      const x = await getData();
      // hiddeMoreComments(x[0].longitudComentarios,index)
      settingDatePost(x[0].fechaPost)
      let newCommentElement = ""
      x.forEach((el)=> {
        newCommentElement = createCommentElement(comment, index, el.id, true);
      })

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


const settingDatePost = async (post) => {
  post.forEach((el,index) => {
    showDatePost.push(setDatePost(el.seconds, el.nanoseconds))
  })
}

export  {sendComment, settingDatePost}