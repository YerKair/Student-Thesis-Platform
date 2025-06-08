"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SendHorizontal, User, Bot } from "lucide-react";

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
let currentApiKey =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  "AIzaSyCRHlbr1HxB2qsmV-t03BldxvVkxsuisEg";

// Функция для отправки запроса к Gemini API
async function fetchGeminiResponse(prompt: string) {
  // Используем актуальный API ключ
  const API_KEY = currentApiKey || "YOUR_API_KEY_HERE";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    console.log(
      "Sending request to Gemini API with prompt:",
      prompt.substring(0, 50) + "..."
    );

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
                text: `Ты помощник по дипломной работе на платформе для студентов "Дипломная работа". 

Информация о платформе:
- Это веб-сайт для помощи студентам в написании и оформлении дипломных и курсовых работ IT направления название Дипломная платформа
- На платформе студенты могут отслеживать прогресс написания работы, общаться с научными руководителями
- Платформа предоставляет шаблоны оформления, примеры работ и автоматическую проверку на соответствие стандартам
- Пользователи могут использовать инструменты для планирования задач и управления сроками
- Ты никак не должен фигурировать в виде того что ты напишешь дипломку сам ты просто гид по сайту и помощник по теории
- Так же одна из твоих задач это помочь студентам с выбором темы дипломной работы

Отвечай на одном из языков  русском казахском или английском языке учитывая на каком языке тебя спросили коротко и по существу на вопросы студентов о процессе написания и оформления дипломной работы, а также о возможностях платформ Вопрос: ${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      }),
    });

    const data = await response.json();
    console.log(
      "API Response:",
      JSON.stringify(data).substring(0, 200) + "..."
    );

    if (!response.ok) {
      console.error("API Error:", data);
      return `Ошибка API (${response.status}): ${
        data.error?.message || "Неизвестная ошибка"
      }`;
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      return `Извините, запрос был заблокирован системой безопасности (${data.promptFeedback.blockReason}). Пожалуйста, перефразируйте вопрос.`;
    } else {
      console.error("Unexpected API response structure:", data);
      return "Извините, я не смог сгенерировать ответ. Получен некорректный ответ от API. Пожалуйста, попробуйте задать вопрос иначе.";
    }
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "Произошла ошибка при обработке запроса. Пожалуйста, проверьте подключение к интернету и попробуйте позже.";
  }
}

// Тестовые данные для предложений, если API не работает
const FALLBACK_SUGGESTIONS = {
  как: [
    "как оформить титульный лист дипломной работы?",
    "как выбрать тему для диплома?",
    "как подготовиться к защите диплома?",
  ],
  сколько: [
    "сколько страниц должно быть в дипломной работе?",
    "сколько источников нужно указать в списке литературы?",
    "сколько времени занимает написание диплома?",
  ],
  требования: [
    "требования к оформлению дипломной работы",
    "требования к презентации для защиты",
    "требования к списку литературы",
  ],
  срок: [
    "сроки сдачи дипломной работы",
    "сроки предзащиты диплома",
    "сроки согласования темы с руководителем",
  ],
  что: [
    "что должно быть в введении диплома?",
    "что писать в заключении?",
    "что такое актуальность исследования?",
  ],
  где: [
    "где найти источники для дипломной работы?",
    "где скачать шаблон оформления?",
    "где публиковать научную статью?",
  ],
};

// Функция для получения предложений на основе ввода пользователя
async function fetchSuggestions(input: string): Promise<string[]> {
  if (!input.trim() || input.length < 3) return [];

  // Проверяем наличие ключевых слов в тестовых данных
  for (const [key, suggestions] of Object.entries(FALLBACK_SUGGESTIONS)) {
    if (input.toLowerCase().startsWith(key)) {
      return suggestions;
    }
  }

  // Используем актуальный API ключ
  const API_KEY = currentApiKey || "YOUR_API_KEY_HERE";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

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
                text: `Ты помощник на платформе для студентов "Дипломная работа", где студенты получают поддержку при написании академических работ. 

Предложи 3 коротких варианта завершения запроса пользователя о дипломной работе на русском языке или о функциях платформы. Дай только законченные фразы, без номеров и пояснений. Запрос: "${input}". Верни результат в формате JSON массива строк.`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 20,
          topP: 0.9,
          maxOutputTokens: 200,
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
      // Пытаемся извлечь JSON из ответа
      try {
        // Ищем JSON-массив в тексте
        const jsonMatch = text.match(/\[(.|[\r\n])*\]/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return Array.isArray(parsedData)
            ? parsedData.slice(0, 3)
            : getDefaultSuggestions(input);
        } else {
          // Если не нашли JSON, разбиваем на строки и берем до 3
          return text
            .split("\n")
            .filter((line: string) => line.trim())
            .slice(0, 3)
            .map((line: string) => line.replace(/^["-]*|["-]*$/g, "").trim());
        }
      } catch (e) {
        console.error("Error parsing suggestions", e);
        return getDefaultSuggestions(input);
      }
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
        if (key.startsWith(word) || word.startsWith(key)) {
          return suggestions;
        }
      }
    }
  }

  // Если ничего не нашли, возвращаем стандартные предложения
  return [
    `${input} требования оформления`,
    `${input} пример структуры`,
    `${input} советы для защиты`,
  ];
}

export function AIChat({ open, onOpenChange }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Привет! Я помощник по дипломной работе. Чем могу помочь?",
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
        content: "Был рад помочь! Чат будет очищен.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, goodbyeMessage]);
      setInput("");

      // Очищаем чат через небольшую задержку, чтобы пользователь увидел сообщение
      setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "Привет! Я помощник по дипломной работе. Чем могу помочь?",
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
      // Запрос к Gemini API
      const aiResponseText = await fetchGeminiResponse(userInputText);

      // Проверяем, содержит ли ответ сообщение об ошибке
      if (
        aiResponseText.includes("Ошибка API") ||
        aiResponseText.includes("Извините, я не смог сгенерировать ответ")
      ) {
        setApiError(
          "API недоступен или вернул ошибку. Вы можете попробовать повторить запрос позже."
        );
      }

      // Добавляем ответ от API
      const aiResponse: Message = {
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date(),
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0 bg-white text-gray-900 border-gray-200">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle className="text-gray-900">
            Помощник по дипломной работе
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
              placeholder="Напишите ваш вопрос..."
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
