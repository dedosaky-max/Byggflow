import SettingsPage from "@modules/settings/pages/SettingsPage";
import UserProfilePage from "@modules/settings/pages/UserProfilePage";
import PreferencesPage from "@modules/settings/pages/PreferencesPage";

export const settingsRoutes = [
  { path: "/settings", element: <SettingsPage /> },
  { path: "/settings/profile", element: <UserProfilePage /> },
  { path: "/settings/preferences", element: <PreferencesPage /> },
];
