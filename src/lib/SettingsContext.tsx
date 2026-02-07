"use client";

import { createContext, useContext } from "react";

export interface SiteSettings {
  contact_phone: string;
  contact_phone_display: string;
  contact_email: string;
  contact_address: string;
  contact_telegram: string;
  contact_youtube: string;
  podcast_title: string;
  podcast_description: string;
  podcast_video_id: string;
  podcast_youtube_url: string;
  [key: string]: string;
}

const defaultSettings: SiteSettings = {
  contact_phone: "+998901234567",
  contact_phone_display: "+998 90 123 45 67",
  contact_email: "info@foodcost.uz",
  contact_address: "Ташкент, Узбекистан",
  contact_telegram: "https://t.me/foodcost",
  contact_youtube: "https://www.youtube.com/@FoodCostGroup",
  podcast_title: "Бизнес на цифрах",
  podcast_description: "Подкаст о финансах, учёте и управлении в ресторанном бизнесе от команды FOOD COST",
  podcast_video_id: "hc1IazKcsXo",
  podcast_youtube_url: "https://www.youtube.com/@FoodCostGroup",
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
