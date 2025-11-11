exports.validateEmail = async (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};