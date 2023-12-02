export const validateEmail = (email) => {
  // Simple email validation (you may use a more sophisticated validation library)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^0[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};

export const validatePassword = (password) => {
  // Validate password (at least 8 characters, 1 uppercase, 1 digit)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateDate = (isoDate) => {
  const inputDate = new Date(isoDate);
  const currentDate = new Date();
  const normalizedInputDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const normalizedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  return (normalizedInputDate <= normalizedCurrentDate)
}