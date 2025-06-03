import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTeams } from "../lib/use-teams";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useToast } from "@/shared/ui/use-toast";

const formSchema = z.object({
  code: z.string().min(6, "Код команды должен содержать минимум 6 символов"),
});

export function JoinTeamForm() {
  const { joinTeam } = useTeams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await joinTeam({ code: values.code });
      toast({
        title: "Успешно",
        description: "Вы присоединились к команде",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Команда не существует или код недействителен",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код команды</FormLabel>
              <FormControl>
                <Input
                  placeholder="Введите код команды"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Присоединение..." : "Присоединиться к команде"}
        </Button>
      </form>
    </Form>
  );
}
