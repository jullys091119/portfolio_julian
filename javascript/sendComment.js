import {
  updateDoc,
  doc,
  arrayUnion,
  query,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import getData from "./getData.js";

import { db } from "./setting.js";
import createCommentElement from "./createCommentElement.js";


let newCommentElement = null; // Initialize newCommentElement as null initially

const settingLongLikes =async (longitudComentarios,index) => {
   const data = await getData(undefined,index)
  try {
    let res = document.querySelector(".longComments")
    res.textContent = data[index].longitudComentarios
  } catch (error) {
    console.log("No se puede agregar la longitud del comentario")
  }
}


const sendComment = async (msj, id, index, longitudComentarios) => {
  console.log(index, "index")
  try {
    await updatingDb(msj,id,longitudComentarios,index)
    console.warn("datos actualizados")
  } catch (error) {
    console.error("No se actualizaron los datos")
  }
  const data = await getData(undefined,index)

}

const updatingDb = async(msj,id,longitudComentarios,index) => {
  let newCommentLenght = longitudComentarios
  updatingDom(msj,index,id,newCommentLenght)
  const docRef = doc(db, "publicacion", id);
  await updateDoc(docRef, {
    comentarios: arrayUnion(msj),
    longitudComentarios: newCommentLenght
  });
  await settingLongLikes(newCommentLenght,index)
}

const updatingDom =(msj,index,id) => {
  styleFirsComment()
  newCommentElement =  createCommentElement(msj,index,id,true);
    const showCommentsContainer = document.querySelector(`.showComments-${index}`);
    const lastChild = showCommentsContainer.lastChild;
    lastChild.classList.add("noComments")
    if (lastChild && lastChild.classList.contains("noComments")) {
      showCommentsContainer.removeChild(lastChild);
    }
    // Agregar el nuevo comentario al principio
    showCommentsContainer.prepend(newCommentElement);
    const firstchild= showCommentsContainer.firstChild
    firstchild.classList.add("firstcomment")
};


const styleFirsComment = ( ) => {
  const comment = document.querySelector('.single-comment');
   comment.style.marginTop= "-30px"
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