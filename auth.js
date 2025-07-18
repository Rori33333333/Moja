const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authStatus = document.getElementById('authStatus');

// SIGNUP
signupBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      authStatus.textContent = `Signed up as ${userCredential.user.email}`;
    })
    .catch(error => {
      authStatus.textContent = `Signup error: ${error.message}`;
    });
});

// LOGIN
loginBtn.addEventListener('click', (e) => {
  e.preventDefault(); // prevent page refresh
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      authStatus.textContent = `Logged in as ${userCredential.user.email}`;
    })
    .catch(error => {
      authStatus.textContent = `Login error: ${error.message}`;
    });
});

// LOGOUT
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    authStatus.textContent = 'Logged out.';
  });
});

// TRACK LOGIN STATE
auth.onAuthStateChanged(user => {
  if (user) {
    authStatus.textContent = `Logged in as ${user.email}`;
    logoutBtn.style.display = 'block';
  } else {
    authStatus.textContent = 'Not logged in.';
    logoutBtn.style.display = 'none';
  }
});
