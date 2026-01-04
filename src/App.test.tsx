import { fireEvent, render, screen } from "@testing-library/react";
import App from "@/App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("shows evaluation for a valid number", () => {
    render(<App />);
    const input = screen.getByLabelText(/Tu número de 5 cifras/i);
    fireEvent.change(input, { target: { value: "06584" } });

    expect(
      screen.getByText(/Perfecto: cumple todas las premisas activas/i)
    ).toBeInTheDocument();
  });

  test("generates five numbers", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /Generar ahora/i });
    fireEvent.click(button);

    const numbers = screen.getAllByText(/^\d{5}$/);
    expect(numbers.length).toBeGreaterThan(0);
  });

  test("adds and removes favorites", () => {
    render(<App />);
    const input = screen.getByLabelText(/Tu número de 5 cifras/i);
    fireEvent.change(input, { target: { value: "06584" } });

    const saveButton = screen.getByRole("button", { name: /Guardar en favoritos/i });
    fireEvent.click(saveButton);

    const favoritesLink = screen.getByRole("link", { name: /Favoritos/i });
    fireEvent.click(favoritesLink);

    expect(screen.getByText("06584")).toBeInTheDocument();

    const removeButton = screen.getByRole("button", { name: /Eliminar 06584/i });
    fireEvent.click(removeButton);

    expect(screen.queryByText("06584")).not.toBeInTheDocument();
  });
});
