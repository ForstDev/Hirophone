import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put } from "@vercel/blob";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

const USE_BLOB = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/**
 * Guarda la foto del producto y devuelve una URL pública. En Vercel
 * (BLOB_READ_WRITE_TOKEN presente) va a Vercel Blob, porque public/uploads
 * no sobrevive entre invocaciones de una función serverless. Local, sigue
 * escribiendo en public/uploads como antes. La extensión sale del MIME
 * olfateado, nunca del nombre del archivo subido, y el nombre guardado es un
 * hex aleatorio: nada de lo que envía el cliente llega al filesystem/URL
 * como ruta.
 */
export async function POST(request: Request) {
  if (!(await getSessionUser())) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No llegó ningún archivo" }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { ok: false, error: "Formato no admitido. Usa JPG, PNG, WEBP o AVIF." },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "El archivo supera los 6 MB" }, { status: 413 });
  }

  const name = crypto.randomBytes(16).toString("hex") + ext;

  if (USE_BLOB) {
    const blob = await put(`products/${name}`, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ ok: true, url: "/uploads/" + name });
}
