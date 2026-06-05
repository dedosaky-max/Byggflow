from app.config.supabase import supabase

class DocumentsRepository:

    @staticmethod
    def get_all(project_id: str):
        return (
            supabase.table("documents")
            .select("*")
            .eq("project_id", project_id)
            .execute()
            .data
        )

    @staticmethod
    def get_by_id(doc_id: str):
        return (
            supabase.table("documents")
            .select("*")
            .eq("id", doc_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create(payload: dict):
        return (
            supabase.table("documents")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update(doc_id: str, payload: dict):
        return (
            supabase.table("documents")
            .update(payload)
            .eq("id", doc_id)
            .execute()
            .data[0]
        )
