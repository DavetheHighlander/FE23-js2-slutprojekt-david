//import { displayPostPage } from './scripts/post.page/display.post.page';
//import { displayPosts } from './scripts/posts/get.posts';
import { convertImageToBase64 } from './scripts/convert.Image';
import { addPost } from './scripts/posts/add.posts';
import { loadRegister } from './scripts/register/register';
import { checkRoute } from './scripts/routing';
import { checkLoggedIn, loadSignIn, setupProfileAndSignOutButtons } from './scripts/signin/signin';



document.addEventListener('DOMContentLoaded', () => {
  checkRoute();
  // Call checkLoggedIn when the page loads
  window.addEventListener('load', checkLoggedIn);
  window.addEventListener('load', setupProfileAndSignOutButtons);

});

// * Menu * //
(document.getElementById("registerLink") as HTMLFormElement).addEventListener("click", function(event) {
  event.preventDefault();
  loadRegister("/templates/register.html");
});

(document.getElementById("signinLink") as HTMLFormElement).addEventListener("click", function(event) {
  event.preventDefault();
  loadSignIn("/templates/signin.html");
});


(document.getElementById("signinButton") as HTMLFormElement).addEventListener("click", function(event) {
  event.preventDefault();
  (document.getElementById("myDropdown") as HTMLFormElement).classList.toggle("show");
});

(document.getElementById("addPostLink") as HTMLFormElement).addEventListener("click", function(event) {
  event.preventDefault();
  //loadAddPost("/templates/addpost.html");
  const postModal = document.getElementById("postModal") as HTMLButtonElement;

  // Show the dialog
  postModal.style.display = 'block';
  /* modal */
  const closePostModal = document.getElementById("closePostModal") as HTMLButtonElement;
  closePostModal.addEventListener('click', function () {
    const postModal = document.getElementById("postModal") as HTMLButtonElement;

    // Show the dialog
    postModal.style.display = 'none';
  });

  /* form */
  const postForm = document.getElementById("postForm") as HTMLFormElement;
  if (postForm) {
    postForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(postForm);
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      const imageInput = document.getElementById('image') as HTMLInputElement | null; // Declare imageInput with a possible null value
      if (imageInput && imageInput.files && imageInput.files.length > 0) { // Check if imageInput and its files array are not null
        const imageFile = imageInput.files[0]; // Get the file directly from the file input
        try {
          const imageBase64 = await convertImageToBase64(imageFile); // Convert image to Base64
          await addPost({ title, content, author: user.username, image: imageBase64 });
          postForm.reset(); // Reset the form after successful submission
        } catch (error) {
          console.error('Error adding post:', error.message);
          // Optionally, display an error message to the user
        }
      } else {
        console.error('No image selected');
        // Optionally, display a message to the user indicating no image was selected
      }
    });
  } else {
    console.error('postForm element not found');
  }
});

// function displayUsers() {
//   throw new Error('Function not implemented.');
// }

// function closeModal() {
//   (document.getElementById("modal-container")as HTMLElement).innerHTML = "";
//   (document.getElementById("modal-page")as HTMLElement).innerHTML = "";
// }