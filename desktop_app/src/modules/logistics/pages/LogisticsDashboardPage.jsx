import Layout from "@layout/Layout";
import PageTemplate from "@components/PageTemplate";
import Card from "@ui/Card";

export default function LogisticsDashboardPage() {
  const go = (path) => {
    window.location.href = path;
  };

  return (
    <Layout>
      <PageTemplate title="Logistica di Cantiere">
        <div className="grid grid-cols-3 gap-6 mt-6">

          {/* CONSEGNE */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/logistics/deliveries")}
          >
            <h3 className="text-lg font-semibold">Consegne</h3>
            <p className="text-gray-600 mt-1">
              Gestione richieste di consegna, mezzi e pianificazione arrivi.
            </p>
          </Card>

          {/* MAGAZZINO */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/logistics/warehouse")}
          >
            <h3 className="text-lg font-semibold">Magazzino</h3>
            <p className="text-gray-600 mt-1">
              Materiali in entrata/uscita, giacenze e inventario.
            </p>
          </Card>

          {/* MEZZI */}
          <Card
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => go("/logistics/vehicles")}
          >
            <h3 className="text-lg font-semibold">Mezzi</h3>
            <p className="text-gray-600 mt-1">
              Gestione mezzi, disponibilità e assegnazioni.
            </p>
          </Card>

        </div>
      </PageTemplate>
    </Layout>
  );
}
