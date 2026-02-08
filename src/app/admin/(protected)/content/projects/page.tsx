"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { ProjectLogo } from "@/lib/supabase/types";

export default function ProjectsListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content/projects");
      if (!res.ok) throw new Error("Ошибка загрузки проектов");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот проект? Это действие нельзя отменить.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/content/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Ошибка удаления");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка удаления");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (project: ProjectLogo) => {
    try {
      const res = await fetch(`/api/content/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !project.is_active }),
      });
      if (!res.ok) throw new Error("Ошибка обновления");
      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id ? { ...p, is_active: !p.is_active } : p
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка обновления");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content"
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Проекты</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Логотипы клиентов и проектов
            </p>
          </div>
        </div>
        <Link
          href="/admin/content/projects/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#5838a8] to-[#c04880] text-white px-4 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Добавить проект
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#5838a8]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 mb-4">Проекты пока не добавлены</p>
          <Link
            href="/admin/content/projects/new"
            className="inline-flex items-center gap-2 text-[#5838a8] font-medium hover:underline"
          >
            <Plus className="w-4 h-4" />
            Добавить первый проект
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Проект
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Сайт
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Порядок
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {project.logo && (
                        <img
                          src={project.logo}
                          alt={project.name}
                          className="w-16 h-10 rounded-lg object-contain bg-slate-50 p-1"
                        />
                      )}
                      <p className="font-medium text-slate-900">
                        {project.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5838a8] hover:underline"
                      >
                        {project.website}
                      </a>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">
                    {project.sort_order}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleActive(project)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        project.is_active
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {project.is_active ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Активен
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Скрыт
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          router.push(`/admin/content/projects/${project.id}`)
                        }
                        className="p-2 rounded-lg text-slate-400 hover:text-[#5838a8] hover:bg-[#5838a8]/5 transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deletingId === project.id}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Удалить"
                      >
                        {deletingId === project.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
