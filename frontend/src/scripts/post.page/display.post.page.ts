export async function displayPostPage(postId) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const postData: any = await response.json();

        console.log(postData);
        
        const mainElement = document.querySelector('main') as HTMLElement;
        if (mainElement) {
            mainElement.innerHTML = "";
        }

        const postContainer = document.getElementById('postDetailsPage') as HTMLElement;
        const date = new Date(postData.createdAt);

        // Populate post content
        const postHTML = `
            <h1>The title: ${postData.title}</h1>
            <div class="author">
                <img style="width:50px" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Author Image">
                <a href="/#/users/${postData.author}" class="author-name">${postData.author}</a>
            </div>
            <h3>The content</h3>
            <p>${postData.content}</p>
            <p>Posted on: <time>${date}</time></p>
            <img class="post-image" src="${postData.image}" alt="Post Image">
        `;
        postContainer.innerHTML = postHTML;

        // Comment form
        const commentFormHTML = `
            <form id="commentForm">
                <label for="comment">Your Comment:</label>
                <textarea id="comment" name="comment" required></textarea>
                <button type="submit">Submit Comment</button>
            </form>
        `;
        postContainer.innerHTML += commentFormHTML;

        // Populate comments
        const commentsHTML = postData.comments.map(comment => `
            <div class="comment">
                <h3>${comment.username}</h3>
                <p>${comment.text}</p>
            </div>
        `).join('');
        postContainer.innerHTML += commentsHTML;

        // Handle form submission
        const commentForm = document.getElementById('commentForm') as HTMLFormElement;
        commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(commentForm);
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;
            const username = user.username
            const text = formData.get('comment') as string;
            const commentData = { username, text };
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commentData)
                });
                if (!response.ok) {
                    throw new Error('Failed to add comment');
                }
                // Refresh the page to display the newly added comment
                displayPostPage(postId);
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
