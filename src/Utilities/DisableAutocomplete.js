const disableBrowserAutocomplete = () => {
  const disableAutocomplete = (el) => {
    if (el.tagName === "INPUT") {
      el.setAttribute("autocomplete", "off");
      el.setAttribute(
        "name",
        `off-${Math.random().toString(36).substring(2, 8)}`
      );
    }
  };

  document.querySelectorAll("input").forEach(disableAutocomplete);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.querySelectorAll) {
          node.querySelectorAll("input").forEach(disableAutocomplete);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  return () => observer.disconnect(); // for cleanup if needed
};
export default disableBrowserAutocomplete;
