// version1

// function removeElements() {
//   const tab = document.querySelector(
//     '.flexlayout__tab[data-layout-path="/ts0/t0"]'
//   );

//   if (!tab) return;

//   const firstChild = tab.children[0];
//   const secondLevel = firstChild?.children[0];

//   const firstTarget = secondLevel?.children[0]?.children[1];
//   const secondTarget = secondLevel?.children[1];

//   if (firstTarget) firstTarget.remove();
//   if (secondTarget) secondTarget.remove();
// }

// // Check extension state
// chrome.storage.local.get(["enabled"], (result) => {
//   if (result.enabled) {
//     // LeetCode loads UI dynamically → delay helps
//     setTimeout(removeElements, 1000);
//   }
// });
// =======================================================================================
//  Version2
// let observer;

// function removeTargets() {
//   const tab = document.querySelector(
//     '.flexlayout__tab[data-layout-path="/ts0/t0"]'
//   );

//   if (!tab) return;

//   const firstChild = tab.children[0];
//   const secondLevel = firstChild?.children[0];

//   const firstTarget = secondLevel?.children[0]?.children[1];
//   const secondTarget = secondLevel?.children[1];

//   if (firstTarget) firstTarget.remove();
//   if (secondTarget) secondTarget.remove();

//   if (firstTarget || secondTarget) {
//     observer.disconnect();
//   }
// }

// function startObserver() {
//   observer = new MutationObserver(() => {
//     removeTargets();
//   });

//   observer.observe(document.documentElement, {
//     childList: true,
//     subtree: true,
//   });
// }

// function stopObserver() {
//   if (observer) observer.disconnect();
// }

// chrome.storage.local.get(["enabled"], (res) => {
//   if (res.enabled) {
//     startObserver();
//   }
// });

// ========================================================================================
// version3 - CSS removal(faster) No flicker

const STYLE_ID = "leetcode-cleaner-style";

function injectCSS() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;

  style.textContent = `
    .flexlayout__tab[data-layout-path="/ts0/t0"]
      > :first-child
      > :first-child
      > :first-child
      > :nth-child(2),
    .flexlayout__tab[data-layout-path="/ts0/t0"]
      > :first-child
      > :first-child
      > :nth-child(2) {
      display: none !important;
    }
  `;

  document.documentElement.appendChild(style);
}

function removeCSS() {
  document.getElementById(STYLE_ID)?.remove();
}

// Apply based on toggle
chrome.storage.local.get(["enabled"], (res) => {
  if (res.enabled) {
    injectCSS();
  }
});
