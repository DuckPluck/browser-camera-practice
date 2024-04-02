const removeNoScript = () => {
  const noscriptTags = document.querySelectorAll('noscript');
  noscriptTags.forEach((tag) => tag.remove());
};

export default removeNoScript;
