const getModalSize = (width = 478) => {
  if (width <= 478) {
    return 'xs';
  }

  if (width <= 768) {
    return 'md';
  }

  return '2xl';
};

export default getModalSize;
