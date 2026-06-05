import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Card from "@ui/Card";

export default function Dashboard() {
  return (
    <Layout>
      <PageTemplate title="Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <h3 className="text-lg font-semibold mb-2">Projects</h3>
            <p className="text-gray-600">Overview of active projects</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-2">HSE</h3>
            <p className="text-gray-600">Health & Safety performance</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-2">Documents</h3>
            <p className="text-gray-600">Recent uploads and activity</p>
          </Card>
        </div>
      </PageTemplate>
    </Layout>
  );
}
