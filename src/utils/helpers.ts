const generateUniqueId = () => {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
};

const helpers = {
  generateUniqueId,
};

export default helpers;
