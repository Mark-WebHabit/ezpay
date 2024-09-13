const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(email);
};

const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
};

const validatePincode = (pincode) => {
  return /^[0-9]{4}$/.test(pincode);
};
