import { uniqueId } from "lodash";
import { Layer, useArtBoardContext } from "../contexts/artBoard";
import { useDrawing } from "../hooks/useDrawing";
import {
  Container,
  CanvasContainer,
  ConfigurationContainer,
  Canvas,
} from "./sc";

const ArtBoard = () => {
  const {
    layers,
    selectedLayer,
    setSelectedLayer,
    selectedColor,
    setSelectedColor,
    setLayers,
  } = useArtBoardContext();

  useDrawing(selectedLayer, selectedColor);

  return (
    <Container>
      <CanvasContainer>
        {layers.map((layer, index) => {
          return (
            <Canvas
              key={index}
              id={layer.id}
              width={480}
              height={480}
              selected={layer.id === selectedLayer}
              visibility={layer.visibility}
            />
          );
        })}
      </CanvasContainer>
      <ConfigurationContainer>
        <h2>
          Selected Layer: {layers.find((l) => l.id === selectedLayer)?.name}
        </h2>
        {layers.map((layer, index) => {
          return (
            <li key={index} onClick={() => setSelectedLayer(layer.id)}>
              {layer.name}
              <span
                onClick={() => {
                  // change layer visibility
                  const newLayers = layers.map((l) => {
                    if (l.id === layer.id) {
                      return {
                        ...l,
                        visibility: l.visibility === "show" ? "hide" : "show",
                      };
                    }
                    return l;
                  }) as Layer[];
                  setLayers(newLayers);
                }}
              >
                {layer.visibility}
              </span>
              <span
                onClick={() => {
                  // delete layer
                  const newLayers = layers.filter((l) => l.id !== layer.id);
                  setLayers(newLayers);
                }}
              >
                Delete
              </span>
            </li>
          );
        })}
        <button
          onClick={() => {
            const newLayerId = uniqueId();
            setLayers([
              ...layers,
              {
                name: "New Layer",
                id: newLayerId,
                visibility: "show",
              },
            ]);
            setSelectedLayer(newLayerId);
          }}
        >
          Add Layer
        </button>
        <h2>Color</h2>
        <input
          type="text"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
      </ConfigurationContainer>
    </Container>
  );
};

export default ArtBoard;
