export type ContractType =
  | "internship"
  | "diploma"
  | "cooperation"
  | "research"
  | "consultation";

export type ContractStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export interface Contract {
  id: number;
  contract_type: ContractType;
  student_name: string;
  student_group: string;
  teacher_name: string;
  topic: string;
  status: ContractStatus;
  created_at: string;
  updated_at: string;
  user_id: number;
  file_path?: string;
  additional_info?: Record<string, any>;
}

export interface ContractCreate {
  contract_type: ContractType;
  student_name: string;
  student_group: string;
  teacher_name: string;
  topic: string;
  additional_info?: Record<string, any>;
}

export interface ContractUpdate {
  student_name?: string;
  student_group?: string;
  teacher_name?: string;
  topic?: string;
  status?: ContractStatus;
  additional_info?: Record<string, any>;
}

export interface ContractTemplate {
  type: ContractType;
  name: string;
  description: string;
}

export interface ContractDocument {
  contract_id: number;
  file_path: string;
  download_url: string;
}

export interface ContractsResponse {
  contracts: Contract[];
}

export interface TemplatesResponse {
  templates: ContractTemplate[];
}

export interface HealthResponse {
  status: string;
  templates_count: number;
  contracts_directory: string;
}
