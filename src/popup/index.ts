import "../app.css";
import Counter from "../components/Counter.svelte";

async function render() {
  const { count } = await chrome.storage.sync.get({ count: 0 });

  if (window.location.href.includes("chrome-extension://")) {
    new Counter({ target: document.getElementById("app"), props: { count } });
  } else {
    const container = document.createElement("shadow-dom-container");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.zIndex = "9999999999";

    const shadowRoot = container.attachShadow({ mode: "open" });
    // shadowRoot.innerHTML = `<style>${css}</style>`;
    document.body.appendChild(container);

    new Counter({ target: shadowRoot });
  }
}

document.addEventListener("DOMContentLoaded", render);
