"use client";

import { useCallback, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

function UploadPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("template") || "travel-classic";
  
  const [images, setImages] = useState<UploadedImage[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, [setImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".heic"],
    },
    multiple: true,
  });

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleContinue = () => {
    if (images.length === 0) {
      alert("Por favor sube al menos una foto");
      return;
    }
    
    // Store images in sessionStorage for the editor
    const imageData = images.map((img) => img.preview);
    sessionStorage.setItem("uploadedImages", JSON.stringify(imageData));
    sessionStorage.setItem("selectedTemplate", template);
    
    router.push("/editor");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold tracking-tight text-neutral-900 hover:opacity-70 transition-opacity">
            Lúmina
          </Link>
          <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Cambiar Plantilla
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
              <span>Plantilla</span>
            </div>
            <div className="w-16 h-1 bg-green-600"></div>
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
              <span>Sube Fotos</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">3</div>
              <span>Diseña</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sube Tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Fotos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Arrastra y suelta tus fotos o haz clic para seleccionar. <strong className="text-gray-900">Formato: JPG, PNG, HEIC</strong>
          </p>
          <div className="mt-4 inline-block bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-blue-600">
              📐 Plantilla: {template.replace("-", " ").toUpperCase()}
            </span>
          </div>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-3xl p-12 mb-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-6xl text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-xl text-blue-600 font-semibold">¡Suelta tus fotos aquí!</p>
          ) : (
            <>
              <p className="text-xl text-gray-700 font-semibold mb-2">
                Arrastra y suelta tus fotos aquí
              </p>
              <p className="text-gray-500">o haz clic para buscar tus archivos</p>
              <p className="text-sm text-gray-400 mt-4">
                Soporta: JPG, PNG, WEBP, HEIC
              </p>
            </>
          )}
        </div>

        {/* Upload Stats */}
        {images.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FiImage className="text-3xl text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{images.length} Fotos</p>
                  <p className="text-gray-600">Listas para crear tu fotolibro</p>
                </div>
              </div>
              <button
                onClick={() => setImages([])}
                className="px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Limpiar Todo
              </button>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={image.preview}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Continue Button */}
        {images.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Continuar al Editor
              <span className="text-2xl">→</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center"><div className="text-gray-600">Cargando...</div></div>}>
      <UploadPageContent />
    </Suspense>
  );
}
