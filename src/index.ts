/**
 * br-utils — utilitários para validação e formatação de dados brasileiros.
 *
 * Feito para facilitar o dia a dia de quem constrói sistemas no Brasil:
 * CPF, CNPJ, CEP, telefone e moeda (R$). Sem dependências.
 *
 * @packageDocumentation
 */

/** Remove tudo que não for dígito de uma string. */
export function onlyDigits(value: string): string {
  return (value ?? "").replace(/\D/g, "");
}

/* ------------------------------------------------------------------ *
 * CPF
 * ------------------------------------------------------------------ */

/**
 * Valida um CPF (com ou sem máscara).
 *
 * @example
 * isValidCPF("529.982.247-25"); // true
 * isValidCPF("111.111.111-11"); // false
 */
export function isValidCPF(cpf: string): boolean {
  const digits = onlyDigits(cpf);
  if (digits.length !== 11) return false;
  // Rejeita sequências repetidas (ex.: 00000000000, 11111111111).
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calcCheckDigit = (base: string, factor: number): number => {
    let total = 0;
    for (const n of base) total += Number(n) * factor--;
    const rest = (total * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  const d1 = calcCheckDigit(digits.slice(0, 9), 10);
  const d2 = calcCheckDigit(digits.slice(0, 10), 11);
  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
}

/**
 * Formata um CPF como `000.000.000-00`.
 * Retorna a entrada original se não tiver 11 dígitos.
 */
export function formatCPF(cpf: string): string {
  const d = onlyDigits(cpf);
  if (d.length !== 11) return cpf;
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

/* ------------------------------------------------------------------ *
 * CNPJ
 * ------------------------------------------------------------------ */

/**
 * Valida um CNPJ (com ou sem máscara).
 *
 * @example
 * isValidCNPJ("11.222.333/0001-81"); // true
 */
export function isValidCNPJ(cnpj: string): boolean {
  const digits = onlyDigits(cnpj);
  if (digits.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(digits)) return false;

  const calcCheckDigit = (base: string, weights: number[]): number => {
    let total = 0;
    for (let i = 0; i < weights.length; i++) total += Number(base[i]) * weights[i];
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calcCheckDigit(digits.slice(0, 12), w1);
  const d2 = calcCheckDigit(digits.slice(0, 13), w2);
  return d1 === Number(digits[12]) && d2 === Number(digits[13]);
}

/** Formata um CNPJ como `00.000.000/0000-00`. */
export function formatCNPJ(cnpj: string): string {
  const d = onlyDigits(cnpj);
  if (d.length !== 14) return cnpj;
  return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

/* ------------------------------------------------------------------ *
 * CEP
 * ------------------------------------------------------------------ */

/** Verifica se um CEP tem 8 dígitos. */
export function isValidCEP(cep: string): boolean {
  return onlyDigits(cep).length === 8;
}

/** Formata um CEP como `00000-000`. */
export function formatCEP(cep: string): string {
  const d = onlyDigits(cep);
  if (d.length !== 8) return cep;
  return d.replace(/(\d{5})(\d{3})/, "$1-$2");
}

/* ------------------------------------------------------------------ *
 * Telefone
 * ------------------------------------------------------------------ */

/**
 * Formata um telefone brasileiro.
 * Celular (11 dígitos): `(00) 00000-0000`.
 * Fixo (10 dígitos): `(00) 0000-0000`.
 */
export function formatPhone(phone: string): string {
  const d = onlyDigits(phone);
  if (d.length === 11) return d.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  if (d.length === 10) return d.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  return phone;
}

/* ------------------------------------------------------------------ *
 * Moeda (Real)
 * ------------------------------------------------------------------ */

/**
 * Formata um número como moeda brasileira (R$).
 *
 * @example
 * formatBRL(1234.5); // "R$ 1.234,50"
 */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Converte uma string de moeda brasileira em número.
 *
 * @example
 * parseBRL("R$ 1.234,50"); // 1234.5
 */
export function parseBRL(value: string): number {
  const normalized = (value ?? "")
    .replace(/[^\d,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const n = Number(normalized);
  return Number.isNaN(n) ? 0 : n;
}
