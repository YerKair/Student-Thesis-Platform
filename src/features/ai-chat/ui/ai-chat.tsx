"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SendHorizontal, User, Bot, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/providers/auth-provider";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: Array<{
    type: "redirect" | "external_link";
    label: string;
    url: string;
  }>;
}

interface AIChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Глобальная переменная для хранения API ключа
let currentApiKey = "AIzaSyCRHlbr1HxB2qsmV-t03BldxvVkxsuisEg";

export function AIChat({ open, onOpenChange }: AIChatProps) {
  const router = useRouter();
  const { user, token } = useAuthContext();
  const dashboardData = useDashboardData();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Здравствуйте! Я AI-помощник платформы DiploMate. Готов помочь Вам с вопросами по управлению дипломными проектами, навигации по платформе и процессу выполнения дипломной работы. Что Вас интересует?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const [lastUserInput, setLastUserInput] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Применяем debounce к вводу пользователя
  const debouncedInput = useDebounce(input, 1500);

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Получение предложений на основе ввода пользователя
  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedInput.trim().length < 3 || isLoading) {
        setSuggestions([]);
        return;
      }

      setIsFetchingSuggestions(true);
      try {
        const newSuggestions = await fetchSuggestions(debouncedInput);
        setSuggestions(newSuggestions);
      } catch (error) {
        console.error("Error getting suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsFetchingSuggestions(false);
      }
    };

    getSuggestions();
  }, [debouncedInput, isLoading]);

  // Функция для отправки запроса к Gemini API - перемещена внутрь компонента
  const fetchGeminiResponse = async (message: string): Promise<string> => {
    if (!message.trim()) return "";

    const currentPage = window.location.pathname;

    // Build user context using dashboard data
    const userContext = {
      id: user?.id,
      name: user?.fullname || user?.name,
      email: user?.email,
      role: user?.role || (user?.roles ? user.roles[0] : "student"),
      roles: user?.roles || [user?.role || "student"],
      isInTeam: dashboardData.isInTeam,
      hasProject: dashboardData.hasProject,
      teamName: dashboardData.team?.name,
      teamId: dashboardData.team?.id,
      projectProgress: dashboardData.projectProgress
        ? {
            currentStage: dashboardData.projectProgress.currentStage,
            completedStages: dashboardData.projectProgress.completedStages,
            totalStages: dashboardData.projectProgress.totalStages,
            progressPercentage:
              dashboardData.projectProgress.progressPercentage,
          }
        : null,
      currentPage,
      isLoading: dashboardData.isLoading,
    };

    const systemPrompt = `Ты - DiploMate AI Помощник, профессиональный ИИ-ассистент для платформы управления дипломными проектами DiploMate.

КОНТЕКСТ ПЛАТФОРМЫ:
DiploMate - это платформа для студентов, научных руководителей и администраторов для управления процессом написания дипломных работ. Платформа включает:
- Управление командами студентов
- Создание и отслеживание дипломных проектов  
- Система дедлайнов и этапов работы
- Загрузка и рецензирование файлов
- Коммуникация между участниками
- Создание и управление договорами

ИНФОРМАЦИЯ О ТЕКУЩЕМ ПОЛЬЗОВАТЕЛЕ:
- Роль: ${userContext.role}
- В команде: ${userContext.isInTeam ? "Да" : "Нет"}
- Есть проект: ${userContext.hasProject ? "Да" : "Нет"}
${userContext.teamName ? `- Команда: ${userContext.teamName}` : ""}
${
  userContext.projectProgress
    ? `- Текущий этап: ${userContext.projectProgress.currentStage}
- Прогресс: ${userContext.projectProgress.progressPercentage}%`
    : ""
}
- Текущая страница: ${userContext.currentPage}

РОЛИ И ИХ ВОЗМОЖНОСТИ:
1. СТУДЕНТ (student):
   - Создание и вступление в команды
   - Создание дипломных проектов
   - Загрузка файлов по этапам
   - Просмотр дедлайнов и прогресса
   - Создание и управление договорами (практика, дипломная работа, исследования)
   - Основные разделы: /dashboard/teams, /dashboard/thesis, /dashboard/contracts

2. НАУЧНЫЙ РУКОВОДИТЕЛЬ (supervisor):
   - Просмотр закрепленных команд
   - Рецензирование файлов студентов
   - Установка дедлайнов
   - Управление этапами проектов
   - Просмотр и одобрение договоров студентов
   - Основные разделы: /dashboard/review, /dashboard/contracts/supervisor

3. АДМИНИСТРАТОР (admin):
   - Управление всеми пользователями
   - Управление командами и проектами  
   - Системное администрирование
   - Доступ ко всем разделам
   - Управление всеми договорами

4. РЕЦЕНЗЕНТ (reviewer):
   - Рецензирование дипломных работ
   - Оценка файлов и этапов

ДОСТУПНЫЕ РАЗДЕЛЫ ПЛАТФОРМЫ:
- /dashboard - Главная панель
- /dashboard/teams - Управление командами
- /dashboard/thesis - Управление дипломными проектами
- /dashboard/review - Рецензирование (для руководителей)
- /dashboard/admin - Административная панель (для админов)
- /dashboard/contracts - Управление договорами (для студентов)
- /dashboard/contracts/supervisor - Просмотр договоров (для преподавателей)
- /entities/user - Управление пользователями
- /entities/team - Информация о командах
- /entities/project - Управление проектами

ФУНКЦИОНАЛЬНОСТЬ ДОГОВОРОВ:
В разделе /dashboard/contracts доступны следующие возможности:
1. СОЗДАНИЕ ДОГОВОРОВ:
   - Договор на практику
   - Договор на дипломную работу
   - Договор о сотрудничестве
   - Договор на исследование
   - Договор на консультацию

2. УПРАВЛЕНИЕ ДОГОВОРАМИ:
   - Просмотр всех созданных договоров
   - Статусы: черновик, на рассмотрении, одобрен, подписан, отклонен, завершен
   - Генерация документов договоров
   - Скачивание готовых документов
   - Электронная подпись договоров

3. ДЛЯ ПРЕПОДАВАТЕЛЕЙ (/dashboard/contracts/supervisor):
   - Просмотр всех договоров студентов
   - Фильтрация по студентам, преподавателям, статусу
   - Одобрение и подписание договоров
   - Генерация и скачивание документов

ИНСТРУКЦИИ ПО ОБЩЕНИЮ:
1. Отвечай профессионально и формально на русском языке
2. НЕ используй личные обращения по имени, используй "Вы" 
3. Давай конкретные советы основанные на роли пользователя и контексте
4. Будь кратким и по существу, избегай излишней персонализации
5. Не предполагай личную информацию о пользователе
6. НЕ используй никакие специальные форматы типа [ACTION:...] или [REDIRECT:...]
7. Просто предлагай действия обычным текстом
8. Если нужно предложить переход, используй только формат:
   REDIRECT:/путь:Название кнопки

ПРИМЕРЫ ХОРОШИХ ОТВЕТОВ:
- "Рекомендую проверить дедлайны проекта на соответствующей странице."
- "Для работы с командой перейдите в раздел управления командами."
- "Для создания договора на дипломную работу воспользуйтесь разделом договоров."
- "REDIRECT:/dashboard/contracts:Создать договор"
- "REDIRECT:/dashboard/thesis:Открыть проект"

Помогай пользователям эффективно использовать DiploMate для управления их дипломными проектами и договорами!`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          process.env.NEXT_PUBLIC_GEMINI_API_KEY || currentApiKey
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt}\n\nСообщение пользователя: ${message}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API Error: ${response.status} - ${errorText}`);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (!responseText) {
        throw new Error("Пустой ответ от API");
      }

      return responseText;
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      throw error;
    }
  };

  // Обновленные предложения с учетом функций DiploMate
  const FALLBACK_SUGGESTIONS = {
    как: [
      "как создать команду в DiploMate?",
      "как создать договор на дипломную работу?",
      "как загрузить файлы для этапа?",
    ],
    где: [
      "где создать договор на практику?",
      "где найти мою команду?",
      "где загрузить договор на дипломную работу?",
    ],
    что: [
      "что такое договор о сотрудничестве?",
      "что должно быть в техническом этапе?",
      "что нужно для подписания договора?",
    ],
    проект: [
      "как создать проект в DiploMate?",
      "как отслеживать этапы проекта?",
      "как оформить договор для проекта?",
    ],
    команда: [
      "как пригласить участников в команду?",
      "как управлять командой в DiploMate?",
      "как найти команду по коду приглашения?",
    ],
    этап: [
      "какие этапы есть в дипломной работе?",
      "как перейти к следующему этапу?",
      "что делать если этап провален?",
    ],
    руководитель: [
      "как связаться с научным руководителем?",
      "как получить одобрение договора от руководителя?",
      "как оформить договор с руководителем?",
    ],
    диплом: [
      "требования к оформлению диплома",
      "структура дипломной работы IT направления",
      "как подготовиться к защите диплома",
    ],
    договор: [
      "как создать договор на дипломную работу?",
      "какие типы договоров доступны?",
      "как подписать договор электронно?",
    ],
    генерация: [
      "как сгенерировать документ договора?",
      "где скачать готовый договор?",
      "как получить PDF версию договора?",
    ],
    практика: [
      "как оформить договор на практику?",
      "требования к договору на практику",
      "статусы договора на практику",
    ],
  };

  // Функция для получения предложений на основе ввода пользователя
  async function fetchSuggestions(input: string): Promise<string[]> {
    if (!input.trim() || input.length < 3) return [];

    // Проверяем наличие ключевых слов в тестовых данных
    for (const [key, suggestions] of Object.entries(FALLBACK_SUGGESTIONS)) {
      if (input.toLowerCase().includes(key)) {
        return suggestions;
      }
    }

    // Используем актуальный API ключ для генерации предложений
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || currentApiKey;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Ты помощник на платформе DiploMate для студентов дипломных работ IT направления. 

Предложи 3 коротких варианта завершения запроса пользователя о функциях платформы DiploMate или дипломной работе. 
Фокусируйся на практических вопросах: команды, проекты, этапы работы, загрузка файлов, взаимодействие с руководителем.

Запрос: "${input}"

Верни только 3 законченные фразы без номеров, каждую с новой строки.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 150,
          },
        }),
      });

      if (!response.ok) {
        console.error("Error fetching suggestions:", await response.text());
        return getDefaultSuggestions(input);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        return text
          .split("\n")
          .filter((line: string) => line.trim())
          .slice(0, 3)
          .map((line: string) => line.replace(/^["-]*|["-]*$/g, "").trim());
      } else {
        return getDefaultSuggestions(input);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return getDefaultSuggestions(input);
    }
  }

  // Функция для получения стандартных предложений на основе ввода
  function getDefaultSuggestions(input: string): string[] {
    // Пытаемся найти подходящие предложения в fallback данных
    const words = input.toLowerCase().split(" ");
    for (const word of words) {
      if (word.length >= 3) {
        for (const [key, suggestions] of Object.entries(FALLBACK_SUGGESTIONS)) {
          if (key.includes(word) || word.includes(key)) {
            return suggestions;
          }
        }
      }
    }

    // Если ничего не нашли, возвращаем общие предложения для DiploMate
    return [
      "как работать с проектом в DiploMate",
      "функции платформы DiploMate",
      "помощь по дипломной работе",
    ];
  }

  // Функция для парсинга ответа и извлечения действий
  function parseResponseForActions(content: string): {
    cleanContent: string;
    actions: Array<{
      type: "redirect" | "external_link";
      label: string;
      url: string;
    }>;
  } {
    const actions: Array<{
      type: "redirect" | "external_link";
      label: string;
      url: string;
    }> = [];
    let cleanContent = content;

    // Ищем паттерн REDIRECT:/path:Label
    const redirectMatches = content.match(/REDIRECT:([^:]+):([^\n\r]+)/g);
    if (redirectMatches) {
      redirectMatches.forEach((match) => {
        const parts = match.replace("REDIRECT:", "").split(":");
        if (parts.length >= 2) {
          actions.push({
            type: "redirect",
            url: parts[0].trim(),
            label: parts[1].trim(),
          });
        }
        cleanContent = cleanContent.replace(match, "").trim();
      });
    }

    return { cleanContent, actions };
  }

  interface ActionItem {
    type: "navigation" | "suggestion";
    text: string;
    action?: string;
    target?: string;
  }

  const sendMessage = async (messageText: string = input) => {
    if (messageText.trim() === "") return;

    const userInputText = messageText.trim();

    // Проверяем на слова "спасибо" или "пока" для очистки чата
    const lowerCaseInput = userInputText.toLowerCase();
    if (
      lowerCaseInput === "спасибо" ||
      lowerCaseInput === "пока" ||
      lowerCaseInput.includes("спасибо") ||
      lowerCaseInput.includes("пока")
    ) {
      // Добавляем прощальное сообщение пользователя
      const userMessage: Message = {
        role: "user",
        content: userInputText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Добавляем прощальное сообщение от ассистента
      const goodbyeMessage: Message = {
        role: "assistant",
        content:
          "Спасибо за обращение! Желаю успехов в работе с DiploMate. Чат будет очищен.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, goodbyeMessage]);
      setInput("");

      // Очищаем чат через небольшую задержку
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "Здравствуйте! Я AI-помощник платформы DiploMate. Готов помочь Вам с вопросами по управлению дипломными проектами, навигации по платформе и процессу выполнения дипломной работы. Что Вас интересует?",
            timestamp: new Date(),
          },
        ]);
      }, 2000);

      return;
    }

    // Сохраняем ввод пользователя для возможного повторного запроса
    setLastUserInput(userInputText);

    // Сбрасываем ошибку API
    setApiError(null);

    // Сбрасываем предложения
    setSuggestions([]);

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      role: "user",
      content: userInputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Запрос к Gemini API с контекстом
      const aiResponseText = await fetchGeminiResponse(userInputText);

      // Парсим ответ на предмет действий
      const { cleanContent, actions } = parseResponseForActions(aiResponseText);

      // Проверяем, содержит ли ответ сообщение об ошибке
      if (
        cleanContent.includes("Ошибка API") ||
        cleanContent.includes("Извините, я не смог сгенерировать ответ")
      ) {
        setApiError(
          "API недоступен или вернул ошибку. Вы можете попробовать повторить запрос позже."
        );
      }

      // Добавляем ответ от API с действиями
      const aiResponse: Message = {
        role: "assistant",
        content: cleanContent,
        timestamp: new Date(),
        actions: actions.length > 0 ? actions : undefined,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message", error);

      // Устанавливаем флаг ошибки
      setApiError(
        "Ошибка при обработке запроса. Проверьте подключение к интернету."
      );

      // Добавляем сообщение об ошибке
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Извините, произошла ошибка при обработке запроса. Пожалуйста, проверьте подключение к интернету и попробуйте позже.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для повторной отправки последнего запроса
  const retrySendMessage = () => {
    if (lastUserInput) {
      sendMessage(lastUserInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const applySuggestion = (suggestion: string) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  // Функция для установки пользовательского API ключа
  const setNewApiKey = () => {
    if (customApiKey.trim()) {
      currentApiKey = customApiKey.trim();
      setApiError(null);
      setShowApiKeyInput(false);
      // Повторяем последний запрос с новым ключом, если такой был
      if (lastUserInput) {
        sendMessage(lastUserInput);
      }
    }
  };

  // Функция для выполнения действий
  const handleAction = (action: {
    type: string;
    url: string;
    label: string;
  }) => {
    if (action.type === "redirect") {
      router.push(action.url);
      onOpenChange(false); // Закрываем чат при переходе
    } else if (action.type === "external_link") {
      window.open(action.url, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 bg-white text-gray-900 border-gray-200">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle className="text-gray-900">
            DiploMate AI Помощник
          </DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-2 mb-4",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-primary" />
                </div>
              )}

              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%] break-words",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100"
                )}
              >
                <p>{message.content}</p>

                {/* Кнопки действий */}
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => handleAction(action)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-md hover:bg-primary/20 transition-colors w-full"
                      >
                        <ExternalLink size={14} />
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {apiError && !isLoading && (
            <div className="flex flex-col items-center justify-center my-2 gap-2">
              <button
                onClick={retrySendMessage}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
                Повторить запрос
              </button>

              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="text-xs text-primary hover:underline"
              >
                {showApiKeyInput ? "Скрыть" : "Установить свой API ключ"}
              </button>

              {showApiKeyInput && (
                <div className="w-full flex gap-2 mt-1">
                  <input
                    type="text"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="Введите API ключ..."
                    className="flex-grow p-1 text-xs border rounded"
                  />
                  <button
                    onClick={setNewApiKey}
                    className="text-xs bg-primary text-white px-2 py-1 rounded"
                    disabled={!customApiKey.trim()}
                  >
                    Применить
                  </button>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t mt-auto bg-white">
          <div className="relative flex flex-col gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Спросите о DiploMate или дипломной работе..."
              className="flex-grow min-h-[50px] max-h-[150px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900"
              disabled={isLoading}
            />

            {suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1 overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full p-2 text-left hover:bg-gray-100 text-sm border-b last:border-b-0"
                    onClick={() => applySuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isFetchingSuggestions && (
              <div className="text-xs text-gray-500">
                Получение предложений...
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || input.trim() === ""}
                className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
