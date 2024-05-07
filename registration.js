var loggedInStudent;

window.addEventListener("load", function() {
    setPageState();

    function setPageState() {
        if (localStorage.getItem("loggedin")) {
            document.getElementById("login").style.display = "none";
            document.getElementById("main").style.display = "block";
            document.getElementById("username").style.display = "block";
            document.getElementById("logoutButton").style.display = "block";
        } else {
            document.getElementById("login").style.display = "block";
            document.getElementById("main").style.display = "none";
            document.getElementById("username").style.display = "none";
            document.getElementById("logoutButton").style.display = "none";
        }
    }

    document.getElementById("loginButton").addEventListener("click", function(e) {
        e.preventDefault();
        var email = document.getElementById("emailBox").value;
        var password = document.getElementById("passBox").value;
        var foundStudent = database.students.filter(function(student) {
            return (student.email === email) && (student.password === password);
        });
        if (foundStudent.length > 0) {
            document.getElementById("username").innerText = foundStudent[0].name;
            loggedInStudent = foundStudent[0];
            localStorage.setItem("loggedin", true);
        } else {
            localStorage.setItem("loggedin", false);
            window.alert("Invalid login");
        }
        var courses = document.getElementById("courses");
        var students = document.getElementById("students");
        courses.removeChildren();
        students.removeChildren();
        database.courses.forEach(course => {
            var divTitle = document.createElement("div");
            divTitle.innerText = course.title;
            courses.appendChild(divTitle);

            var divDescription = document.createElement("div");
            divDescription.innerText = course.description;
            courses.appendChild(divDescription);

            var divAvailableSlots = document.createElement("div");
            divAvailableSlots.innerText = "Available Slots: " + course.availableSlots;
            courses.appendChild(divAvailableSlots);

            var registerButton = document.createElement("button");
            registerButton.innerText = "Register";
            registerButton.setAttribute("data-course-id", course.id);
            registerButton.addEventListener("click", function(e) {
                var courseId = parseInt(e.target.dataset.courseId);
                addStudentCourse(courseId);
            });
            courses.appendChild(registerButton);
            var hr = document.createElement("hr");
            courses.appendChild(hr);
            if (loggedInStudent.courses.indexOf(course.id) !== -1) {
                var divTitle = document.createElement("div");
                divTitle.innerText = course.title;
                students.appendChild(divTitle);

                var divDescription = document.createElement("div");
                divDescription.innerText = course.description;
                students.appendChild(divDescription);
            }
        });
        setPageState();
    });

    document.getElementById("logoutButton").addEventListener("click", function(e) {
        e.preventDefault();
        localStorage.removeItem("loggedin");
        loggedInStudent = null;
        setPageState();
    }); 
});

HTMLElement.prototype.removeChildren = function() {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
};

function addStudentCourse(courseId) {
    for (let i = 0; i < database.students.length; i++) {
        const student = database.students[i];
        if (student.id === loggedInStudent.id) {
            if (student.courses.indexOf(courseId) === -1) {
                for (let i = 0; i < database.courses.length; i++) {
                    const course = database.courses[i];
                    if (course.id === courseId) {
                        if (course.availableSlots > 0) {
                            course.registeredStudents.push(loggedInStudent.id);
                            student.courses.push(courseId);
                            course.availableSlots--;
                            localStorage.setItem('database', JSON.stringify(database));
                            var students = document.getElementById("students");

                            var divTitle = document.createElement("div");
                            divTitle.innerText = course.title;
                            students.appendChild(divTitle);

                            var divDescription = document.createElement("div");
                            divDescription.innerText = course.description;
                            students.appendChild(divDescription);
                        } else {
                            window.alert("There are no more available slots for this course");
                        }
                    }
                }
                return;
            } else {
                window.alert("You are already registered for this course");
                return;
            }
        }
    }
}