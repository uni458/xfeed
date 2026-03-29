async function loadRSS() {
  const url = "https://nitter.net/uniuni53/rss";

  try {
    const response = await fetch(url);
    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const items = xml.querySelectorAll("item");
    const feed = document.getElementById("x-feed");

    feed.innerHTML = "";

    items.forEach((item, index) => {
      if (index >= 3) return;

      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;

      const li = document.createElement("li");
      li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
      feed.appendChild(li);
    });

  } catch (e) {
    console.error("RSS読み込みエラー:", e);
  }
}

loadRSS();
