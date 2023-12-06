
const registerButtons = document.querySelectorAll('.course button');


registerButtons.forEach(button => {
  button.addEventListener('click', function() {
    const courseName = this.parentNode.querySelector('h2').innerText;
    confirmRegistration(courseName);
  });
});


function confirmRegistration(courseName) {
  const confirmation = confirm(`You are registered for the course: ${courseName}. Do you want to proceed?`);

  if (confirmation) {
    alert('Registration confirmed!');
    
  } else {
    alert('Registration cancelled.');
  }
}