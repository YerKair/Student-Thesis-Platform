"use client";

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import {
  ProfileUpdateRequest,
  PasswordChangeRequest,
  UserProfileResponse,
} from "@/entities/user/model/types";

export const useProfile = (token: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile =
    useCallback(async (): Promise<UserProfileResponse | null> => {
      if (!token) return null;

      try {
        setIsLoading(true);
        setError(null);
        const profile = await api.profile.getProfile(token);
        return profile;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Ошибка при получении профиля";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    }, [token]);

  const updateProfile = useCallback(
    async (data: ProfileUpdateRequest): Promise<UserProfileResponse | null> => {
      if (!token) return null;

      try {
        setIsLoading(true);
        setError(null);
        const updatedProfile = await api.profile.updateProfile(token, data);
        return updatedProfile;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Ошибка при обновлении профиля";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const changePassword = useCallback(
    async (data: PasswordChangeRequest): Promise<void> => {
      if (!token) return;

      try {
        setIsLoading(true);
        setError(null);
        await api.profile.changePassword(token, data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Ошибка при смене пароля";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    getProfile,
    updateProfile,
    changePassword,
    isLoading,
    error,
  };
};
