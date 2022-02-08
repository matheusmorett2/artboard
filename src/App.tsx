import ArtBoard from './pages/artBoard';
import { ArtBoardContextProvider } from './contexts/artBoard';

function App() {
  return (
    <ArtBoardContextProvider>
      <ArtBoard />
    </ArtBoardContextProvider>
  );
}

export default App;
