interface validationSignUp {
  user_name: string;
  email: string;
  role: string;
  password: string;
}
const validateSignup = (signUpData: validationSignUp) => {
  if (!signUpData.user_name.trim()) {
    return 'Name is required';
  }

  const emailPattern = /([a-z]+)([@]{1})([a-z]+)([.]{1})([a-z]+)/;

  if (signUpData.email === '') {
    return 'Email field is mandatory';
  } else if (!emailPattern.test(signUpData.email)) {
    return 'please enter valid email';
  }

  if (!signUpData.role) {
    return 'please select user type';
  }

  const passwordPattern = /([A-Z]+)([a-z]+)([@$&]?)([0-9]+)/;
  if (signUpData.password === '') {
    return 'Password field is mandatory*';
  } else if (signUpData.password.length < 8) {
    return 'Password must be at least 8 characters long.';
  } else if (!passwordPattern.test(signUpData.password)) {
    return 'Must contain at least one uppercase letter,  Must contain at least one lowercase letter,  Must contain at least one digit';
  }

  if (
    emailPattern.test(signUpData.email) &&
    passwordPattern.test(signUpData.password) &&
    signUpData.password.length >= 8
  ) {
    console.log('hi');
  }
};

export default validateSignup;
