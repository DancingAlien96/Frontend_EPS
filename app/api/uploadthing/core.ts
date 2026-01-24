import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const baseMiddleware = async () => {
  return { uploadedBy: 'admin-panel' };
};

export const uploadRouter = {
  logotipo: f({ image: { maxFileSize: '4MB' } })
    .middleware(baseMiddleware)
    .onUploadComplete(async ({ file, metadata }) => {
      console.log('✓ Logotipo subido', { url: file.url, metadata });
    }),
  catalogo: f({ 'application/pdf': { maxFileSize: '12MB' } })
    .middleware(baseMiddleware)
    .onUploadComplete(async ({ file, metadata }) => {
      console.log('✓ Catálogo subido', { url: file.url, metadata });
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;