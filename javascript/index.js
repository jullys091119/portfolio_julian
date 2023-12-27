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
 const gridWorks = document.querySelectorAll(".wrapper-container-aside")[0]
 gridWorks.addEventListener("mouseover", (e)=> {
  const takeValue = document.querySelector(".tomarvalor")
//   const myHTML = `
  
// `;

// document.body.innerHTML = myHTML;

 })
}


showWorksOnWall()  
changeTabs();
  


