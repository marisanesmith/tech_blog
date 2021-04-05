const displayCommentInput = async (event) => {
    console.log('here');
    event.preventDefault();
    var commentBtn = document.querySelector('.commentBtn');
    var commentContainer = document.querySelector('.commentContainer');
  
    commentContainer.classList.remove('hide');
    commentBtn.classList.add('hide');
    console.log('commentBtn pressed');
  };
  
  document
  .querySelector('.commentBtn')
  .addEventListener('click', displayCommentInput);
  
  /////////////////////////////////////////////////////////
  
  const saveNewComment = async (event) => {
    event.preventDefault();
    console.log('saveBtn pressed');
  
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
  .addEventListener('click', saveNewComment);

  ////////// ADD EDIT COMMENT //////

/////////// ADD DELETE COMMENT ///////