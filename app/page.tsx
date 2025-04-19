// src/app/page.tsx
import NotionForm from "@/components/NotionForm";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Formulario para Notion
        </h1>
        <p className="text-gray-600">
          Completa el formulario para enviar datos a tu base de datos en Notion
        </p>
      </div>
      <NotionForm />
      <Toaster />
    </main>
  );
}