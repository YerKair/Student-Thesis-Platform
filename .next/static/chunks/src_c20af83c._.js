(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/shared/ui/space-background.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SpaceBackground": (()=>SpaceBackground)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
// Улучшенная звезда с мерцанием и случайными вспышками
const Star = ({ delay = 0, size: initialSize = 2 })=>{
    const size = initialSize * (Math.random() * 0.5 + 0.8); // Небольшая вариация размера
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const twinkleDelay = Math.random() * 10;
    const hasFlare = Math.random() > 0.8;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute rounded-full bg-white",
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    opacity: 0
                },
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: [
                        0,
                        0.8,
                        0.4,
                        0.8,
                        0
                    ],
                    scale: [
                        1,
                        1.2,
                        1
                    ]
                },
                transition: {
                    duration: animationDuration,
                    repeat: Infinity,
                    delay: delay + twinkleDelay,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            hasFlare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute rounded-full bg-white",
                style: {
                    width: `${size * 1.5}px`,
                    height: `${size * 1.5}px`,
                    top: `${top}%`,
                    left: `${left}%`,
                    filter: "blur(1px)"
                },
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: [
                        0,
                        0.7,
                        0
                    ],
                    scale: [
                        1,
                        2.5,
                        1
                    ]
                },
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 15 + 10,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
};
_c = Star;
// Улучшенная падающая звезда с хвостом
const ShootingStar = ()=>{
    const top = Math.random() * 50;
    const left = Math.random() * 70;
    const angle = Math.random() * 45;
    const length = Math.random() * 100 + 50;
    const duration = Math.random() * 1 + 0.8;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute h-px bg-gradient-to-r from-transparent via-white to-transparent",
        style: {
            width: `${length}px`,
            top: `${top}%`,
            left: `${left}%`,
            transform: `rotate(${angle}deg)`,
            opacity: 0,
            filter: "blur(0.5px)"
        },
        initial: {
            opacity: 0,
            x: -50
        },
        animate: {
            opacity: [
                0,
                1,
                0
            ],
            x: 250
        },
        transition: {
            duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 15 + 5,
            ease: "easeInOut"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "absolute right-0 w-1.5 h-1.5 rounded-full bg-white",
            style: {
                boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.7)",
                marginRight: "-2px"
            }
        }, void 0, false, {
            fileName: "[project]/src/shared/ui/space-background.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
};
_c1 = ShootingStar;
// Улучшенная туманность с более сложной анимацией
const Nebula = ()=>{
    const colors = [
        "from-purple-500/10 via-indigo-400/5 to-blue-500/5",
        "from-blue-500/10 via-cyan-400/5 to-teal-500/5",
        "from-indigo-500/10 via-purple-400/5 to-pink-500/5",
        "from-pink-500/10 via-red-400/5 to-orange-500/5"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const top = Math.random() * 80;
    const left = Math.random() * 80;
    const size = Math.random() * 300 + 150;
    const rotationSpeed = Math.random() * 200 + 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: `absolute rounded-full bg-gradient-to-br ${randomColor} blur-2xl`,
        style: {
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity: 0.2,
            transformOrigin: "center"
        },
        initial: {
            opacity: 0,
            rotate: 0
        },
        animate: {
            opacity: [
                0.1,
                0.2,
                0.1
            ],
            rotate: 360,
            scale: [
                1,
                1.05,
                1
            ]
        },
        transition: {
            opacity: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            },
            rotate: {
                duration: rotationSpeed,
                repeat: Infinity,
                ease: "linear"
            },
            scale: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }, void 0, false, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
};
_c2 = Nebula;
// Планета с кольцами и лунами
const Planet = ()=>{
    const size = Math.random() * 60 + 40;
    const position = {
        top: Math.random() * 70 + 10,
        left: Math.random() * 70 + 15
    };
    const planetColors = [
        "bg-gradient-to-br from-blue-600 to-blue-900",
        "bg-gradient-to-br from-purple-600 to-indigo-900",
        "bg-gradient-to-br from-cyan-500 to-blue-800",
        "bg-gradient-to-br from-red-600 to-red-900"
    ];
    const randomColor = planetColors[Math.floor(Math.random() * planetColors.length)];
    const hasRings = Math.random() > 0.5;
    const hasMoons = Math.random() > 0.3;
    const moonCount = Math.floor(Math.random() * 2) + 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute",
        style: {
            width: `${size}px`,
            height: `${size}px`,
            top: `${position.top}%`,
            left: `${position.left}%`
        },
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 0.8
        },
        transition: {
            duration: 2
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: `w-full h-full rounded-full ${randomColor} relative shadow-lg`,
                style: {
                    boxShadow: "inset -5px -5px 25px rgba(0,0,0,0.3)"
                },
                animate: {
                    rotate: 360
                },
                transition: {
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 rounded-full overflow-hidden opacity-30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute w-1/2 h-1/4 bg-white/10 blur-md rounded-full",
                            style: {
                                top: "20%",
                                left: "10%",
                                transform: "rotate(30deg)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/shared/ui/space-background.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute w-1/3 h-1/5 bg-white/10 blur-md rounded-full",
                            style: {
                                top: "60%",
                                left: "60%",
                                transform: "rotate(-20deg)"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/shared/ui/space-background.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            hasRings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full",
                style: {
                    width: `${size * 1.8}px`,
                    height: `${size * 0.5}px`,
                    borderWidth: "2px",
                    transform: "translate(-50%, -50%) rotateX(75deg)"
                },
                animate: {
                    rotate: 360
                },
                transition: {
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear"
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this),
            hasMoons && Array.from({
                length: moonCount
            }).map((_, i)=>{
                const moonSize = size * 0.2;
                const orbitSize = size * (1.5 + i * 0.3);
                const moonSpeed = 20 + i * 10;
                const moonDelay = i * 2;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    style: {
                        width: `${orbitSize}px`,
                        height: `${orbitSize}px`
                    },
                    animate: {
                        rotate: 360
                    },
                    transition: {
                        duration: moonSpeed,
                        repeat: Infinity,
                        ease: "linear",
                        delay: moonDelay
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bg-gray-300 rounded-full shadow-inner",
                        style: {
                            width: `${moonSize}px`,
                            height: `${moonSize}px`,
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.5)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/shared/ui/space-background.tsx",
                        lineNumber: 267,
                        columnNumber: 15
                    }, this)
                }, i, false, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 250,
                    columnNumber: 13
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
};
_c3 = Planet;
// Космический корабль, пролетающий через сцену
const Spaceship = ()=>{
    const top = Math.random() * 70 + 15;
    const duration = Math.random() * 15 + 20;
    const size = Math.random() * 10 + 5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute",
        style: {
            top: `${top}%`,
            left: "-50px"
        },
        initial: {
            x: -100
        },
        animate: {
            x: "calc(100vw + 100px)"
        },
        transition: {
            duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 30 + 30,
            ease: "linear"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "relative",
            style: {
                width: `${size * 2}px`,
                height: `${size}px`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute w-full h-full bg-gray-200 rounded-full transform -skew-x-12"
                }, void 0, false, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 316,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bg-blue-400 rounded-full",
                    style: {
                        width: `${size * 0.6}px`,
                        height: `${size * 0.6}px`,
                        top: `${size * 0.2}px`,
                        left: `${size * 0.2}px`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute bg-gradient-to-l from-transparent via-orange-500 to-red-500",
                    style: {
                        width: `${size * 3}px`,
                        height: `${size * 0.3}px`,
                        top: `${size * 0.35}px`,
                        right: `${size * 0.8}px`,
                        borderRadius: "2px",
                        filter: "blur(2px)",
                        opacity: 0.7
                    },
                    animate: {
                        width: [
                            `${size * 2}px`,
                            `${size * 3}px`,
                            `${size * 2}px`
                        ],
                        opacity: [
                            0.5,
                            0.7,
                            0.5
                        ]
                    },
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 330,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/shared/ui/space-background.tsx",
            lineNumber: 308,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 292,
        columnNumber: 5
    }, this);
};
_c4 = Spaceship;
// Космическая пыль/частицы
const SpaceDust = ()=>{
    _s();
    const particles = 30;
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpaceDust.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Устанавливаем размеры canvas равными размерам окна
            const resizeCanvas = {
                "SpaceDust.useEffect.resizeCanvas": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["SpaceDust.useEffect.resizeCanvas"];
            resizeCanvas();
            window.addEventListener("resize", resizeCanvas);
            // Создаем частицы
            const particlesArray = [];
            for(let i = 0; i < particles; i++){
                particlesArray.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1 + 0.1,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
            // Анимируем частицы
            const animate = {
                "SpaceDust.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particlesArray.forEach({
                        "SpaceDust.useEffect.animate": (particle)=>{
                            // Обновляем позицию
                            particle.x += particle.speedX;
                            particle.y += particle.speedY;
                            // Возвращаем частицу в поле зрения, если она вышла за границы
                            if (particle.x < 0) particle.x = canvas.width;
                            if (particle.x > canvas.width) particle.x = 0;
                            if (particle.y < 0) particle.y = canvas.height;
                            if (particle.y > canvas.height) particle.y = 0;
                            // Рисуем частицу
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                            ctx.fill();
                        }
                    }["SpaceDust.useEffect.animate"]);
                    requestAnimationFrame(animate);
                }
            }["SpaceDust.useEffect.animate"];
            animate();
            return ({
                "SpaceDust.useEffect": ()=>{
                    window.removeEventListener("resize", resizeCanvas);
                }
            })["SpaceDust.useEffect"];
        }
    }["SpaceDust.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 z-0 pointer-events-none",
        style: {
            opacity: 0.7
        }
    }, void 0, false, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 431,
        columnNumber: 5
    }, this);
};
_s(SpaceDust, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c5 = SpaceDust;
// Wormhole effect - визуальный эффект космической воронки
const Wormhole = ()=>{
    _s1();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const size = 300; // Размер воронки
    const rings = 8; // Количество колец
    // Случайная позиция на экране
    const position = {
        top: Math.random() * 70 + 10,
        left: Math.random() * 70 + 15
    };
    // Активируем воронку с задержкой для драматического эффекта
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Wormhole.useEffect": ()=>{
            const timer = setTimeout({
                "Wormhole.useEffect.timer": ()=>{
                    setActive(true);
                }
            }["Wormhole.useEffect.timer"], Math.random() * 5000 + 2000);
            return ({
                "Wormhole.useEffect": ()=>clearTimeout(timer)
            })["Wormhole.useEffect"];
        }
    }["Wormhole.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "absolute",
        style: {
            width: `${size}px`,
            height: `${size}px`,
            top: `${position.top}%`,
            left: `${position.left}%`,
            perspective: "800px",
            transformStyle: "preserve-3d"
        },
        initial: {
            opacity: 0
        },
        animate: {
            opacity: active ? 0.8 : 0
        },
        transition: {
            duration: 3
        },
        children: [
            Array.from({
                length: rings
            }).map((_, i)=>{
                const ringSize = size * (1 - i / rings * 0.7);
                const rotationSpeed = 20 + i * 5;
                const depth = i * 30;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-1/2 left-1/2 rounded-full border",
                    style: {
                        width: `${ringSize}px`,
                        height: `${ringSize}px`,
                        borderWidth: "1px",
                        borderColor: `rgba(130, 170, 255, ${0.3 - i * 0.02})`,
                        boxShadow: `0 0 ${5 + i * 2}px rgba(130, 170, 255, ${0.2 - i * 0.01})`,
                        transform: `translate(-50%, -50%) translateZ(-${depth}px)`
                    },
                    animate: {
                        rotate: 360,
                        scale: [
                            1,
                            1.02,
                            1
                        ]
                    },
                    transition: {
                        rotate: {
                            duration: rotationSpeed,
                            repeat: Infinity,
                            ease: "linear"
                        },
                        scale: {
                            duration: 3 + i,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }
                    }
                }, i, false, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 482,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute top-1/2 left-1/2 rounded-full bg-blue-400",
                style: {
                    width: `${size * 0.15}px`,
                    height: `${size * 0.15}px`,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(5px)",
                    boxShadow: "0 0 20px 5px rgba(130, 170, 255, 0.7)"
                },
                animate: {
                    opacity: [
                        0.7,
                        1,
                        0.7
                    ],
                    scale: [
                        1,
                        1.2,
                        1
                    ]
                },
                transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 517,
                columnNumber: 7
            }, this),
            active && Array.from({
                length: 15
            }).map((_, i)=>{
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * size * 0.8 + size * 0.2;
                const particleSize = Math.random() * 3 + 1;
                const duration = Math.random() * 3 + 2;
                const delay = Math.random() * 5;
                const startX = Math.cos(angle) * distance;
                const startY = Math.sin(angle) * distance;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute top-1/2 left-1/2 rounded-full bg-white",
                    style: {
                        width: `${particleSize}px`,
                        height: `${particleSize}px`,
                        x: startX,
                        y: startY
                    },
                    animate: {
                        x: 0,
                        y: 0,
                        opacity: [
                            1,
                            0
                        ],
                        scale: [
                            1,
                            0.2
                        ]
                    },
                    transition: {
                        duration,
                        repeat: Infinity,
                        delay,
                        ease: "easeIn"
                    }
                }, `particle-${i}`, false, {
                    fileName: "[project]/src/shared/ui/space-background.tsx",
                    lineNumber: 551,
                    columnNumber: 13
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 461,
        columnNumber: 5
    }, this);
};
_s1(Wormhole, "bmG2JTygrN+PZT3BxK5E30OQ5KE=");
_c6 = Wormhole;
function SpaceBackground({ children }) {
    _s2();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stars, setStars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [shootingStars, setShootingStars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [nebulae, setNebulae] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [planets, setPlanets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wormholes, setWormholes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpaceBackground.useEffect": ()=>{
            setMounted(true);
            // Генерация звезд
            const newStars = Array.from({
                length: 100
            }, {
                "SpaceBackground.useEffect.newStars": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Star, {
                        delay: i * 0.05,
                        size: Math.random() * 2 + 1
                    }, `star-${i}`, false, {
                        fileName: "[project]/src/shared/ui/space-background.tsx",
                        lineNumber: 592,
                        columnNumber: 7
                    }, this)
            }["SpaceBackground.useEffect.newStars"]);
            setStars(newStars);
            // Генерация падающих звезд
            const newShootingStars = Array.from({
                length: 5
            }, {
                "SpaceBackground.useEffect.newShootingStars": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShootingStar, {}, `shooting-star-${i}`, false, {
                        fileName: "[project]/src/shared/ui/space-background.tsx",
                        lineNumber: 598,
                        columnNumber: 7
                    }, this)
            }["SpaceBackground.useEffect.newShootingStars"]);
            setShootingStars(newShootingStars);
            // Генерация туманностей
            const newNebulae = Array.from({
                length: 3
            }, {
                "SpaceBackground.useEffect.newNebulae": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Nebula, {}, `nebula-${i}`, false, {
                        fileName: "[project]/src/shared/ui/space-background.tsx",
                        lineNumber: 604,
                        columnNumber: 7
                    }, this)
            }["SpaceBackground.useEffect.newNebulae"]);
            setNebulae(newNebulae);
            // Генерация планет (с меньшей вероятностью)
            if (Math.random() > 0.5) {
                const newPlanets = Array.from({
                    length: 1
                }, {
                    "SpaceBackground.useEffect.newPlanets": (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Planet, {}, `planet-${i}`, false, {
                            fileName: "[project]/src/shared/ui/space-background.tsx",
                            lineNumber: 611,
                            columnNumber: 9
                        }, this)
                }["SpaceBackground.useEffect.newPlanets"]);
                setPlanets(newPlanets);
            }
            // Добавление воронки с некоторой вероятностью
            if (Math.random() > 0.7) {
                setWormholes([
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Wormhole, {}, "wormhole", false, {
                        fileName: "[project]/src/shared/ui/space-background.tsx",
                        lineNumber: 618,
                        columnNumber: 21
                    }, this)
                ]);
            }
        }
    }["SpaceBackground.useEffect"], []);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-blue-950/80 to-purple-950/90",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SpaceDust, {}, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 629,
                columnNumber: 7
            }, this),
            nebulae,
            stars,
            shootingStars,
            planets,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spaceship, {}, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 644,
                columnNumber: 7
            }, this),
            wormholes,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-radial from-transparent to-black/40 z-[1]"
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 650,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/shared/ui/space-background.tsx",
                lineNumber: 653,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/ui/space-background.tsx",
        lineNumber: 627,
        columnNumber: 5
    }, this);
}
_s2(SpaceBackground, "OeMFCepfpYrPy8rN4fXoAqiq2Bg=");
_c7 = SpaceBackground;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Star");
__turbopack_context__.k.register(_c1, "ShootingStar");
__turbopack_context__.k.register(_c2, "Nebula");
__turbopack_context__.k.register(_c3, "Planet");
__turbopack_context__.k.register(_c4, "Spaceship");
__turbopack_context__.k.register(_c5, "SpaceDust");
__turbopack_context__.k.register(_c6, "Wormhole");
__turbopack_context__.k.register(_c7, "SpaceBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/shared/ui/space-dust.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SpaceDust": (()=>SpaceDust)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function SpaceDust({ particleCount = 50, color = "#ffffff", speed = 0.5, opacity = 0.3 }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SpaceDust.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            // Массив частиц
            const particles = [];
            // Настройка размера холста
            const resizeCanvas = {
                "SpaceDust.useEffect.resizeCanvas": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    // Пересоздаем частицы при изменении размера
                    createParticles();
                }
            }["SpaceDust.useEffect.resizeCanvas"];
            // Создание частиц
            const createParticles = {
                "SpaceDust.useEffect.createParticles": ()=>{
                    particles.length = 0;
                    for(let i = 0; i < particleCount; i++){
                        particles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            size: Math.random() * 2 + 0.5,
                            speedX: (Math.random() - 0.5) * speed,
                            speedY: (Math.random() - 0.5) * speed,
                            opacity: Math.random() * opacity
                        });
                    }
                }
            }["SpaceDust.useEffect.createParticles"];
            // Анимация частиц
            const animate = {
                "SpaceDust.useEffect.animate": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particles.forEach({
                        "SpaceDust.useEffect.animate": (particle)=>{
                            // Обновление позиции
                            particle.x += particle.speedX;
                            particle.y += particle.speedY;
                            // Возвращаем частицы в поле зрения, если они вышли за пределы
                            if (particle.x < 0) particle.x = canvas.width;
                            if (particle.x > canvas.width) particle.x = 0;
                            if (particle.y < 0) particle.y = canvas.height;
                            if (particle.y > canvas.height) particle.y = 0;
                            // Рисуем частицу
                            ctx.beginPath();
                            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                            ctx.fillStyle = color.replace(")", `, ${particle.opacity})`).replace("rgb", "rgba");
                            ctx.fill();
                        }
                    }["SpaceDust.useEffect.animate"]);
                    requestAnimationFrame(animate);
                }
            }["SpaceDust.useEffect.animate"];
            // Инициализация
            window.addEventListener("resize", resizeCanvas);
            resizeCanvas();
            animate();
            return ({
                "SpaceDust.useEffect": ()=>{
                    window.removeEventListener("resize", resizeCanvas);
                }
            })["SpaceDust.useEffect"];
        }
    }["SpaceDust.useEffect"], [
        particleCount,
        color,
        speed,
        opacity
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 z-0 pointer-events-none",
        style: {
            opacity: 0.7
        }
    }, void 0, false, {
        fileName: "[project]/src/shared/ui/space-dust.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(SpaceDust, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = SpaceDust;
var _c;
__turbopack_context__.k.register(_c, "SpaceDust");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/auth/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AuthLayout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$ui$2f$space$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/ui/space-background.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$ui$2f$space$2d$dust$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/ui/space-dust.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function AuthLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 relative overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$ui$2f$space$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpaceBackground"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$ui$2f$space$2d$dust$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpaceDust"], {
                    particleCount: 70,
                    color: "#8eb4ff",
                    speed: 0.3,
                    opacity: 0.4
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/layout.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/app/auth/layout.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/auth/layout.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/auth/layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = AuthLayout;
var _c;
__turbopack_context__.k.register(_c, "AuthLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_c20af83c._.js.map