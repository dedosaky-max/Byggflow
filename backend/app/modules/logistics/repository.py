from app.config.supabase import supabase

class LogisticsRepository:

    @staticmethod
    def get_deliveries(project_id: str):
        return (
            supabase.table("deliveries")
            .select("*")
            .eq("project_id", project_id)
            .execute()
            .data
        )

    @staticmethod
    def get_delivery(delivery_id: str):
        return (
            supabase.table("deliveries")
            .select("*")
            .eq("id", delivery_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create_delivery(payload: dict):
        return (
            supabase.table("deliveries")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update_delivery(delivery_id: str, payload: dict):
        return (
            supabase.table("deliveries")
            .update(payload)
            .eq("id", delivery_id)
            .execute()
            .data[0]
        )
