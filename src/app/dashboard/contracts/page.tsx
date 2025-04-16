"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

  const handleGenerateContract = () => {
    toast({
      title: "Запрос отправлен",
      description: "Ваш договор в процессе формирования",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Договоры</h1>
        <p className="text-muted-foreground">
          Управление договорами для вашей дипломной работы
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Создать договор</TabsTrigger>
          <TabsTrigger value="my-contracts">Мои договоры</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Выберите тип договора</option>
                  <option value="internship">
                    Договор о прохождении практики
                  </option>
                  <option value="diploma">Договор о дипломной работе</option>
                  <option value="cooperation">Договор о сотрудничестве</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-name">ФИО студента</Label>
                <Input id="student-name" placeholder="Иванов Иван Иванович" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-group">Группа</Label>
                <Input id="student-group" placeholder="Например: ИСП-405" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacher-name">ФИО преподавателя</Label>
                <Input id="teacher-name" placeholder="Петров Петр Петрович" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Тема дипломной работы</Label>
                <Input id="topic" placeholder="Введите тему дипломной работы" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateContract}>
                <FileText className="mr-2 h-4 w-4" />
                Сформировать договор
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="my-contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Мои договоры</CardTitle>
              <CardDescription>Список созданных вами договоров</CardDescription>
            </CardHeader>
            <CardContent>
              {contracts.length > 0 ? (
                <Table>
                  <TableCaption>Список ваших договоров</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
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
              ) : (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      У вас пока нет созданных договоров
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
