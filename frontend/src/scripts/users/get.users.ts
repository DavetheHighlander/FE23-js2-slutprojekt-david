import { displayUserCard } from "./display.user.card";

async function getUsers() {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log(data);

      return data; // Assuming the response contains a 'users' array
    } catch (error) {
      console.error('Error fetching users:', error.message);
      // Optionally, display an error message to the user
      return []; // Return an empty array in case of error
    }
  }
  export async function displayUsers() {
    try {
        const users = await getUsers();
        console.log(users);
        const userListDiv = document.querySelector('.user-list') as HTMLDivElement;
        userListDiv.innerHTML = ''; // Clear previous content

        users.forEach((user: any) => {
            console.log(user);
            displayUserCard(user, userListDiv);
        });
    } catch (error) {
        console.error('Error loading users:', error.message);
        // Optionally, display an error message to the user
    }
}

