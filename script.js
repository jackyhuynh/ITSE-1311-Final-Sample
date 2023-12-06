
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashedpassword1",
      "courses": [1, 2]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "password": "hashedpassword2",
      "courses": [2, 3]
    }
  ]

  
  [
    {
      "id": 1,
      "title": "Math 101",
      "description": "Introduction to Mathematics",
      "availableSlots": 20,
      "registeredStudents": [1]
    },
    {
      "id": 2,
      "title": "History 101",
      "description": "Introduction to History",
      "availableSlots": 15,
      "registeredStudents": [1, 2]
    },
    {
      "id": 3,
      "title": "Science 101",
      "description": "Introduction to Science",
      "availableSlots": 25,
      "registeredStudents": [2]
    }
  ]

  fetch('courses.json')
  .then(response => response.json())
  .then(courses => {
    console.log(courses); 

    const coursesList = document.getElementById('courses-list');
    
  });




  
  document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
  });
  
  document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  });
  
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    
    let users = localStorage.getItem('users');
    if (users) {
      users = JSON.parse(users);
    } else {
      alert('No users registered. Please register first.');
      return;
    }
  
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      alert('Login successful! Welcome, ' + username);
      
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials. Please try again.');
    }
  });
  
  document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Registration successful! You can now login.');
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  });