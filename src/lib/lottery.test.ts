import {
  evaluateNumber,
  generateSuggestedNumbers,
  getHistoryCheck,
  normalizeInput
} from "@/lib/lottery";

const makeRng = (seed: number) => () => {
  const next = (seed * 9301 + 49297) % 233280;
  seed = next;
  return next / 233280;
};

describe("lottery logic", () => {
  test("normalizes input", () => {
    expect(normalizeInput("12a-34")).toBe("1234");
    expect(normalizeInput("001234")).toBe("00123");
  });

  test("evaluates a central number", () => {
    const result = evaluateNumber("06584", { useHistory: false });
    expect(result).not.toBeNull();
    expect(result?.status).toBe("verde");
  });

  test("flags a non central number", () => {
    const result = evaluateNumber("29920", { useHistory: false });
    expect(result).not.toBeNull();
    expect(result?.status).toBe("amarillo");
  });

  test("rejects numbers outside the sum", () => {
    const result = evaluateNumber("00000", { useHistory: false });
    expect(result).not.toBeNull();
    expect(result?.status).toBe("rojo");
  });

  test("history check counts matches", () => {
    const result = getHistoryCheck([2, 9, 9, 2, 0]);
    expect(result.matches).toBe(3);
    expect(result.isIdeal).toBe(true);
  });

  test("generates five numbers", () => {
    const generated = generateSuggestedNumbers(5, { useHistory: true }, makeRng(42));
    expect(generated).toHaveLength(5);
    generated.forEach((item) => {
      expect(item.value).toMatch(/^\d{5}$/);
    });
  });
});
