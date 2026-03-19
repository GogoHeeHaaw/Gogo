const musicData = [
  {
    id: 1,
    title: "Midnight Bloom",
    artist: "Gogo Leo",
    genre: "Cinematic",
    mood: "Emotional",
    bpm: 128,
    duration: "3:42",
    featured: true,
    popular: 92,
    description: "A wide, emotional cinematic track with atmospheric layers and a powerful lift.",
    tags: ["Cinematic", "Emotional", "Atmospheric"],
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    download: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Neon Drift",
    artist: "Gogo Leo",
    genre: "House",
    mood: "Energetic",
    bpm: 124,
    duration: "2:58",
    featured: false,
    popular: 75,
    description: "A sleek club-ready groove with modern synth energy and crisp movement.",
    tags: ["House", "Energetic", "Dance"],
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    download: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "After Rain",
    artist: "Gogo Leo",
    genre: "Ambient",
    mood: "Calm",
    bpm: 88,
    duration: "4:15",
    featured: false,
    popular: 68,
    description: "Soft textures, spacious ambience, and a reflective emotional atmosphere.",
    tags: ["Ambient", "Calm", "Soft"],
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    download: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const pluginData = [
  {
    id: 1,
    name: "FreqTone",
    developer: "Gogo Audio",
    type: "Synth",
    category: "Instrument",
    formats: ["VST3", "AU"],
    newest: true,
    popular: 120,
    featured: true,
    description: "A warm modern synth designed for melodic textures, cinematic layers, and emotional leads.",
    tags: ["Synth", "Melodic", "Modern"],
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    previewType: "audio",
    previewSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    download: "#"
  },
  {
    id: 2,
    name: "Void Reverb",
    developer: "Gogo Audio",
    type: "Effect",
    category: "Reverb",
    formats: ["VST3", "AAX"],
    newest: false,
    popular: 95,
    featured: false,
    description: "Large atmospheric spaces, silky tails, and a polished premium reverb feel.",
    tags: ["Effect", "Space", "Ambient"],
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    previewType: "video",
    previewSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    download: "#"
  },
  {
    id: 3,
    name: "Pulse EQ",
    developer: "Gogo Audio",
    type: "Utility",
    category: "EQ",
    formats: ["VST3", "AU", "AAX"],
    newest: true,
    popular: 82,
    featured: false,
    description: "A clean utility EQ built for fast shaping and confident mix decisions.",
    tags: ["Utility", "Mix", "Clean"],
    image: "https://images.unsplash.com/photo-1556179174-44e0d9f1f1f0?auto=format&fit=crop&w=1200&q=80",
    previewType: "image",
    previewSrc: "https://images.unsplash.com/photo-1558729064-7c5e3b7f8f2a?auto=format&fit=crop&w=1200&q=80",
    download: "#"
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