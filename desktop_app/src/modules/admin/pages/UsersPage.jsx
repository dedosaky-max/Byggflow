import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Button from "@ui/Button";

export default function UsersPage() {
  return (
    <Layout>
      <PageTemplate title="Users">
        <p className="text-gray-600">
          This module will manage user accounts and invitations.
        </p>

        <div className="mt-4">
          <Button>Invite User</Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}
