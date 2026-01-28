// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Phone validation
export const validatePhone = (phone) => {
  const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return re.test(phone);
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Number validation
export const validateNumber = (value) => {
  return !isNaN(value) && value > 0;
};

// URL validation
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

//  validation registration
export const validateRegisterForm = (data) => {
  const errors = {};
  
  if (!validateRequired(data.name)) {
    errors.name = 'Name is required';
  }
  
  if (!validateRequired(data.email) || !validateEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!validateRequired(data.password) || !validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!validateRequired(data.medicalhistory)) {
    errors.medicalhistory = 'Medical history is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// validation  login
export const validateLoginForm = (data) => {
  const errors = {};
  
  if (!validateRequired(data.email) || !validateEmail(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!validateRequired(data.password)) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};