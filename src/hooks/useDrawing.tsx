import { useState, useEffect, useCallback } from "react";

export const useDrawing = (canvasId: string, color: string) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      if (isMouseDown) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [color, isMouseDown]
  );

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      const bounds = canvas.getBoundingClientRect();

      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        draw(ctx, x, y);
      }
    },
    [canvasId, draw]
  );

  const mouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const mouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (canvas) {
      canvas.addEventListener("mousemove", mouseMove);
      canvas.addEventListener("mousedown", mouseDown);
      canvas.addEventListener("mouseup", mouseUp);

      return () => {
        canvas.removeEventListener("mousemove", mouseMove);
        canvas.removeEventListener("mousedown", mouseDown);
        canvas.removeEventListener("mouseup", mouseUp);
      };
    }

    return () => {};
  }, [canvasId, color, mouseMove, mouseDown, mouseUp]);

  return null;
};
