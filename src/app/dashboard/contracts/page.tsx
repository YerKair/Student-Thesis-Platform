"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useToast } from "@/shared/ui/use-toast";
import { FileText, Download, Clock, CheckCircle2, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useState } from "react";

// Пример данных договоров (в реальности будут загружаться с сервера)
const contracts = [
  {
    id: "1",
    title: "Договор о прохождении практики",
    status: "signed",
    date: "10.03.2025",
  },
];

export default function ContractsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");

  const handleGenerateContract = () => {
    toast({
      title: "Запрос отправлен",
      description: "Ваш договор в процессе формирования",
    });
  };

  return (
    <div className="space-y-6 m-15">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Договоры
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Управление договорами для вашей дипломной работы
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <Tabs
          defaultValue="create"
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="create" className="flex-1 sm:flex-none">
                Создать договор
              </TabsTrigger>
              <TabsTrigger value="my-contracts" className="flex-1 sm:flex-none">
                Мои договоры
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="create" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Создание нового договора</CardTitle>
                <CardDescription>
                  Введите данные для генерации договора с ЭЦП
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contract-type">Тип договора</Label>
                  <select
                    id="contract-type"
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Выберите тип договора</option>
                    <option value="internship">
                      Договор о прохождении практики
                    </option>
                    <option value="diploma">Договор о дипломной работе</option>
                    <option value="cooperation">
                      Договор о сотрудничестве
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">ФИО студента</Label>
                    <Input
                      id="student-name"
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-group">Группа</Label>
                    <Input id="student-group" placeholder="Например: ИСП-405" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher-name">ФИО преподавателя</Label>
                  <Input id="teacher-name" placeholder="Петров Петр Петрович" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Тема дипломной работы</Label>
                  <Input
                    id="topic"
                    placeholder="Введите тему дипломной работы"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleGenerateContract}
                    className="w-full sm:w-auto"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Сформировать договор
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-contracts" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Мои договоры</CardTitle>
                <CardDescription>
                  Список созданных вами договоров
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contracts.length > 0 ? (
                  <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle px-6">
                      <Table>
                        <TableCaption>Список ваших договоров</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead className="text-right">
                              Действия
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contracts.map((contract) => (
                            <TableRow key={contract.id}>
                              <TableCell className="font-medium">
                                {contract.title}
                              </TableCell>
                              <TableCell>
                                {contract.status === "pending" ? (
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                                    <span>В обработке</span>
                                  </div>
                                ) : contract.status === "signed" ? (
                                  <div className="flex items-center">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    <span>Подписан</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <X className="mr-2 h-4 w-4 text-red-500" />
                                    <span>Отклонен</span>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>{contract.date}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-center text-gray-600">
                      У вас пока нет созданных договоров
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => setActiveTab("create")}
                    >
                      Создать договор
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
