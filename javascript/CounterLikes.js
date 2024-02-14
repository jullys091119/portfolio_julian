
import {
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./setting.js";

const counterLikes = async (idProyect, likes, hasLiked, index, id) => {
  const wrapper = document.querySelector(`[id="${idProyect}"]`);
  let like = wrapper.querySelector(`.like-${index}`); //para hacer clic

  if (hasLiked) {
    like.classList.add("active-like");
  }

  like.addEventListener("click", async (e) => {
    const currentLikes = parseInt(localStorage.getItem("likes")) || 0;
    let hasLiked = like.classList.contains("active-like");

    if (hasLiked) {
      likes--;
      like.classList.remove("active-like");
      localStorage.removeItem("hasLiked");
    } else {
      likes++;
      like.classList.add("active-like");
      localStorage.setItem("hasLiked", "true");
    }

    localStorage.setItem("likes", likes.toString());
    const counterLikesElement = wrapper.querySelector(".counter-likes p");
    counterLikesElement.textContent = likes.toString();

    const docRef = doc(db, "publicacion", idProyect);
    await updateDoc(docRef, { likes });
  });
};


export default counterLikes