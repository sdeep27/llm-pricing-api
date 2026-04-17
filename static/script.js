const tbody = document.getElementById("models-body");
const metaInfo = document.getElementById("meta-info");
const headers = document.querySelectorAll("th.sortable");

let currentSort = "intelligence";
let currentOrder = "desc";
let currentModels = [];
let advancedMode = false;
const THINKING_MULTIPLIER = 5;

// Token conversions: single-spaced page ≈ 500 words, ~1.33 tokens per word
const TOKENS_PER_WORD = 1.33;
const WORDS_PER_PAGE = 500;
const TOKENS_PER_PAGE = Math.round(WORDS_PER_PAGE * TOKENS_PER_WORD); // 665

const providerLabels = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  xai: "xAI",
};

function formatContext(tokens) {
  if (!tokens) return "\u2014";
  if (tokens >= 1_000_000) return (tokens / 1_000_000) + "M";
  return (tokens / 1_000) + "K";
}

function formatPrice(price) {
  if (price == null) return "\u2014";
  return "$" + price.toFixed(2);
}

function formatEstCost(cost) {
  if (cost === 0) return "$0.00";
  if (cost >= 0.01) return "$" + cost.toFixed(4);
  if (cost >= 0.001) return "$" + cost.toFixed(5);
  return "$" + cost.toFixed(6);
}

function formatSearchPrice(price) {
  if (price == null) return "\u2014";
  return "$" + price.toFixed(3);
}

// --- Calculator ---

function getInputTokens() {
  if (advancedMode) {
    return parseFloat(document.getElementById("tokens-in").value) || 0;
  }
  const pages = parseFloat(document.getElementById("pages-in").value) || 0;
  const words = parseFloat(document.getElementById("words-in").value) || 0;
  return Math.round(pages * TOKENS_PER_PAGE + words * TOKENS_PER_WORD);
}

function getOutputTokens() {
  if (advancedMode) {
    return parseFloat(document.getElementById("tokens-out").value) || 0;
  }
  const pages = parseFloat(document.getElementById("pages-out").value) || 0;
  const words = parseFloat(document.getElementById("words-out").value) || 0;
  return Math.round(pages * TOKENS_PER_PAGE + words * TOKENS_PER_WORD);
}

function getCachedTokens() {
  if (advancedMode) {
    return parseFloat(document.getElementById("tokens-cached").value) || 0;
  }
  return 0;
}

function isThinkingEnabled() {
  const id = advancedMode ? "thinking-advanced" : "thinking-simple";
  return document.getElementById(id).checked;
}

function computeCost(model) {
  const inputTokens = getInputTokens();
  const cachedTokens = getCachedTokens();
  let outputTokens = getOutputTokens();
  if (isThinkingEnabled()) {
    outputTokens *= (1 + THINKING_MULTIPLIER);
  }
  // Cached tokens use cache_read_price instead of input_price
  const uncachedInput = Math.max(0, inputTokens - cachedTokens);
  return (uncachedInput * (model.input_price || 0) / 1_000_000) +
         (cachedTokens * (model.cache_read_price ?? model.input_price ?? 0) / 1_000_000) +
         (outputTokens * (model.output_price || 0) / 1_000_000);
}

function updateTokenSummary() {
  const el = document.getElementById("calc-tokens");
  if (el) {
    const outVisible = getOutputTokens();
    const thinking = isThinkingEnabled();
    const outTotal = thinking ? outVisible * (1 + THINKING_MULTIPLIER) : outVisible;
    const thinkingNote = thinking ? ` (incl. ${THINKING_MULTIPLIER}x thinking)` : "";
    el.textContent = `\u2248 ${getInputTokens().toLocaleString()} input \u00b7 ${outTotal.toLocaleString()} output${thinkingNote} tokens (1 page \u2248 500 words \u2248 ${TOKENS_PER_PAGE} tokens)`;
  }
}

function syncToAdvanced() {
  document.getElementById("tokens-in").value = getInputTokens();
  document.getElementById("tokens-out").value = getOutputTokens();
}

function toggleCalcMode() {
  const btn = document.getElementById("calc-toggle");
  const simple = document.getElementById("calc-simple");
  const advanced = document.getElementById("calc-advanced");

  if (!advancedMode) {
    // Switching to advanced — sync token values
    syncToAdvanced();
    advancedMode = true;
    simple.style.display = "none";
    advanced.style.display = "block";
    btn.textContent = "Simple";
    btn.classList.add("active");
  } else {
    advancedMode = false;
    simple.style.display = "block";
    advanced.style.display = "none";
    btn.textContent = "Advanced";
    btn.classList.remove("active");
  }
  rerender();
}

// --- Table ---

function updateHeaders() {
  headers.forEach((th) => {
    const sort = th.dataset.sort;
    th.classList.toggle("active", sort === currentSort);
    th.classList.remove("asc", "desc");
    if (sort === currentSort) th.classList.add(currentOrder);
  });
}

function sortModels(models) {
  const sort_keys = {
    intelligence: (m) => m.intelligence_score || 0,
    input_price: (m) => m.input_price || 0,
    output_price: (m) => m.output_price || 0,
    blended_price: (m) => m.blended_price || 0,
    est_cost: (m) => computeCost(m),
    cache_read_price: (m) => m.cache_read_price ?? Infinity,
    batch_input_price: (m) => m.batch_input_price ?? Infinity,
    batch_output_price: (m) => m.batch_output_price ?? Infinity,
    search_price: (m) => m.search_price ?? Infinity,
    max_output: (m) => m.max_output || 0,
    name: (m) => m.name.toLowerCase(),
  };
  const key_fn = sort_keys[currentSort] || sort_keys.intelligence;
  const sorted = [...models].sort((a, b) => {
    const va = key_fn(a);
    const vb = key_fn(b);
    if (va < vb) return currentOrder === "desc" ? 1 : -1;
    if (va > vb) return currentOrder === "desc" ? -1 : 1;
    return 0;
  });
  return sorted;
}

function renderTable(models) {
  const sorted = sortModels(models);
  tbody.innerHTML = sorted
    .map(
      (m, i) => `
    <tr${m.deprecated ? ' class="deprecated"' : ''}>
      <td class="score">${i + 1}</td>
      <td><strong>${m.name}</strong>${m.deprecated ? '<span class="dep-badge">deprecated</span>' : ''}</td>
      <td class="provider-${m.provider}">${providerLabels[m.provider]}</td>
      <td class="price est-cost">${formatEstCost(computeCost(m))}</td>
      <td class="price">${formatPrice(m.input_price)}</td>
      <td class="price">${formatPrice(m.output_price)}</td>
      <td class="price">${formatPrice(m.blended_price)}</td>
      <td class="search-cell">${m.search_price != null ? `<span class="price">${formatSearchPrice(m.search_price)}</span>${m.search_free_tier ? `<span class="search-free">${m.search_free_tier}</span>` : ''}` : '<span class="price">\u2014</span>'}</td>
      <td class="price">${formatPrice(m.cache_read_price)}</td>
      <td class="price">${formatPrice(m.batch_input_price)}</td>
      <td class="price">${formatPrice(m.batch_output_price)}</td>
      <td class="context">${formatContext(m.context_window)}</td>
      <td class="context">${formatContext(m.max_output)}</td>
    </tr>`
    )
    .join("");
}

function rerender() {
  if (currentModels.length > 0) {
    renderTable(currentModels);
    updateHeaders();
    updateTokenSummary();
  }
}

async function fetchModels() {
  const res = await fetch("/api/models?sort=intelligence&order=desc");
  const data = await res.json();
  currentModels = data.models;
  rerender();
}

async function fetchMeta() {
  const res = await fetch("/api/meta");
  const data = await res.json();
  const d = new Date(data.last_updated);
  const short = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const full = d.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  metaInfo.textContent = `${data.model_count} models \u00b7 Prices ${data.price_unit.replace(/_/g, " ")} \u00b7 Blended = 3:1 input:output \u00b7 Updated ${short}`;
  const lastUpdated = document.getElementById("last-updated");
  if (lastUpdated) lastUpdated.textContent = `Pricing last verified: ${full}`;
}

// --- Event Listeners ---

headers.forEach((th) => {
  th.addEventListener("click", () => {
    const sort = th.dataset.sort;
    if (sort === currentSort) {
      currentOrder = currentOrder === "desc" ? "asc" : "desc";
    } else {
      currentSort = sort;
      currentOrder = th.dataset.defaultOrder;
    }
    rerender();
  });
});

// Simple calculator inputs
["pages-in", "words-in", "pages-out", "words-out"].forEach((id) => {
  document.getElementById(id).addEventListener("input", rerender);
});

// Advanced calculator inputs
["tokens-in", "tokens-cached", "tokens-out"].forEach((id) => {
  document.getElementById(id).addEventListener("input", rerender);
});

// Thinking checkboxes — keep in sync and rerender
["thinking-simple", "thinking-advanced"].forEach((id) => {
  document.getElementById(id).addEventListener("change", (e) => {
    // Sync the other checkbox
    const otherId = id === "thinking-simple" ? "thinking-advanced" : "thinking-simple";
    document.getElementById(otherId).checked = e.target.checked;
    rerender();
  });
});

// Toggle button
document.getElementById("calc-toggle").addEventListener("click", toggleCalcMode);

// --- Init ---
fetchModels();
fetchMeta();
