import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(() => {
    // Recupera la lingua salvata o usa quella attuale
    return localStorage.getItem("lang") || i18n.language || "en";
  });

  // Applica la lingua iniziale al mount
  useEffect(() => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  const changeLanguage = (newLang) => {
    setLang(newLang);

    // Protezione: evita crash se i18n non è pronto
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(newLang);
    }

    localStorage.setItem("lang", newLang);
  };

  return {
    lang,
    changeLanguage,
  };
}
