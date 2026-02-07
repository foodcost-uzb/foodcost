"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string;
  group: string;
  label: string;
  type: string;
}

interface CalcSettings {
  id: string;
  default_revenue: number;
  default_current_fc: number;
  default_target_fc: number;
  currency_label: string;
}

const tabs = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "О компании" },
  { id: "contacts", label: "Контакты" },
  { id: "podcast", label: "Подкаст" },
  { id: "seo", label: "SEO" },
  { id: "calculator", label: "Калькулятор" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [settings, setSettings] = useState<Setting[]>([]);
  const [calcSettings, setCalcSettings] = useState<CalcSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [editedCalc, setEditedCalc] = useState<Partial<CalcSettings>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (activeTab === "calculator") {
        const res = await fetch("/api/settings/calculator");
        const data = await res.json();
        setCalcSettings(data);
      } else {
        const res = await fetch(`/api/settings?group=${activeTab}`);
        const data = await res.json();
        setSettings(data);
        const vals: Record<string, string> = {};
        for (const s of data) vals[s.key] = s.value;
        setEditedValues(vals);
      }
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  const handleSave = async () => {
    setSaving(true);

    if (activeTab === "calculator") {
      await fetch("/api/settings/calculator", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCalc),
      });
    } else {
      const settingsToUpdate = Object.entries(editedValues).map(([key, value]) => ({
        key,
        value,
      }));
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: settingsToUpdate }),
      });
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Настройки сайта</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Сохранено" : "Сохранить"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#5838a8] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-[#5838a8]/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
        </div>
      ) : activeTab === "calculator" && calcSettings ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Настройки калькулятора</h3>
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Выручка по умолчанию
              </label>
              <input
                type="number"
                defaultValue={calcSettings.default_revenue}
                onChange={(e) => setEditedCalc({ ...editedCalc, default_revenue: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Текущий food cost по умолчанию (%)
              </label>
              <input
                type="number"
                defaultValue={calcSettings.default_current_fc}
                onChange={(e) => setEditedCalc({ ...editedCalc, default_current_fc: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Целевой food cost по умолчанию (%)
              </label>
              <input
                type="number"
                defaultValue={calcSettings.default_target_fc}
                onChange={(e) => setEditedCalc({ ...editedCalc, default_target_fc: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Валюта</label>
              <input
                type="text"
                defaultValue={calcSettings.currency_label}
                onChange={(e) => setEditedCalc({ ...editedCalc, currency_label: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {setting.label}
                </label>
                {setting.type === "textarea" ? (
                  <textarea
                    value={editedValues[setting.key] || ""}
                    onChange={(e) =>
                      setEditedValues({ ...editedValues, [setting.key]: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none resize-none"
                  />
                ) : (
                  <input
                    type={setting.type === "email" ? "email" : setting.type === "url" ? "url" : "text"}
                    value={editedValues[setting.key] || ""}
                    onChange={(e) =>
                      setEditedValues({ ...editedValues, [setting.key]: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#5838a8] outline-none"
                  />
                )}
                <p className="text-xs text-slate-400 mt-1">{setting.key}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
