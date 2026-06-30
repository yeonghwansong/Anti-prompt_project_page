async function loadJSON(path) {
  const sep = path.includes("?") ? "&" : "?";
  const response = await fetch(`${path}${sep}v=20260627h`);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeSampleName(value) {
  return (value || "").replace(/\.mp4$/i, "").trim();
}

function niceGroupName(name) {
  const mapping = {
    "white-box": "White-box",
    "black-box": "Black-box",
    "crop-resize": "Crop and Resize",
    "jpeg": "JPEG",
    "advclean": "ADVClean"
  };
  return mapping[name] || name;
}

function createVideoCard({ label, src }) {
  const column = document.createElement("div");
  column.className = "column is-one-third";
  column.innerHTML = `
    <div class="video-card">
      <div class="method-label">${label}</div>
      <video controls preload="metadata" playsinline>
        <source src="${src}" type="video/mp4">
      </video>
    </div>
  `;
  return column;
}

function createCarouselShell(title) {
  const shell = document.createElement("div");
  shell.className = "carousel-shell";
  shell.innerHTML = `
    <div class="carousel-topline">
      <h4 class="prompt-title">${title}</h4>
    </div>
    <div class="carousel-viewport">
      <button class="carousel-btn carousel-btn--side carousel-btn--prev" type="button" data-dir="-1" aria-label="Previous">
        <span class="carousel-arrow" aria-hidden="true">&#8249;</span>
      </button>
      <div class="carousel-track"></div>
      <button class="carousel-btn carousel-btn--side carousel-btn--next" type="button" data-dir="1" aria-label="Next">
        <span class="carousel-arrow" aria-hidden="true">&#8250;</span>
      </button>
    </div>
    <div class="carousel-dots"></div>
  `;
  return shell;
}

function setupCarousel(shell) {
  const viewport = shell.querySelector(".carousel-viewport");
  const track = shell.querySelector(".carousel-track");
  const slides = Array.from(shell.querySelectorAll(".carousel-slide"));
  const dots = Array.from(shell.querySelectorAll(".carousel-dot"));
  let index = 0;

  function update(nextIndex) {
    index = Math.max(0, Math.min(nextIndex, slides.length - 1));
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  }

  shell.querySelectorAll(".carousel-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const dir = Number(button.dataset.dir);
      update(index + dir);
    });
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => update(dotIndex));
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") update(index - 1);
    if (event.key === "ArrowRight") update(index + 1);
  });

  update(0);
}

function renderPromptRows(container, entries, order, title) {
  const grouped = new Map();
  for (const entry of entries) {
    const key = `${entry.group}|||${entry.prompt}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(entry);
  }

  const section = document.createElement("div");
  section.className = "group-block";
  section.innerHTML = `<h3 class="group-title">${title}</h3>`;

  const shell = createCarouselShell(title);
  const track = shell.querySelector(".carousel-track");
  const dots = shell.querySelector(".carousel-dots");

  for (const [groupName, prompts] of Object.entries(order)) {
    for (const prompt of prompts) {
      const key = `${groupName}|||${prompt}`;
      const items = grouped.get(key);
      if (!items) continue;

      const row = document.createElement("div");
      row.className = "carousel-slide";
      row.innerHTML = `
        <div class="slide-meta">
          <span class="setting-chip">${niceGroupName(groupName)}</span>
          <h4 class="prompt-title slide-prompt-title">${prompt}</h4>
        </div>
      `;

      const columns = document.createElement("div");
      columns.className = "columns is-multiline";

      ["clean", "i2vguard", "ours"].forEach((method) => {
        const item = items.find((entry) => entry.method === method);
        if (!item) return;
        const label =
          method === "clean" ? "Clean" : method === "i2vguard" ? "I2VGuard" : "Ours";
        columns.appendChild(createVideoCard({ label, src: item.dst }));
      });

      row.appendChild(columns);
      track.appendChild(row);

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", prompt);
      dots.appendChild(dot);
    }
  }

  section.appendChild(shell);
  container.appendChild(section);
  setupCarousel(shell);
}

function renderTeaser(container, manifest) {
  const prompt = "a woman with long black hair is posing for a picture";
  const group = "white-box";
  const items = manifest.cog.filter((entry) => entry.group === group && entry.prompt === prompt);
  const columns = document.createElement("div");
  columns.className = "columns is-multiline";

  ["clean", "i2vguard", "ours"].forEach((method) => {
    const item = items.find((entry) => entry.method === method);
    if (!item) return;
    const label =
      method === "clean" ? "Clean" : method === "i2vguard" ? "I2VGuard" : "Ours";
    columns.appendChild(createVideoCard({ label, src: item.dst }));
  });
  container.appendChild(columns);
}

function createScoreChip(label, value) {
  if (!value || value === "") return "";
  return `<span class="score-chip"><strong>${label}</strong>${value}</span>`;
}

function createDimensionStat(label, value) {
  if (!value || value === "") return "";
  return `
    <div class="dimension-stat">
      <span class="dimension-label">${label}</span>
      <span class="dimension-value">${value}</span>
    </div>
  `;
}

function formatVBenchValue(metric, value) {
  if (value === undefined || value === null || value === "") return "";
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  if (metric === "imaging_quality") return num.toFixed(1);
  return `${(num * 100).toFixed(1)}%`;
}

function prettyMetricLabel(metric) {
  const labels = {
    i2v_subject: "I2V Subject",
    i2v_background: "I2V Background",
    subject_consistency: "Subject Consistency",
    background_consistency: "Background Consistency",
    aesthetic_quality: "Aesthetic Quality",
    imaging_quality: "Imaging Quality",
    motion_smoothness: "Motion Smoothness",
    temporal_flickering: "Temporal Flickering"
  };
  return labels[metric] || metric;
}

function buildVBenchStats(row) {
  const mapping = {
    i2v_subject: row.vbench_i2v_subject,
    i2v_background: row.vbench_i2v_background,
    subject_consistency: row.vbench_subject_consistency,
    background_consistency: row.vbench_background_consistency,
    aesthetic_quality: row.vbench_aesthetic_quality,
    imaging_quality: row.vbench_imaging_quality,
    motion_smoothness: row.vbench_motion_smoothness,
    temporal_flickering: row.vbench_temporal_flickering
  };

  const used = (row.vbench_metrics_used || "")
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean);

  const metrics = (used.length ? used : Object.keys(mapping))
    .filter((metric) => mapping[metric] !== undefined && mapping[metric] !== null && mapping[metric] !== "");

  return metrics
    .map((metric) => createDimensionStat(prettyMetricLabel(metric), formatVBenchValue(metric, mapping[metric])))
    .join("");
}

function renderLLMSection(container, manifest, scores) {
  const scoreMap = new Map(scores.map((row) => [normalizeSampleName(row.sample), row]));
  const categories = [
    "VBench flags quality, Qwen keeps it intact",
    "VBench treats as intact, Qwen finds failures"
  ];

  for (const category of categories) {
    const block = document.createElement("div");
    block.className = "group-block";
    block.innerHTML = `<h3 class="group-title">${category}</h3>`;

    const shell = createCarouselShell(category);
    const track = shell.querySelector(".carousel-track");
    const dots = shell.querySelector(".carousel-dots");

    manifest.llm
      .filter((entry) => entry.category === category)
      .forEach((entry) => {
        const row = scoreMap.get(normalizeSampleName(entry.sample)) || {};
        const slide = document.createElement("div");
        slide.className = "carousel-slide";
        slide.innerHTML = `
          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="video-card video-card--llm">
                <video controls preload="metadata" playsinline>
                  <source src="${entry.dst}" type="video/mp4">
                </video>
                <p class="video-caption">${entry.sample}</p>
                <div class="llm-score-board">
                  <div class="score-section-title">Qwen evaluation</div>
                  <div class="score-chip-row">
                    ${createScoreChip("Qwen Mean", row.qwen_mean_score)}
                  </div>
                  <div class="dimension-grid">
                    ${createDimensionStat("Subject Preservation", row.Subject_Preservation)}
                    ${createDimensionStat("Structural Consistency", row.Structural_Consistency)}
                    ${createDimensionStat("Dynamic Consistency", row.Dynamic_Consistency)}
                    ${createDimensionStat("Artifact Suppression", row.Artifact_Presence)}
                  </div>
                  <div class="score-section-title score-section-title--vbench">VBench metrics</div>
                  <div class="dimension-grid dimension-grid--vbench">
                    ${buildVBenchStats(row)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        track.appendChild(slide);

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", entry.sample);
        dots.appendChild(dot);
      });

    block.appendChild(shell);
    container.appendChild(block);
    setupCarousel(shell);
  }
}

function copyBibTeX() {
  const bibtexElement = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  const copyText = button.querySelector(".copy-text");

  navigator.clipboard.writeText(bibtexElement.textContent).then(() => {
    button.classList.add("copied");
    copyText.textContent = "Copied";
    setTimeout(() => {
      button.classList.remove("copied");
      copyText.textContent = "Copy";
    }, 1600);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (!scrollButton) return;
  if (window.pageYOffset > 300) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const manifest = await loadJSON("static/manifest.json");
  const scores = await loadJSON("static/llm_scores.json");

  renderTeaser(document.getElementById("teaser-grid"), manifest);

  renderPromptRows(document.getElementById("cog-sections"), manifest.cog, {
    "white-box": [
      "a woman with long black hair is posing for a picture",
      "a man standing on a boat with a net",
      "a man holding a tray in front of a brick wall",
      "an aerial view of a busy city with a bridge in the background",
      "a woman with green hair smiling for the camera"
    ],
    "black-box": [
      "the great wall of china in autumn",
      "a man in sunglasses laying on a wooden bench"
    ],
    "crop-resize": [
      "a white and blue airplane flying in the sky"
    ],
    "jpeg": [
      "a living room filled with lots of books on a wall"
    ],
    "advclean": [
      "a man in a hat sitting in front of a brick oven"
    ]
  }, "CogVideoX");

  renderPromptRows(document.getElementById("ltx-sections"), manifest.ltx, {
    "white-box": [
      "two women eating pizza at a restaurant",
      "A group of people in a yellow raft is rowing through turbulent waters",
      "a chef is preparing a dish with mushrooms on a wooden board",
      "the pyramids of giza, egypt",
      "a table with lobsters and drinks on it"
    ],
    "black-box": [
      "a man with a skull face paint smoking a cigar and holding a guitar",
      "a table and chairs in a room with a plant in the corner"
    ],
    "crop-resize": [
      "an old man standing in the middle of a field holding a bunch of plants"
    ],
    "jpeg": [
      "a woman is praying in front of a buddhist temple"
    ],
    "advclean": [
      "a man in a mexican outfit holding an acoustic guitar"
    ]
  }, "LTX-Video");

  renderLLMSection(document.getElementById("llm-sections"), manifest, scores);
});
