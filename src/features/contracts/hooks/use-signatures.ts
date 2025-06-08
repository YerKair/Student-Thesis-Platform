"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/lib/use-auth";
import { ContractsService } from "../api/contracts-service";

interface Signature {
  id: number;
  user_id: number;
  signature_data: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface UseSignaturesReturn {
  signature: Signature | null;
  loading: boolean;
  error: string | null;
  createSignature: (signatureData: string) => Promise<boolean>;
  updateSignature: (signatureData: string) => Promise<boolean>;
  deleteSignature: () => Promise<boolean>;
  refreshSignature: () => Promise<void>;
}

export function useSignatures(): UseSignaturesReturn {
  const { token } = useAuth();
  const [signature, setSignature] = useState<Signature | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshSignature = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const signatureData = await ContractsService.getMySignature(token);
      setSignature(signatureData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch signature";
      setError(errorMessage);
      console.error("Error fetching signature:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createSignature = useCallback(
    async (signatureData: string): Promise<boolean> => {
      if (!token) {
        setError("Authentication required");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const newSignature = await ContractsService.createSignature(
          signatureData,
          token
        );
        setSignature(newSignature);
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create signature";
        setError(errorMessage);
        console.error("Error creating signature:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateSignature = useCallback(
    async (signatureData: string): Promise<boolean> => {
      if (!token) {
        setError("Authentication required");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const updatedSignature = await ContractsService.updateSignature(
          signatureData,
          token
        );
        setSignature(updatedSignature);
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update signature";
        setError(errorMessage);
        console.error("Error updating signature:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const deleteSignature = useCallback(async (): Promise<boolean> => {
    if (!token) {
      setError("Authentication required");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await ContractsService.deleteSignature(token);
      setSignature(null);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete signature";
      setError(errorMessage);
      console.error("Error deleting signature:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Load signature on mount
  useEffect(() => {
    if (token) {
      refreshSignature();
    }
  }, [token, refreshSignature]);

  return {
    signature,
    loading,
    error,
    createSignature,
    updateSignature,
    deleteSignature,
    refreshSignature,
  };
}
