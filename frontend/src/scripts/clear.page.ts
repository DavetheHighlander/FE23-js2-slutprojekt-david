// Function to convert image to Base64
export function clearPage(){
    const postListDiv = document.querySelector('.post-list') as HTMLDivElement;

    if (postListDiv) {
        postListDiv.innerHTML = '';
    }
    const postDetailsPage = document.getElementById('postDetailsPage') as HTMLDivElement;
    if (postDetailsPage) {
        postDetailsPage.innerHTML = '';
    }
}
