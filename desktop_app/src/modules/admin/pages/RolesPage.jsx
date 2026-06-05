import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Button from "@ui/Button";

export default function RolesPage() {
  return (
    <Layout>
      <PageTemplate title="Roles">
        <p className="text-gray-600">
          This module will define permissions and access levels.
        </p>

        <div className="mt-4">
          <Button>Create Role</Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}
