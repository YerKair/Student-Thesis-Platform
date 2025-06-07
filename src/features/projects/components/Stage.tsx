"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { ChevronDown, ChevronUp, Upload } from "lucide-react";
import { useProjectFiles } from "../lib/use-project-files";

interface ProjectFile {
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

interface StageProps {
  projectId: number;
  title: string;
  description: string;
  deadline: string;
  status: "completed" | "in_progress" | "waiting";
  supervisorComment?: string;
  defaultExpanded?: boolean;
  stageKey?: string;
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  waiting: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  completed: "Завершено",
  in_progress: "В процессе",
  waiting: "Ожидает",
};

export function Stage({
  projectId,
  title,
  description,
  deadline,
  status,
  supervisorComment,
  defaultExpanded = false,
  stageKey,
}: StageProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { files, uploadFile, downloadFile, isLoading } = useProjectFiles(
    projectId,
    stageKey
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, stageKey);
    }
  };

  const handleDownload = (file: ProjectFile) => {
    downloadFile(file.id, file.file_name);
  };

  const formattedDeadline = new Date(deadline).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="secondary" className={statusColors[status]}>
              {statusLabels[status]}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Срок сдачи: {formattedDeadline}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-gray-600">{description}</p>

          {supervisorComment && (
            <div className="bg-orange-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Комментарий руководителя:</h4>
              <p className="text-gray-600">{supervisorComment}</p>
            </div>
          )}

          <div>
            <h4 className="font-medium mb-2">Файлы</h4>
            <div className="space-y-2">
              {files.map((file: ProjectFile) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm">{file.file_name}</span>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Скачать
                  </Button>
                </div>
              ))}

              <div className="mt-4">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    className="w-full"
                    asChild
                  >
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {isLoading ? "Загрузка..." : "Загрузить файл"}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
