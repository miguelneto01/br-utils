<h1 align="center">🇧🇷 br-utils</h1>

<p align="center">
  Utilitários para <b>validação e formatação de dados brasileiros</b> — CPF, CNPJ, CEP, telefone e moeda (R$).<br>
  Escrito em TypeScript, <b>sem nenhuma dependência</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/dependências-0-brightgreen?style=for-the-badge" />
</p>

---

## 💡 Por quê?

Todo sistema brasileiro precisa validar um CPF, formatar um CNPJ ou mostrar um valor em Real.
Em vez de reescrever isso toda vez, o `br-utils` reúne essas funções num pacote pequeno, testado e fácil de usar.

## 📦 Instalação

```bash
npm install br-utils
```

> Ainda não publicado no npm? É só clonar o repositório e importar de `src/`.

## 🚀 Uso

```ts
import {
  isValidCPF,
  formatCPF,
  isValidCNPJ,
  formatCNPJ,
  formatCEP,
  formatPhone,
  formatBRL,
  parseBRL,
} from "br-utils";

// CPF
isValidCPF("529.982.247-25"); // true
formatCPF("52998224725");      // "529.982.247-25"

// CNPJ
isValidCNPJ("11.222.333/0001-81"); // true
formatCNPJ("11222333000181");      // "11.222.333/0001-81"

// CEP e telefone
formatCEP("60000000");     // "60000-000"
formatPhone("85999998888"); // "(85) 99999-8888"

// Moeda
formatBRL(1234.5);         // "R$ 1.234,50"
parseBRL("R$ 1.234,50");   // 1234.5
```

## 📚 API

| Função | O que faz |
| --- | --- |
| `isValidCPF(cpf)` | Valida um CPF (com ou sem máscara) |
| `formatCPF(cpf)` | Formata como `000.000.000-00` |
| `isValidCNPJ(cnpj)` | Valida um CNPJ (com ou sem máscara) |
| `formatCNPJ(cnpj)` | Formata como `00.000.000/0000-00` |
| `isValidCEP(cep)` | Verifica se o CEP tem 8 dígitos |
| `formatCEP(cep)` | Formata como `00000-000` |
| `formatPhone(phone)` | Formata celular `(00) 00000-0000` ou fixo `(00) 0000-0000` |
| `formatBRL(value)` | Formata um número como `R$ 1.234,50` |
| `parseBRL(value)` | Converte `"R$ 1.234,50"` em `1234.5` |
| `onlyDigits(value)` | Remove tudo que não for dígito |

## 🧪 Testes

```bash
npm install
npm test
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue com sugestões (novas máscaras, validações, etc.)
ou mande um pull request. A ideia é manter o pacote pequeno, testado e sem dependências.

## 📄 Licença

[MIT](LICENSE) © Miguel Neto
