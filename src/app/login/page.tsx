import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">RowMD</h1>
        <p className="text-muted-foreground">Markdown to PDF made simple.</p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
