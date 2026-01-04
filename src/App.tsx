import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { FavoritesProvider } from "@/lib/favorites-store";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { HomePage } from "@/pages/HomePage";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
