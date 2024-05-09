interface UserData {
    name: string;
    username: string;
    content: string;
    date: string;
    image: string;
}

export async function displayUserPage(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData: UserData = await response.json();

        console.log(userData);
        const userContainer = document.getElementById('user-container') as HTMLElement;
        // Populate user content
        const userHTML = `
            <h1>Name: ${userData.name}</h1>
            <div class="author">
                <h3 class="author-name">username: ${userData.username}</h3>
            </div>
            <p>register on: <time>${userData.date}</time></p>
            <img class="user-image" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Image">
            
        `;
        userContainer.innerHTML = userHTML;
    } catch (error) {
        console.error('Error fetching data:  ', error);
    }
}
