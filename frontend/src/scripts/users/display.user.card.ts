import { displayUserPage } from "./display.user.page";

export function displayUserCard(user: any, container: HTMLDivElement) {
    const userLink = document.createElement('a');
    userLink.setAttribute('href', '/users/' + user.id);
    userLink.classList.add('user-link');
    userLink.addEventListener('click', event => {
        displayUserPage(user.id); // Display the single user
    });
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    const userImage = document.createElement('div');
    userImage.classList.add('user-image');
    const userHeader = document.createElement('div');
    userHeader.classList.add('user-header');

    const profileImage = document.createElement('img');
    profileImage.setAttribute('src', 'assets/default.profile.png');
    profileImage.setAttribute('alt', 'Profile Image');

    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = user.author;

    userHeader.appendChild(profileImage);
    userHeader.appendChild(usernameSpan);

    const userContent = document.createElement('div');
    userContent.classList.add('user-content');

    const userTitle = document.createElement('h2');
    userTitle.textContent = user.title;

    const userContentParagraph = document.createElement('p');
    userContentParagraph.textContent = user.content;

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', user.image);

    userContent.appendChild(userTitle);
    userContent.appendChild(userContentParagraph);
    userCard.appendChild(userImage);
    userImage.appendChild(imageElement);
    userCard.appendChild(userHeader);
    userCard.appendChild(userContent);
    userLink.appendChild(userCard);
    container.appendChild(userLink);
}
