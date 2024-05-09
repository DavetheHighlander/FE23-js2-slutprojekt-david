export function loadRegister(url: string) {
  // Fetch the content from the given URL
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      // Get the container element where the content will be loaded
      const container = document.getElementById("RegisterModalPage");
      if (container) {
        // Load the fetched HTML content into the container
        container.innerHTML = html;

        // Add event listener after loading content
        const closeModalRegisterButton = document.getElementById("closeModalRegister");
        if (closeModalRegisterButton) {
          closeModalRegisterButton.addEventListener("click", function(event) {
            // Handle close modal logic here
            // For example: hide the modal
            const registerModal = document.getElementById("RegisterModalPage");
            if (registerModal) {
              registerModal.innerHTML = "";
            }
          });
        } else {
          throw new Error("closeModalRegister button not found in loaded content");
        }
      } else {
        throw new Error(`Container with id "RegisterModalPage" not found`);
      }
    })
    .catch(error => {
      console.error('Error loading page:', error);
    });
}

