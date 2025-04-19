// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Inicializar el cliente de Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, mensaje } = await req.json();

    // Validar los datos de entrada
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Comprobar que tenemos el ID de la base de datos
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      console.error("No se ha configurado NOTION_DATABASE_ID");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    // Crear una nueva entrada en la base de datos de Notion
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Nombre: {
          title: [
            {
              text: {
                content: nombre,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Mensaje: {
          rich_text: [
            {
              text: {
                content: mensaje,
              },
            },
          ],
        },
        // Puedes añadir más propiedades según la estructura de tu base de datos
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al guardar en Notion:", error);
    return NextResponse.json(
      { error: "Error al guardar los datos" },
      { status: 500 }
    );
  }
}