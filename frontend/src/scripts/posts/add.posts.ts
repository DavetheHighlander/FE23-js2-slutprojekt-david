import { Post } from "../../interface/post.interface";
import { displayPostCard } from "./display.post.card";



export async function addPost(post) {
  try {
    // formData.set('image', post.image, post.image.name); // Appending the image with its name
    console.log(post.image);

    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        author: post.author,
        image: post.image,
        createdAt: new Date()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add post');
    }else{
      const data = await response.json() as { message: string, post: Post };
      window.alert("Post added successfully");
  
      console.log('Post added successfully:', data.post);
      displayPostCard(data.post, document.querySelector('.post-list') as HTMLDivElement);
      const postModal = document.getElementById("postModal") as HTMLButtonElement;

      // Show the dialog
      postModal.style.display = 'none';
    }



  } catch (error) {
    console.error('Error adding post:', error.message);
    // Optionally, display an error message to the user
  }
}

