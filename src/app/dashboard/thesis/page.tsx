"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";
import { useToast } from "@/shared/ui/use-toast";
import {
  File,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Download,
  Trash2,
  Calendar,
  Star,
  X,
} from "lucide-react";

// Типы статусов этапов
type StageStatus = "pending" | "in_progress" | "completed" | "rejected";

// Интерфейс этапа
interface Stage {
  id: number;
  name: string;
  description: string;
  status: StageStatus;
  deadline: string; // ISO формат даты
  files: StageFile[];
  feedback?: string;
  isExpanded: boolean;
}

// Интерфейс файла
interface StageFile {
  id: number;
  name: string;
  size: string;
  uploadedAt: string;
  type: string;
  status: "pending" | "approved" | "rejected";
}

// Создание моковых данных для этапов диплома
const defaultStages: Stage[] = [
  {
    id: 1,
    name: "Первая предзащита",
    description:
      "Презентация концепции и плана дипломной работы. Необходимо загрузить план-график работы и предварительный план исследования.",
    status: "completed",
    deadline: "2025-03-15T23:59:59Z",
    files: [
      {
        id: 1,
        name: "План-график.pdf",
        size: "1.2 MB",
        uploadedAt: "2025-03-10T14:30:00Z",
        type: "application/pdf",
        status: "approved",
      },
      {
        id: 2,
        name: "Предварительный план.docx",
        size: "548 KB",
        uploadedAt: "2025-03-10T14:35:00Z",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        status: "approved",
      },
    ],
    feedback:
      "Хорошая подготовка и четкое понимание целей исследования. Рекомендую больше внимания уделить методологии.",
    isExpanded: false,
  },
  {
    id: 2,
    name: "Вторая предзащита",
    description:
      "Презентация первых результатов исследования и черновой версии теоретической части работы. Загрузите черновик первой главы и презентацию.",
    status: "in_progress",
    deadline: "2025-04-25T23:59:59Z",
    files: [
      {
        id: 3,
        name: "Глава_1_черновик.docx",
        size: "2.4 MB",
        uploadedAt: "2025-04-15T09:20:00Z",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        status: "pending",
      },
    ],
    isExpanded: true,
  },
  {
    id: 3,
    name: "Преддипломная практика",
    description:
      "Отчет о прохождении преддипломной практики и реализация практической части исследования. Необходимо загрузить отчет о практике и материалы практической части работы.",
    status: "pending",
    deadline: "2025-05-20T23:59:59Z",
    files: [],
    isExpanded: false,
  },
  {
    id: 4,
    name: "Финальная версия дипломной работы",
    description:
      "Загрузка полной версии дипломной работы, презентации, раздаточных материалов и отзыва научного руководителя для рецензирования.",
    status: "pending",
    deadline: "2025-06-10T23:59:59Z",
    files: [],
    isExpanded: false,
  },
];

export default function ThesisPage() {
  const [stages, setStages] = useState<Stage[]>(defaultStages);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Получение прогресса выполнения диплома
  const getOverallProgress = () => {
    const completedStages = stages.filter(
      (stage) => stage.status === "completed"
    ).length;
    return (completedStages / stages.length) * 100;
  };

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Проверка, просрочен ли дедлайн
  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  // Получение оставшегося времени до дедлайна
  const getTimeRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return "Просрочено";
    if (days === 0) return "Сегодня";
    if (days === 1) return "Остался 1 день";

    return `Осталось ${days} ${getDayWord(days)}`;
  };

  // Склонение слова "день"
  const getDayWord = (days: number) => {
    if (days % 10 === 1 && days % 100 !== 11) return "день";
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100))
      return "дня";
    return "дней";
  };

  // Получение цвета для бейджа статуса
  const getStatusBadgeVariant = (status: StageStatus) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Получение текста для бейджа статуса
  const getStatusText = (status: StageStatus) => {
    switch (status) {
      case "completed":
        return "Завершено";
      case "in_progress":
        return "В процессе";
      case "rejected":
        return "Отклонено";
      default:
        return "Ожидает";
    }
  };

  // Получение иконки для статуса файла
  const getFileStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  // Получение текста для статуса файла
  const getFileStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Одобрен";
      case "rejected":
        return "Отклонен";
      default:
        return "На проверке";
    }
  };

  // Переключение развернутости этапа
  const toggleStageExpand = (stageId: number) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId
          ? { ...stage, isExpanded: !stage.isExpanded }
          : stage
      )
    );
  };

  // Загрузка файла
  const handleFileUpload = (
    stageId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Имитация загрузки
    setTimeout(() => {
      const newFiles: StageFile[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: formatFileSize(file.size),
        uploadedAt: new Date().toISOString(),
        type: file.type,
        status: "pending",
      }));

      setStages((prevStages) =>
        prevStages.map((stage) =>
          stage.id === stageId
            ? {
                ...stage,
                files: [...stage.files, ...newFiles],
                status:
                  stage.status === "pending" ? "in_progress" : stage.status,
              }
            : stage
        )
      );

      setIsUploading(false);

      toast({
        title: "Файл загружен",
        description: `${
          files.length > 1
            ? `${files.length} файлов загружено`
            : `Файл "${files[0].name}" загружен`
        } успешно.`,
      });
    }, 1500);
  };

  // Форматирование размера файла
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Удаление файла
  const handleDeleteFile = (stageId: number, fileId: number) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              files: stage.files.filter((file) => file.id !== fileId),
            }
          : stage
      )
    );

    toast({
      title: "Файл удален",
      description: "Файл успешно удален.",
    });
  };

  // Получение иконки для типа файла
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) {
      return <FileText className="h-4 w-4" />;
    } else if (fileType.includes("word") || fileType.includes("doc")) {
      return <FileText className="h-4 w-4" />;
    } else if (fileType.includes("image")) {
      return <File className="h-4 w-4" />;
    } else {
      return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 xxs:space-y-6 p-3 xxs:p-4 sm:p-6 bg-white">
      <div>
        <h1 className="text-xl xxs:text-2xl font-bold">Дипломная работа</h1>
        <p className="text-xs xxs:text-sm text-gray-500 mt-1">
          Отслеживайте этапы и прогресс вашей дипломной работы
        </p>
      </div>

      {/* Прогресс-карточка */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-2 p-3 xxs:p-4 sm:p-6">
          <CardTitle className="text-base xxs:text-lg sm:text-xl">
            Общий прогресс
          </CardTitle>
          <CardDescription className="text-xs xxs:text-sm">
            Текущий статус выполнения дипломной работы
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 xxs:p-4 sm:p-6 pt-0 xxs:pt-0 sm:pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-xs xxs:text-sm">
              <span>Выполнено {getOverallProgress().toFixed(0)}%</span>
              <span className="text-gray-500">
                {stages.filter((stage) => stage.status === "completed").length}{" "}
                из {stages.length} этапов
              </span>
            </div>
            <Progress value={getOverallProgress()} className="h-1.5 xxs:h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2 xxs:gap-3 sm:gap-4 mt-4 xxs:mt-5 sm:mt-6">
            <div className="bg-blue-50 rounded-lg p-2 xxs:p-3 flex flex-col items-center justify-center">
              <Badge variant="outline" className="mb-1 text-xs">
                Этап 2/4
              </Badge>
              <p className="text-xs xxs:text-sm text-center">
                Вторая предзащита
              </p>
            </div>
            <div className="bg-amber-50 rounded-lg p-2 xxs:p-3 flex flex-col items-center justify-center">
              <Calendar className="h-4 w-4 xxs:h-5 xxs:w-5 text-amber-500 mb-1" />
              <p className="text-xs xxs:text-sm text-center">
                До дедлайна: 5 дней
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 xxs:p-3 flex flex-col items-center justify-center">
              <CheckCircle className="h-4 w-4 xxs:h-5 xxs:w-5 text-green-500 mb-1" />
              <p className="text-xs xxs:text-sm text-center">
                Завершено: 1 этап
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-2 xxs:p-3 flex flex-col items-center justify-center">
              <Star className="h-4 w-4 xxs:h-5 xxs:w-5 text-purple-500 mb-1" />
              <p className="text-xs xxs:text-sm text-center">Защита: 10 июня</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Этапы дипломной работы */}
      <div className="space-y-3 xxs:space-y-4">
        {stages.map((stage) => (
          <Card
            key={stage.id}
            className={`overflow-hidden border ${
              stage.status === "completed"
                ? "border-green-200"
                : stage.status === "in_progress"
                ? "border-blue-200"
                : stage.status === "rejected"
                ? "border-red-200"
                : "border-gray-200"
            } bg-white`}
          >
            <div
              className={`p-4 flex justify-between items-center cursor-pointer ${
                stage.status === "completed"
                  ? "bg-green-50"
                  : stage.status === "in_progress"
                  ? "bg-blue-50"
                  : stage.status === "rejected"
                  ? "bg-red-50"
                  : "bg-gray-50"
              }`}
              onClick={() => toggleStageExpand(stage.id)}
            >
              <div className="flex items-center">
                <Badge
                  variant={getStatusBadgeVariant(stage.status)}
                  className="mr-3"
                >
                  {getStatusText(stage.status)}
                </Badge>
                <div>
                  <h3 className="font-medium text-lg">
                    Этап {stage.id}. {stage.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Дедлайн: {formatDate(stage.deadline)} •{" "}
                    {getTimeRemaining(stage.deadline)}
                  </p>
                </div>
              </div>
              <div>
                {stage.isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {stage.isExpanded && (
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="mb-4">
                  <p className="text-gray-700">{stage.description}</p>
                </div>

                {/* Секция файлов */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">
                    Файлы ({stage.files.length})
                  </h4>

                  {stage.files.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {stage.files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-gray-50"
                        >
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <span className="ml-2 text-sm">{file.name}</span>
                            <span className="ml-2 text-xs text-gray-500">
                              {file.size}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-3">
                              {getFileStatusIcon(file.status)}
                              <span className="ml-1 text-xs">
                                {getFileStatusText(file.status)}
                              </span>
                            </div>
                            <button
                              className="p-1 hover:bg-gray-200 rounded-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Имитация скачивания файла
                                toast({
                                  title: "Скачивание файла",
                                  description: `Файл "${file.name}" успешно скачан.`,
                                });
                              }}
                            >
                              <Download className="h-4 w-4 text-gray-500" />
                            </button>
                            {file.status === "pending" && (
                              <button
                                className="p-1 hover:bg-gray-200 rounded-md ml-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFile(stage.id, file.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 border border-dashed border-gray-300 rounded-md mb-4 bg-white">
                      <p>Нет загруженных файлов</p>
                    </div>
                  )}

                  {/* Загрузка файлов */}
                  <div className="mt-4">
                    <div className="relative">
                      <input
                        type="file"
                        id={`file-upload-${stage.id}`}
                        className="sr-only"
                        multiple
                        onChange={(e) => handleFileUpload(stage.id, e)}
                        disabled={isUploading || stage.status === "completed"}
                      />
                      <label
                        htmlFor={`file-upload-${stage.id}`}
                        className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer w-full ${
                          isUploading || stage.status === "completed"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isUploading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Загрузка...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            {stage.status === "completed"
                              ? "Этап завершен"
                              : "Загрузить файлы"}
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Отзыв руководителя */}
                  {stage.feedback && (
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <h4 className="text-sm font-medium mb-1">
                        Отзыв руководителя
                      </h4>
                      <p className="text-sm text-gray-700">{stage.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Дополнительная информация о диплоне */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle>Информация о дипломной работе</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Тема</h3>
                <p>
                  Разработка системы цифрового сопровождения дипломных работ
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Научный руководитель
                </h3>
                <p>Петрова Анна Сергеевна</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Кафедра</h3>
                <p>Кафедра информационных технологий</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Дата защиты
                </h3>
                <p>10 июня 2025 г.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between items-center py-5">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Вернуться на дашборд
          </Button>
          <Button
            onClick={() =>
              window.open("https://example.com/guidelines.pdf", "_blank")
            }
          >
            Методические указания
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
