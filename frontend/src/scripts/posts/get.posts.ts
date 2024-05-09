import { displayPostCard } from "./display.post.card";

async function getPosts() {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log(data);

      return data; // Assuming the response contains a 'posts' array
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      // Optionally, display an error message to the user
      return []; // Return an empty array in case of error
    }
  }
  export async function displayPosts() {
    try {
        const posts = await getPosts();
        console.log(posts);
        const postListDiv = document.querySelector('.post-list') as HTMLDivElement;
        postListDiv.innerHTML = ''; // Clear previous content

        posts.forEach((post: any) => {
            console.log(post);
            displayPostCard(post, postListDiv);
        });
    } catch (error) {
        console.error('Error loading posts:', error.message);
        // Optionally, display an error message to the user
    }
}

