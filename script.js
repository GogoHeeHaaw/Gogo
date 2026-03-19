const musicData = [
  {
    title: "Emotional Track",
    artist: "You",
    genre: "Ambient",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  }
];

const pluginData = [
  {
    name: "FreqTone",
    type: "Synth",
    desc: "Powerful VST plugin",
    demo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    download: "https://example.com/plugin.zip"
  }
];

const musicGrid = document.getElementById("musicGrid");
const pluginGrid = document.getElementById("pluginGrid");

function renderMusic(data) {
  musicGrid.innerHTML = "";
  data.forEach(item => {
    musicGrid.innerHTML += `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.artist} • ${item.genre}</p>
        <button class="preview" onclick="openPreview('${item.audio}')">Preview</button>
        <a href="${item.audio}" download><button class="download">Download</button></a>
      </div>
    `;
  });
}

function renderPlugins(data) {
  pluginGrid.innerHTML = "";
  data.forEach(item => {
    pluginGrid.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>${item.type}</p>
        <button class="preview" onclick="openPreview('${item.demo}')">Preview</button>
        <a href="${item.download}"><button class="download">Download</button></a>
      </div>
    `;
  });
}

function openPreview(src) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalBody").innerHTML =
    `<audio controls autoplay src="${src}" style="width:100%"></audio>`;
}

document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

renderMusic(musicData);
renderPlugins(pluginData);

/* SEARCH */
document.getElementById("musicSearch").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  renderMusic(musicData.filter(m => m.title.toLowerCase().includes(value)));
});

document.getElementById("pluginSearch").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  renderPlugins(pluginData.filter(p => p.name.toLowerCase().includes(value)));
});
