const UNIT_PRICE = 49.9;
const WHATSAPP_NUMBER = "557598453437";

const quantityInput = document.querySelector("#quantity");
const totalPrice = document.querySelector("#total-price");
const whatsappLinks = document.querySelectorAll("[data-whatsapp]");

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getQuantity() {
  if (!quantityInput) return 1;

  const parsed = Number.parseInt(quantityInput.value, 10);
  return Number.isFinite(parsed) ? Math.min(10, Math.max(1, parsed)) : 1;
}

function buildWhatsAppUrl(quantity) {
  const total = formatCurrency(UNIT_PRICE * quantity);
  const message = [
    "Olá! Quero comprar o porta-planta Gato Guardião.",
    "",
    `Quantidade: ${quantity}`,
    `Total: ${total}`,
    "",
    "Pode me passar as informações para finalizar o pedido?",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function updatePurchase() {
  const quantity = getQuantity();

  if (quantityInput) quantityInput.value = quantity;
  if (totalPrice) totalPrice.textContent = formatCurrency(UNIT_PRICE * quantity);

  whatsappLinks.forEach((link) => {
    link.href = buildWhatsAppUrl(quantity);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

document.querySelectorAll("[data-quantity-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.quantityAction === "plus" ? 1 : -1;
    quantityInput.value = getQuantity() + direction;
    updatePurchase();
  });
});

quantityInput?.addEventListener("input", updatePurchase);
quantityInput?.addEventListener("blur", updatePurchase);

document.querySelectorAll(".accordion details").forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;

    document.querySelectorAll(".accordion details").forEach((item) => {
      if (item !== details) item.open = false;
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

updatePurchase();
