import { displayPostPage } from "../post.page/display.post.page";

export function displayPostCard(post: any, container: HTMLDivElement) {
    const postLink = document.createElement('a');
    postLink.setAttribute('href', '#/posts/' + post.id);
    postLink.classList.add('post-link');
    postLink.addEventListener('click', event => {
        displayPostPage(post.id); // Display the single post
    });
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    const postImage = document.createElement('div');
    postImage.classList.add('post-image');
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profileImage = document.createElement('img');
    profileImage.setAttribute('src', 'assets/default.profile.png');
    profileImage.setAttribute('alt', 'Profile Image');

    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = post.author;

    postHeader.appendChild(profileImage);
    postHeader.appendChild(usernameSpan);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    const postContentParagraph = document.createElement('p');
    postContentParagraph.textContent = post.content;

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', post.image);

    postContent.appendChild(postTitle);
    postContent.appendChild(postContentParagraph);
    postCard.appendChild(postImage);
    postImage.appendChild(imageElement);
    postCard.appendChild(postHeader);
    postCard.appendChild(postContent);
    postLink.appendChild(postCard);
    container.appendChild(postLink);
}
