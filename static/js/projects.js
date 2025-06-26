document.addEventListener("DOMContentLoaded", function () {
    const logos = document.querySelectorAll(".project-logo");
    const projectCards = document.querySelectorAll(".project-card");
  
    // Check for previously selected project
    let savedProject = localStorage.getItem("activeProject") || "cometal";
    setActiveProject(savedProject);
  
    logos.forEach((logo) => {
      logo.addEventListener("click", () => {
        const project = logo.getAttribute("data-project");
        localStorage.setItem("activeProject", project); // Save to localStorage
        setActiveProject(project);
      });
    });
  
    function setActiveProject(project) {
      logos.forEach(logo => {
        logo.classList.toggle("active", logo.getAttribute("data-project") === project);
      });
  
      projectCards.forEach(card => {
        card.style.display = card.id === `project-${project}` ? "flex" : "none";
      });
    }  
  
    // Lightbox logic
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".image-close");
  
    let modalImages = [];
    let modalIndex = 0;
  
    // Handle main photo (no arrows)
    document.querySelectorAll(".main-photo").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.getAttribute("data-full") || img.src;
        modalImages = []; // no arrows needed
        document.body.style.overflow = "hidden";
        
        // Hide arrows
        document.querySelector(".modal-left").style.display = "none";
        document.querySelector(".modal-right").style.display = "none";        
      });
    });
  
    // Handle gallery images (with arrows)
    document.querySelectorAll(".carousel-img").forEach(img => {
      img.addEventListener("click", () => {
        const carousel = img.closest(".gallery-carousel");
        modalImages = Array.from(carousel.querySelectorAll(".carousel-img"));
        modalIndex = modalImages.indexOf(img);
        modal.style.display = "flex";
        modalImg.src = modalImages[modalIndex].src;
        document.body.style.overflow = "hidden";
        
        // Show arrows only if multiple images
        const showArrows = modalImages.length > 1;
        document.querySelector(".modal-left").style.display = showArrows ? "block" : "none";
        document.querySelector(".modal-right").style.display = showArrows ? "block" : "none";
      });
    });
  
    // Modal navigation arrows
    const leftModalArrow = document.querySelector(".modal-left");
    const rightModalArrow = document.querySelector(".modal-right");
  
    leftModalArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (modalImages.length > 1) {
        modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
        modalImg.src = modalImages[modalIndex].src;
      }
    });
  
    rightModalArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (modalImages.length > 1) {
        modalIndex = (modalIndex + 1) % modalImages.length;
        modalImg.src = modalImages[modalIndex].src;
      }
    });
  
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      modalImg.src = "";
      document.body.style.overflow = "";
    });
  
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        modalImg.src = "";
        document.body.style.overflow = "";
      }
    });
  
    // Carousel logic (modular per project)
    document.querySelectorAll('.gallery-carousel').forEach(carousel => {
      const images = carousel.querySelectorAll('.carousel-img');
      const leftArrow = carousel.querySelector('.left-arrow');
      const rightArrow = carousel.querySelector('.right-arrow');
      let currentIndex = 0;
  
      function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
      }
  
      leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });
  
      rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
  
      showImage(currentIndex);
    });
  });
  