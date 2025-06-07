"use client";

import { useState, useRef } from "react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  Upload,
  Download,
  File,
  Trash2,
  Eye,
  Calendar,
  User,
  MessageSquare,
} from "lucide-react";
import { useProjectFiles } from "../lib/use-project-files";
import { useToast } from "@/shared/ui/use-toast";

interface StageFilesProps {
  projectId: number;
  stage: string;
  stageName: string;
  disabled?: boolean;
}

export function StageFiles({
  projectId,
  stage,
  stageName,
  disabled = false,
}: StageFilesProps) {
  const { files, uploadFile, downloadFile, isLoading } = useProjectFiles(
    projectId,
    stage
  );
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Выберите файл для загрузки",
      });
      return;
    }

    try {
      setUploading(true);
      await uploadFile(selectedFile, stage);
      setSelectedFile(null);
      setComment("");
      setIsUploadDialogOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast({
        title: "Успешно!",
        description: "Файл загружен",
      });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      await downloadFile(fileId, fileName);
    } catch (error) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скачать файл",
      });
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Неизвестно";
    const sizes = ["Б", "КБ", "МБ", "ГБ"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          Файлы этапа "{stageName}"
        </h4>
        {!disabled && (
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Загрузить файл
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Загрузить файл для этапа "{stageName}"
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Файл</Label>
                  <Input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    disabled={uploading}
                  />
                </div>
                {selectedFile && (
                  <div className="text-sm text-gray-600">
                    Выбран файл: {selectedFile.name} (
                    {formatFileSize(selectedFile.size)})
                  </div>
                )}
                <div>
                  <Label htmlFor="comment">Комментарий (необязательно)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Добавьте комментарий к файлу..."
                    disabled={uploading}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadDialogOpen(false)}
                    disabled={uploading}
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? "Загрузка..." : "Загрузить"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <File className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Файлы не загружены</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <Card key={file.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">
                      {file.file_name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      v{file.version_number}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(file.created_at)}
                    </div>
                    {file.file_size && (
                      <div>{formatFileSize(file.file_size)}</div>
                    )}
                    {file.file_type && (
                      <div className="uppercase">{file.file_type}</div>
                    )}
                  </div>
                  {file.comment && (
                    <div className="flex items-start gap-1 mt-2 text-xs text-gray-600">
                      <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span>{file.comment}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(file.id, file.file_name)}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
