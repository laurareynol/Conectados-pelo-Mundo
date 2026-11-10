/** Interpola `{chave}` em uma string. */
export function fmt(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (k in values ? String(values[k]) : `{${k}}`));
}
