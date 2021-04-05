const signupFormHandler = async function (event) {
    event.preventDefault();
  
    const username = document.querySelector('#usernameSignup').value.trim();
    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name: username, email: email, password: password }),
        headers: { 'Content-Type': 'application/json' },
      });
     
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };



  document
    .querySelector('#signup-form')
    .addEventListener('click', signupFormHandler);