// Файл больше не используется - все анимации квазара удалены

"use client";

import { useState, useCallback, useEffect } from "react";

interface AuthAnimationsState {
  showQuasarExplosion: boolean;
  showDashboardLoading: boolean;
  isAnimationInProgress: boolean;
}

// Глобальное состояние для анимаций
let globalAnimationState: AuthAnimationsState = {
  showQuasarExplosion: false,
  showDashboardLoading: false,
  isAnimationInProgress: false,
};

let stateUpdaters: Array<(state: AuthAnimationsState) => void> = [];

const updateGlobalState = (newState: Partial<AuthAnimationsState>) => {
  globalAnimationState = { ...globalAnimationState, ...newState };
  stateUpdaters.forEach((updater) => updater(globalAnimationState));
};

export const useAuthAnimations = () => {
  const [animationState, setAnimationState] =
    useState<AuthAnimationsState>(globalAnimationState);

  // Подписываемся на глобальные обновления
  useEffect(() => {
    stateUpdaters.push(setAnimationState);
    return () => {
      stateUpdaters = stateUpdaters.filter(
        (updater) => updater !== setAnimationState
      );
    };
  }, []);

  const startAuthAnimations = useCallback(() => {
    console.log("🚀 Запуск анимаций авторизации");
    updateGlobalState({
      showQuasarExplosion: true,
      isAnimationInProgress: true,
    });
  }, []);

  const handleQuasarComplete = useCallback(() => {
    console.log("🌟 Квазар завершен, запуск загрузки dashboard");
    updateGlobalState({
      showQuasarExplosion: false,
      showDashboardLoading: true,
    });
  }, []);

  const handleDashboardLoadingComplete = useCallback(() => {
    console.log("📱 Загрузка dashboard завершена");
    updateGlobalState({
      showQuasarExplosion: false,
      showDashboardLoading: false,
      isAnimationInProgress: false,
    });
  }, []);

  const resetAnimations = useCallback(() => {
    updateGlobalState({
      showQuasarExplosion: false,
      showDashboardLoading: false,
      isAnimationInProgress: false,
    });
  }, []);

  return {
    ...animationState,
    startAuthAnimations,
    handleQuasarComplete,
    handleDashboardLoadingComplete,
    resetAnimations,
  };
};
