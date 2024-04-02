const resetSelection = () => {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection) {
      if (selection.empty) {
        selection.empty();
      } else if (selection.removeAllRanges) {
        selection.removeAllRanges();
      }
    }
  }
};

export default resetSelection;
