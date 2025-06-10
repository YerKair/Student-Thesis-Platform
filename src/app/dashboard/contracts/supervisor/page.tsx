"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import {
  Search,
  Download,
  AlertCircle,
  Loader2,
  FileCheck,
  X,
  PenTool,
} from "lucide-react";
import { useToast } from "@/shared/ui/use-toast";
import { useContracts } from "@/features/contracts/hooks/use-contracts";
import { type Contract } from "@/entities/contract/model/types";
import { SignatureManager } from "@/features/contracts/components/signature-manager";

// Статические типы договоров для отображения
const CONTRACT_TYPES = [
  { type: "internship", name: "Договор на практику" },
  { type: "diploma", name: "Договор на дипломную работу" },
  { type: "cooperation", name: "Договор о сотрудничестве" },
  { type: "research", name: "Договор на исследование" },
  { type: "consultation", name: "Договор на консультацию" },
] as const;

const CONTRACT_STATUSES = [
  { value: "draft", label: "Черновик" },
  { value: "pending", label: "Ожидает подписания" },
  { value: "approved", label: "Одобрен" },
  { value: "signed", label: "Подписан" },
  { value: "rejected", label: "Отклонен" },
  { value: "completed", label: "Завершен" },
] as const;

export default function SupervisorContractsPage() {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    student_name: "",
    teacher_name: "",
    user_email: "",
    status_filter: "all",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const appliedFiltersRef = useRef(appliedFilters);

  // Обновляем ref при изменении appliedFilters
  useEffect(() => {
    appliedFiltersRef.current = appliedFilters;
  }, [appliedFilters]);

  const {
    allContracts,
    loading,
    error,
    getAllContracts,
    downloadDocument,
    generateDocument,
    signContract,
  } = useContracts();

  const getAllContractsRef = useRef(getAllContracts);

  // Обновляем ref при изменении getAllContracts
  useEffect(() => {
    getAllContractsRef.current = getAllContracts;
  }, [getAllContracts]);

  const loadContracts = useCallback(
    async (customFilters?: typeof filters) => {
      const filtersToApply = customFilters || appliedFiltersRef.current;
      const cleanFilters = Object.fromEntries(
        Object.entries(filtersToApply).filter(([key, value]) => {
          // Убираем пустые значения и значение "all" для status_filter
          if (key === "status_filter" && value === "all") return false;
          return value !== "";
        })
      );
      await getAllContractsRef.current(cleanFilters);
    },
    [] // Убираем все зависимости, так как используем ref
  );

  useEffect(() => {
    // Загружаем все договоры при монтировании компонента
    loadContracts();
  }, [loadContracts]);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    loadContracts(filters);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      student_name: "",
      teacher_name: "",
      user_email: "",
      status_filter: "all",
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    loadContracts(emptyFilters);
  };

  const handleGenerateDocument = async (contractId: number) => {
    try {
      const downloadUrl = await generateDocument(contractId);
      if (downloadUrl) {
        toast({
          title: "Успех",
          description: "Документ договора сгенерирован!",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при генерации документа",
        variant: "destructive",
      });
    }
  };

  const handleDownloadContract = async (contractId: number) => {
    try {
      await downloadDocument(contractId);
      toast({
        title: "Успех",
        description: "Договор скачан!",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при скачивании договора",
        variant: "destructive",
      });
    }
  };

  const handleSignContract = async (contractId: number) => {
    try {
      const success = await signContract(contractId);
      if (success) {
        toast({
          title: "Успех",
          description: "Договор одобрен!",
        });
        // Обновляем список договоров
        loadContracts();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при одобрении договора",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            На рассмотрении
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Одобрен
          </Badge>
        );
      case "signed":
        return (
          <Badge
            variant="default"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Подписан
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 border-red-200"
          >
            Отклонен
          </Badge>
        );
      case "draft":
        return (
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-700 border-gray-200"
          >
            Черновик
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="default"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Завершен
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-700 border-gray-200"
          >
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU");
  };

  const getContractTypeName = (type: string) => {
    const contractType = CONTRACT_TYPES.find((ct) => ct.type === type);
    return contractType ? contractType.name : type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Управление договорами
          </h1>
          <p className="text-lg text-gray-600">
            Просмотр и управление всеми договорами в системе
          </p>
        </div>

        <div className="space-y-6">
          {/* Фильтры */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="text-xl flex items-center gap-2">
                <Search className="h-5 w-5" />
                Фильтры поиска
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="student-name"
                    className="text-sm font-semibold"
                  >
                    Имя студента
                  </Label>
                  <Input
                    id="student-name"
                    placeholder="Поиск по имени..."
                    value={filters.student_name}
                    onChange={(e) =>
                      setFilters({ ...filters, student_name: e.target.value })
                    }
                    className="border-2 border-gray-200 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="teacher-name"
                    className="text-sm font-semibold"
                  >
                    Имя преподавателя
                  </Label>
                  <Input
                    id="teacher-name"
                    placeholder="Поиск по имени..."
                    value={filters.teacher_name}
                    onChange={(e) =>
                      setFilters({ ...filters, teacher_name: e.target.value })
                    }
                    className="border-2 border-gray-200 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-sm font-semibold">
                    Email пользователя
                  </Label>
                  <Input
                    id="user-email"
                    placeholder="Поиск по email..."
                    value={filters.user_email}
                    onChange={(e) =>
                      setFilters({ ...filters, user_email: e.target.value })
                    }
                    className="border-2 border-gray-200 focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="status-filter"
                    className="text-sm font-semibold"
                  >
                    Статус договора
                  </Label>
                  <Select
                    value={filters.status_filter}
                    onValueChange={(value) =>
                      setFilters({ ...filters, status_filter: value })
                    }
                  >
                    <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500">
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      {CONTRACT_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleApplyFilters}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Применить фильтры
                </Button>
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                  className="border-2"
                  disabled={loading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Очистить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Список договоров */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="text-xl">
                Все договоры ({allContracts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading && (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
                  <p className="text-gray-600 font-medium">
                    Загрузка договоров...
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 font-medium">Ошибка: {error}</p>
                </div>
              )}

              {!loading && !error && allContracts.length > 0 ? (
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-gray-200 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                          <TableHead className="font-bold text-gray-900 py-4">
                            Тип договора
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Студент
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Группа
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Преподаватель
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Тема
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Статус
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Дата создания
                          </TableHead>
                          <TableHead className="font-bold text-gray-900 py-4">
                            Действия
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allContracts.map((contract) => (
                          <TableRow
                            key={contract.id}
                            className="hover:bg-purple-50 border-b border-gray-100"
                          >
                            <TableCell className="font-semibold text-gray-900 py-4">
                              {getContractTypeName(contract.contract_type)}
                            </TableCell>
                            <TableCell className="text-gray-700 py-4">
                              {contract.student_name}
                            </TableCell>
                            <TableCell className="text-gray-700 py-4">
                              {contract.student_group}
                            </TableCell>
                            <TableCell className="text-gray-700 py-4">
                              {contract.teacher_name}
                            </TableCell>
                            <TableCell
                              className="text-gray-700 py-4 max-w-xs truncate"
                              title={contract.topic}
                            >
                              {contract.topic}
                            </TableCell>
                            <TableCell className="py-4">
                              {getStatusBadge(contract.status)}
                            </TableCell>
                            <TableCell className="text-gray-700 py-4">
                              {formatDate(contract.created_at)}
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleGenerateDocument(contract.id)
                                  }
                                  disabled={loading}
                                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                                  title="Сгенерировать документ"
                                >
                                  <FileCheck className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDownloadContract(contract.id)
                                  }
                                  disabled={loading}
                                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                                  title="Скачать документ"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleSignContract(contract.id)
                                  }
                                  disabled={
                                    loading || contract.status === "approved"
                                  }
                                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                                  title={
                                    contract.status === "approved"
                                      ? "Договор уже одобрен"
                                      : "Одобрить договор"
                                  }
                                >
                                  <PenTool className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : !loading && !error ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <AlertCircle className="h-20 w-20 text-gray-300 mb-6" />
                  <p className="text-center text-gray-600 text-lg font-medium mb-4">
                    Договоры не найдены
                  </p>
                  <p className="text-center text-gray-500">
                    Попробуйте изменить фильтры поиска
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Компонент управления подписями */}
        <div className="mt-8">
          <SignatureManager />
        </div>
      </div>
    </div>
  );
}
