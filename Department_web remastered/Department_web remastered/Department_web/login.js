function validateForm(event) {
    event.preventDefault();// Prevent form submission

    // Get form elements
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorBar = document.getElementById('error-bar');

    // Reset error messages
    errorBar.value = '';

    // Check if username and password are not empty
    if (username.value.trim() === '') {
      errorBar.value = 'Username is required';
      username.focus();
      return false;
    }

    if (password.value.trim() === '') {
      errorBar.value = 'Password is required';
      password.focus();
      return false;
    }

    // Additional validation (optional)
    if (password.value.length < 6) {
      errorBar.value = 'Password must be at least 6 characters long';
      password.focus();
      return false;
    }

    // Submit the form if everything is valid
    event.target.submit();
    window.open('index.html')
  }

  // Attach validateForm to the form's onsubmit event
  document.querySelector('form').addEventListener('submit', validateForm);

// rembermer me script

  // Function to save username to local storage if "Remember Me" is checked
  // Function to set a cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get a cookie by name
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return "";
  }

  // Function to delete a cookie
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Function to save the username in a cookie if "Remember Me" is checked
  function saveUsername() {
    const username = document.getElementById('username').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (rememberMe && username) {
      setCookie('savedUsername', username, 7); // Save for 7 days
    } else {
      deleteCookie('savedUsername');
    }
  }

  // Function to load the saved username from the cookie on page load
  function loadUsername() {
    const savedUsername = getCookie('savedUsername');
    if (savedUsername) {
      document.getElementById('username').value = savedUsername;
      document.getElementById('rememberMe').checked = true;
    }
  }

  // Attach saveUsername function to form's submit event
  document.querySelector('form').addEventListener('submit', function(event) {
    saveUsername();
    validateForm(event); // Call the validateForm function to handle validation
  });

  // Load the username when the page loads
  window.onload = function() {
    loadUsername();
  };
