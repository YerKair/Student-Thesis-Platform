"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/shared/ui/use-toast";
import { API_BASE_URL } from "@/shared/constants/config";

interface ProjectFile {
  id: number;
  name: string;
  url: string;
  createdAt: string;
}

export function useProjectFiles(projectId: number) {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isUploading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadFiles = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Не авторизован");
      }

      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Ошибка при загрузке файлов");
      }

      const loadedFiles = await response.json();
      setFiles(loadedFiles);
    } catch (error) {
      console.error("Error loading files:", error);
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось загрузить файлы",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadFiles();
  }, [projectId]);

  const uploadFile = async (file: File, comment?: string) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Не авторизован");
      }

      const formData = new FormData();
      formData.append("file", file);
      if (comment) {
        formData.append("comment", comment);
      }

      // Создаем XMLHttpRequest для отправки файла
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_BASE_URL}/projects/${projectId}/files`, true);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      // Создаем Promise для работы с XMLHttpRequest
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = function () {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              reject(new Error("Ошибка при парсинге ответа"));
            }
          } else {
            reject(new Error(xhr.responseText || "Ошибка при загрузке файла"));
          }
        };

        xhr.onerror = function () {
          reject(new Error("Ошибка сети при загрузке файла"));
        };
      });

      // Отправляем файл
      xhr.send(formData);

      // Ждем завершения загрузки
      const newFile = await uploadPromise;
      setFiles((prev) => [...prev, newFile as ProjectFile]);
      await loadFiles();

      toast({
        title: "Успех",
        description: "Файл успешно загружен",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Ошибка",
        description:
          error instanceof Error ? error.message : "Не удалось загрузить файл",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    files,
    uploadFile,
    isUploading,
  };
}
