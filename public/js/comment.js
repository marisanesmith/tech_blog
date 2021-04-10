var commentBtn = document.querySelector('.commentBtn');
var editBtn = document.querySelector('.editBtn');
var deleteBtn = document.querySelector('.deleteBtn');
var commentContainer = document.querySelector('.commentContainer');

const displayCommentInput = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute('data-id');

  console.log("post_id " + id);

  if (id) {
  var idToComment = document.querySelector("#idToComment" + id);

  commentContainer.classList.remove('hide');
  commentBtn.classList.add('hide');
  console.log('commentBtn pressed');
}};

document
.querySelectorAll('.commentBtn')
.forEach(element => element.addEventListener('click', displayCommentInput));

/////////////////////////////////////////////////////////

const newComment = async (event) => {
  event.preventDefault();
  console.log('saveCommentBtn pressed');

  const comment = document.querySelector('#commentText').value.trim();
  const id = event.target.getAttribute('data-id');

console.log(comment);
console.log(id);


  if (comment && id ) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, post_id: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
                console.log('comment saved');
    } else {
      alert('Failed to save comment');
    }
  }
};

document
.querySelector('.saveCommentBtn')
.addEventListener('click', newComment);

    /////////////////////////////////////////////////////////

    const displayEditInput = async (event) => {
      event.preventDefault();

      const id = event.target.getAttribute('data-id');

      console.log("post_id " + id);
      
      if (id) {
      var id_to_edit = document.querySelector("#editPostDiv" + id);
      var editBtn = document.querySelector('.editBtn');
      // var editContainer = document.querySelector('.editContainer');
    
      id_to_edit.classList.remove('hide');
      editBtn.classList.add('hide');
      commentBtn.classList.add('hide');
      deleteBtn.classList.add('hide');

      console.log('editBtn pressed');
      }
    };
    
    document
    .querySelectorAll('.editBtn')
    .forEach(element => element.addEventListener('click', displayEditInput));
    
    /////////////////////////////////////////////////////////

    const editPost = async (event) => {
      event.preventDefault();
    
      const id = event.target.getAttribute('data-id');
      const content = document.getElementById('editPost'+ id).value;
      const data = {content:content};

      console.log(id);
      console.log(content);
          
      if (id) {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
      });

      if (response.ok) {
          document.location.replace('/dashboard');
          alert('Post updated')
      } else {
          alert('Failed to update post')
      }
          }
    };
    
    document
    .querySelectorAll('.saveEditBtn')
    .forEach(element => element.addEventListener('click', editPost));

    // DELETE COMMENT

    const delButtonHandler = async (event) => {
      const id = event.target.getAttribute('data-id');
      
      if (id) {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete post');
        }
      }
    };
    document
      .querySelector('.deleteBtn')
      .addEventListener('click', delButtonHandler);

