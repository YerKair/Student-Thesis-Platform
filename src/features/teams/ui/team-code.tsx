import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useToast } from "@/shared/ui/use-toast";
import { Copy } from "lucide-react";

interface TeamCodeProps {
  code: string;
}

export function TeamCode({ code }: TeamCodeProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (!code) {
      toast({
        title: "Ошибка",
        description: "Код команды не найден",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(code);
    toast({
      title: "Код скопирован",
      description: "Теперь вы можете поделиться им с другими участниками",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Код команды</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          title="Скопировать код"
          disabled={!code}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{code || "Код не найден"}</div>
        <p className="text-xs text-muted-foreground">
          {code
            ? "Поделитесь этим кодом с теми, кого хотите пригласить в команду"
            : "Не удалось загрузить код команды"}
        </p>
      </CardContent>
    </Card>
  );
}
