import { describe, it, expect } from "vitest";
import {
  isValidCPF,
  formatCPF,
  isValidCNPJ,
  formatCNPJ,
  isValidCEP,
  formatCEP,
  formatPhone,
  formatBRL,
  parseBRL,
} from "./index";

describe("CPF", () => {
  it("valida CPF correto", () => {
    expect(isValidCPF("529.982.247-25")).toBe(true);
    expect(isValidCPF("52998224725")).toBe(true);
  });
  it("rejeita CPF inválido", () => {
    expect(isValidCPF("111.111.111-11")).toBe(false);
    expect(isValidCPF("123.456.789-00")).toBe(false);
    expect(isValidCPF("123")).toBe(false);
  });
  it("formata CPF", () => {
    expect(formatCPF("52998224725")).toBe("529.982.247-25");
  });
});

describe("CNPJ", () => {
  it("valida CNPJ correto", () => {
    expect(isValidCNPJ("11.222.333/0001-81")).toBe(true);
  });
  it("rejeita CNPJ inválido", () => {
    expect(isValidCNPJ("11.111.111/1111-11")).toBe(false);
    expect(isValidCNPJ("00")).toBe(false);
  });
  it("formata CNPJ", () => {
    expect(formatCNPJ("11222333000181")).toBe("11.222.333/0001-81");
  });
});

describe("CEP", () => {
  it("valida e formata CEP", () => {
    expect(isValidCEP("60000000")).toBe(true);
    expect(isValidCEP("600")).toBe(false);
    expect(formatCEP("60000000")).toBe("60000-000");
  });
});

describe("Telefone", () => {
  it("formata celular e fixo", () => {
    expect(formatPhone("85999998888")).toBe("(85) 99999-8888");
    expect(formatPhone("8533334444")).toBe("(85) 3333-4444");
  });
});

describe("Moeda", () => {
  it("formata e converte Real", () => {
    expect(formatBRL(1234.5)).toBe("R$ 1.234,50");
    expect(parseBRL("R$ 1.234,50")).toBe(1234.5);
  });
});
