import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";

import Card from "@ui/Card";

export default function HSEPage() {
  const go = (path) => {
    window.location.href = path;
  };

  return (
    <Layout>
      <PageTemplate title="Health, Safety & Environment">
        <div className="grid grid-cols-3 gap-6 mt-6">

          {/* DASHBOARD */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/hse/dashboard")}
          >
            <h3 className="text-lg font-semibold">Dashboard</h3>
            <p className="text-gray-600 mt-1">
              Panoramica generale degli eventi HSE, statistiche e stato.
            </p>
          </Card>

          {/* EVENTI HSE */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/hse/list")}
          >
            <h3 className="text-lg font-semibold">Eventi HSE</h3>
            <p className="text-gray-600 mt-1">
              Elenco completo degli incidenti, near miss e osservazioni.
            </p>
          </Card>

          {/* AUDIT */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/hse/audits")}
          >
            <h3 className="text-lg font-semibold">Audit</h3>
            <p className="text-gray-600 mt-1">
              Gestione audit HSE, ispezioni e verifiche di conformità.
            </p>
          </Card>

          {/* CHECKLIST */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/hse/checklists")}
          >
            <h3 className="text-lg font-semibold">Checklists</h3>
            <p className="text-gray-600 mt-1">
              Checklist operative, controlli periodici e verifiche di sicurezza.
            </p>
          </Card>

        </div>
      </PageTemplate>
    </Layout>
  );
}
