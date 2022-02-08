import { createContext, useContext, useState } from "react";
import { uniqueId } from "lodash";

export type Layer = {
  name: string;
  id: string;
  visibility: "show" | "hide";
};

type ArtBoardContextType = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  selectedLayer: string;
  setSelectedLayer: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
};

const layerFirstId = uniqueId();

const ArtBoardContext = createContext<ArtBoardContextType>({
  layers: [],
  setLayers: () => {},
  selectedLayer: "",
  setSelectedLayer: () => {},
  selectedColor: "",
  setSelectedColor: () => {},
});

type ArtBoardContextProviderType = {
  children: React.ReactNode;
};

export const ArtBoardContextProvider = ({
  children,
}: ArtBoardContextProviderType) => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayer, setSelectedLayer] = useState(layerFirstId);
  const [selectedColor, setSelectedColor] = useState("#7b2222");

  return (
    <ArtBoardContext.Provider
      value={{
        layers,
        setLayers,
        selectedLayer,
        setSelectedLayer,
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </ArtBoardContext.Provider>
  );
};

export const useArtBoardContext = () => useContext(ArtBoardContext);
