import {
  Contract,
  ContractCreate,
  ContractUpdate,
  ContractTemplate,
  ContractDocument,
  ContractsResponse,
  TemplatesResponse,
  HealthResponse,
} from "@/entities/contract/model/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class ContractsService {
  static async getHealth(): Promise<HealthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/health/check`);

      if (!response.ok) {
        throw new Error("Failed to fetch health status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching health status:", error);
      throw error;
    }
  }

  static async getTemplates(token: string): Promise<ContractTemplate[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contracts/templates/available`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contract templates");
      }

      const data: ContractTemplate[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contract templates:", error);
      throw error;
    }
  }

  static async getContracts(token: string): Promise<Contract[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contracts");
      }

      const data: Contract[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contracts:", error);
      throw error;
    }
  }

  static async getContract(id: number, token: string): Promise<Contract> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contract");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching contract:", error);
      throw error;
    }
  }

  static async createContract(
    data: ContractCreate,
    token: string
  ): Promise<Contract> {
    try {
      console.log("Creating contract with data:", data);

      const response = await fetch(`${API_BASE_URL}/contracts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          errorData.detail ||
            `HTTP ${response.status}: Failed to create contract`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating contract:", error);
      throw error;
    }
  }

  static async updateContract(
    id: number,
    data: ContractUpdate,
    token: string
  ): Promise<Contract> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update contract");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating contract:", error);
      throw error;
    }
  }

  static async deleteContract(id: number, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete contract");
      }
    } catch (error) {
      console.error("Error deleting contract:", error);
      throw error;
    }
  }

  static async generateDocument(
    id: number,
    token: string
  ): Promise<ContractDocument> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate document");
      }

      return await response.json();
    } catch (error) {
      console.error("Error generating document:", error);
      throw error;
    }
  }

  static async downloadDocument(id: number, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to download document");
      }

      // Получаем blob для любого типа файла
      const blob = await response.blob();

      // Получаем имя файла из заголовков ответа или создаем по умолчанию
      const contentDisposition = response.headers.get("content-disposition");
      let filename = `contract_${id}.docx`; // По умолчанию .docx

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Очищаем ресурсы
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading document:", error);
      throw error;
    }
  }

  // Методы для работы с подписями
  static async createSignature(
    signatureData: string,
    token: string
  ): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/signatures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ signature_data: signatureData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create signature");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating signature:", error);
      throw error;
    }
  }

  static async getMySignature(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/signatures/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Подпись не найдена
        }
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get signature");
      }

      return await response.json();
    } catch (error) {
      console.error("Error getting signature:", error);
      throw error;
    }
  }

  static async updateSignature(
    signatureData: string,
    token: string
  ): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/signatures`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ signature_data: signatureData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update signature");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating signature:", error);
      throw error;
    }
  }

  static async deleteSignature(token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/signatures`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete signature");
      }
    } catch (error) {
      console.error("Error deleting signature:", error);
      throw error;
    }
  }

  // Метод для подписания контракта (изменение статуса на "signed")
  static async signContract(id: number, token: string): Promise<Contract> {
    try {
      const response = await fetch(`${API_BASE_URL}/contracts/${id}/sign`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to sign contract");
      }

      return await response.json();
    } catch (error) {
      console.error("Error signing contract:", error);
      throw error;
    }
  }
}
