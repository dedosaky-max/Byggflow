import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Button from "@ui/Button";

export default function SettingsPage() {
  return (
    <Layout>
      <PageTemplate title="Settings">
        <p className="text-gray-600">
          This module will contain application and user settings.
        </p>

        <div className="mt-4">
          <Button>Update Settings</Button>
        </div>
      </PageTemplate>
    </Layout>
  );
}
