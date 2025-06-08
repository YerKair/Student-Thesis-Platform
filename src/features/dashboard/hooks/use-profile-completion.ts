"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/features/auth/lib/use-profile";
import { UserProfileResponse } from "@/entities/user/model/types";

export const useProfileCompletion = (token: string | null) => {
  const { getProfile } = useProfile(token);
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profileData = await getProfile();
        if (profileData) {
          setProfile(profileData);

          // Расчет заполненности профиля
          const fields = [
            profileData.email, // всегда заполнен
            profileData.fullname,
            profileData.specialization,
            profileData.course,
            profileData.group,
          ];

          const filledFields = fields.filter(
            (field) => field && field.trim() !== ""
          ).length;
          const percentage = Math.round((filledFields / fields.length) * 100);
          setCompletionPercentage(percentage);
        }
      } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [token, getProfile]);

  return {
    profile,
    completionPercentage,
    isLoading,
    isComplete: completionPercentage >= 80, // считаем профиль заполненным если >= 80%
  };
};
