from app.config.supabase import supabase

class UsersRepository:

    @staticmethod
    def get_all():
        return (
            supabase.table("users")
            .select("*")
            .execute()
            .data
        )

    @staticmethod
    def get_by_id(user_id: str):
        return (
            supabase.table("users")
            .select("*")
            .eq("id", user_id)
            .single()
            .execute()
            .data
        )

    @staticmethod
    def create(payload: dict):
        return (
            supabase.table("users")
            .insert(payload)
            .execute()
            .data[0]
        )

    @staticmethod
    def update(user_id: str, payload: dict):
        return (
            supabase.table("users")
            .update(payload)
            .eq("id", user_id)
            .execute()
            .data[0]
        )
