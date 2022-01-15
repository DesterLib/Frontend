export default function seo(data = {}) {
  const ui_config = JSON.parse(
    window.localStorage.getItem("ui_config") ||
      window.sessionStorage.getItem("ui_config") ||
      "{}"
  );
  data.title = data.title || ui_config.title || "libDrive";
  data.description =
    data.description ||
    "libDrive is a Google Drive media library manager and indexer, similar to Plex, that organizes Google Drive media to offer an intuitive and user-friendly experience.";
  data.image = data.image || ui_config.icon || "/images/icons/icon-512x512.png";
  data.type = data.type || "website";
  document.title = data.title || ui_config.title;
  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", data.title);
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", data.description);
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", data.description);
  document
    .querySelector('meta[property="og:image"]')
    .setAttribute("content", data.image);
  document
    .querySelector('meta[property="og:type"]')
    .setAttribute("content", data.type);
}
