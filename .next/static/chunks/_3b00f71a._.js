(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/providers/theme-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider),
    "useTheme": (()=>useTheme)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Устанавливаем флаг, что мы на клиенте после монтирования
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setIsClient(true);
        }
    }["ThemeProvider.useEffect"], []);
    // Загрузка темы из localStorage при инициализации
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            // Проверяем сначала localStorage
            const storedTheme = localStorage.getItem("app-theme");
            // Если есть сохраненная тема, используем её
            if (storedTheme === "light" || storedTheme === "dark") {
                setTheme(storedTheme);
                document.documentElement.setAttribute("data-theme", storedTheme);
            } else if ("TURBOPACK compile-time truthy", 1) {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const defaultTheme = prefersDark ? "dark" : "light";
                setTheme(defaultTheme);
                document.documentElement.setAttribute("data-theme", defaultTheme);
            }
        }
    }["ThemeProvider.useEffect"], []);
    // При изменении темы обновляем атрибут на документе и сохраняем в localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
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
                    document.querySelectorAll('.card, [class*="Card"]').forEach({
                        "ThemeProvider.useEffect": (card)=>{
                            card.setAttribute("style", "background-color: #1e1e1e !important; border-color: #383838 !important;");
                        }
                    }["ThemeProvider.useEffect"]);
                    document.querySelectorAll("table").forEach({
                        "ThemeProvider.useEffect": (table)=>{
                            table.setAttribute("style", "background-color: #1e1e1e !important;");
                        }
                    }["ThemeProvider.useEffect"]);
                    document.querySelectorAll("tr").forEach({
                        "ThemeProvider.useEffect": (row)=>{
                            row.setAttribute("style", "border-color: #383838 !important; background-color: #1e1e1e !important;");
                        }
                    }["ThemeProvider.useEffect"]);
                    document.querySelectorAll("td, th").forEach({
                        "ThemeProvider.useEffect": (cell)=>{
                            cell.setAttribute("style", "color: #e5e7eb !important; border-color: #383838 !important; background-color: #1e1e1e !important;");
                        }
                    }["ThemeProvider.useEffect"]);
                    // Добавляем стили для специальных компонентов
                    document.querySelectorAll('.badge, [class*="Badge"]').forEach({
                        "ThemeProvider.useEffect": (badge)=>{
                            badge.setAttribute("style", "background-color: #2c2c2c !important; color: #e5e7eb !important; border-color: #383838 !important;");
                        }
                    }["ThemeProvider.useEffect"]);
                    // Добавляем стили для заголовков в карточках
                    document.querySelectorAll('[class*="CardTitle"]').forEach({
                        "ThemeProvider.useEffect": (title)=>{
                            title.setAttribute("style", "color: white !important;");
                        }
                    }["ThemeProvider.useEffect"]);
                    document.querySelectorAll('[class*="CardDescription"]').forEach({
                        "ThemeProvider.useEffect": (desc)=>{
                            desc.setAttribute("style", "color: #d1d5db !important;");
                        }
                    }["ThemeProvider.useEffect"]);
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
                    document.querySelectorAll('.card, [class*="Card"], table, tr, td, th, .badge, [class*="Badge"], [class*="CardTitle"], [class*="CardDescription"]').forEach({
                        "ThemeProvider.useEffect": (el)=>{
                            el.removeAttribute("style");
                        }
                    }["ThemeProvider.useEffect"]);
                    // Удаляем CSS-стили для темной темы
                    const styleElement = document.getElementById("custom-dark-theme-styles");
                    if (styleElement) {
                        styleElement.remove();
                    }
                }
            }
        }
    }["ThemeProvider.useEffect"], [
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
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
_s(ThemeProvider, "Y5DgxIi0DoXm4v/D+dBM+IObd/s=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/shared/ui/theme-toggle.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeToggle": (()=>ThemeToggle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/providers/theme-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ThemeToggle({ className }) {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-9 w-9 rounded-full flex items-center justify-center transition-all bg-gray-50 dark:bg-gray-50 text-gray-600 dark:text-gray-600", className),
        onClick: ()=>toggleTheme(),
        "aria-label": "Переключить тему",
        children: theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
            className: "h-[18px] w-[18px] text-amber-500 rotate-0 scale-100 transition-all"
        }, void 0, false, {
            fileName: "[project]/src/shared/ui/theme-toggle.tsx",
            lineNumber: 25,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
            className: "h-[18px] w-[18px] text-primary rotate-0 scale-100 transition-all"
        }, void 0, false, {
            fileName: "[project]/src/shared/ui/theme-toggle.tsx",
            lineNumber: 27,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/shared/ui/theme-toggle.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "Q4eAjrIZ0CuRuhycs6byifK2KBk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/shared/ui/theme-toggle.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/shared/ui/theme-toggle.tsx [app-client] (ecmascript)"));
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Moon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
            key: "a7tn18"
        }
    ]
];
const Moon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("moon", __iconNode);
;
 //# sourceMappingURL=moon.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Moon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.488.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Sun)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "4",
            key: "4exip2"
        }
    ],
    [
        "path",
        {
            d: "M12 2v2",
            key: "tus03m"
        }
    ],
    [
        "path",
        {
            d: "M12 20v2",
            key: "1lh1kg"
        }
    ],
    [
        "path",
        {
            d: "m4.93 4.93 1.41 1.41",
            key: "149t6j"
        }
    ],
    [
        "path",
        {
            d: "m17.66 17.66 1.41 1.41",
            key: "ptbguv"
        }
    ],
    [
        "path",
        {
            d: "M2 12h2",
            key: "1t8f8n"
        }
    ],
    [
        "path",
        {
            d: "M20 12h2",
            key: "1q8mjw"
        }
    ],
    [
        "path",
        {
            d: "m6.34 17.66-1.41 1.41",
            key: "1m8zz5"
        }
    ],
    [
        "path",
        {
            d: "m19.07 4.93-1.41 1.41",
            key: "1shlcs"
        }
    ]
];
const Sun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sun", __iconNode);
;
 //# sourceMappingURL=sun.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sun": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_3b00f71a._.js.map