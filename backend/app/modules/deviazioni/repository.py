from app.config.supabase import supabase

class DeviazioniRepository:

    @staticmethod
    def get_all():
        return (
            supabase.table("deviazioni")
            .select("*")
            .execute()
            .data
        )
