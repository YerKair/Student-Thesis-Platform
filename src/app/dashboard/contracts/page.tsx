"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
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
  FileText,
  Download,
  AlertCircle,
  Loader2,
  FileCheck,
} from "lucide-react";
import { useToast } from "@/shared/ui/use-toast";
import { useContracts } from "@/features/contracts/hooks/use-contracts";
import { type ContractType } from "@/entities/contract/model/types";
import { SignatureManager } from "@/features/contracts/components/signature-manager";

// Статические типы договоров для отображения
const CONTRACT_TYPES = [
  { type: "internship", name: "Договор на практику" },
  { type: "diploma", name: "Договор на дипломную работу" },
  { type: "cooperation", name: "Договор о сотрудничестве" },
  { type: "research", name: "Договор на исследование" },
  { type: "consultation", name: "Договор на консультацию" },
] as const;

export default function ContractsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
  const [formData, setFormData] = useState({
    contract_type: "" as ContractType | "",
    student_name: "",
    student_group: "",
    teacher_name: "",
    topic: "",
    additional_info: {} as Record<string, any>,
  });

  const {
    contracts,
    templates,
    loading,
    error,
    createContract,
    downloadDocument,
    generateDocument,
  } = useContracts();

  const handleGenerateContract = async () => {
    if (
      !formData.contract_type ||
      !formData.student_name ||
      !formData.student_group ||
      !formData.teacher_name ||
      !formData.topic
    ) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const contractData = {
      contract_type: formData.contract_type as ContractType,
      student_name: formData.student_name,
      student_group: formData.student_group,
      teacher_name: formData.teacher_name,
      topic: formData.topic,
      additional_info: formData.additional_info,
    };

    const result = await createContract(contractData);

    if (result) {
      toast({
        title: "Успех",
        description: "Договор успешно создан!",
      });

      // Очищаем форму
      setFormData({
        contract_type: "",
        student_name: "",
        student_group: "",
        teacher_name: "",
        topic: "",
        additional_info: {},
      });

      // Переключаемся на вкладку просмотра
      setActiveTab("view");
    } else {
      toast({
        title: "Ошибка",
        description: error || "Ошибка при создании договора",
        variant: "destructive",
      });
    }
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
      // Если документ не сгенерирован, предлагаем его сгенерировать
      if (error instanceof Error && error.message.includes("не сгенерирован")) {
        toast({
          title: "Документ не найден",
          description: "Сначала сгенерируйте документ договора",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ошибка",
          description: "Ошибка при скачивании договора",
          variant: "destructive",
        });
      }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Договоры</h1>
          <p className="text-lg text-gray-600">
            Создавайте и управляйте договорами для вашей дипломной работы
          </p>
        </div>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border">
              <TabsTrigger
                value="create"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
              >
                Создать договор
              </TabsTrigger>
              <TabsTrigger
                value="view"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
              >
                Мои договоры
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Создание нового договора
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contract-type"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Тип договора *
                      </Label>
                      <Select
                        value={formData.contract_type}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            contract_type: value as ContractType,
                          })
                        }
                      >
                        <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 h-11">
                          <SelectValue placeholder="Выберите тип договора" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 shadow-lg">
                          {CONTRACT_TYPES.map((contractType) => (
                            <SelectItem
                              key={contractType.type}
                              value={contractType.type}
                              className="hover:bg-blue-50 focus:bg-blue-50 cursor-pointer py-3"
                            >
                              {contractType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="student-name"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Имя студента *
                      </Label>
                      <Input
                        id="student-name"
                        placeholder="Введите имя студента"
                        value={formData.student_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            student_name: e.target.value,
                          })
                        }
                        className="border-2 border-gray-200 focus:border-blue-500 h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="student-group"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Группа студента *
                      </Label>
                      <Input
                        id="student-group"
                        placeholder="Введите группу студента"
                        value={formData.student_group}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            student_group: e.target.value,
                          })
                        }
                        className="border-2 border-gray-200 focus:border-blue-500 h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="teacher-name"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Имя руководителя *
                      </Label>
                      <Input
                        id="teacher-name"
                        placeholder="Введите имя руководителя"
                        value={formData.teacher_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            teacher_name: e.target.value,
                          })
                        }
                        className="border-2 border-gray-200 focus:border-blue-500 h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="topic"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Тема работы *
                      </Label>
                      <Input
                        id="topic"
                        placeholder="Введите тему дипломной работы"
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData({ ...formData, topic: e.target.value })
                        }
                        className="border-2 border-gray-200 focus:border-blue-500 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="additional-info"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Дополнительная информация (необязательно)
                    </Label>
                    <Input
                      id="additional-info"
                      placeholder="Дополнительная информация о договоре"
                      value=""
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additional_info: { description: e.target.value },
                        })
                      }
                      className="border-2 border-gray-200 focus:border-blue-500 h-11"
                    />
                  </div>

                  <Button
                    onClick={handleGenerateContract}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Создание...
                      </>
                    ) : (
                      "Создать договор"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="view" className="space-y-6">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="text-xl">Созданные договоры</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {loading && (
                    <div className="text-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                      <p className="text-gray-600 font-medium">
                        Загрузка договоров...
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600 font-medium">
                        Ошибка: {error}
                      </p>
                    </div>
                  )}

                  {!loading && !error && contracts.length > 0 ? (
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
                            {contracts.map((contract) => (
                              <TableRow
                                key={contract.id}
                                className="hover:bg-blue-50 border-b border-gray-100"
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
                      <FileText className="h-20 w-20 text-gray-300 mb-6" />
                      <p className="text-center text-gray-600 text-lg font-medium mb-4">
                        У вас пока нет созданных договоров
                      </p>
                      <Button
                        onClick={() => setActiveTab("create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2"
                      >
                        Создать первый договор
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Компонент управления подписями */}
          <SignatureManager />
        </div>
      </div>
    </div>
  );
}
