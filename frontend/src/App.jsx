import { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function App() {
  return <Canvas />;
}

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Canvas = () => {
  const canvas = useRef(null);
  const [prediction, setPrediction] = useState();

  async function handleSubmit() {
    const imgBase64 = await canvas.current.exportImage("jpeg");
    const formData = new FormData();
    let file = null;
    await fetch(imgBase64)
      .then((res) => res.blob())
      .then((blob) => {
        file = new File([blob], "upload.jpg");
      });
    formData.append("file", file);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict-image/", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setPrediction(String(result.prediction));
    } catch (error) {
      console.error("Error:", error);
      alert("Failed!");
    }
  }

  return (
    <>
      <h1>Draw a digit</h1>
      <ReactSketchCanvas
        ref={canvas}
        style={styles}
        width="280px"
        height="280px"
        strokeWidth={20}
        strokeColor="black"
      />
      {prediction && <h3>Predicted value is: {prediction}</h3>}
      <button onClick={handleSubmit}>Submit</button>
      <button
        onClick={() => {
          canvas.current.resetCanvas();
        }}
      >
        Reset
      </button>
    </>
  );
};

export default App;
