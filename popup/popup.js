const btn = document.getElementById("toggleBtn");

chrome.storage.local.get(["enabled"], (result) => {
  const enabled = result.enabled ?? false;
  updateButton(enabled);
});

btn.addEventListener("click", () => {
  chrome.storage.local.get(["enabled"], (result) => {
    const newState = !result.enabled;

    chrome.storage.local.set({ enabled: newState }, () => {
      updateButton(newState);

      // refresh current tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});

function updateButton(enabled) {
  btn.textContent = enabled ? "Disable Cleaner" : "Enable Cleaner";
}
