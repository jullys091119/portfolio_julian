import {selectMenuMobile} from "./index.js";
import showDataUser from "./showDataUser.js";
import aboutMe from "./aboutMe.js";
import getData from "./getData.js";
import { changeTabs, openMenu } from "./listeners.js";


document.addEventListener('DOMContentLoaded', async function(e) {
  aboutMe()
  showDataUser()
  getData()
  changeTabs()
  openMenu()
  selectMenuMobile()
});