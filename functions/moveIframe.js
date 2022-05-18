export default function moveIframe(iframeId, targetToMoveIframeSelector) {
  const iframeToCopy = document.querySelector(iframeId);
  const target = document.querySelector(targetToMoveIframeSelector);
  const body = document.querySelector("body");
  const quizzContainer = document.querySelector("#quizzContainer");

  function excecute() {
    const newIframe = document.querySelector(iframeId);
    target.innerHTML = newIframe.outerHTML;
    document.querySelector(iframeId).classList.add("visible");
  }

  if (iframeToCopy) {
    excecute();
  } else {
    const mutationObserver = new MutationObserver((entries) => {
      for (let entry of entries) {
        for (let node of entry.addedNodes) {
          if ("#" + node.id === iframeId) {
            excecute();
          }
        }
      }
    });

    mutationObserver.observe(body, { childList: true });
  }
}
