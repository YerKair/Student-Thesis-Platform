"use client";

import { useState, useEffect } from "react";
import { ContractsService } from "@/features/contracts/api/contracts-service";

// Интерфейс для данных договора
interface ContractData {
  id: number;
  status: string;
  contract_type: string;
  student_name: string;
  teacher_name: string;
  topic: string;
  created_at: string;
}

// Интерфейс для статистики договоров
interface ContractsStats {
  total: number;
  pending: number;
  approved: number;
  signed: number;
  draft: number;
  rejected: number;
  hasContracts: boolean;
}

export function useContracts(token: string | null) {
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [stats, setStats] = useState<ContractsStats>({
    total: 0,
    pending: 0,
    approved: 0,
    signed: 0,
    draft: 0,
    rejected: 0,
    hasContracts: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContracts() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await ContractsService.getContracts(token);
        setContracts(data);

        // Подсчитываем статистику
        const total = data.length;
        const pending = data.filter(
          (contract: ContractData) => contract.status === "pending"
        ).length;
        const approved = data.filter(
          (contract: ContractData) => contract.status === "approved"
        ).length;
        const signed = data.filter(
          (contract: ContractData) => contract.status === "signed"
        ).length;
        const draft = data.filter(
          (contract: ContractData) => contract.status === "draft"
        ).length;
        const rejected = data.filter(
          (contract: ContractData) => contract.status === "rejected"
        ).length;

        setStats({
          total,
          pending,
          approved,
          signed,
          draft,
          rejected,
          hasContracts: total > 0,
        });
      } catch (err) {
        console.error("Error fetching contracts:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setStats({
          total: 0,
          pending: 0,
          approved: 0,
          signed: 0,
          draft: 0,
          rejected: 0,
          hasContracts: false,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchContracts();
  }, [token]);

  return {
    contracts,
    stats,
    isLoading,
    error,
    refetch: () => {
      if (token) {
        setIsLoading(true);
        ContractsService.getContracts(token)
          .then((data) => {
            setContracts(data);

            const total = data.length;
            const pending = data.filter(
              (contract: ContractData) => contract.status === "pending"
            ).length;
            const approved = data.filter(
              (contract: ContractData) => contract.status === "approved"
            ).length;
            const signed = data.filter(
              (contract: ContractData) => contract.status === "signed"
            ).length;
            const draft = data.filter(
              (contract: ContractData) => contract.status === "draft"
            ).length;
            const rejected = data.filter(
              (contract: ContractData) => contract.status === "rejected"
            ).length;

            setStats({
              total,
              pending,
              approved,
              signed,
              draft,
              rejected,
              hasContracts: total > 0,
            });
          })
          .catch((err) => {
            console.error("Error refetching contracts:", err);
            setError(err instanceof Error ? err.message : "Unknown error");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
  };
}
