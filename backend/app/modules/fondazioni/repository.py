from app.config.supabase import supabase

class FondazioniRepository:

    @staticmethod
    def get_all():
        return (
            supabase.table("fondazioni")
            .select("*")
            .execute()
            .data
        )

    @staticmethod
    def get_by_id(fondazione_id: str):
        return (
            supabase.table("fondazioni")
            .select("*")
            .eq("id", fondazione_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create(payload: dict):
        return (
            supabase.table("fondazioni")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update(fondazione_id: str, payload: dict):
        return (
            supabase.table("fondazioni")
            .update(payload)
            .eq("id", fondazione_id)
            .execute()
            .data[0]
        )
