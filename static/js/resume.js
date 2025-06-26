document.addEventListener("DOMContentLoaded", function () {
    const link = document.getElementById("show-resume");
    const modal = document.getElementById("resume-modal");
    const closeBtn = document.querySelector(".close-btn");
    const modalContent = document.querySelector(".modal-content");
  
    // Show modal
    link.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "flex";
      document.body.style.overflow = "hidden"; // Disable background scroll
    });
  
    // Close modal by clicking the close button
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  
    // Close modal when clicking outside the modal content
    modal.addEventListener("click", function (e) {
      if (!modalContent.contains(e.target)) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  });
  