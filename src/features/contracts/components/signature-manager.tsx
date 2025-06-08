"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useToast } from "@/shared/ui/use-toast";
import { Pen, Trash2, Save, RotateCcw } from "lucide-react";

interface SignatureManagerProps {
  onSignatureCreated?: () => void;
}

export function SignatureManager({
  onSignatureCreated,
}: SignatureManagerProps) {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [currentSignature, setCurrentSignature] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Загрузка существующей подписи при монтировании
  useEffect(() => {
    loadExistingSignature();
  }, []);

  const loadExistingSignature = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      const response = await fetch(
        "http://localhost:8000/contracts/signatures/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const signature = await response.json();
        setCurrentSignature(signature.signature_data);
        setHasSignature(true);
      }
    } catch (error) {
      console.error("Ошибка загрузки подписи:", error);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setLoading(true);

    try {
      // Конвертируем canvas в base64
      const dataURL = canvas.toDataURL("image/png");
      const base64Data = dataURL.split(",")[1]; // Убираем префикс data:image/png;base64,

      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast({
          title: "Ошибка",
          description: "Необходимо войти в систему",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        "http://localhost:8000/contracts/signatures",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            signature_data: base64Data,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setCurrentSignature(result.signature_data);
        setHasSignature(true);
        setIsDialogOpen(false);

        toast({
          title: "Успех",
          description: "Подпись успешно сохранена!",
        });

        onSignatureCreated?.();
      } else {
        const error = await response.json();
        toast({
          title: "Ошибка",
          description: error.detail || "Ошибка при сохранении подписи",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при сохранении подписи",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSignature = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      const response = await fetch(
        "http://localhost:8000/contracts/signatures",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setCurrentSignature(null);
        setHasSignature(false);

        toast({
          title: "Успех",
          description: "Подпись удалена!",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при удалении подписи",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Настройка canvas при открытии диалога
  useEffect(() => {
    if (isDialogOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Настройки для рисования
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Очищаем canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isDialogOpen]);

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
        <CardTitle className="text-xl flex items-center gap-2">
          <Pen className="h-5 w-5" />
          Управление подписью
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {hasSignature && currentSignature ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Ваша текущая подпись:
                </p>
                <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 inline-block">
                  <img
                    src={`data:image/png;base64,${currentSignature}`}
                    alt="Подпись"
                    className="max-h-20 max-w-xs"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Pen className="h-4 w-4 mr-2" />
                      Изменить подпись
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Нарисуйте вашу подпись</DialogTitle>
                      <DialogDescription>
                        Используйте мышь или сенсорный экран для рисования
                        подписи
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          width={600}
                          height={200}
                          className="cursor-crosshair bg-white"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                        />
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={clearCanvas}
                          className="border-2 border-gray-200"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Очистить
                        </Button>
                        <Button
                          onClick={saveSignature}
                          disabled={loading}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? "Сохранение..." : "Сохранить"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={deleteSignature}
                  disabled={loading}
                  className="border-2 border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-600">У вас пока нет подписи</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Pen className="h-4 w-4 mr-2" />
                    Создать подпись
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Нарисуйте вашу подпись</DialogTitle>
                    <DialogDescription>
                      Используйте мышь или сенсорный экран для рисования подписи
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={200}
                        className="cursor-crosshair bg-white"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        onClick={clearCanvas}
                        className="border-2 border-gray-200"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Очистить
                      </Button>
                      <Button
                        onClick={saveSignature}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Сохранение..." : "Сохранить"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
