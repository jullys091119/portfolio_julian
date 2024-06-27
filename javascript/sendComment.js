import {
  updateDoc,
  doc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import getData from "./getData.js";
import { db } from "./setting.js";
import createCommentElement from "./createCommentElement.js";

let newCommentElement = null;

const settingLongLikes = async (longitudComentarios, index) => {
  try {
    const data = await getData(undefined, index);
    const res = document.querySelector(".longComments");
    if (res) {
      res.textContent = data[index].longitudComentarios;
    } else {
      console.log("Elemento .longComments no encontrado.");
    }
  } catch (error) {
    console.error("No se puede agregar la longitud del comentario", error);
  }
};

const sendComment = async (msj, id, index, longitudComentarios) => {
  try {
    await updatingDb(msj, id, longitudComentarios, index);
    console.warn("Datos actualizados");
    await getData(undefined, index);
  } catch (error) {
    console.error("No se actualizaron los datos", error);
  }
};

const updatingDb = async (msj, id, longitudComentarios, index) => {
  let newCommentLength = longitudComentarios;
  updatingDom(msj, index, id);
  const docRef = doc(db, "publicacion", id);
  try {
    await updateDoc(docRef, {
      comentarios: arrayUnion(msj),
      longitudComentarios: newCommentLength,
    });
    await settingLongLikes(newCommentLength, index);
  } catch (error) {
    console.error("Problemas con la consulta updatingDB", error);
  }
};

const updatingDom = async (msj, index, id) => {
  newCommentElement = createCommentElement(msj, index, id, true);
  const showCommentsContainer = document.querySelector(`.showComments-${index}`);
  
  if (!showCommentsContainer) {
    console.error(`No se encontró el contenedor .showComments-${index}`);
    return;
  }
  
  const lastChild = showCommentsContainer.lastChild;
  if (lastChild && lastChild.classList && lastChild.classList.contains("noComments")) {
    showCommentsContainer.removeChild(lastChild);
  }
  
  showCommentsContainer.prepend(newCommentElement);
  const firstChild = showCommentsContainer.firstChild;
  if (firstChild) {
    firstChild.classList.add("firstcomment");
  }
  
  styleFirstComment();
};


const styleFirstComment = () => {
  const firstComment = document.querySelector('.firstcomment');
  if (firstComment) {
    firstComment.style.marginTop = "-30px";
  } else {
    console.error('Elemento .firstcomment no encontrado.');
  }
};

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
  return formattedDate;
};

const settingDatePost = async (post) => {
  const showDatePost = [];
  post.forEach((el, index) => {
    showDatePost.push(setDatePost(el.seconds, el.nanoseconds));
  });
  return showDatePost;
};

export { sendComment, settingDatePost };
