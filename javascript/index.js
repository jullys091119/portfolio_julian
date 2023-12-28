import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
 

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


const showWorksOnWall = () => {
  const gridWorks = document.querySelector(".wrapper-container-aside");
  console.log(gridWorks);

  const publication = document.querySelector(".publication");

  gridWorks.addEventListener("click", (e) => {
    console.log(e);
    const myHTML = `
    <div class="wrapper-publication">
      <div class="wrapper-publication-header">
        <div class="search-proyects-avatar">
          <img src="https://scontent.fmzt2-1.fna.fbcdn.net/v/t39.30808-6/312921242_414879150852375_1680450935326738874_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=b6AMJ8MBNPEAX8J90b6&_nc_ht=scontent.fmzt2-1.fna&oh=00_AfAQULJ0FBISTbmF9TcsgJplJh6tnUiiTO1_C1UW2zfwkA&oe=658D6272" alt="">
        </div>
        <div class="wrapper-publication-header-name">
          <p>Julián Ontiveros Ramírez</p>  
        </div>
      </div>
      <div class="picture-wall">
        <img src="./img/proyecto1.png" alt="">
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
  </div>
`;

    publication.insertAdjacentHTML("beforebegin", myHTML);
  });
};



// Function to fetch data from Firestore
const getData = async () => {
  try {
    // Reference to the 'projects' collection (replace 'projects' with your actual collection name)
    const projectsCollection = collection(db, 'projects');

    // Get all documents in the 'projects' collection
    const querySnapshot = await getDocs(projectsCollection);

    // Iterate through the documents and log the data
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error getting data: ", error);
  }
};

// Call the function to fetch data
getData();


showWorksOnWall()  
changeTabs();
  


