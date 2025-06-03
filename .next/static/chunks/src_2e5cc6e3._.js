(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/features/auth/lib/use-auth.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Базовый URL API
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:8000";
// API сервис аутентификации
class AuthService {
    static async login(credentials) {
        try {
            console.log("Trying to login with credentials:", credentials.email);
            // Создаем FormData для OAuth2 password flow
            const formData = new URLSearchParams();
            formData.append("username", credentials.email);
            formData.append("password", credentials.password);
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            });
            if (!response.ok) {
                let errorText = await response.text();
                console.error("Login error response:", errorText, "Status:", response.status);
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new Error(errorJson.detail || "Ошибка при входе");
                } catch (parseError) {
                    throw new Error(errorText || `Ошибка сервера: ${response.status}`);
                }
            }
            const data = await response.json();
            console.log("Login successful, received data:", data);
            // Получаем информацию о пользователе
            const userResponse = await fetch(`${API_BASE_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            });
            if (!userResponse.ok) {
                throw new Error("Failed to fetch user profile");
            }
            const userData = await userResponse.json();
            console.log("User data:", userData);
            // Получаем полный профиль пользователя
            const profileResponse = await fetch(`${API_BASE_URL}/users/get-user-by-email?email=${userData.message.username}`, {
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            });
            if (!profileResponse.ok) {
                throw new Error("Failed to fetch user profile");
            }
            const profileData = await profileResponse.json();
            console.log("Profile data:", profileData);
            // Формируем профиль пользователя
            const userProfile = {
                id: profileData.id?.toString() || "1",
                name: profileData.fullname || credentials.email.split("@")[0],
                email: profileData.email || credentials.email,
                role: profileData.roles?.[0] || "student",
                isActive: true,
                createdAt: profileData.created_at || new Date().toISOString()
            };
            // Сохраняем токены в localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("authToken", data.access_token);
                localStorage.setItem("user", JSON.stringify(userProfile));
            }
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
            const registerData = {
                email: credentials.email,
                password: credentials.password,
                fullname: credentials.name
            };
            const registerResponse = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            });
            if (!registerResponse.ok) {
                let errorText = await registerResponse.text();
                console.error("Registration error response:", errorText);
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new Error(errorJson.detail || "Ошибка при регистрации");
                } catch (parseError) {
                    throw new Error(errorText || `Ошибка сервера: ${registerResponse.status}`);
                }
            }
            // После успешной регистрации выполняем вход
            return await AuthService.login({
                email: credentials.email,
                password: credentials.password
            });
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }
    static logout() {
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
        }
    }
    static isAuthenticated() {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return !!localStorage.getItem("authToken");
    }
    static getUser() {
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
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
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return localStorage.getItem("authToken");
    }
}
function useAuth() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [authState, setAuthState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        user: AuthService.getUser(),
        token: AuthService.getToken(),
        isAuthenticated: AuthService.isAuthenticated(),
        isLoading: false,
        error: null
    });
    const updateAuthState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[updateAuthState]": (newState, redirectTo)=>{
            setAuthState({
                "useAuth.useCallback[updateAuthState]": (prev)=>({
                        ...prev,
                        ...newState
                    })
            }["useAuth.useCallback[updateAuthState]"]);
            if (redirectTo) {
                router.push(redirectTo);
            }
        }
    }["useAuth.useCallback[updateAuthState]"], [
        router
    ]);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[login]": async (credentials)=>{
            try {
                updateAuthState({
                    isLoading: true,
                    error: null
                });
                const result = await AuthService.login(credentials);
                updateAuthState({
                    user: result.user,
                    token: result.token,
                    isAuthenticated: true,
                    isLoading: false,
                    error: null
                }, "/dashboard");
                return result;
            } catch (error) {
                console.error("Login error in hook:", error);
                updateAuthState({
                    error: error instanceof Error ? error.message : "Ошибка при входе",
                    isLoading: false
                });
                throw error;
            }
        }
    }["useAuth.useCallback[login]"], [
        updateAuthState
    ]);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[register]": async (credentials)=>{
            try {
                updateAuthState({
                    isLoading: true,
                    error: null
                });
                const result = await AuthService.register(credentials);
                updateAuthState({
                    user: result.user,
                    token: result.token,
                    isLoading: false,
                    isAuthenticated: true,
                    error: null
                }, "/dashboard");
                return result;
            } catch (error) {
                updateAuthState({
                    isLoading: false,
                    error: error instanceof Error ? error.message : "Ошибка при регистрации"
                });
                throw error;
            }
        }
    }["useAuth.useCallback[register]"], [
        updateAuthState
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[logout]": ()=>{
            AuthService.logout();
            updateAuthState({
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false,
                error: null
            }, "/auth/login");
        }
    }["useAuth.useCallback[logout]"], [
        updateAuthState
    ]);
    return {
        ...authState,
        login,
        register,
        logout
    };
}
_s(useAuth, "CtgfHUn/uPL8/YSNdB34gvgo5lk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/providers/auth-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider),
    "useAuthContext": (()=>useAuthContext)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$lib$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/lib/use-auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$lib$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: auth,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers/auth-provider.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "YuJWYXaKIY31b1y7U6yy3IXSxQA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$lib$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthProvider;
const useAuthContext = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
_s1(useAuthContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/shared/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "breakpoints": (()=>breakpoints),
    "cn": (()=>cn),
    "isSmallDevice": (()=>isSmallDevice),
    "responsive": (()=>responsive)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
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
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return window.innerWidth < breakpoints.sdl;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/shared/ui/feedback/MobileScreenWarning.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MobileScreenWarning": (()=>MobileScreenWarning)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function MobileScreenWarning({ children, className, maxWidth = 360, message = "Для лучшего отображения поверните устройство или увеличьте размер окна", dismissible = true, persistent = false }) {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDismissed, setIsDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const storageKey = "mobile-warning-dismissed";
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Определяем пути для которых нужно особое предупреждение
    const isNonAdaptivePath = pathname && (pathname.includes("/dashboard/teams") || pathname.includes("/dashboard/thesis"));
    // Проверяем, принадлежит ли путь к дашборду
    const isDashboardPath = pathname && pathname.startsWith("/dashboard");
    // Не показываем предупреждение для страниц дашборда, кроме страниц команды и дипломной работы
    const shouldShowWarning = !isDashboardPath || isNonAdaptivePath;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileScreenWarning.useEffect": ()=>{
            // Проверяем, было ли предупреждение закрыто ранее
            if (!persistent && localStorage.getItem(storageKey) === "true") {
                setIsDismissed(true);
            }
            const checkWidth = {
                "MobileScreenWarning.useEffect.checkWidth": ()=>{
                    // Используем разные пороги для разных страниц
                    const thresholdWidth = isNonAdaptivePath ? 800 : maxWidth;
                    if (window.innerWidth <= thresholdWidth && !isDismissed && shouldShowWarning) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                }
            }["MobileScreenWarning.useEffect.checkWidth"];
            // Проверяем ширину при монтировании
            checkWidth();
            // Добавляем слушатель изменения размера окна
            window.addEventListener("resize", checkWidth);
            return ({
                "MobileScreenWarning.useEffect": ()=>{
                    window.removeEventListener("resize", checkWidth);
                }
            })["MobileScreenWarning.useEffect"];
        }
    }["MobileScreenWarning.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed bottom-0 left-0 right-0 z-50 p-3 bg-warning text-warning-foreground text-sm text-center shadow-md", "safe-area-bottom", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: displayMessage
                    }, void 0, false, {
                        fileName: "[project]/src/shared/ui/feedback/MobileScreenWarning.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    dismissible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleDismiss,
                        className: "ml-2 p-1 rounded-full hover:bg-warning-foreground/10",
                        "aria-label": "Закрыть предупреждение",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
_s(MobileScreenWarning, "Ezko2iy8r/S+Pt0kd4TFw7P5DZw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileScreenWarning;
var _c;
__turbopack_context__.k.register(_c, "MobileScreenWarning");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_2e5cc6e3._.js.map