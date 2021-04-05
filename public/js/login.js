const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log(response);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('click', loginFormHandler);