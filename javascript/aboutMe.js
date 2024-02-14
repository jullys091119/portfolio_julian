
const aboutMe = () => {
  const works = document.querySelector(".publication");
   const gridItem = document.querySelectorAll(".grid-item img")
  
   gridItem[0].setAttribute("src", `./img/proyect-${0}.png`);
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