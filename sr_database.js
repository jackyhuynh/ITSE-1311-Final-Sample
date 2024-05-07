var defaultDatabase = {
    "students": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "hashedpassword1", 
        "courses": [] 
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "password": "hashedpassword2",
        "courses": []
      }
    ],
    "courses": [
      {
        "id": 1,
        "title": "Math 101",
        "description": "Introduction to Mathematics",
        "availableSlots": 20, 
        "registeredStudents": [] 
      },
      {
        "id": 2,
        "title": "History 101",
        "description": "Introduction to History",
        "availableSlots": 15,
        "registeredStudents": []
      },
      {
        "id": 3,
        "title": "Science 101",
        "description": "Introduction to Science",
        "availableSlots": 25,
        "registeredStudents": []
      }
    ]
    }

var database;

window.addEventListener("load", function() {
    var db = localStorage.getItem('database');
    if (db) {
        database = JSON.parse(db);
    } else {
        database = defaultDatabase;
        localStorage.setItem('database', JSON.stringify(database));
    }
});
