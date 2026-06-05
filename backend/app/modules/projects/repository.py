from app.config.supabase import supabase

class ProjectsRepository:

    @staticmethod
    def get_all():
        return (
            supabase.table("projects")
            .select("*")
            .execute()
            .data
        )

    @staticmethod
    def get_by_id(project_id: str):
        return (
            supabase.table("projects")
            .select("*")
            .eq("id", project_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create(payload: dict):
        return (
            supabase.table("projects")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update(project_id: str, payload: dict):
        return (
            supabase.table("projects")
            .update(payload)
            .eq("id", project_id)
            .execute()
            .data[0]
        )
