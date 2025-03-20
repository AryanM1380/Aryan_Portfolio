// Get the comment form and comments container
const commentForm = document.querySelector('form');
const commentsContainer = document.querySelector('.grid.grid-cols-1.gap-8.sm\\:grid-cols-2.lg\\:grid-cols-3');

// Load existing comments from localStorage
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// Function to display comments
function displayComments() {
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'bg-white p-6 rounded-lg shadow-sm';
        commentElement.innerHTML = `
            <div class="flex items-center">
                <div class="text-lg font-medium text-gray-900">${comment.name}</div>
            </div>
            <p class="mt-4 text-gray-500">"${comment.comment}"</p>
            <div class="mt-2 text-sm text-gray-400">${comment.date}</div>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Display existing comments when page loads
displayComments();

// Add event listener to the form
commentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;

    // Validate form
    if (!name || !email || !comment) {
        alert('Please fill in all fields');
        return;
    }

    // Create new comment object
    const newComment = {
        name,
        email,
        comment,
        date: new Date().toLocaleDateString()
    };

    // Add to comments array
    comments.unshift(newComment);

    // Save to JSON file
    fetch('comments.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comments)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Update display
        displayComments();
        // Clear the form
        commentForm.reset();
        // Show success message
        alert('Comment submitted successfully!');
    })
    .catch(error => {
        console.error('Error saving comment:', error);
        alert('Error saving comment. Please try again.');
    });
});