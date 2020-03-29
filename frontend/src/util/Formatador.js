export function formataMoeda(valor) {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

export function removeMaskPhone(numero) {
  return parseInt(numero.replace(/[^0-9]/g, ""));
}
