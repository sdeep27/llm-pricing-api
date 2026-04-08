const providerFilter = document.getElementById("provider-filter");
const sortBy = document.getElementById("sort-by");
const sortOrder = document.getElementById("sort-order");
const tbody = document.getElementById("models-body");
const metaInfo = document.getElementById("meta-info");

const providerLabels = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  xai: "xAI",
};

function formatContext(tokens) {
  if (!tokens) return "—";
  if (tokens >= 1_000_000) return (tokens / 1_000_000) + "M";
  return (tokens / 1_000) + "K";
}

function formatPrice(price) {
  if (price == null) return "—";
  return "$" + price.toFixed(2);
}

async function fetchModels() {
  const params = new URLSearchParams();
  if (providerFilter.value) params.set("provider", providerFilter.value);
  params.set("sort", sortBy.value);
  params.set("order", sortOrder.value);

  const res = await fetch("/api/models?" + params);
  const data = await res.json();
  renderTable(data.models);
}

function renderTable(models) {
  tbody.innerHTML = models
    .map(
      (m, i) => `
    <tr>
      <td class="score">${i + 1}</td>
      <td><strong>${m.name}</strong></td>
      <td class="provider-${m.provider}">${providerLabels[m.provider]}</td>
      <td class="score">${m.intelligence_score ?? "—"}</td>
      <td class="price">${formatPrice(m.input_price)}</td>
      <td class="price">${formatPrice(m.output_price)}</td>
      <td class="context">${formatContext(m.context_window)}</td>
    </tr>`
    )
    .join("");
}

async function fetchMeta() {
  const res = await fetch("/api/meta");
  const data = await res.json();
  metaInfo.textContent = `${data.model_count} models · Prices ${data.price_unit.replace(/_/g, " ")} · Updated ${data.last_updated}`;
}

providerFilter.addEventListener("change", fetchModels);
sortBy.addEventListener("change", fetchModels);
sortOrder.addEventListener("change", fetchModels);

fetchModels();
fetchMeta();
