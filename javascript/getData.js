
import {
  collection,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./setting.js";
import showAllComments from "./showAllComments.js";

let comentariosLimitados = [];
const arr = {}

const getData = async (watchingAllComments =  undefined, index = undefined) => {
  const q = query(collection(db, "publicacion"));
  const querySnapshot = await getDocs(q);
  let usuarios = [];
  
  querySnapshot.forEach((doc) => {
    const commentLong = doc.data().comentarios.length;
    if (watchingAllComments) {
      comentariosLimitados = doc.data().comentarios.reverse().slice(0, commentLong);
      arr[doc.id] = comentariosLimitados
    } else {
      comentariosLimitados = doc.data().comentarios.reverse().slice(0,1);
    }
    usuarios.push({
      id: doc.id,
      nombre: doc.data().nombre,
      apellido: doc.data().apellido,
      imagen: doc.data().imagen,
      imagenPerfil: doc.data().img_perfil,
      links: doc.data().links,
      comentarios: comentariosLimitados,
      longitudComentarios: commentLong,
      likes: doc.data().likes,
      fechaCreacion: doc.data().fechaCreacion,
      fechaPost: doc.data().fechaPost
    });
  });
  showAllComments(arr,index)
  return usuarios;
};


export default getData