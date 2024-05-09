import { clearPage } from "./clear.page";
import { displayPostPage } from "./post.page/display.post.page";
import { displayPosts } from "./posts/get.posts";
import { displayUserPage } from "./users/display.user.page";

//* check routing *//
export function checkRoute() {
  const postId = getPostIdFromUrl();
  const userId = getUserIdFromUrl();
  console.log(userId)
  if (postId) { // check if it`s the post page 
    //displayPostPage("/templates/detailsPost.html");
    clearPage()
    displayPostPage(postId);
  }
  else if (userId) { // check if it`s the user page 
    console.log(userId)
    clearPage();

    displayUserPage(userId);
  }
  else { // check if it`s the home page 
    displayPosts(); // Display all posts if the URL doesn't contain a post ID or user ID
  }
}

function getPostIdFromUrl(): string | null {
  // const postId = window.location.hash.split("/")[2]; // Extract post ID from URL
  const postIdMatch = window.location.hash.match(/\/posts\/(\d+)/);
  return postIdMatch ? postIdMatch[1] : null;
}
function getUserIdFromUrl(): string | null {
  const userIdMatch = window.location.hash.match(/\/users\/([a-zA-Z0-9]+)/);
  return userIdMatch ? userIdMatch[1] : null;
}

// Get all elements with the class "author-name"

// Define a function to handle the click event
function handleAttributeClick(event) {
  if (event.target.getAttribute('href')) {
      checkRoute();
  }
}

document.addEventListener('click', handleAttributeClick);
