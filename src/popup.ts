export function sendMessage(text: string, timeoutMs = 3000) {
  const container = document.getElementById("popup-container");
  if (!container) return;

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = text;

  container.appendChild(popup);

  // Remove after timeout
  setTimeout(() => {
    popup.remove();
  }, timeoutMs);
}
