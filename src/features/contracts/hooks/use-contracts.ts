"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/lib/use-auth";
import { ContractsService } from "../api/contracts-service";
import {
  Contract,
  ContractCreate,
  ContractUpdate,
  ContractTemplate,
} from "@/entities/contract/model/types";

interface UseContractsReturn {
  contracts: Contract[];
  templates: ContractTemplate[];
  loading: boolean;
  error: string | null;
  createContract: (data: ContractCreate) => Promise<Contract | null>;
  updateContract: (
    id: number,
    data: ContractUpdate
  ) => Promise<Contract | null>;
  deleteContract: (id: number) => Promise<boolean>;
  generateDocument: (id: number) => Promise<string | null>;
  downloadDocument: (id: number) => Promise<void>;
  signContract: (id: number) => Promise<boolean>;
  refreshContracts: () => Promise<void>;
  refreshTemplates: () => Promise<void>;
  // Supervisor methods
  getAllContracts: (filters?: {
    student_name?: string;
    teacher_name?: string;
    user_email?: string;
    status_filter?: string;
  }) => Promise<Contract[]>;
  allContracts: Contract[];
  refreshAllContracts: (filters?: {
    student_name?: string;
    teacher_name?: string;
    user_email?: string;
    status_filter?: string;
  }) => Promise<void>;
}

export function useContracts(): UseContractsReturn {
  const { token, user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [allContracts, setAllContracts] = useState<Contract[]>([]);
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshContracts = useCallback(async () => {
    if (!token || !user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const contractsData = await ContractsService.getContracts(token);
      setContracts(contractsData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch contracts";
      setError(errorMessage);
      console.error("Error fetching contracts:", err);
    } finally {
      setLoading(false);
    }
  }, [token, user?.id]);

  const refreshTemplates = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const templatesData = await ContractsService.getTemplates(token);
      setTemplates(templatesData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch templates";
      setError(errorMessage);
      console.error("Error fetching templates:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createContract = useCallback(
    async (data: ContractCreate): Promise<Contract | null> => {
      if (!token) {
        setError("Authentication required");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const newContract = await ContractsService.createContract(data, token);
        setContracts((prev) => [...prev, newContract]);
        return newContract;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create contract";
        setError(errorMessage);
        console.error("Error creating contract:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateContract = useCallback(
    async (id: number, data: ContractUpdate): Promise<Contract | null> => {
      if (!token) {
        setError("Authentication required");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const updatedContract = await ContractsService.updateContract(
          id,
          data,
          token
        );
        setContracts((prev) =>
          prev.map((contract) =>
            contract.id === id ? updatedContract : contract
          )
        );
        return updatedContract;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update contract";
        setError(errorMessage);
        console.error("Error updating contract:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const deleteContract = useCallback(
    async (id: number): Promise<boolean> => {
      if (!token) {
        setError("Authentication required");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        await ContractsService.deleteContract(id, token);
        setContracts((prev) => prev.filter((contract) => contract.id !== id));
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete contract";
        setError(errorMessage);
        console.error("Error deleting contract:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const generateDocument = useCallback(
    async (id: number): Promise<string | null> => {
      if (!token) {
        setError("Authentication required");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const document = await ContractsService.generateDocument(id, token);
        return document.download_url;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to generate document";
        setError(errorMessage);
        console.error("Error generating document:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const downloadDocument = useCallback(
    async (id: number): Promise<void> => {
      if (!token) {
        setError("Authentication required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        await ContractsService.downloadDocument(id, token);
        // Скачивание теперь происходит внутри сервиса
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to download document";
        setError(errorMessage);
        console.error("Error downloading document:", err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const signContract = useCallback(
    async (id: number): Promise<boolean> => {
      if (!token) {
        setError("Authentication required");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        await ContractsService.signContract(id, token);
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to sign contract";
        setError(errorMessage);
        console.error("Error signing contract:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Load contracts and templates on mount - removed to prevent conflicts with supervisor page
  useEffect(() => {
    if (token) {
      refreshTemplates();
      // Load regular contracts only manually or for specific non-supervisor pages
      // refreshContracts();
    }
  }, [token, refreshTemplates]);

  // Supervisor methods
  const getAllContracts = useCallback(
    async (filters?: {
      student_name?: string;
      teacher_name?: string;
      user_email?: string;
      status_filter?: string;
    }) => {
      if (!token) {
        setError("Authentication required");
        return [];
      }

      setLoading(true);
      setError(null);

      try {
        const contractsData = await ContractsService.getAllContracts(
          token,
          filters
        );
        setAllContracts(contractsData);
        return contractsData;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch all contracts";
        setError(errorMessage);
        console.error("Error fetching all contracts:", err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const refreshAllContracts = useCallback(
    async (filters?: {
      student_name?: string;
      teacher_name?: string;
      user_email?: string;
      status_filter?: string;
    }) => {
      if (!token) {
        setError("Authentication required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const contractsData = await ContractsService.getAllContracts(
          token,
          filters
        );
        setAllContracts(contractsData);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to refresh all contracts";
        setError(errorMessage);
        console.error("Error refreshing all contracts:", err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    contracts,
    templates,
    loading,
    error,
    createContract,
    updateContract,
    deleteContract,
    generateDocument,
    downloadDocument,
    signContract,
    refreshContracts,
    refreshTemplates,
    // Supervisor methods
    getAllContracts,
    allContracts,
    refreshAllContracts,
  };
}
