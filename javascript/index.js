import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
let comment;

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
  const perfil =  document.querySelector(".wrapper-imagen-perfil img");
  const search = document.querySelector(".search-proyects-input .search-proyects-avatar img");
  perfil.setAttribute("src", "./img/julian.jpg");
  search.setAttribute("src", "./img/julian.jpg");
  name.innerHTML = "Julián Ontiveros Ramirez";
 
};

// Función para mostrar trabajos en la pared
const showWorksOnWall = async () => {
  const gridWorks = document.querySelectorAll(".grid-item");
  const publication = document.querySelector(".publication");
  const data = await getData(); // Obtener el array de objetos de la colección
  gridWorks.forEach ((gridItem, index)   => {
    const img = gridItem.querySelector("img");
    if (data[index] && data[index].imagen) {
      img.setAttribute("src", data[index].imagen);
    }
    gridItem.addEventListener("click", (e) => {
      if (!gridItem.dataset.publicationAdded) {
        const itemData = data[index]; // Obtener los datos específicos para este grid-item
        const myHTML = `
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
              <a href="${itemData.link}">
                <img src="${itemData.imagen}" alt="">
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
            <div class="search-proyects search-proyects-comment">
              <div class="search-proyects-input">
                <div class="search-proyects-avatar">
                  <img src="./img/julian.jpg" alt="">
                </div>
                <input type="search" name="" id="" placeholder=" Comentar">
              </div>
            </div>
          </div>
          </div>
        `;
        publication.insertAdjacentHTML("beforebegin", myHTML);
        gridItem.dataset.publicationAdded = true;
       comment = document.querySelector(".comment")
       let isComment = false
       comment.addEventListener("click", (e) => { 
          isComment = true
          const commenttaries = document.querySelector(".search-proyects-comment")
          commenttaries.style.display="block"
       })

       const inputComment = document.querySelector(".search-proyects-comment input")

       inputComment.addEventListener("keyup", (event)=> {
        const commentValue = inputComment.value;
         sendComment(commentValue)
       })
       
      }
    });
  });
};

const sendComment = async (comment) => {

  try {
    const docRef = await addDoc(collection(db, "publicacion"), {
     comentario: comment
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Función para obtener datos de la colección
const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "publicacion"));
  let usuarios = []; // Cambiar a un array para almacenar múltiples usuarios
  querySnapshot.forEach((doc) => {
    usuarios.push({ // Agregar un nuevo usuario al array por cada documento
      id: doc.id,
      nombre: doc.data().nombre,
      apellido: doc.data().apellido,
      imagen: doc.data().imagen,
      imagenPerfil: doc.data().img_perfil,
      link: doc.data().link
    });
  });
  
  return usuarios; // Devolver el array de usuarios
};

 console.log(comment)
 // Llamar a las funciones necesarias
showWorksOnWall();
changeTabs();
showDataUser();


 