import { createApp } from "vue";
import "./assets/scss/style.scss";
import App from "./App.vue";
import { router } from "./router";

createApp(App).use(router).mount("#app");

document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });
    
    fadeInElements.forEach(element => {
      observer.observe(element);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-inn');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });
    
    fadeInElements.forEach(element => {
      observer.observe(element);
    });
  });


