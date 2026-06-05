from app.config.supabase import supabase

class HseRepository:

    @staticmethod
    def get_all(project_id: str):
        return (
            supabase.table("hse_events")
            .select("*")
            .eq("project_id", project_id)
            .execute()
            .data
        )

    @staticmethod
    def get_by_id(event_id: str):
        return (
            supabase.table("hse_events")
            .select("*")
            .eq("id", event_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create(payload: dict):
        return (
            supabase.table("hse_events")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update(event_id: str, payload: dict):
        return (
            supabase.table("hse_events")
            .update(payload)
            .eq("id", event_id)
            .execute()
            .data[0]
        )
