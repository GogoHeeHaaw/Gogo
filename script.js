const musicData = [
  {
    id: 1,
    title: "OMA",
    artist: "Gogo",
    genre: "Tropical House",
    mood: "Chill, Moody, Dreamy",
    bpm: 140,
    duration: "3:31",
    featured: false,
    popular: 92,
    description: "A sleek chill and dreamy with modern synth/bass energy and ambient movement.",
    tags: ["Tropical House", "Dreamy"],
    cover: "IMG_20260408_170230.jpg",
    audio: "Gogo - OMA.m4a",
    download: "Gogo - OMA.m4a"
  },
  {
    id: 2,
    title: "MAKA",
    artist: "Gogo",
    genre: "Melodic Bass",
    mood: "Emotional",
    bpm: 140,
    duration: "4:20",
    featured: true,
    popular: 75,
    description: "A wide, emotional melodic bass track with thick atmospheric layers and a powerful lift.",
    tags: ["Melodic", "Emotional", "Atmospheric"],
    cover: "IMG_20260408_173419.jpg",
    audio: "Gogo - MAKA.m4a",
    download: "Gogo - MAKA.m4a"
  },
  {
    id: 3,
    title: "Lost",
    artist: "Gogo",
    genre: "Electronic Rock",
    mood: "Emotional rock vibe with electronic texture",
    bpm: 148,
    duration: "3:54",
    featured: false,
    popular: 0,
    description: "Electronic textures, spacious ambience, and a modern rock vibe.",
    tags: ["Electronic Rock"],
    cover: "26690.jpg",
    audio: "#",
    download: "#"
  }
];

const pluginData = [
  {
    id: 1,
    name: "FreqTone",
    developer: "DigitalHarmony",
    type: "Effect",
    category: "Distortion",
    formats: ["VST3"],
    newest: false,
    popular: 120,
    featured: true,
    description: "A distortion plugin designed for adding crunch, saturation, overdrive and cutting low/high pass to your samples.",
    tags: ["Effect", "Distortion", "Minimal"],
    image: "20260408_060337.jpg",
    previewType: "video",
    previewSrc: "logos_vanlalthlana_c2126ce351014624a655cee510086ed9.mp4",
    download: "FreqTone.rar"
  },
  {
    id: 2,
    name: "ZoDelay",
    developer: "DigitalHarmony",
    type: "Effect",
    category: "Delay",
    formats: ["VST3"],
    newest: true,
    popular: 95,
    featured: false,
    description: "A versatile and intuitive delay plugin, a sleek minimal design with an optimized engine which can deliver from tight slap-back to wide cinematic echoes.",
    tags: ["Effect", "Space", "Ambient", "Echoes"],
    image: "file_000000001ee8720683dd6daf2c7fe445.png",
    previewType: "video",
    previewSrc: "VN20260319_181704.mp4",
    download: "ZoDelay.rar"
  }
];

const state = {
  music: [...musicData],
  plugins: [...pluginData]
};

const musicGrid = document.getElementById("musicGrid");
const pluginGrid = document.getElementById("pluginGrid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const themeToggle = document.getElementById("themeToggle");

const musicSearch = document.getElementById("musicSearch");
const musicGenreFilter = document.getElementById("musicGenreFilter");
const musicSort = document.getElementById("musicSort");

const pluginSearch = document.getElementById("pluginSearch");
const pluginTypeFilter = document.getElementById("pluginTypeFilter");
const pluginSort = document.getElementById("pluginSort");

document.getElementById("musicCount").textContent = musicData.length;
document.getElementById("pluginCount").textContent = pluginData.length;

function makeTags(tags) {
  return tags.map(tag => `<span class="tag">${tag}</span>`).join("");
}

function openModal(content) {
  modalBody.innerHTML = content;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closePreview() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalBody.innerHTML = "";
}

function renderMusic(items) {
  if (!items.length) {
    musicGrid.innerHTML = `<div class="empty-state">No music matches your search or filter.</div>`;
    return;
  }

  musicGrid.innerHTML = items.map(item => `
    <article class="media-card">
      <div class="card-media" style="background-image:url('${item.cover}')"></div>
      <div class="card-body">
        <div class="card-topline">
          <span class="pill">${item.genre}</span>
          <span class="meta">${item.bpm} BPM</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="tag-row">
          ${makeTags(item.tags)}
        </div>
        <div class="card-footer">
          <span class="duration">${item.artist} • ${item.duration}</span>
          <div class="card-actions">
            <button class="btn btn-ghost preview-btn" type="button"
              data-type="music"
              data-title="${item.title}"
              data-artist="${item.artist}"
              data-desc="${item.description}"
              data-image="${item.cover}"
              data-src="${item.audio}">
              Preview
            </button>
            <a class="btn btn-primary download-btn" href="${item.download}" download>
              Download
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderPlugins(items) {
  if (!items.length) {
    pluginGrid.innerHTML = `<div class="empty-state">No plugins match your search or filter.</div>`;
    return;
  }

  pluginGrid.innerHTML = items.map(item => `
    <article class="media-card">
      <div class="card-media" style="background-image:url('${item.image}')"></div>
      <div class="card-body">
        <div class="card-topline">
          <span class="pill">${item.type}</span>
          <span class="meta">${item.formats.join(" • ")}</span>
        </div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="tag-row">
          ${makeTags(item.tags)}
        </div>
        <div class="card-footer">
          <span class="duration">${item.developer}</span>
          <div class="card-actions">
            <button class="btn btn-ghost preview-btn" type="button"
              data-type="plugin"
              data-title="${item.name}"
              data-artist="${item.developer}"
              data-desc="${item.description}"
              data-image="${item.image}"
              data-preview-type="${item.previewType}"
              data-src="${item.previewSrc}">
              Preview
            </button>
            <a class="btn btn-primary download-btn" href="${item.download}">
              Download
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function sortMusic(items, mode) {
  const copy = [...items];
  switch (mode) {
    case "latest":
      return copy.sort((a, b) => b.id - a.id);
    case "popular":
      return copy.sort((a, b) => b.popular - a.popular);
    case "duration":
      return copy.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
    default:
      return copy.filter(item => item.featured).concat(copy.filter(item => !item.featured));
  }
}

function sortPlugins(items, mode) {
  const copy = [...items];
  switch (mode) {
    case "newest":
      return copy.sort((a, b) => Number(b.newest) - Number(a.newest) || b.id - a.id);
    case "popular":
      return copy.sort((a, b) => b.popular - a.popular);
    default:
      return copy.filter(item => item.featured).concat(copy.filter(item => !item.featured));
  }
}

function parseDuration(duration) {
  const [min, sec] = duration.split(":").map(Number);
  return min * 60 + sec;
}

function updateMusic() {
  const query = musicSearch.value.toLowerCase().trim();
  const genre = musicGenreFilter.value;
  const sort = musicSort.value;

  let filtered = musicData.filter(item => {
    const haystack = `${item.title} ${item.artist} ${item.genre} ${item.mood} ${item.tags.join(" ")}`.toLowerCase();
    const genreMatch = genre === "all" || item.genre === genre;
    return haystack.includes(query) && genreMatch;
  });

  filtered = sortMusic(filtered, sort);
  renderMusic(filtered);
}

function updatePlugins() {
  const query = pluginSearch.value.toLowerCase().trim();
  const type = pluginTypeFilter.value;
  const sort = pluginSort.value;

  let filtered = pluginData.filter(item => {
    const haystack = `${item.name} ${item.developer} ${item.type} ${item.category} ${item.tags.join(" ")} ${item.formats.join(" ")}`.toLowerCase();
    const typeMatch = type === "all" || item.type === type;
    return haystack.includes(query) && typeMatch;
  });

  filtered = sortPlugins(filtered, sort);
  renderPlugins(filtered);
}

document.addEventListener("click", (e) => {
  const previewBtn = e.target.closest(".preview-btn");
  if (previewBtn) {
    const { title, artist, desc, image, src, previewType, type } = previewBtn.dataset;

    if (previewBtn.dataset.type === "music") {
      openModal(`
        <div class="preview-layout">
          <div class="preview-visual" style="background-image:url('${image}')"></div>
          <div class="preview-copy">
            <div class="eyebrow">Music preview</div>
            <h3>${title}</h3>
            <p><strong>${artist}</strong></p>
            <p>${desc}</p>
            <div class="preview-media">
              <audio controls autoplay src="${src}"></audio>
            </div>
          </div>
        </div>
      `);
    } else {
      const mediaBlock = previewType === "video"
        ? `<video controls autoplay src="${src}"></video>`
        : previewType === "image"
          ? `<img src="${src}" alt="${title}" style="width:100%; border-radius:18px;" />`
          : `<audio controls autoplay src="${src}"></audio>`;

      openModal(`
        <div class="preview-layout">
          <div class="preview-visual" style="background-image:url('${image}')"></div>
          <div class="preview-copy">
            <div class="eyebrow">Plugin preview</div>
            <h3>${title}</h3>
            <p><strong>${artist}</strong></p>
            <p>${desc}</p>
            <ul>
              <li>Professional preview area</li>
              <li>Clear compatibility display</li>
              <li>Direct access to download</li>
            </ul>
            <div class="preview-media">
              ${mediaBlock}
            </div>
          </div>
        </div>
      `);
    }
  }
});

closeModal.addEventListener("click", closePreview);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closePreview();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePreview();
});

[musicSearch, musicGenreFilter, musicSort].forEach(el => el.addEventListener("input", updateMusic));
[musicGenreFilter, musicSort].forEach(el => el.addEventListener("change", updateMusic));
[pluginSearch, pluginTypeFilter, pluginSort].forEach(el => el.addEventListener("input", updatePlugins));
[pluginTypeFilter, pluginSort].forEach(el => el.addEventListener("change", updatePlugins));

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀" : "☾";
});

updateMusic();
updatePlugins();
