document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
  
    if (signupForm) {
      signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        if (!signupForm.checkValidity()) {
          signupForm.reportValidity();
          return;
        }
  
        const formData = {
          firstName: signupForm.firstname.value.trim(),
          lastName: signupForm.lastname.value.trim(),
          email: signupForm.email.value.trim(),
          gender: signupForm.querySelector('input[name="gender"]:checked').value,
          reason: signupForm.reason.value.trim()
        };
  
        localStorage.setItem('signupData', JSON.stringify(formData));
        window.location.href = 'proj_profile_nogara.html';
      });
    }
  
    const nameSpan = document.getElementById('name');
    const emailSpan = document.getElementById('email');
    const genderSpan = document.getElementById('gender');
    const reasonSpan = document.getElementById('reason');
  
    if (nameSpan && emailSpan && genderSpan && reasonSpan) {
      const storedData = JSON.parse(localStorage.getItem('signupData'));
      if (storedData) {
        nameSpan.textContent = `${storedData.firstName} ${storedData.lastName}`;
        emailSpan.textContent = storedData.email;
        genderSpan.textContent = storedData.gender;
        reasonSpan.textContent = storedData.reason;
      } else {
        nameSpan.textContent = 'Guest';
      }
    }
  });