import json
from pathlib import Path

from fastapi import FastAPI, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# --- FastAPI Crash Course for Flask Devs ---
# FastAPI uses ASGI (async) instead of WSGI. You CAN write sync functions
# and FastAPI will run them in a threadpool, but async is idiomatic.
# Type hints on parameters do double duty: validation AND documentation.
# Visit /docs for auto-generated Swagger UI, /redoc for ReDoc.

app = FastAPI(
    title="LLM Pricing API",
    description="Compare pricing across Anthropic, OpenAI, Google, and xAI models",
    version="0.1.0",
)

DATA_PATH = Path(__file__).parent / "data" / "pricing.json"


def load_pricing() -> dict:
    with open(DATA_PATH) as f:
        return json.load(f)


# --- API Routes ---
# In Flask you'd do @app.route("/api/models"). FastAPI splits by HTTP method:
# @app.get, @app.post, etc. The return value is auto-serialized to JSON.


@app.get("/api/models")
def get_models(
    provider: str | None = Query(None, description="Filter by provider: anthropic, openai, google, xai"),
    sort: str = Query("intelligence", description="Sort by: intelligence, input_price, output_price, name"),
    order: str = Query("desc", description="Sort order: asc or desc"),
):
    """Return all models, optionally filtered and sorted."""
    data = load_pricing()
    models = data["models"]

    if provider:
        models = [m for m in models if m["provider"] == provider.lower()]

    sort_keys = {
        "intelligence": lambda m: m.get("intelligence_score") or 0,
        "input_price": lambda m: m.get("input_price") or 0,
        "output_price": lambda m: m.get("output_price") or 0,
        "name": lambda m: m["name"].lower(),
    }
    key_fn = sort_keys.get(sort, sort_keys["intelligence"])
    models = sorted(models, key=key_fn, reverse=(order == "desc"))

    return {"models": models, "count": len(models)}


@app.get("/api/meta")
def get_meta():
    """Return metadata: last updated, sources, price unit."""
    data = load_pricing()
    return {
        "last_updated": data["last_updated"],
        "price_unit": data["price_unit"],
        "sources": data["sources"],
        "provider_count": 4,
        "model_count": len(data["models"]),
    }


# --- Static Files & Frontend ---
# In Flask you'd use send_from_directory or a static folder config.
# FastAPI mounts a StaticFiles app at a path. We serve index.html at root.

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
def index():
    return FileResponse("static/index.html")
