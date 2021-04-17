module.exports.validateRegisterInput = (
  firstName,
  lastName,
  email,
  password,
  confirmedPassword
) => {
  const errors = {}
  if(firstName.trim() === ''){
    errors.firstName = 'First name must not be empty'
  }
  if(lastName.trim() === ''){
    errors.lastName = 'Last name must not be empty'
  }
  if(email.trim() === ''){
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if(!email.match(regEx)) {
      errors.email = "Please enter a valid email address"
    }
  }
  if(password === '') {
    errors.password = "The password cannot be empty"

  } else if(password !== confirmedPassword) {
    errors.confirmedPassword = "Passwords must match"
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (email, password) => {
  const errors = {}
  if(email.trim() === ''){
    errors.email = 'Email must not be empty'
  }
  if(password.trim() === ''){
    errors.password = 'Password must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateBookInput = (title, description, author, price) => {
  const errors = {}

  if(title.trim() === ''){
    errors.title = 'title must not be empty'
  }
  if(description.trim() === ''){
    errors.description = 'description must not be empty'
  }
  if(author.trim() === ''){
    errors.author = 'author must not be empty'
  }
  if(price === ''){
    errors.price = 'price must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}