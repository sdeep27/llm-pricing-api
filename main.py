import json
from pathlib import Path

from fastapi import FastAPI, Query, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

# --- FastAPI Crash Course for Flask Devs ---
# FastAPI uses ASGI (async) instead of WSGI. You CAN write sync functions
# and FastAPI will run them in a threadpool, but async is idiomatic.
# Type hints on parameters do double duty: validation AND documentation.
# Visit /docs for auto-generated Swagger UI, /redoc for ReDoc.

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="LLM Pricing API",
    description="Compare pricing across Anthropic, OpenAI, Google, and xAI models",
    version="0.1.0",
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

DATA_PATH = Path(__file__).parent / "data" / "pricing.json"


def load_pricing() -> dict:
    with open(DATA_PATH) as f:
        return json.load(f)


# --- API Routes ---
# In Flask you'd do @app.route("/api/models"). FastAPI splits by HTTP method:
# @app.get, @app.post, etc. The return value is auto-serialized to JSON.


@app.get("/api/models")
@limiter.limit("60/minute")
def get_models(
    request: Request,
    provider: str | None = Query(None, description="Filter by provider: anthropic, openai, google, xai"),
    sort: str = Query("intelligence", description="Sort by: intelligence, input_price, output_price, cache_read_price, batch_input_price, batch_output_price, search_price, max_output, name"),
    order: str = Query("desc", description="Sort order: asc or desc"),
):
    """Return all models, optionally filtered and sorted."""
    data = load_pricing()
    models = data["models"]

    if provider:
        models = [m for m in models if m["provider"] == provider.lower()]

    # Add blended cost: 3:1 input:output ratio → (3*input + 1*output) / 4
    for m in models:
        inp = m.get("input_price") or 0
        out = m.get("output_price") or 0
        m["blended_price"] = round((3 * inp + out) / 4, 4)

    sort_keys = {
        "intelligence": lambda m: m.get("intelligence_score") or 0,
        "input_price": lambda m: m.get("input_price") or 0,
        "output_price": lambda m: m.get("output_price") or 0,
        "blended_price": lambda m: m.get("blended_price") or 0,
        "cache_read_price": lambda m: m.get("cache_read_price") or 0,
        "batch_input_price": lambda m: m.get("batch_input_price") or 0,
        "batch_output_price": lambda m: m.get("batch_output_price") or 0,
        "search_price": lambda m: m.get("search_price") or 0,
        "max_output": lambda m: m.get("max_output") or 0,
        "name": lambda m: m["name"].lower(),
    }
    key_fn = sort_keys.get(sort, sort_keys["intelligence"])
    models = sorted(models, key=key_fn, reverse=(order == "desc"))

    return {"models": models, "count": len(models)}


@app.get("/api/meta")
@limiter.limit("60/minute")
def get_meta(request: Request):
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
