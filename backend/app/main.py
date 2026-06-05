from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.deviazioni.router import router as deviazioni_router
from app.modules.documents.router import router as documents_router
from app.modules.fondazioni.router import router as fondazioni_router
from app.modules.hse.router import router as hse_router
from app.modules.logistics.router import router as logistics_router
from app.modules.projects.router import router as projects_router
from app.modules.report.router import router as report_router
from app.modules.sja.router import router as sja_router
from app.modules.users.router import router as users_router

app = FastAPI(
    title="Byggflow Backend",
    version="1.0.0"
)

# CORS (adatta origins a desktop/mobile/frontend che userai)
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(deviazioni_router, prefix="/deviazioni", tags=["deviazioni"])
app.include_router(documents_router, prefix="/documents", tags=["documents"])
app.include_router(fondazioni_router, prefix="/fondazioni", tags=["fondazioni"])
app.include_router(hse_router, prefix="/hse", tags=["hse"])
app.include_router(logistics_router, prefix="/logistics", tags=["logistics"])
app.include_router(projects_router, prefix="/projects", tags=["projects"])
app.include_router(report_router, prefix="/report", tags=["report"])
app.include_router(sja_router, prefix="/sja", tags=["sja"])
app.include_router(users_router, prefix="/users", tags=["users"])


@app.get("/")
def root():
    return {"message": "Byggflow backend is running"}
