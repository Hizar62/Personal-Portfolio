'use strict';


const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");


sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");


const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");


const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}


for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}


modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });


for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase(); // Already lowercase
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const category = filterItems[i].dataset.category.toLowerCase(); // Normalize category
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue.toLowerCase() === category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};


let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");


for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}


const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");


for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


const projectItems = document.querySelectorAll("[data-filter-item]");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");


const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalScreenshots = document.querySelector(".modal-screenshots");


const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  document.body.classList.toggle("modal-open");
}


for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();


    const title = this.querySelector(".project-title").textContent;
    const category = this.querySelector(".project-category").textContent;
    const imgSrc = this.querySelector(".project-img img").src;
    const imgAlt = this.querySelector(".project-img img").alt;
    const description = this.dataset.description || "No description available.";
    const features = this.dataset.features ? JSON.parse(this.dataset.features) : [];
    const links = this.dataset.links ? JSON.parse(this.dataset.links) : {};
    const screenshots = this.dataset.screenshots ? JSON.parse(this.dataset.screenshots) : [imgSrc];


    projectModalTitle.textContent = title;
    projectModalCategory.textContent = category;
    projectModalDescription.textContent = description;


    projectModalScreenshots.innerHTML = "";


    const existingFeatures = projectModalDescription.parentElement.querySelector(".modal-features");
    if (existingFeatures) {
      existingFeatures.remove();
    }


    const featuresContainer = document.createElement("div");
    featuresContainer.className = "modal-features";

    if (features.length > 0) {
      const featuresTitle = document.createElement("h4");
      featuresTitle.textContent = "Key Features:";
      featuresTitle.style.marginBottom = "10px";
      featuresTitle.style.color = "var(--white-2)";
      featuresContainer.appendChild(featuresTitle);

      const featuresList = document.createElement("ul");

      features.forEach(feature => {
        const [label, detail] = feature.split(" : ");
        const li = document.createElement("li");
        if (detail) {
          li.innerHTML = `<strong>${label}:</strong> ${detail}`;
        } else {
          li.textContent = label;
        }
        featuresList.appendChild(li);
      });

      featuresContainer.appendChild(featuresList);
      projectModalDescription.after(featuresContainer);
    }


    const existingLinks = projectModalDescription.parentElement.querySelector(".modal-links");
    if (existingLinks) {
      existingLinks.remove();
    }


    if (Object.keys(links).length > 0) {
      const linksContainer = document.createElement("div");
      linksContainer.className = "modal-links";

      if (links.playstore) {
        const playStoreLink = document.createElement("a");
        playStoreLink.href = links.playstore;
        playStoreLink.target = "_blank";
        playStoreLink.rel = "noopener noreferrer";
        playStoreLink.className = "modal-link";
        playStoreLink.innerHTML = `<ion-icon name="logo-google-playstore"></ion-icon> Play Store`;
        linksContainer.appendChild(playStoreLink);
      }

      if (links.appstore) {
        const appStoreLink = document.createElement("a");
        appStoreLink.href = links.appstore;
        appStoreLink.target = "_blank";
        appStoreLink.rel = "noopener noreferrer";
        appStoreLink.className = "modal-link";
        appStoreLink.innerHTML = `<ion-icon name="logo-apple"></ion-icon> App Store`;
        linksContainer.appendChild(appStoreLink);
      }

      if (links.github) {
        const githubLink = document.createElement("a");
        githubLink.href = links.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.className = "modal-link";
        githubLink.innerHTML = `<ion-icon name="logo-github"></ion-icon> GitHub`;
        linksContainer.appendChild(githubLink);
      }

      if (links.hf_model) {
        const hfModelLink = document.createElement("a");
        hfModelLink.href = links.hf_model;
        hfModelLink.target = "_blank";
        hfModelLink.rel = "noopener noreferrer";
        hfModelLink.className = "modal-link";
        hfModelLink.innerHTML = `<ion-icon name="logo-react"></ion-icon> Model on Hugging Face`;
        linksContainer.appendChild(hfModelLink);
      }

      if (links.hf_dataset) {
        const hfDatasetLink = document.createElement("a");
        hfDatasetLink.href = links.hf_dataset;
        hfDatasetLink.target = "_blank";
        hfDatasetLink.rel = "noopener noreferrer";
        hfDatasetLink.className = "modal-link";
        hfDatasetLink.innerHTML = `<ion-icon name="library-outline"></ion-icon> Dataset on Hugging Face`;
        linksContainer.appendChild(hfDatasetLink);
      }

      projectModalDescription.after(linksContainer);
    }


    screenshots.forEach(screenshot => {
      const img = document.createElement("img");
      img.src = screenshot;
      img.alt = `${title} screenshot`;
      projectModalScreenshots.appendChild(img);
    });


    projectModalFunc();
  });
}


projectModalCloseBtn.addEventListener("click", projectModalFunc);
projectOverlay.addEventListener("click", projectModalFunc);