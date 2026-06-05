from fastapi import HTTPException

def NotFound(message="Not found"):
    raise HTTPException(status_code=404, detail=message)

def BadRequest(message="Bad request"):
    raise HTTPException(status_code=400, detail=message)
