document.querySelector(".contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");

  if (!emailInput.value.trim() || !nameInput.value.trim() || !messageInput.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete',
      text: 'Please fill in all required fields.'
    });
    return;
  }

  // Send data to backend
  try {
    const response = await fetch("/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      })
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. I will get back to you soon!'
      });
      this.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was a problem sending your message. Please try again later.'
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was a problem sending your message. Please try again later.'
    });
  }
});