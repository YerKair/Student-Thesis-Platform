module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/theme-init-script.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeInitScript": (()=>ThemeInitScript)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function ThemeInitScript() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        dangerouslySetInnerHTML: {
            __html: `
          (function() {
            try {
              const theme = localStorage.getItem('app-theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              if (theme === 'dark' || (!theme && prefersDark)) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (e) {
              console.error('Error applying theme:', e);
            }
          })()
        `
        }
    }, void 0, false, {
        fileName: "[project]/src/app/theme-init-script.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/providers/theme-provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("light");
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Устанавливаем флаг, что мы на клиенте после монтирования
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
    }, []);
    // Загрузка темы из localStorage при инициализации
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Проверяем сначала localStorage
        const storedTheme = localStorage.getItem("app-theme");
        // Если есть сохраненная тема, используем её
        if (storedTheme === "light" || storedTheme === "dark") {
            setTheme(storedTheme);
            document.documentElement.setAttribute("data-theme", storedTheme);
        } else if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, []);
    // При изменении темы обновляем атрибут на документе и сохраняем в localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("app-theme", theme);
            // Force apply theme class to body and document for compatibility with some components
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
                document.body.classList.add("dark");
                document.documentElement.classList.remove("light");
                document.body.classList.remove("light");
                // Принудительно устанавливаем стили для темной темы
                const headerElement = document.querySelector("header");
                if (headerElement) {
                    headerElement.setAttribute("style", "background-color: #121212 !important");
                }
                // Устанавливаем стили для карточек и таблиц напрямую
                document.querySelectorAll('.card, [class*="Card"]').forEach((card)=>{
                    card.setAttribute("style", "background-color: #1e1e1e !important; border-color: #383838 !important;");
                });
                document.querySelectorAll("table").forEach((table)=>{
                    table.setAttribute("style", "background-color: #1e1e1e !important;");
                });
                document.querySelectorAll("tr").forEach((row)=>{
                    row.setAttribute("style", "border-color: #383838 !important; background-color: #1e1e1e !important;");
                });
                document.querySelectorAll("td, th").forEach((cell)=>{
                    cell.setAttribute("style", "color: #e5e7eb !important; border-color: #383838 !important; background-color: #1e1e1e !important;");
                });
                // Добавляем стили для специальных компонентов
                document.querySelectorAll('.badge, [class*="Badge"]').forEach((badge)=>{
                    badge.setAttribute("style", "background-color: #2c2c2c !important; color: #e5e7eb !important; border-color: #383838 !important;");
                });
                // Добавляем стили для заголовков в карточках
                document.querySelectorAll('[class*="CardTitle"]').forEach((title)=>{
                    title.setAttribute("style", "color: white !important;");
                });
                document.querySelectorAll('[class*="CardDescription"]').forEach((desc)=>{
                    desc.setAttribute("style", "color: #d1d5db !important;");
                });
                // Добавляем CSS-стили глобально для всей страницы
                const styleElement = document.createElement("style");
                styleElement.id = "custom-dark-theme-styles";
                styleElement.textContent = `
          body.dark .bg-white { background-color: #121212 !important; }
          body.dark table { background-color: #1e1e1e !important; }
          body.dark tr { background-color: #1e1e1e !important; border-color: #383838 !important; }
          body.dark th, body.dark td { color: #e5e7eb !important; background-color: #1e1e1e !important; }
          body.dark input, body.dark textarea, body.dark select { background-color: #2c2c2c !important; color: white !important; border-color: #383838 !important; }
          body.dark button[class*="outline"] { border-color: #383838 !important; color: #e5e7eb !important; background-color: #1e1e1e !important; }
          body.dark button[class*="outline"]:hover { background-color: #2c2c2c !important; }
          
          /* Все основные контейнеры */
          body.dark, html.dark, [data-theme="dark"], 
          body.dark div, body.dark section, body.dark main, 
          body.dark article, body.dark aside, body.dark nav {
            background-color: #121212 !important;
          }
          
          /* Темно-серый для карточек и интерактивных элементов */
          body.dark .card, body.dark [class*="Card"], 
          body.dark [role="dialog"], body.dark [class*="container"] {
            background-color: #1e1e1e !important;
            border-color: #383838 !important;
          }
        `;
                const existingStyle = document.getElementById("custom-dark-theme-styles");
                if (!existingStyle) {
                    document.head.appendChild(styleElement);
                }
            } else {
                document.documentElement.classList.remove("dark");
                document.body.classList.remove("dark");
                document.documentElement.classList.add("light");
                document.body.classList.add("light");
                // Принудительно устанавливаем стили для светлой темы
                const headerElement = document.querySelector("header");
                if (headerElement) {
                    headerElement.setAttribute("style", "background-color: #ffffff !important");
                }
                // Сбрасываем все примененные стили
                document.querySelectorAll('.card, [class*="Card"], table, tr, td, th, .badge, [class*="Badge"], [class*="CardTitle"], [class*="CardDescription"]').forEach((el)=>{
                    el.removeAttribute("style");
                });
                // Удаляем CSS-стили для темной темы
                const styleElement = document.getElementById("custom-dark-theme-styles");
                if (styleElement) {
                    styleElement.remove();
                }
            }
        }
    }, [
        theme
    ]);
    // Функция переключения темы
    const toggleTheme = ()=>{
        setTheme((prevTheme)=>{
            const newTheme = prevTheme === "light" ? "dark" : "light";
            return newTheme;
        });
    };
    // Используем контент из скрипта инициализации, если мы не на клиенте
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers/theme-provider.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
}}),
"[project]/src/app/theme-styles.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeStyles": (()=>ThemeStyles)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeStyles() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        id: "81ae7e6baf904d06",
        children: "html{visibility:visible;transition:background-color .2s}:root{--background:#fff;--foreground:#171717;--primary:#2563eb;--primary-light:#60a5fa;--border-color:#e5e7eb;--card-bg:#fff;--hover-bg:#f9fafb;--text-primary:#171717;--text-secondary:#4b5563;--text-tertiary:#6b7280}html.light,body.light,[data-theme=light]{color:#171717!important;background-color:#fff!important}html.light header,body.light header,[data-theme=light] header,body:not([data-theme=dark]) header,html:not([data-theme=dark]) header{background-color:#fff!important;border-color:#e5e7eb!important}body:not([data-theme=dark]) header{background-color:#fff!important}body:not([data-theme=dark]){background-color:#fff}body:not([data-theme=dark]) main,html.light main,body:not([data-theme=dark]) aside,html.light aside,body:not([data-theme=dark]) .card,body:not([data-theme=dark]) [class*=Card],body:not([data-theme=dark]) .bg-white,html.light .card,html.light [class*=Card],html.light .bg-white{background-color:#fff!important}body:not([data-theme=dark]) .border,html.light .border{border-color:#e5e7eb!important}[data-theme=dark]{--background:#0a1929;--foreground:#fff;--primary:#4d84ff;--primary-dark:#1a56db;--primary-light:#93c5fd;--border-color:#193354;--card-bg:#102a43;--hover-bg:#193354;--text-primary:#fff;--text-secondary:#a3c0e6;--text-tertiary:#748fb8;color-scheme:dark;color:#fff!important;background-color:#0a1929!important}[data-theme=dark] .bg-white,[data-theme=dark] header,[data-theme=dark] aside,[data-theme=dark] .bg-gradient-to-b{background-color:#102a43!important}[data-theme=dark] .border,[data-theme=dark] header,[data-theme=dark] aside,[data-theme=dark] .border-blue-100{border-color:#193354!important}[data-theme=dark] aside button,[data-theme=dark] p.text-sm.font-medium,[data-theme=dark] .text-base.font-medium,[data-theme=dark] .text-black,[data-theme=dark] aside a,[data-theme=dark] aside span,[data-theme=dark] .text-sm,[data-theme=dark] .text-xs{color:#a3c0e6!important}[data-theme=dark] .font-medium,[data-theme=dark] .font-bold,[data-theme=dark] h1,[data-theme=dark] h2,[data-theme=dark] h3,[data-theme=dark] h4,[data-theme=dark] p{color:#fff!important}[data-theme=dark] aside a:hover:not(.bg-blue-50){background-color:#193354!important}[data-theme=dark] .hover\\\\:bg-white:hover{background-color:#193354!important}[data-theme=dark] .data-\\\\[state\\\\=active\\\\]:bg-white{background-color:#193354!important}[data-theme=dark] .DialogContent,[data-theme=dark] [class*=DialogContent],[data-theme=dark] div[role=dialog]{background-color:#102a43!important;border-color:#193354!important}[data-theme=dark] [role=tabslist]{background-color:#102a43!important}[data-theme=dark] [role=tab][data-state=active]{color:#fff!important;background-color:#193354!important}[data-theme=dark] input,[data-theme=dark] select,[data-theme=dark] textarea{color:#fff!important;background-color:#0a1929!important;border-color:#193354!important}[data-theme=dark] .badge{background-color:#193354!important}[data-theme=dark] :hover{background-color:#234978!important}[data-theme=dark] .fixed.inset-0.z-50{background-color:#0a1929b3!important}*{transition-property:background-color,border-color,color,fill,stroke,opacity,box-shadow,transform;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1)}body,.bg-white,.text-black,.border,header,aside,input,select,textarea,.bg-gradient-to-b,.shadow-sm,.shadow-lg{transition:all .3s}"
    }, void 0, false, void 0, this);
}
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/features/auth/lib/use-auth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
// Базовый URL API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
// API сервис аутентификации
class AuthService {
    static async login(credentials) {
        try {
            console.log("Trying to login with credentials:", credentials.email);
            // Создаем FormData для отправки
            const formData = new URLSearchParams();
            formData.append("username", credentials.email); // Бэкенд ожидает параметр 'username'
            formData.append("password", credentials.password);
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json"
                },
                body: formData.toString(),
                credentials: "include",
                mode: "cors"
            });
            // Детальная обработка ошибок
            if (!response.ok) {
                // Пытаемся получить текст ошибки
                let errorText;
                try {
                    errorText = await response.text();
                    console.error("Login error response:", errorText, "Status:", response.status);
                    // Пытаемся распарсить как JSON
                    const errorJson = JSON.parse(errorText);
                    const errorMessage = errorJson.detail || "Ошибка при входе";
                    throw new Error(errorMessage);
                } catch (parseError) {
                    // Если не смогли распарсить JSON, возвращаем текст ошибки или статус
                    console.error("Could not parse error response:", parseError);
                    throw new Error(errorText || `Ошибка сервера: ${response.status}`);
                }
            }
            const data = await response.json();
            console.log("Login successful, received data:", data);
            // Получаем профиль пользователя
            const userProfile = await AuthService.getUserProfile(data.access_token);
            console.log("User profile:", userProfile);
            // Сохраняем токены в localStorage
            localStorage.setItem("authToken", data.access_token);
            localStorage.setItem("user", JSON.stringify(userProfile));
            return {
                user: userProfile,
                token: data.access_token,
                refreshToken: ""
            };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
    static async register(credentials) {
        try {
            console.log("Attempting registration for:", credentials.email);
            // Подготовка данных для API в соответствии с ожидаемым форматом бэкенда
            const registerData = {
                email: credentials.email,
                password: credentials.password,
                fullname: credentials.name
            };
            // Регистрация пользователя с обработкой CORS
            const registerResponse = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(registerData),
                credentials: "include",
                mode: "cors"
            });
            // Обработка ошибок
            if (!registerResponse.ok) {
                // Пытаемся получить текст ошибки
                let errorText;
                try {
                    errorText = await registerResponse.text();
                    console.error("Registration error response:", errorText);
                    // Пытаемся распарсить как JSON
                    const errorJson = JSON.parse(errorText);
                    const errorMessage = errorJson.detail || "Ошибка при регистрации";
                    throw new Error(errorMessage);
                } catch (parseError) {
                    // Если не смогли распарсить JSON, возвращаем текст ошибки или статус
                    console.error("Could not parse error response:", parseError);
                    throw new Error(errorText || `Ошибка сервера: ${registerResponse.status}`);
                }
            }
            console.log("Registration successful");
            // После успешной регистрации сразу создаем профиль пользователя без доп. запроса логина
            const userProfile = {
                id: "temp-id",
                name: credentials.name,
                email: credentials.email,
                role: "student",
                isActive: true,
                createdAt: new Date().toISOString()
            };
            return {
                user: userProfile,
                token: "temp-token",
                refreshToken: ""
            };
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }
    static async getUserProfile(token) {
        const response = await fetch(`${API_BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            },
            credentials: "include",
            mode: "cors"
        });
        if (!response.ok) {
            throw new Error("Не удалось получить профиль пользователя");
        }
        const userData = await response.json();
        console.log("User data from API:", userData);
        // Проверяем наличие нужных данных в ответе
        if (!userData.message || !userData.message.username) {
            throw new Error("Неверный формат данных профиля пользователя");
        }
        // Получаем данные пользователя из ответа API
        const { username, fullname, roles, id } = userData.message;
        // Создаем объект пользователя на основе полученных данных
        const user = {
            id: id?.toString() || "1",
            name: fullname || username.split("@")[0],
            email: username,
            role: roles?.[0] || "student",
            isActive: true,
            createdAt: new Date().toISOString()
        };
        return user;
    }
    static logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }
    static isAuthenticated() {
        return !!localStorage.getItem("authToken");
    }
    static getUser() {
        const userJson = localStorage.getItem("user");
        if (!userJson) return null;
        try {
            return JSON.parse(userJson);
        } catch (e) {
            console.error("Failed to parse user data", e);
            return null;
        }
    }
    static getToken() {
        return localStorage.getItem("authToken");
    }
}
function useAuth() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [authState, setAuthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false
    });
    // Инициализация состояния аутентификации
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // В клиентском коде нужно проверять window, чтобы избежать ошибок SSR
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
    }, []);
    // Функция входа
    const login = async (credentials)=>{
        setAuthState((prev)=>({
                ...prev,
                isLoading: true
            }));
        try {
            const result = await AuthService.login(credentials);
            setAuthState({
                user: result.user,
                token: result.token,
                isLoading: false,
                isAuthenticated: true
            });
            return result;
        } catch (error) {
            setAuthState((prev)=>({
                    ...prev,
                    isLoading: false
                }));
            throw error;
        }
    };
    // Функция регистрации
    const register = async (credentials)=>{
        setAuthState((prev)=>({
                ...prev,
                isLoading: true
            }));
        try {
            const result = await AuthService.register(credentials);
            // В случае успешной регистрации - не сохраняем состояние авторизации,
            // т.к. нужно перенаправить на логин
            setAuthState((prev)=>({
                    ...prev,
                    isLoading: false
                }));
            return result;
        } catch (error) {
            setAuthState((prev)=>({
                    ...prev,
                    isLoading: false
                }));
            throw error;
        }
    };
    // Функция выхода
    const logout = ()=>{
        AuthService.logout();
        setAuthState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false
        });
        router.push("/auth/login");
    };
    return {
        ...authState,
        login,
        register,
        logout
    };
}
}}),
"[project]/src/app/providers/auth-provider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuthContext": (()=>useAuthContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$lib$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/lib/use-auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$lib$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: auth,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers/auth-provider.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
const useAuthContext = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
}}),
"[project]/src/app/theme-script.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeScript": (()=>ThemeScript)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeScript() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Определяем цвета темно-синей темы - усиленные синие оттенки
        const darkBlueTheme = {
            background: "#0a1929",
            cardBg: "#102a43",
            border: "#193354",
            activeElementBg: "#234978",
            hoverElementBg: "#173050",
            textPrimary: "#ffffff",
            textSecondary: "#a3c0e6",
            textTertiary: "#748fb8",
            accent: "#4d84ff",
            accentLight: "#93c5fd"
        };
        // Функция применяет стили для темно-синей темы
        const applyDarkModeStyles = ()=>{
            const isDarkMode = document.documentElement.classList.contains("dark");
            if (isDarkMode) {
                // Добавляем CSS-стили глобально для всей страницы
                const styleElement = document.createElement("style");
                styleElement.id = "custom-dark-theme-styles";
                styleElement.textContent = `
          /* Переменные темно-синей темы */
          body.dark, 
          html.dark,
          [data-theme="dark"] {
            --bg-primary: ${darkBlueTheme.background};
            --bg-secondary: ${darkBlueTheme.cardBg};
            --border-color: ${darkBlueTheme.border};
            --active-bg: ${darkBlueTheme.activeElementBg};
            --hover-bg: ${darkBlueTheme.hoverElementBg};
            --text-primary: ${darkBlueTheme.textPrimary};
            --text-secondary: ${darkBlueTheme.textSecondary};
            --text-tertiary: ${darkBlueTheme.textTertiary};
            --accent: ${darkBlueTheme.accent};
            --accent-light: ${darkBlueTheme.accentLight};
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
          }

          /* ПЕРЕОПРЕДЕЛЕНИЕ ВСЕХ СЕРЫХ ЦВЕТОВ НА СИНИЕ */
          
          /* Переназначаем классы Tailwind для серых цветов на синие */
          body.dark .bg-gray-50,
          body.dark .bg-gray-100,
          body.dark .bg-gray-200,
          body.dark .bg-gray-300,
          body.dark .bg-gray-400,
          body.dark .bg-gray-500,
          body.dark .bg-gray-600,
          body.dark .bg-gray-700,
          body.dark .bg-gray-800,
          body.dark .bg-gray-900,
          body.dark .dark\\:bg-gray-50,
          body.dark .dark\\:bg-gray-100,
          body.dark .dark\\:bg-gray-200,
          body.dark .dark\\:bg-gray-300,
          body.dark .dark\\:bg-gray-400,
          body.dark .dark\\:bg-gray-500,
          body.dark .dark\\:bg-gray-600,
          body.dark .dark\\:bg-gray-700,
          body.dark .dark\\:bg-gray-800,
          body.dark .dark\\:bg-gray-900 {
            background-color: var(--bg-primary) !important;
          }
          
          /* Для элементов с высокой вложенностью принудительно устанавливаем синий фон */
          body.dark [class*="bg-gray"] {
            background-color: var(--bg-primary) !important;
          }
          
          /* Переназначаем цвета текста */
          body.dark .text-gray-50,
          body.dark .text-gray-100,
          body.dark .text-gray-200,
          body.dark .text-gray-300,
          body.dark .text-gray-400,
          body.dark .text-gray-500,
          body.dark .text-gray-600,
          body.dark .text-gray-700,
          body.dark .text-gray-800,
          body.dark .text-gray-900,
          body.dark .dark\\:text-gray-50,
          body.dark .dark\\:text-gray-100,
          body.dark .dark\\:text-gray-200,
          body.dark .dark\\:text-gray-300,
          body.dark .dark\\:text-gray-400,
          body.dark .dark\\:text-gray-500,
          body.dark .dark\\:text-gray-600,
          body.dark .dark\\:text-gray-700,
          body.dark .dark\\:text-gray-800,
          body.dark .dark\\:text-gray-900 {
            color: var(--text-secondary) !important;
          }
          
          /* Для границ */
          body.dark .border-gray-50,
          body.dark .border-gray-100,
          body.dark .border-gray-200,
          body.dark .border-gray-300,
          body.dark .border-gray-400,
          body.dark .border-gray-500,
          body.dark .border-gray-600,
          body.dark .border-gray-700,
          body.dark .border-gray-800,
          body.dark .border-gray-900,
          body.dark .dark\\:border-gray-50,
          body.dark .dark\\:border-gray-100,
          body.dark .dark\\:border-gray-200,
          body.dark .dark\\:border-gray-300,
          body.dark .dark\\:border-gray-400,
          body.dark .dark\\:border-gray-500,
          body.dark .dark\\:border-gray-600,
          body.dark .dark\\:border-gray-700,
          body.dark .dark\\:border-gray-800,
          body.dark .dark\\:border-gray-900 {
            border-color: var(--border-color) !important;
          }

          /* Базовые элементы */
          body.dark div, 
          body.dark section, 
          body.dark main, 
          body.dark article, 
          body.dark aside,
          body.dark [class*="Content"],
          body.dark [class*="container"] {
            background-color: var(--bg-primary) !important;
          }

          /* Удаление классов темной темы в базовых компонентах */
          body.dark .dark\\:bg-gray-700,
          body.dark .dark\\:bg-gray-800, 
          body.dark .dark\\:bg-gray-900,
          body.dark .dark\\:border-gray-700,
          body.dark .dark\\:border-gray-800,
          body.dark .dark\\:text-gray-200,
          body.dark .dark\\:text-gray-300,
          body.dark .dark\\:text-gray-400,
          body.dark .dark\\:placeholder\\:text-gray-500 {
            background-color: var(--bg-primary) !important;
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
          }

          /* Стандартные классы фонов */
          body.dark .bg-white,
          body.dark .bg-gray-50,
          body.dark .bg-gray-100,
          body.dark .bg-gray-200,
          body.dark [class*="bg-white"],
          body.dark [class*="bg-gray"],
          body.dark [class*="TabsContent"] {
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
          }
          
          /* Карточки и контейнеры */
          body.dark .card,
          body.dark [class*="Card"],
          body.dark [class*="-card"],
          body.dark [data-card],
          body.dark [role="dialog"],
          body.dark header, 
          body.dark nav,
          body.dark [class*="Header"] {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
          }
          
          /* Таблицы */
          body.dark table,
          body.dark tbody,
          body.dark thead {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
          }
          
          body.dark tr {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
          }
          
          body.dark th, 
          body.dark td {
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
            background-color: var(--bg-secondary) !important;
          }
          
          /* Текстовые элементы и заголовки */
          body.dark h1, 
          body.dark h2, 
          body.dark h3, 
          body.dark h4, 
          body.dark h5, 
          body.dark h6, 
          body.dark [class*="Title"],
          body.dark .text-black,
          body.dark .dark\\:text-white {
            color: var(--text-primary) !important;
          }
          
          body.dark p, 
          body.dark span:not(.text-white):not(.text-black), 
          body.dark label,
          body.dark [class*="Description"],
          body.dark [class*="-text"],
          body.dark .text-gray-500,
          body.dark .text-gray-600,
          body.dark .text-gray-700 {
            color: var(--text-secondary) !important;
          }
          
          /* Формы и элементы ввода */
          body.dark input, 
          body.dark textarea, 
          body.dark select {
            background-color: var(--bg-primary) !important;
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
          }

          body.dark input::placeholder,
          body.dark textarea::placeholder,
          body.dark select::placeholder {
            color: var(--text-tertiary) !important;
          }
          
          /* Кнопки */
          body.dark button {
            border-color: var(--border-color) !important;
          }
          
          body.dark button[class*="outline"] {
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
            background-color: var(--bg-secondary) !important;
          }
          
          /* Бейджи */
          body.dark .badge, 
          body.dark [class*="Badge"] {
            background-color: var(--bg-secondary) !important;
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
          }
          
          /* Тени */
          body.dark [class*="shadow"] {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2) !important;
          }
          
          /* Tabs - вкладки */
          body.dark [role="tablist"] {
            background-color: var(--bg-secondary) !important;
          }
          
          body.dark [role="tab"] {
            color: var(--text-secondary) !important;
            background-color: transparent !important;
          }
          
          body.dark [role="tab"][data-state="active"] {
            background-color: var(--active-bg) !important;
            color: var(--text-primary) !important;
          }
          
          body.dark [role="tabpanel"] {
            background-color: var(--bg-primary) !important;
          }
          
          /* Ссылки */
          body.dark a {
            color: var(--accent-light) !important;
          }
          
          /* Модальные окна и диалоги */
          body.dark .DialogOverlay,
          body.dark [class*="DialogOverlay"],
          body.dark .fixed.inset-0.z-50.bg-black\\/50 {
            background-color: rgba(10, 25, 41, 0.7) !important;
          }
          
          body.dark .DialogContent,
          body.dark [class*="DialogContent"],
          body.dark [class*="Dialog"][class*="Content"] {
            background-color: var(--bg-secondary) !important;
            border-color: var(--border-color) !important;
          }
          
          body.dark .DialogTitle,
          body.dark [class*="DialogTitle"] {
            color: var(--text-primary) !important;
          }
          
          body.dark .DialogDescription,
          body.dark [class*="DialogDescription"] {
            color: var(--text-secondary) !important;
          }
          
          /* Акцентные цвета (голубой/синий) */
          body.dark .text-blue-500,
          body.dark .text-blue-600,
          body.dark .text-blue-700 {
            color: var(--accent-light) !important;
          }
          
          body.dark .bg-blue-500,
          body.dark .bg-blue-600 {
            background-color: var(--accent) !important;
          }
          
          body.dark .border-blue-500,
          body.dark .border-blue-600 {
            border-color: var(--accent) !important;
          }

          /* Активная вкладка в TabList */
          body.dark [data-state="active"] {
            background-color: var(--active-bg) !important;
          }

          /* ПРАВИЛА ДЛЯ HOVER-ЭФФЕКТОВ */
          
          /* Базовое правило для блокировки нежелательных эффектов */
          body.dark *:hover {
            box-shadow: none !important;
            text-decoration: none !important;
            transform: none !important;
            opacity: 1 !important;
            transition: none !important;
          }
          
          /* Отключаем все hover-эффекты для вложенных элементов */
          body.dark *:hover * {
            background-color: inherit !important;
            color: inherit !important;
            border-color: inherit !important;
          }
          
          /* Интерактивные элементы */
          body.dark button:hover:not(:disabled),
          body.dark [role="button"]:hover,
          body.dark [type="button"]:hover,
          body.dark [type="submit"]:hover,
          body.dark [class*="button"]:hover {
            background-color: var(--hover-bg) !important;
            color: var(--text-primary) !important;
          }
          
          /* Ссылки в навигации */
          body.dark nav a:hover,
          body.dark header a:hover,
          body.dark aside a:hover {
            background-color: var(--hover-bg) !important;
            color: var(--text-primary) !important;
          }
          
          /* Навигационные элементы */
          body.dark .nav-item:hover,
          body.dark [role="menuitem"]:hover {
            background-color: var(--hover-bg) !important;
          }
          
          /* Табличные строки */
          body.dark tr:hover {
            background-color: var(--hover-bg) !important;
          }
          
          /* Устанавливаем background-color для ячеек с помощью класса */
          body.dark tr.custom-hover-active > td {
            background-color: var(--hover-bg) !important;
          }

          /* Только прямые ссылки */
          body.dark a:hover > * {
            background-color: transparent !important;
          }
          
          /* Блокируем hover-эффекты для классов Tailwind */
          body.dark .hover\\:bg-gray-100:hover,
          body.dark .hover\\:bg-gray-200:hover,
          body.dark .hover\\:bg-gray-50:hover,
          body.dark .hover\\:text-gray-900:hover,
          body.dark .hover\\:text-gray-800:hover,
          body.dark .hover\\:border-gray-300:hover {
            background-color: var(--hover-bg) !important;
            color: var(--text-primary) !important;
            border-color: var(--border-color) !important;
          }
        `;
                const existingStyle = document.getElementById("custom-dark-theme-styles");
                if (existingStyle) {
                    existingStyle.remove();
                }
                document.head.appendChild(styleElement);
                // Принудительно устанавливаем фон страницы синим
                document.body.style.backgroundColor = darkBlueTheme.background;
                document.documentElement.style.backgroundColor = darkBlueTheme.background;
                // Перекрашиваем важные элементы
                const applyStyles = ()=>{
                    // Обрабатываем хедеры и карточки
                    document.querySelectorAll('header, [role="dialog"], .card, [class*="Card"]').forEach((el)=>{
                        if (el instanceof HTMLElement) {
                            el.style.backgroundColor = darkBlueTheme.cardBg;
                            el.style.borderColor = darkBlueTheme.border;
                        }
                    });
                    // Отдельно обрабатываем диалоги
                    document.querySelectorAll('.DialogContent, [class*="DialogContent"]').forEach((el)=>{
                        if (el instanceof HTMLElement) {
                            el.style.backgroundColor = darkBlueTheme.cardBg;
                            el.style.borderColor = darkBlueTheme.border;
                        }
                    });
                    // Переопределяем все серые фоны на синие
                    document.querySelectorAll('[class*="bg-gray"], .bg-gray-50, .bg-gray-100, .bg-gray-200, .bg-gray-300, .bg-gray-400, .bg-gray-500, .bg-gray-600, .bg-gray-700, .bg-gray-800, .bg-gray-900').forEach((el)=>{
                        if (el instanceof HTMLElement) {
                            el.style.backgroundColor = darkBlueTheme.background;
                        }
                    });
                    // Используем класс для hover-эффекта в таблицах
                    document.querySelectorAll("tr").forEach((row)=>{
                        // Удаляем предыдущие обработчики
                        const oldMouseEnter = row.onmouseenter;
                        const oldMouseLeave = row.onmouseleave;
                        if (oldMouseEnter) row.removeEventListener("mouseenter", oldMouseEnter);
                        if (oldMouseLeave) row.removeEventListener("mouseleave", oldMouseLeave);
                        // Добавляем новые обработчики
                        row.addEventListener("mouseenter", function() {
                            if (!document.documentElement.classList.contains("dark")) return;
                            this.classList.add("custom-hover-active");
                        });
                        row.addEventListener("mouseleave", function() {
                            if (!document.documentElement.classList.contains("dark")) return;
                            this.classList.remove("custom-hover-active");
                        });
                    });
                    // Принудительно удаляем все изображения с цветовыми переходами и фонами
                    document.querySelectorAll("div[style*='background-image'], div[style*='gradient']").forEach((el)=>{
                        if (el instanceof HTMLElement) {
                            if (el.style.backgroundImage && (el.style.backgroundImage.includes("linear-gradient") || el.style.backgroundImage.includes("radial-gradient"))) {
                                el.style.backgroundImage = "none";
                                el.style.backgroundColor = darkBlueTheme.background;
                            }
                        }
                    });
                };
                // Применяем стили сразу и через небольшие интервалы, чтобы поймать все элементы
                applyStyles();
                setTimeout(applyStyles, 50);
                setTimeout(applyStyles, 200);
                setTimeout(applyStyles, 500);
            } else {
                // Удаляем CSS-стили для темной темы
                const styleElement = document.getElementById("custom-dark-theme-styles");
                if (styleElement) {
                    styleElement.remove();
                }
                // Сбрасываем цвета фона
                document.body.style.backgroundColor = "";
                document.documentElement.style.backgroundColor = "";
                // Сбрасываем стили всех элементов
                document.querySelectorAll('[style*="background-color"], [style*="border-color"], .custom-hover-active').forEach((el)=>{
                    if (el instanceof HTMLElement) {
                        el.style.backgroundColor = "";
                        el.style.borderColor = "";
                        el.classList.remove("custom-hover-active");
                    }
                });
                // Удаляем обработчики событий для таблиц
                document.querySelectorAll("tr").forEach((row)=>{
                    const oldMouseEnter = row.onmouseenter;
                    const oldMouseLeave = row.onmouseleave;
                    if (oldMouseEnter) row.removeEventListener("mouseenter", oldMouseEnter);
                    if (oldMouseLeave) row.removeEventListener("mouseleave", oldMouseLeave);
                });
            }
        };
        // Запускаем применение темы сразу
        applyDarkModeStyles();
        // Наблюдаем за изменением класса темы
        const themeObserver = new MutationObserver((mutations)=>{
            mutations.forEach((mutation)=>{
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    applyDarkModeStyles();
                }
            });
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        });
        return ()=>{
            themeObserver.disconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        dangerouslySetInnerHTML: {
            __html: `
          (function() {
            try {
              const storageKey = 'theme';
              const theme = localStorage.getItem(storageKey);
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              
              // Если тема есть в localStorage, используем её
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.classList.add(theme);
                document.body.classList.add(theme);
                
                // Устанавливаем правильный фон сразу для темной темы
                if (theme === 'dark') {
                  document.body.style.backgroundColor = '#0a1929';
                  document.documentElement.style.backgroundColor = '#0a1929';
                }
                
                return;
              }
              
              // Иначе используем системную тему
              document.documentElement.classList.add(systemTheme);
              document.body.classList.add(systemTheme);
              
              // Устанавливаем правильный фон сразу для темной темы
              if (systemTheme === 'dark') {
                document.body.style.backgroundColor = '#0a1929';
                document.documentElement.style.backgroundColor = '#0a1929';
              }
            } catch (e) {
              console.error('Error setting theme:', e);
            }
          })();
        `
        }
    }, void 0, false, {
        fileName: "[project]/src/app/theme-script.tsx",
        lineNumber: 558,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/shared/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "breakpoints": (()=>breakpoints),
    "cn": (()=>cn),
    "isSmallDevice": (()=>isSmallDevice),
    "responsive": (()=>responsive)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const breakpoints = {
    xxs: 360,
    xs: 480,
    sm: 640,
    md: 768,
    sdl: 800,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
};
function responsive(base, responsive) {
    const classes = [
        base
    ];
    for (const [breakpoint, value] of Object.entries(responsive)){
        classes.push(`${breakpoint}:${value}`);
    }
    return classes.join(" ");
}
function isSmallDevice() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    "TURBOPACK unreachable";
}
}}),
"[project]/src/shared/ui/feedback/MobileScreenWarning.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileScreenWarning": (()=>MobileScreenWarning)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function MobileScreenWarning({ children, className, maxWidth = 360, message = "Для лучшего отображения поверните устройство или увеличьте размер окна", dismissible = true, persistent = false }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDismissed, setIsDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const storageKey = "mobile-warning-dismissed";
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // Определяем пути для которых нужно особое предупреждение
    const isNonAdaptivePath = pathname && (pathname.includes("/dashboard/teams") || pathname.includes("/dashboard/thesis"));
    // Проверяем, принадлежит ли путь к дашборду
    const isDashboardPath = pathname && pathname.startsWith("/dashboard");
    // Не показываем предупреждение для страниц дашборда, кроме страниц команды и дипломной работы
    const shouldShowWarning = !isDashboardPath || isNonAdaptivePath;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Проверяем, было ли предупреждение закрыто ранее
        if (!persistent && localStorage.getItem(storageKey) === "true") {
            setIsDismissed(true);
        }
        const checkWidth = ()=>{
            // Используем разные пороги для разных страниц
            const thresholdWidth = isNonAdaptivePath ? 800 : maxWidth;
            if (window.innerWidth <= thresholdWidth && !isDismissed && shouldShowWarning) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        // Проверяем ширину при монтировании
        checkWidth();
        // Добавляем слушатель изменения размера окна
        window.addEventListener("resize", checkWidth);
        return ()=>{
            window.removeEventListener("resize", checkWidth);
        };
    }, [
        maxWidth,
        isDismissed,
        persistent,
        isNonAdaptivePath,
        shouldShowWarning
    ]);
    const handleDismiss = ()=>{
        setIsDismissed(true);
        setIsVisible(false);
        // Если предупреждение не должно показываться снова, сохраняем это в localStorage
        if (!persistent) {
            localStorage.setItem(storageKey, "true");
        }
    };
    if (!isVisible) {
        return null;
    }
    // Разные сообщения для разных страниц
    const displayMessage = isNonAdaptivePath ? "Эта страница не полностью адаптирована для экранов меньше 800px. Для лучшего отображения используйте устройство с большим экраном." : message;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed bottom-0 left-0 right-0 z-50 p-3 bg-warning text-warning-foreground text-sm text-center shadow-md", "safe-area-bottom", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: displayMessage
                    }, void 0, false, {
                        fileName: "[project]/src/shared/ui/feedback/MobileScreenWarning.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    dismissible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDismiss,
                        className: "ml-2 p-1 rounded-full hover:bg-warning-foreground/10",
                        "aria-label": "Закрыть предупреждение",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/shared/ui/feedback/MobileScreenWarning.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/shared/ui/feedback/MobileScreenWarning.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/ui/feedback/MobileScreenWarning.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/ui/feedback/MobileScreenWarning.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e275f7d4._.js.map