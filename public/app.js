const toCurrencyFormat = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price)
}


document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrencyFormat(node.textContent);
});

const $card = document.querySelector("#card");

if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.courses.length) {
            const html = card.courses.map((c) => {
                return `
            <tr>
              <td>${c.title}</td>
              <td>${c.count}</td>
              <td>
                <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
              </td>
            </tr>
            `;
              })
              .join("");// склеиваем массив в строку
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrencyFormat(card.price);
          } else {
            $card.innerHTML = "<p>Корзина пуста</p>";
          }
        });
    }
  });
}
