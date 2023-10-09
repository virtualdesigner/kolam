import {
  useRef,
  useState,
} from "react";

import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prevPoint, setPrevPoint] = useState<number[]>([]);

  const getCurrentPosition = (canvasEle: any): number[] => {
    let bounds = canvasEle.target.getBoundingClientRect();
    let x = canvasEle.clientX - bounds.left;
    let y = canvasEle.clientY - bounds.top;
    x /= bounds.width;
    y /= bounds.height;
    x *= canvasEle.target.width;
    y *= canvasEle.target.height;
    x += -2;
    y += -2;
    return [x, y];
  }

  const onMouseHover = (e: any) => {
    const [x, y] = getCurrentPosition(e);

    if (mouseCanvasRef.current) {
      const ctx = mouseCanvasRef.current.getContext("2d");
      if (ctx === null) {
        return;
      }
      // draw the guiding pointer near the mouse
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 3 * Math.PI);
      ctx.strokeStyle = "#0b99ff";
      ctx.lineWidth = 3;
      ctx.fillStyle = "white";
      ctx.stroke();
      ctx.fill();
    }
  };

  const handleClick = (e: any) => {
    const [x, y] = getCurrentPosition(e);
  
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx === null) {
        return;
      }

      setPrevPoint([x, y]);
      let [prevX, prevY] = prevPoint;
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 3 * Math.PI);
      ctx.strokeStyle = "#0b99ff";
      ctx.lineWidth = 3;
      ctx.fillStyle = "white";
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleHover = (e: any) => {
    if (mouseCanvasRef.current) {
      const ctx = mouseCanvasRef.current.getContext("2d");
      if (ctx === null) {
        return;
      }
      ctx.beginPath();
      ctx.clearRect(0, 0, 1024, 1024);
      onMouseHover(e);

      const [x, y] = getCurrentPosition(e);
      let [prevX, prevY] = prevPoint;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  return (
    <div className="container">
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* To contain the actual points and the line */}
        <canvas
          ref={canvasRef}
          height={1024}
          width={1024}
          style={{
            height: "500px",
            width: "500px",
            background: "#d9d9d9",
            position: "absolute",
          }}
        />
        {/* To contain the guiding line while the mouse is hovering */}
        <canvas
          ref={mouseCanvasRef}
          onMouseMove={handleHover}
          onClick={handleClick}
          height={1024}
          width={1024}
          style={{
            height: "500px",
            width: "500px",
            background: "transparent",
            position: "absolute",
          }}
        />
      </div>
    </div>
  );
}

export default App;
