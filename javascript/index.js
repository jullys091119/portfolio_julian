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
   orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let contenidoMostrado = false;
let comment

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBrF8HJGhy-Ayfgvht-Hvf0D3co9STMSiY",
  authDomain: "portfolios-f8860.firebaseapp.com",
  projectId: "portfolios-f8860",
  storageBucket: "portfolios-f8860.appspot.com",
  messagingSenderId: "901489273438",
  appId: "1:901489273438:web:a5ecea3fe11a336aa6a2cf",
  measurementId: "G-WV9GWCXTQP"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cambiar pestañas
const changeTabs = () => {
  const tabs = document.querySelectorAll("[id^='menu-list-tabs-']");

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
const showDataUser = async () => {
  const name = document.querySelector(".wrapper-imagen-nombre h1");
  const perfil = document.querySelector(".wrapper-imagen-perfil img");
  const search = document.querySelector(".search-proyects-input .search-proyects-avatar img");
  perfil.setAttribute("src", "./img/julian.jpg");
  search.setAttribute("src", "./img/julian.jpg");
  name.innerHTML = "Julián Ontiveros Ramirez";
};


const showWorksOnWall = async () => {
  let isVisible = false
  const data = await getData(); // Obtener el array de objetos de la colección
  const publication = document.querySelector(".publication");
  const gridWorks = document.querySelectorAll(".grid-item");
  const gridWorksImage = document.querySelectorAll(".grid-item img");
 
  let commentValue;
  gridWorks.forEach((el, index) => {
    const element = data[index]; 
    gridWorksImage[index].setAttribute("src", `./img/proyect-${index}.png`);
    if (element.id) {
      el.addEventListener("click", (e) => {
        if (!el.classList.contains("item-" + index) || contenidoMostrado) {
          return; // Salir de la función si el elemento ya tiene la clase o el contenido ya se mostró
        }
        const template = `
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
            <a href="${element.link}">
              <img src="./img/proyect-${index}.png" alt="">
            </a>
          </div>
          <div class="like-comment">
            <div class="like">
              <i class="fa-solid fa-thumbs-up"></i>
              <p>Me gusta</p>
            </div>
            <div class="comment">
              <i class="fa-solid fa-comment"></i>
              <p>Comentar</p>
            </div>
          </div>
          <div class="showComments">
            <p>Ver mas comentarios</p>
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
        
       
        publication.insertAdjacentHTML("beforebegin", template);
        
        const showComments = document.querySelector(".showComments")
         showComments.style.display="flex"
        // Marcar que el contenido ya se ha mostrado
        contenidoMostrado = true;
        let isComment = false;
          isComment = true;
          const inputComment = document.querySelector(".search-proyects-comment input");
          inputComment.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
              showComments.style.visibility="visible"
              sendComment(inputComment.value, element.id); //No se envia hasta que haya un enter
              inputComment.value = ""; // Limpiar el input después de enviar el comentario
              showComments.style.display="flex"
            }
          })
        element.comentarios.forEach((comentario,index) => {
          
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
          avatar.style.borderRadius="100%"
        
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
        
          const showCommentsContainer = document.querySelector(".showComments");
          showCommentsContainer.appendChild(commentContainer);
        })
      });
    }
  });
};

const sendComment = async (comment, id) => {
  try {
    const docRef = doc(db, "publicacion", id);
    await updateDoc(docRef, {
      comentarios: arrayUnion(comment)
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getData = async () => {
  const q = query(collection(db, "publicacion"));
  const querySnapshot = await getDocs(q);
  let usuarios = [];
  querySnapshot.forEach((doc) => {
    usuarios.push({
      id: doc.id,
      nombre: doc.data().nombre,
      apellido: doc.data().apellido,
      imagen: doc.data().imagen,
      imagenPerfil: doc.data().img_perfil,
      link: doc.data().link,
      comentarios: doc.data().comentarios.slice(0,1)
    });
  });
  return usuarios;
};


// Llamar a las funciones necesarias
showWorksOnWall();
changeTabs();
showDataUser();


