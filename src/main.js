import { createApp } from "vue";
import "./assets/scss/style.scss";
import App from "./App.vue";
import { router } from "./router";

createApp(App).use(router).mount("#app");
const button = document.querySelector(".dark");
const button2 = document.querySelector(".light")
button.addEventListener("click", () => {
    const lenghtarray = document.querySelector(".lengtharray");
    if (lenghtarray !== null) {
        lenghtarray.classList.remove("color2")
        lenghtarray.classList.add("color")     
    }
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#212529";
    button.classList.remove("on")
    button.classList.add("blocknone")
    button2.classList.remove("blocknone")

});
button2.addEventListener("click", () => {
    const lenghtarray = document.querySelector(".lengtharray");
    const colordrop = document.querySelector(".restaurantdrop");
    if (lenghtarray !== null) {

        lenghtarray.classList.remove("color")
        lenghtarray.classList.add("color2")

    }
    const immagine = new Image();
    immagine.addEventListener('load', function () {
        document.body.style.backgroundImage = 'url(' + immagine.src + ')';
    });
    immagine.src = "https://images.freeimages.com/images/large-previews/a3b/website-rays-background-pattern-1637863.png";
    button2.classList.remove("on")
    button2.classList.add("blocknone")
    button.classList.add("on")
});




