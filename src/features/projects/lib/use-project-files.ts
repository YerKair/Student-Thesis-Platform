"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/shared/ui/use-toast";
import { API_BASE_URL } from "@/shared/constants/config";

interface FileVersion {
  id: number;
  file_name: string;
  comment: string | null;
  project_id: number;
  file_path: string;
  version_number: number;
  uploaded_by_id: number;
  created_at: string;
  file_size: number | null;
  file_type: string | null;
  status: string | null;
}

interface UseProjectFilesState {
  files: FileVersion[];
  isLoading: boolean;
  error: string | null;
}

export function useProjectFiles(projectId: number, stage?: string) {
  const [state, setState] = useState<UseProjectFilesState>({
    files: [],
    isLoading: false,
    error: null,
  });
  const { toast } = useToast();

  const uploadFile = useCallback(
    async (file: File, stageKey?: string) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Не авторизован");
      }

      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const formData = new FormData();
        formData.append("file", file);
        if (stageKey) {
          formData.append("stage", stageKey);
        }

        const response = await fetch(
          `${API_BASE_URL}/projects/${projectId}/files`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при загрузке файла");
        }

        const newFile = await response.json();
        setState((prev) => ({
          ...prev,
          files: [...prev.files, newFile],
          isLoading: false,
        }));

        toast({
          title: "Успешно!",
          description: "Файл загружен",
        });

        return newFile;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Ошибка при загрузке файла";
        setState((prev) => ({ ...prev, error: message, isLoading: false }));

        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: message,
        });

        throw error;
      }
    },
    [projectId, toast]
  );

  const downloadFile = useCallback(
    async (fileId: number, fileName: string) => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Не авторизован");
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/projects/files/${fileId}/download`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при скачивании файла");
        }

        // Создаем blob из ответа
        const blob = await response.blob();

        // Создаем URL для blob
        const url = window.URL.createObjectURL(blob);

        // Создаем ссылку для скачивания
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // Очищаем ресурсы
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast({
          title: "Успешно!",
          description: "Файл скачан",
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Ошибка при скачивании файла";

        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: message,
        });
      }
    },
    [toast]
  );

  const fetchFiles = useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("Не авторизован");
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const url = new URL(`${API_BASE_URL}/projects/${projectId}/files`);
      if (stage) {
        url.searchParams.append("stage", stage);
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при получении файлов");
      }

      const files = await response.json();
      setState((prev) => ({ ...prev, files, isLoading: false }));
      return files;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ошибка при получении файлов";
      setState((prev) => ({ ...prev, error: message, isLoading: false }));
      throw error;
    }
  }, [projectId, stage]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files: state.files,
    uploadFile,
    downloadFile,
    isLoading: state.isLoading,
    error: state.error,
  };
}
