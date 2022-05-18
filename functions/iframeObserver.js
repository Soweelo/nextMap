export default function iframeObserver(iframeId) {
  let iframeLoaded = false;
  const mutationObserver = new MutationObserver((entries) => {
    console.log(entries);
    for (let entry of entries) {
      console.log(entry);
      for (let node of entry.addedNodes) {
        console.log(node);
        if (node) {
          if (node.id === iframeId) {
            console.log("yeeeeeeeeeeeeeees");
            iframeLoaded = true;
            return iframeLoaded;
          }
          return iframeLoaded;
        }
        return iframeLoaded;
      }
      return iframeLoaded;
    }
    return iframeLoaded;
  });
  const parent = document.querySelector("body");
  console.log(parent);
  mutationObserver.observe(parent, { childList: true });
  console.log(mutationObserver.observe(parent, { childList: true }));
}
