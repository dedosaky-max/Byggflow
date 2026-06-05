from app.config.supabase import supabase

class ReportRepository:

    @staticmethod
    def get_deviazioni(project_id: str, start: str, end: str):
        return (
            supabase.table("deviazioni")
            .select("*")
            .eq("project_id", project_id)
            .gte("created_at", start)
            .lte("created_at", end)
            .execute()
            .data
        )

    @staticmethod
    def get_sja(project_id: str, start: str, end: str):
        return (
            supabase.table("sja")
            .select("*")
            .eq("project_id", project_id)
            .gte("created_at", start)
            .lte("created_at", end)
            .execute()
            .data
        )

    @staticmethod
    def get_fondazioni(project_id: str):
        return (
            supabase.table("fondazioni")
            .select("*")
            .eq("project_id", project_id)
            .execute()
            .data
        )
