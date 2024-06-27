
import gsap from "../node_modules/gsap/index.js"

let iconsAdded = false
let img = ""
let containerLanguages = null
const imagesTransition =  () => {
  const lenguages = {
    html: './img/html-5.png',
    css: './img/css-3.png',
    javascript: './img/js.png',
    vue: './img/Vue.png',
    native: './img/react.png',
    sql: './img/sql.png',
  }
  if (!iconsAdded) {
    containerLanguages = document.querySelector(".languages-skills")
    containerLanguages.classList.add("skills-active")
    Object.values(lenguages).forEach((leng, i) => {
       img = document.createElement("img")
      if (leng !== 40) {
        img.setAttribute("src", leng)
        img.style.height = `24px`
        img.style.width = `24px`
        img.style.margin = "0 5px"
      }
      containerLanguages.appendChild(img)
      iconsAdded = true;
    })
  }

}


const quitLenguagesSkillsIcons = (txt) => {
  const languagesSkills = document.querySelector(".languages-skills");
  if (txt === "Skills") {
    languagesSkills.classList.remove("skills-active");
    languagesSkills.classList.add("skills");
    gsap.to(languagesSkills, { x: 10, duration: 3, ease: "power2.out" });
  } else {
    languagesSkills.classList.remove("skills");
    languagesSkills.classList.add("skills-active");
    languagesSkills.classList.remove("animate__bounce");
  }
};




export { imagesTransition, quitLenguagesSkillsIcons }


