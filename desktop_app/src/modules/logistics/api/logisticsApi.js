// @modules/logistics/api/logisticsApi.js

const VEHICLES_DB = [
  {
    id: "VHC-001",
    name: "Camion Volvo FH",
    type: "truck",
    capacity: "18t",
  },
  {
    id: "VHC-002",
    name: "Furgone Mercedes Sprinter",
    type: "van",
    capacity: "3.5t",
  },
  {
    id: "VHC-003",
    name: "Gru Mobile Liebherr",
    type: "crane",
    capacity: "50t",
  },
];

export async function apiLoadVehicles() {
  return VEHICLES_DB;
}
