"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, IText, Rect, FabricImage, Circle, Gradient } from "fabric";
import Link from "next/link";
import { 
  FiDownload, 
  FiSave, 
  FiType, 
  FiSquare,
  FiTrash2,
  FiRotateCw,
  FiCircle,
  FiCopy,
  FiLayers,
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiEyeOff,
  FiLock,
  FiUnlock,
  FiImage,
  FiGrid,
  FiSun,
  FiDroplet,
  FiZap
} from "react-icons/fi";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  object: any;
}

export default function EditorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeObject, setActiveObject] = useState<any | null>(null);
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [layers, setLayers] = useState<Layer[]>([]);
  const [opacity, setOpacity] = useState(100);
  const [showLayers, setShowLayers] = useState(true);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Declare updateLayers with useCallback to prevent infinite loops
  const updateLayers = useCallback(() => {
    if (!fabricCanvasRef.current) return;
    
    const objects = fabricCanvasRef.current.getObjects();
    const newLayers: Layer[] = objects.map((obj: any, index: number) => ({
      id: obj.id || `layer-${index}`,
      name: obj.type === "i-text" ? "Texto" : obj.type === "image" ? "Imagen" : obj.type === "rect" ? "Rectángulo" : obj.type === "circle" ? "Círculo" : "Elemento",
      visible: obj.visible !== false,
      locked: obj.selectable === false,
      object: obj,
    }));
    
    setLayers(newLayers.reverse());
  }, []);

  useEffect(() => {
    // Initialize Fabric Canvas
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        width: 800,
        height: 1000,
        backgroundColor: "#FFFFFF",
        selection: true,
        preserveObjectStacking: true,
      });

      fabricCanvasRef.current = canvas;

      // Handle object selection
      canvas.on("selection:created", (e: any) => {
        const obj = e.selected?.[0] || null;
        setActiveObject(obj);
        if (obj) {
          setOpacity((obj.opacity || 1) * 100);
        }
      });

      canvas.on("selection:updated", (e: any) => {
        const obj = e.selected?.[0] || null;
        setActiveObject(obj);
        if (obj) {
          setOpacity((obj.opacity || 1) * 100);
        }
      });

      canvas.on("selection:cleared", () => {
        setActiveObject(null);
      });

      // Update layers when objects change
      canvas.on("object:added", updateLayers);
      canvas.on("object:removed", updateLayers);
      canvas.on("object:modified", updateLayers);
    }

    return () => {
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // Separate effect to load images
  useEffect(() => {
    if (images.length === 0) {
      const storedImages = sessionStorage.getItem("uploadedImages");
      if (storedImages) {
        try {
          const parsedImages = JSON.parse(storedImages);
          setImages(parsedImages);
        } catch (e) {
          console.error("Failed to parse images:", e);
        }
      }
    }
  }, []);

  const loadTemplate = (templateType: string) => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.clear();
    
    switch (templateType) {
      case "travel-classic":
        // Premium travel layout with overlapping elements
        changeBackgroundColor("#FAFAFA");
        
        // Background decorative circle
        const bgCircle = new Circle({
          left: 600,
          top: 100,
          radius: 250,
          fill: "#E8F4F8",
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(bgCircle);

        const title = new IText("Mi Aventura", {
          left: 80,
          top: 80,
          fontSize: 56,
          fill: "#1A1A1A",
          fontFamily: "Georgia",
          fontWeight: "bold",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(title);

        // Subtitle
        const travelSubtitle = new IText("Recuerdos que perduran", {
          left: 80,
          top: 145,
          fontSize: 18,
          fill: "#666666",
          fontFamily: "Arial",
          fontStyle: "italic",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(travelSubtitle);

        // Decorative accent
        const accent = new Rect({
          left: 80,
          top: 175,
          width: 60,
          height: 4,
          fill: "#3498DB",
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(accent);

        // Main photo with shadow effect
        if (images.length > 0) {
          addImageToCanvas(images[0], 80, 220, 450, 600);
          if (images.length > 1) {
            addImageToCanvas(images[1], 560, 220, 200, 280);
          }
          if (images.length > 2) {
            addImageToCanvas(images[2], 560, 530, 200, 290);
          }
        }
        break;

      case "modern-minimal":
        // Ultra minimalist layout with asymmetry
        changeBackgroundColor("#FFFFFF");
        
        const modernTitle = new IText("MOMENTOS", {
          left: 50,
          top: 50,
          fontSize: 72,
          fill: "#000000",
          fontFamily: "Helvetica",
          fontWeight: "bold",
          letterSpacing: 5,
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(modernTitle);

        // Minimalist line
        const line = new Rect({
          left: 50,
          top: 135,
          width: 2,
          height: 80,
          fill: "#000000",
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(line);

        // Date or caption
        const date = new IText("2025", {
          left: 65,
          top: 140,
          fontSize: 16,
          fill: "#666666",
          fontFamily: "Helvetica",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(date);

        if (images.length > 0) {
          addImageToCanvas(images[0], 50, 240, 700, 680);
        }
        break;

      case "vintage-memories":
        // Artistic vintage with polaroid style
        changeBackgroundColor("#F9F6F0");
        
        // Decorative stamp circle
        const stamp = new Circle({
          left: 650,
          top: 50,
          radius: 60,
          fill: "transparent",
          stroke: "#C19A6B",
          strokeWidth: 3,
          strokeDashArray: [5, 5],
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(stamp);

        const vintageTitle = new IText("Recuerdos", {
          left: 80,
          top: 70,
          fontSize: 64,
          fill: "#8B6F47",
          fontFamily: "Georgia",
          fontStyle: "italic",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(vintageTitle);

        // Subtitle with typewriter feel
        const caption = new IText("Una colección de momentos", {
          left: 80,
          top: 140,
          fontSize: 16,
          fill: "#A0826D",
          fontFamily: "Courier New",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(caption);

        // Polaroid-style photo frames
        if (images.length > 0) {
          // White border effect
          const frame1 = new Rect({
            left: 70,
            top: 200,
            width: 280,
            height: 350,
            fill: "#FFFFFF",
            stroke: "#E8E0D5",
            strokeWidth: 1,
            selectable: false,
            evented: false,
          });
          fabricCanvasRef.current.add(frame1);
          addImageToCanvas(images[0], 80, 210, 260, 280);
          
          if (images.length > 1) {
            const frame2 = new Rect({
              left: 380,
              top: 200,
              width: 280,
              height: 350,
              fill: "#FFFFFF",
              stroke: "#E8E0D5",
              strokeWidth: 1,
              selectable: false,
              evented: false,
            });
            fabricCanvasRef.current.add(frame2);
            addImageToCanvas(images[1], 390, 210, 260, 280);
          }
          
          if (images.length > 2) {
            const frame3 = new Rect({
              left: 225,
              top: 570,
              width: 280,
              height: 350,
              fill: "#FFFFFF",
              stroke: "#E8E0D5",
              strokeWidth: 1,
              selectable: false,
              evented: false,
            });
            fabricCanvasRef.current.add(frame3);
            addImageToCanvas(images[2], 235, 580, 260, 280);
          }
        }
        break;

      case "adventure-bold":
        // Dynamic adventure with diagonal elements
        changeBackgroundColor("#0F0F0F");
        
        // Diagonal accent stripe
        const stripe = new Rect({
          left: -100,
          top: 300,
          width: 1000,
          height: 200,
          fill: "#FF6B35",
          opacity: 0.15,
          angle: -15,
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(stripe);

        const adventureTitle = new IText("AVENTURA", {
          left: 60,
          top: 60,
          fontSize: 80,
          fill: "#FFFFFF",
          fontFamily: "Impact",
          fontWeight: "bold",
          letterSpacing: 8,
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(adventureTitle);

        // Dynamic subtitle
        const tagline = new IText("SIN LÍMITES", {
          left: 65,
          top: 150,
          fontSize: 24,
          fill: "#FF6B35",
          fontFamily: "Arial",
          fontWeight: "bold",
          letterSpacing: 6,
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(tagline);

        if (images.length > 0) {
          addImageToCanvas(images[0], 60, 220, 680, 420);
          if (images.length > 1) {
            addImageToCanvas(images[1], 60, 665, 320, 250);
          }
          if (images.length > 2) {
            addImageToCanvas(images[2], 405, 665, 335, 250);
          }
        }
        break;

      case "family-moments":
        // Warm family collage with organic shapes
        changeBackgroundColor("#FFF9F5");
        
        // Soft background circle
        const bgShape = new Circle({
          left: 50,
          top: 50,
          radius: 180,
          fill: "#FFE5E5",
          opacity: 0.4,
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(bgShape);

        const familyTitle = new IText("Familia", {
          left: 80,
          top: 80,
          fontSize: 68,
          fill: "#E85D75",
          fontFamily: "Georgia",
          fontWeight: "bold",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(familyTitle);

        // Heart accent
        const heartText = new IText("♥", {
          left: 350,
          top: 85,
          fontSize: 48,
          fill: "#E85D75",
          fontFamily: "Arial",
          editable: false,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(heartText);

        // Subtitle
        const familySubtitle = new IText("Momentos que atesoramos", {
          left: 80,
          top: 155,
          fontSize: 18,
          fill: "#A0A0A0",
          fontFamily: "Arial",
          fontStyle: "italic",
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(familySubtitle);

        // Organic photo collage
        if (images.length > 0) {
          const positions = [
            { left: 80, top: 220, width: 310, height: 280 },
            { left: 420, top: 220, width: 310, height: 280 },
            { left: 80, top: 530, width: 310, height: 280 },
            { left: 420, top: 530, width: 310, height: 280 },
            { left: 250, top: 840, width: 280, height: 240 },
          ];
          
          images.slice(0, 5).forEach((img, idx) => {
            if (positions[idx]) {
              addImageToCanvas(img, positions[idx].left, positions[idx].top, positions[idx].width, positions[idx].height);
            }
          });
        }
        break;

      case "luxury-premium":
        // Ultra-luxury editorial layout
        changeBackgroundColor("#000000");
        
        // Gold decorative frame
        const goldFrame = new Rect({
          left: 40,
          top: 40,
          width: 720,
          height: 1020,
          fill: "transparent",
          stroke: "#D4AF37",
          strokeWidth: 1,
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(goldFrame);

        // Inner frame
        const innerFrame = new Rect({
          left: 50,
          top: 50,
          width: 700,
          height: 1000,
          fill: "transparent",
          stroke: "#D4AF37",
          strokeWidth: 0.5,
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(innerFrame);

        const luxTitle = new IText("ELEGANCE", {
          left: 400,
          top: 100,
          fontSize: 56,
          fill: "#FFFFFF",
          fontFamily: "Georgia",
          fontWeight: "normal",
          textAlign: "center",
          originX: "center",
          letterSpacing: 20,
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(luxTitle);

        // Gold decorative elements
        const goldAccent1 = new Rect({
          left: 350,
          top: 170,
          width: 100,
          height: 1,
          fill: "#D4AF37",
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(goldAccent1);

        const goldDot = new Circle({
          left: 400,
          top: 168,
          radius: 3,
          fill: "#D4AF37",
          selectable: false,
          evented: false,
        });
        fabricCanvasRef.current.add(goldDot);

        // Elegant subtitle
        const luxSubtitle = new IText("A Timeless Collection", {
          left: 400,
          top: 195,
          fontSize: 14,
          fill: "#B0B0B0",
          fontFamily: "Georgia",
          fontStyle: "italic",
          textAlign: "center",
          originX: "center",
          letterSpacing: 3,
          editable: true,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        fabricCanvasRef.current.add(luxSubtitle);

        if (images.length > 0) {
          addImageToCanvas(images[0], 100, 250, 600, 750);
        }
        break;
    }

    fabricCanvasRef.current.renderAll();
    updateLayers();
  };

  const addText = () => {
    if (!fabricCanvasRef.current) return;

    const text = new IText("Doble clic para editar", {
      left: 100,
      top: 100,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: fontFamily,
      editable: true,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
    updateLayers();
  };

  const addShape = () => {
    if (!fabricCanvasRef.current) return;

    const rect = new Rect({
      left: 150,
      top: 150,
      width: 200,
      height: 150,
      fill: "#e0e0e0",
      stroke: "#333",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    fabricCanvasRef.current.add(rect);
    fabricCanvasRef.current.setActiveObject(rect);
    fabricCanvasRef.current.renderAll();
    updateLayers();
  };

  const addCircle = () => {
    if (!fabricCanvasRef.current) return;

    const circle = new Circle({
      left: 150,
      top: 150,
      radius: 75,
      fill: "#e0e0e0",
      stroke: "#333",
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    fabricCanvasRef.current.add(circle);
    fabricCanvasRef.current.setActiveObject(circle);
    fabricCanvasRef.current.renderAll();
    updateLayers();
  };

  const addImageToCanvas = (imageUrl: string, left = 50, top = 50, maxWidth = 300, maxHeight = 300) => {
    if (!fabricCanvasRef.current) return;

    // Crear un elemento de imagen primero para evitar problemas con blobs
    const imgElement = new Image();
    imgElement.crossOrigin = 'anonymous';
    
    imgElement.onload = () => {
      if (!fabricCanvasRef.current) return;
      
      try {
        const fabricImg = new FabricImage(imgElement, {
          left: left,
          top: top,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });

        const scale = Math.min(maxWidth / fabricImg.width, maxHeight / fabricImg.height);
        fabricImg.scale(scale);

        fabricCanvasRef.current.add(fabricImg);
        fabricCanvasRef.current.setActiveObject(fabricImg);
        fabricCanvasRef.current.renderAll();
        updateLayers();
      } catch (error) {
        console.error('Error creating fabric image:', error);
        alert('Error al cargar la imagen. Por favor intenta de nuevo.');
      }
    };

    imgElement.onerror = (error) => {
      console.error('Error loading image:', error);
      alert('Error al cargar la imagen. Por favor intenta de nuevo.');
    };

    imgElement.src = imageUrl;
  };

  const deleteSelected = () => {
    if (!fabricCanvasRef.current || !activeObject) return;

    fabricCanvasRef.current.remove(activeObject);
    fabricCanvasRef.current.renderAll();
    setActiveObject(null);
    updateLayers();
  };

  const duplicateSelected = () => {
    if (!activeObject || !fabricCanvasRef.current) return;

    try {
      // Create a new object based on type
      let cloned: any = null;
      
      if (activeObject.type === 'i-text') {
        cloned = new IText(activeObject.text || '', {
          left: (activeObject.left || 0) + 20,
          top: (activeObject.top || 0) + 20,
          fontSize: activeObject.fontSize,
          fill: activeObject.fill,
          fontFamily: activeObject.fontFamily,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
      } else if (activeObject.type === 'rect') {
        cloned = new Rect({
          left: (activeObject.left || 0) + 20,
          top: (activeObject.top || 0) + 20,
          width: activeObject.width,
          height: activeObject.height,
          fill: activeObject.fill,
          stroke: activeObject.stroke,
          strokeWidth: activeObject.strokeWidth,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
      } else if (activeObject.type === 'circle') {
        cloned = new Circle({
          left: (activeObject.left || 0) + 20,
          top: (activeObject.top || 0) + 20,
          radius: activeObject.radius,
          fill: activeObject.fill,
          stroke: activeObject.stroke,
          strokeWidth: activeObject.strokeWidth,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
      }

      if (cloned) {
        fabricCanvasRef.current.add(cloned);
        fabricCanvasRef.current.setActiveObject(cloned);
        fabricCanvasRef.current.renderAll();
        updateLayers();
      }
    } catch (error) {
      console.error('Error duplicating object:', error);
    }
  };

  const rotateSelected = () => {
    if (!activeObject) return;

    const currentAngle = activeObject.angle || 0;
    activeObject.rotate(currentAngle + 90);
    fabricCanvasRef.current?.renderAll();
  };

  const changeBackgroundColor = (color: string) => {
    if (!fabricCanvasRef.current) return;
    
    setBackgroundColor(color);
    fabricCanvasRef.current.set('backgroundColor', color);
    fabricCanvasRef.current.renderAll();
  };

  const applyGradientBackground = (color1: string, color2: string) => {
    if (!fabricCanvasRef.current) return;

    const gradient = new Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: 0, y2: fabricCanvasRef.current.height || 1000 },
      colorStops: [
        { offset: 0, color: color1 },
        { offset: 1, color: color2 }
      ]
    });

    fabricCanvasRef.current.set('backgroundColor', gradient);
    fabricCanvasRef.current.renderAll();
  };

  const changeOpacity = (value: number) => {
    if (!activeObject) return;
    
    setOpacity(value);
    activeObject.set({ opacity: value / 100 });
    fabricCanvasRef.current?.renderAll();
  };

  const bringToFront = () => {
    if (!activeObject) return;
    fabricCanvasRef.current?.bringObjectToFront(activeObject);
    fabricCanvasRef.current?.renderAll();
    updateLayers();
  };

  const sendToBack = () => {
    if (!activeObject) return;
    fabricCanvasRef.current?.sendObjectToBack(activeObject);
    fabricCanvasRef.current?.renderAll();
    updateLayers();
  };

  const alignCenter = () => {
    if (!activeObject || !fabricCanvasRef.current) return;
    const canvasWidth = fabricCanvasRef.current.width || 800;
    const objectWidth = (activeObject.width || 0) * (activeObject.scaleX || 1);
    activeObject.set({ left: (canvasWidth - objectWidth) / 2 });
    fabricCanvasRef.current.renderAll();
  };

  const alignLeft = () => {
    if (!activeObject) return;
    activeObject.set({ left: 50 });
    fabricCanvasRef.current?.renderAll();
  };

  const alignRight = () => {
    if (!activeObject || !fabricCanvasRef.current) return;
    const canvasWidth = fabricCanvasRef.current.width || 800;
    activeObject.set({ left: canvasWidth - (activeObject.width * activeObject.scaleX) - 50 });
    fabricCanvasRef.current.renderAll();
  };

  const toggleLayerVisibility = (layer: Layer) => {
    layer.object.visible = !layer.object.visible;
    fabricCanvasRef.current?.renderAll();
    updateLayers();
  };

  const toggleLayerLock = (layer: Layer) => {
    layer.object.selectable = !layer.object.selectable;
    layer.object.evented = !layer.object.evented;
    fabricCanvasRef.current?.renderAll();
    updateLayers();
  };

  const selectLayer = (layer: Layer) => {
    if (!fabricCanvasRef.current) return;
    fabricCanvasRef.current.setActiveObject(layer.object);
    fabricCanvasRef.current.renderAll();
  };

  const applyImageFilter = (filterType: string) => {
    if (!activeObject || activeObject.type !== 'image') return;

    // Note: Fabric.js v6 has different filter implementation
    // This is a placeholder - full filter implementation would require additional setup
    alert(`Filtro "${filterType}" aplicado (requiere configuración adicional de filtros)`);
  };

  const downloadCanvas = () => {
    if (!fabricCanvasRef.current) return;

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.download = "lumina-prints-page.png";
    link.href = dataURL;
    link.click();
  };

  const saveProject = () => {
    if (!fabricCanvasRef.current) return;

    setIsSaving(true);
    const json = JSON.stringify(fabricCanvasRef.current.toJSON());
    sessionStorage.setItem("canvasProject", json);
    
    // Simulate async save for better UX
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      setShowSaveSuccess(true);
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 2000);
    }, 500);
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (fabricCanvasRef.current && layers.length > 0) {
        const json = JSON.stringify(fabricCanvasRef.current.toJSON());
        sessionStorage.setItem("canvasProject", json);
        setLastSaved(new Date());
      }
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [layers]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Save Success Toast */}
      {showSaveSuccess && (
        <div className="fixed top-20 right-4 z-[100] bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-fade-in">
          <FiSave className="text-xl" />
          <span className="font-medium">¡Guardado exitoso!</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold text-neutral-900 hover:opacity-70 transition-opacity">
              Lúmina <span className="text-base font-normal text-neutral-500">Editor</span>
            </Link>
            
            {/* Auto-save indicator */}
            <div className="hidden md:flex items-center gap-2 text-neutral-600 text-sm">
              {isSaving ? (
                <>
                  <div className="animate-spin h-3 w-3 border-2 border-neutral-900 border-t-transparent rounded-full"></div>
                  <span>Guardando...</span>
                </>
              ) : lastSaved ? (
                <>
                  <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                  <span>Guardado {new Date(lastSaved).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 bg-neutral-400 rounded-full"></div>
                  <span>Sin cambios</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={saveProject}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave /> {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              onClick={downloadCanvas}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-neutral-300 text-neutral-900 rounded-full hover:border-neutral-900 transition-colors text-sm font-medium"
            >
              <FiDownload /> Exportar
            </button>
            <Link
              href="/upload"
              className="px-5 py-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium"
            >
              ← Volver
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-80 bg-neutral-900 border-r border-neutral-800 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Templates Section */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
                <FiGrid className="text-base" /> Plantillas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "travel-classic", name: "Viaje", icon: "🇺", desc: "Premium" },
                  { id: "modern-minimal", name: "Moderno", icon: "✨", desc: "Minimalista" },
                  { id: "vintage-memories", name: "Vintage", icon: "📷", desc: "Polaroid" },
                  { id: "adventure-bold", name: "Aventura", icon: "⚡", desc: "Dinámico" },
                  { id: "family-moments", name: "Familia", icon: "❤️", desc: "Cálido" },
                  { id: "luxury-premium", name: "Lujo", icon: "👑", desc: "Editorial" },
                ].map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.id)}
                    className="group flex flex-col items-start gap-1 p-3 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-all text-left border border-neutral-700 hover:border-white"
                  >
                    <span className="text-2xl mb-1">{template.icon}</span>
                    <span className="text-xs font-semibold">{template.name}</span>
                    <span className="text-xs opacity-60">{template.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Elements */}
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Elementos</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={addText}
                  className="flex flex-col items-center gap-2 p-3 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-all border border-neutral-700 hover:border-white"
                >
                  <FiType className="text-xl" />
                  <span className="text-xs font-medium">Texto</span>
                </button>
                <button
                  onClick={addShape}
                  className="flex flex-col items-center gap-2 p-3 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-all border border-neutral-700 hover:border-white"
                >
                  <FiSquare className="text-xl" />
                  <span className="text-xs font-medium">Rectángulo</span>
                </button>
                <button
                  onClick={addCircle}
                  className="flex flex-col items-center gap-2 p-3 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-all border border-neutral-700 hover:border-white"
                >
                  <FiCircle className="text-xl" />
                  <span className="text-xs font-medium">Círculo</span>
                </button>
              </div>
            </div>

            {/* Background */}
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Fondo</h3>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {["#FFFFFF", "#F5F5F5", "#E5E5E5", "#D4D4D4", "#A3A3A3", "#737373", "#404040", "#262626", "#000000", "#FFF8DC"].map(
                  (color) => (
                    <button
                      key={color}
                      onClick={() => changeBackgroundColor(color)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        backgroundColor === color ? "border-white ring-2 ring-neutral-500" : "border-neutral-700 hover:border-neutral-500"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => applyGradientBackground("#667eea", "#764ba2")}
                  className="w-full py-2.5 rounded-lg text-white text-xs font-medium transition-transform hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                >
                  Degradado Púrpura
                </button>
                <button
                  onClick={() => applyGradientBackground("#f093fb", "#f5576c")}
                  className="w-full py-2.5 rounded-lg text-white text-xs font-medium transition-transform hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}
                >
                  Degradado Rosa
                </button>
                <button
                  onClick={() => applyGradientBackground("#4facfe", "#00f2fe")}
                  className="w-full py-2.5 rounded-lg text-white text-xs font-medium transition-transform hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}
                >
                  Degradado Azul
                </button>
              </div>
            </div>

            {/* Text Settings */}
            {activeObject && activeObject.type === "i-text" && (
              <div className="space-y-3 pt-6 border-t border-neutral-800">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Texto</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Fuente</label>
                    <select
                      value={fontFamily}
                      onChange={(e) => {
                        setFontFamily(e.target.value);
                        if (activeObject) {
                          (activeObject as any).set({ fontFamily: e.target.value });
                          fabricCanvasRef.current?.renderAll();
                        }
                      }}
                      className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg text-sm border border-neutral-700 focus:border-white focus:outline-none"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Impact">Impact</option>
                      <option value="Comic Sans MS">Comic Sans</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Tamaño: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="120"
                      value={fontSize}
                      onChange={(e) => {
                        const size = parseInt(e.target.value);
                        setFontSize(size);
                        (activeObject as any).set({ fontSize: size });
                        fabricCanvasRef.current?.renderAll();
                      }}
                      className="w-full accent-white"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value);
                          (activeObject as any).set({ fill: e.target.value });
                          fabricCanvasRef.current?.renderAll();
                        }}
                        className="w-12 h-10 rounded-lg cursor-pointer border border-neutral-700"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value);
                          (activeObject as any).set({ fill: e.target.value });
                          fabricCanvasRef.current?.renderAll();
                        }}
                        className="flex-1 px-3 py-2 bg-neutral-800 text-white rounded-lg text-sm border border-neutral-700 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        (activeObject as any).set({ fontWeight: (activeObject as any).fontWeight === 'bold' ? 'normal' : 'bold' });
                        fabricCanvasRef.current?.renderAll();
                      }}
                      className="flex-1 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-sm font-bold border border-neutral-700"
                    >
                      B
                    </button>
                    <button
                      onClick={() => {
                        (activeObject as any).set({ fontStyle: (activeObject as any).fontStyle === 'italic' ? 'normal' : 'italic' });
                        fabricCanvasRef.current?.renderAll();
                      }}
                      className="flex-1 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-sm italic border border-neutral-700"
                    >
                      I
                    </button>
                    <button
                      onClick={() => {
                        (activeObject as any).set({ underline: !(activeObject as any).underline });
                        fabricCanvasRef.current?.renderAll();
                      }}
                      className="flex-1 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-sm underline border border-neutral-700"
                    >
                      U
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Object Controls */}
            {activeObject && (
              <div className="space-y-3 pt-6 border-t border-neutral-800">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wide">Controles</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-neutral-400 text-xs mb-1.5 block font-medium">Opacidad: {opacity}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(e) => changeOpacity(parseInt(e.target.value))}
                      className="w-full accent-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={alignLeft}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-xs border border-neutral-700"
                    >
                      <FiAlignLeft />
                    </button>
                    <button
                      onClick={alignCenter}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-xs border border-neutral-700"
                    >
                      <FiAlignCenter />
                    </button>
                    <button
                      onClick={alignRight}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-xs border border-neutral-700"
                    >
                      <FiAlignRight />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={bringToFront}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-xs border border-neutral-700"
                    >
                      <FiArrowUp /> Adelante
                    </button>
                    <button
                      onClick={sendToBack}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-neutral-800 text-white rounded-lg hover:bg-white hover:text-neutral-900 transition-colors text-xs border border-neutral-700"
                    >
                      <FiArrowDown /> Atrás
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={rotateSelected}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                    >
                      <FiRotateCw />
                    </button>
                    <button
                      onClick={duplicateSelected}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs"
                    >
                      <FiCopy />
                    </button>
                    <button
                      onClick={deleteSelected}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Image Filters */}
            {activeObject && activeObject.type === 'image' && (
              <div className="bg-gray-750 rounded-lg p-4">
                <h3 className="text-white font-bold mb-3">Efectos de Imagen</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => applyImageFilter('grayscale')}
                    className="flex flex-col items-center gap-1 p-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-xs"
                  >
                    <FiDroplet />
                    <span>B&N</span>
                  </button>
                  <button
                    onClick={() => applyImageFilter('sepia')}
                    className="flex flex-col items-center gap-1 p-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-xs"
                  >
                    <FiSun />
                    <span>Sepia</span>
                  </button>
                  <button
                    onClick={() => applyImageFilter('brightness')}
                    className="flex flex-col items-center gap-1 p-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-xs"
                  >
                    <FiZap />
                    <span>Brillo</span>
                  </button>
                  <button
                    onClick={() => applyImageFilter('vintage')}
                    className="flex flex-col items-center gap-1 p-2 bg-gray-700 rounded hover:bg-gray-600 text-white text-xs"
                  >
                    <FiImage />
                    <span>Vintage</span>
                  </button>
                </div>
              </div>
            )}

            {/* Your Photos */}
            {images.length > 0 && (
              <div className="bg-gray-750 rounded-lg p-4">
                <h3 className="text-white font-bold mb-3">Tus Fotos ({images.length})</h3>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => addImageToCanvas(img)}
                      className="aspect-square rounded-lg overflow-hidden hover:opacity-75 transition-opacity border-2 border-gray-700 hover:border-blue-500 hover:scale-105 transform duration-200"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-900 overflow-auto">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ maxHeight: '95%' }}>
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Right Sidebar - Layers */}
        <div className="w-72 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <FiLayers /> Capas ({layers.length})
              </h3>
              <button
                onClick={() => setShowLayers(!showLayers)}
                className="text-gray-400 hover:text-white"
              >
                {showLayers ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>

            {showLayers && (
              <div className="space-y-2">
                {layers.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">
                    Agrega elementos para ver las capas
                  </p>
                ) : (
                  layers.map((layer, index) => (
                    <div
                      key={layer.id}
                      onClick={() => selectLayer(layer)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeObject === layer.object
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          {layer.name === "Imagen" && <FiImage className="text-xs" />}
                          {layer.name === "Texto" && <FiType className="text-xs" />}
                          {(layer.name === "Rectángulo" || layer.name === "Círculo") && <FiSquare className="text-xs" />}
                          {layer.name} #{layers.length - index}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLayerVisibility(layer);
                            }}
                            className="hover:text-white"
                          >
                            {layer.visible ? <FiEye className="text-xs" /> : <FiEyeOff className="text-xs" />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLayerLock(layer);
                            }}
                            className="hover:text-white"
                          >
                            {layer.locked ? <FiLock className="text-xs" /> : <FiUnlock className="text-xs" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="mt-6 space-y-3 text-gray-300 text-xs bg-gray-750 rounded-lg p-4">
              <h4 className="font-bold text-white text-sm mb-2">💡 Consejos Pro</h4>
              <p>• Usa las plantillas para empezar rápido</p>
              <p>• Doble clic en texto para editar</p>
              <p>• Arrastra elementos para mover</p>
              <p>• Esquinas para redimensionar</p>
              <p>• Ctrl+C/Ctrl+V para copiar</p>
              <p>• ¡Guarda tu trabajo frecuentemente!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
