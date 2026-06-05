from app.config.supabase import supabase

class SjaRepository:

    @staticmethod
    def get_all(project_id: str):
        return (
            supabase.table("sja")
            .select("*")
            .eq("project_id", project_id)
            .execute()
            .data
        )

    @staticmethod
    def get_by_id(sja_id: str):
        return (
            supabase.table("sja")
            .select("*")
            .eq("id", sja_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create(payload: dict):
        return (
            supabase.table("sja")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update(sja_id: str, payload: dict):
        return (
            supabase.table("sja")
            .update(payload)
            .eq("id", sja_id)
            .execute()
            .data[0]
        )
