import { clearPage } from "../clear.page";
import { checkRoute } from "../routing";

export function loadSignIn(url: string) {
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
      const container = document.getElementById("LoginModalPage");
      if (container) {
        // Load the fetched HTML content into the container
        container.innerHTML = html;

        // Add event listener after loading content
        const closeModalSignInButton = document.getElementById("closeModalSignIn");
        if (closeModalSignInButton) {
          closeModalSignInButton.addEventListener("click", function(event) {
            // Handle close modal logic here
            // For example: hide the modal
            const SignInModal = document.getElementById("LoginModalPage");
            if (SignInModal) {
              SignInModal.innerHTML = "";
            }
          });


          function signIn(event: Event) {
            event.preventDefault(); // Prevent default form submission behavior
        
            // Get form elements
            const usernameInput = document.getElementById('username') as HTMLInputElement;
            const passwordInput = document.getElementById('password') as HTMLInputElement;
        
            // Get the values from the form
            const username = usernameInput.value;
            const password = passwordInput.value;
        
            // You can perform client-side validation here if needed
        
            // Create an object to send to the server
            const formData = {
                username: username,
                password: password
            };
        
            // Send a POST request to the server
            fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    // Handle successful sign-in
                    showToast("Sign in successful");
                    response.json().then(data => {
                      // Store only necessary data in local storage
                      localStorage.setItem('user', JSON.stringify(data.user));
                      console.log('Sign in successful');
                      console.log(data); // This is the actual data received from the server
                      const SignInModal = document.getElementById("LoginModalPage");
                      if (SignInModal) {
                        SignInModal.innerHTML = "";
                      }
                      checkLoggedIn()
                  });
                } else {
                  showToast("Sign in failed");
                    // Handle sign-in failure
                    console.error('Sign in failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
        // Add event listener to the form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', signIn);
        }










        } else {
          throw new Error("closeModalSignIn button not found in loaded content");
        }
      } else {
        throw new Error(`Container with id '' not found`);
      }
    })
    .catch(error => {
      console.error('Error loading page:', error);
    });
}

export function loadModuleScript(scriptUrl) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = scriptUrl;
  script.defer = true;
  document.head.appendChild(script);
  console.log("test")

}
function showToast(message) {
  const toast = document.getElementById('toastNotification') as HTMLInputElement;
  const toastMessage = document.getElementById('toastMessage') as HTMLInputElement;
  toastMessage.textContent = message;
  toast.classList.remove('hide');
  setTimeout(() => {
      toast.classList.add('hide');
  }, 3000); // Hide the toast after 3 seconds
}

// Check if user is logged in
export function checkLoggedIn() {
  const userData = localStorage.getItem('user');
  const loggedInDiv = document.getElementById('loggedInDiv') as HTMLInputElement;
  const unLoggedInDiv = document.getElementById('unLoggedInDiv') as HTMLInputElement;
  
  if (userData) {
      // User is logged in
      loggedInDiv.style.display = 'block';
      unLoggedInDiv.style.display = 'none';
  } else {
      // User is not logged in
      loggedInDiv.style.display = 'none';
      unLoggedInDiv.style.display = 'block';
  }
}

export function setupProfileAndSignOutButtons() {
  const myProfileButton = document.getElementById('MyProfile');
  const signOutButton = document.getElementById('signOut');

  // Check if the buttons exist
  if (myProfileButton && signOutButton) {
    myProfileButton.addEventListener('click', () => {
      // Retrieve user data from local storage
      const userDataString = localStorage.getItem('user');
      
      // Check if user data exists
      if (userDataString) {
          // Parse the user data string into a JavaScript object
          const userData = JSON.parse(userDataString);
          
          // Redirect to the user's profile page
          if (userData && userData.username) {
            window.location.href = '/#/users/' + userData.username;
            checkRoute()              

              console.log('Redirecting to My Profile...');
          } else {
              console.error("User data is missing 'username' property.");
          }
      } else {
          console.error("User data not found in local storage.");
      }
  });
  
  
      // Add event listener for Sign Out button
      signOutButton.addEventListener('click', () => {
          localStorage.removeItem('user');
          checkLoggedIn();

          // Example: window.location.href = '/signin';
          console.log('Signing out...');
      });
  } else {
      console.error("Couldn't find buttons with IDs 'MyProfile' and/or 'signOut'.");
  }
}