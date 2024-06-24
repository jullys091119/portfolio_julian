import {query,collection,getDocs} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
import { db } from "./setting.js";
const aboutMe = async () => {
  const q = query(collection(db, "publicacion"));
  const querySnapshot = await getDocs(q);
  const gridItem = document.querySelectorAll(".grid-item img")  
  const works = document.querySelector(".publication");
  querySnapshot.forEach((doc,i) => {
    for (const key in gridItem ) {
      if(gridItem && gridItem[key] && gridItem[key].setAttribute) {
        gridItem[key].setAttribute("src", doc.data().imgProyecto)
      }
    }
  })
   

  
   const wrapperPublication = document.createElement("div")
   wrapperPublication.classList.add('wrapper-publication', 'wrapper-about')
   wrapperPublication.style.backgroundImage = "url(./img/about.png)"
   wrapperPublication.style.backgroundSize = "cover";
   wrapperPublication.style.backgroundRepeat ="no-repeat";
   wrapperPublication.style.maxWidth ="100%"
   wrapperPublication.style.color="white"
   
   const description = `
   ¡Hola! Soy Julian Ontiveros, un apasionado desarrollador frontend junior con un enfoque en la creación de experiencias web interactivas y atractivas. Me encanta trabajar con tecnologías como HTML, CSS y JavaScript para dar vida a diseños creativos y funcionales.
    Durante mi formación y proyectos personales, he adquirido habilidades en el desarrollo responsive, optimización de rendimiento y accesibilidad web. También tengo experiencia con frameworks como React y herramientas de construcción como Webpack, lo que me permite crear aplicaciones web modernas y eficientes.
    Estoy emocionado por seguir aprendiendo y creciendo en este campo, explorando nuevas tecnologías y metodologías para mejorar constantemente mis habilidades. Me apasiona colaborar en equipos multidisciplinarios y enfrentar desafíos creativos que me permitan aportar soluciones innovadoras.
    Si estás buscando un desarrollador frontend comprometido y entusiasta que pueda contribuir con ideas frescas y habilidades técnicas sólidas, ¡me encantaría ser parte de tu equipo!
    `;
    
    // Crear elementos h1 y p
    const h1 = document.createElement("h1");
    h1.classList.add("Welcome");
    h1.textContent = "Bienvenido";
    
    const p = document.createElement("p");
    p.classList.add("description");
    p.textContent = description;
    
    
    // Llamar a WelcomeText si es necesario
    works.appendChild(wrapperPublication)
    wrapperPublication.appendChild(h1);
    wrapperPublication.appendChild(p);
};

export default aboutMe