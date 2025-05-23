module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
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
        console.log("Starting login process");
        try {
            const result = await AuthService.login(credentials);
            console.log("Login successful, updating auth state");
            setAuthState({
                user: result.user,
                token: result.token,
                isLoading: false,
                isAuthenticated: true
            });
            console.log("Auth state updated, returning result");
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

//# sourceMappingURL=%5Broot-of-the-server%5D__3df5ca44._.js.map