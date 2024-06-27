let iconsAdded = false;

const setLenguagesSkillsIcons = async (txt) => {
  const skills = document.querySelector(".skills")
  const skillsWrapper = document.querySelector(".skills-wrapper")
  const style = document.createElement('style');
  skills.classList.add("skills-active", "animate__animated", "animate__fadeInUp");
  skills.style.left="5%"

  const lenguages = {
    html: './img/html-5.png',
    css: './img/css-3.png',
    javascript:'./img/js.png',
    vue: './img/Vue.png',
    native: './img/react.png',
    sql: './img/sql.png',
    width: 100,
    height:100,
  }

  if (!iconsAdded) {
    for (const leng in lenguages) {
      let img = document.createElement("img")
      if(leng  !== "width" && leng !== "height") {
        img.setAttribute("src", lenguages[leng])
        img.style.height =`${lenguages.height}px`
        img.style.width =`${lenguages.width}px`
        skillsWrapper.appendChild(img)
      }
    }
    iconsAdded = true;
  }
  hoverLenguageSkillsIcon()

  document.head.appendChild(style);
}

const quitLenguagesSkillsIcons = () => {
  const skills = document.querySelector(".skills")
  console.log(skills)
  if(skills.classList.contains("skills-active")) {
    skills.classList.remove("skills-active")
  } 

}

const hoverLenguageSkillsIcon = () => {
  const skills = document.querySelectorAll(".skills-wrapper  img");
  skills.forEach((img) => {
    img.addEventListener('mouseover', (e) => {
      img.classList.add("animate__animated", "animate__bounce");
    });
     img.addEventListener('mouseout', (e) => {
     
    });
  });
};

