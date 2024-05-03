document.getElementById("addBtn").addEventListener("click", addItem);

function saveAllItems() {
  var itemList = document.getElementById("itemList").innerHTML;
  localStorage.setItem("shoppingList", itemList);
}

function addItem(newItem, newValue, quantity) {
  var itemList = document.getElementById("itemList");
  var li = document.createElement("li");

  var itemName = document.createElement("span");
  itemName.className = "item-name";
  itemName.textContent = newItem;
  li.appendChild(itemName);

  var itemValue = document.createElement("span");
  itemValue.className = "item-value";
  itemValue.textContent = "R$ " + (newValue * quantity).toFixed(2);
  li.appendChild(itemValue);

  var itemQuantity = document.createElement("span");
  itemQuantity.className = "item-quantity";
  itemQuantity.textContent = "Quantidade: " + quantity;
  li.appendChild(itemQuantity);

  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remover";
  removeBtn.className = "removeBtn";
  removeBtn.addEventListener("click", function () {
    removeItem(li, newValue * quantity);
  });
  li.appendChild(removeBtn);

  itemList.appendChild(li);
  updateTotalValue(newValue * quantity);

  saveItems();
}

function removeItem(item, value) {
  item.parentNode.removeChild(item);
  updateTotalValue(-value);
}

function removeItem(item, value) {
  item.parentNode.removeChild(item);
  updateTotalValue(-value);
  saveItems();
}

function updateTotalValue(value) {
  var totalValueSpan = document.getElementById("totalValue");
  var currentValue = parseFloat(totalValueSpan.textContent.slice(2));
  var updatedValue = currentValue + value;
  totalValueSpan.textContent = "R$ " + updatedValue.toFixed(2);
}

function saveItems() {
  var itemList = document.getElementById("itemList").innerHTML;
  localStorage.setItem("shoppingList", itemList);
}

window.onload = function () {
  var storedItems = localStorage.getItem("shoppingList");
  if (storedItems) {
    document.getElementById("itemList").innerHTML = storedItems;
  }

  var removeButtons = document.getElementsByClassName("removeBtn");
  var totalValue = 0;

  for (var i = 0; i < removeButtons.length; i++) {
    var valueSpan = removeButtons[i].previousElementSibling;
    var value = parseFloat(valueSpan.textContent.slice(2));
    totalValue += value;

    removeButtons[i].addEventListener("click", function () {
      removeItem(this.parentNode, value);
    });
  }

  updateTotalValue(totalValue);
};

var removeButtons = document.getElementsByClassName("removeBtn");
for (var i = 0; i < removeButtons.length; i++) {
  var valueSpan = removeButtons[i].previousElementSibling;
  var value = parseFloat(valueSpan.textContent.slice(2));
  removeButtons[i].addEventListener("click", function () {
    removeItem(this.parentNode, value);
  });
  updateTotalValue(value);
}

function showForm() {
  Swal.fire({
    title: "Adicionar Item",
    html: `
                    <input type="text" id="item" placeholder="Digite um item" class="swal2-input">
                    <input type="number" id="valor" min="0.01" step="any" placeholder="Insira o valor" class="swal2-input">
                    <input type="number" id="quantidade" min="1" placeholder="Insira a quantidade" value="1" class="swal2-input">
                `,
    showCancelButton: true,
    confirmButtonText: "Adicionar",
    cancelButtonText: "Cancelar",
    focusConfirm: false,
    preConfirm: () => {
      const newItem = Swal.getPopup().querySelector("#item").value;
      const newValue = parseFloat(
        Swal.getPopup().querySelector("#valor").value
      );
      const quantity = parseInt(
        Swal.getPopup().querySelector("#quantidade").value
      );

      if (newItem !== "" && !isNaN(newValue) && quantity > 0) {
        addItem(newItem, newValue, quantity);
      } else {
        Swal.showValidationMessage(
          "Por favor, preencha o item, o valor e a quantidade corretamente."
        );
      }
    },
  });
}

function openTextBox() {
  Swal.fire({
    title: "Digite algo",
    input: "text",
    inputPlaceholder: "Digite o Nome da Lista",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Enviar",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, digite algo!";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const text = result.value;
      sendText(text);
    }
  });
}

function sendText(text) {
  Swal.fire({
    title: "Lista Salva:",
    text: text,
    icon: "info",
  }).then((result) => {
    if (result.isConfirmed) {
      sendListToClass(text);
    }
  });
}

function sendListToClass(list) {
  var listasContainer = document.querySelector(".listas");
  var listaItem = document.createElement("div");
  listaItem.classList.add("lista-item");

  var texto = document.createElement("span");
  texto.textContent = list;
  texto.classList.add("item-text"); // Adiciona a classe 'item-text' ao elemento de texto
  listaItem.appendChild(texto);

  // Adicionar evento de clique ao lista-item
  listaItem.addEventListener("click", function () {
    exibirInformacoesSalvas();
  });

  listasContainer.appendChild(listaItem);
}

function exibirInformacoesSalvas() {
  var itemList = document.getElementById("itemList");
  var items = itemList.getElementsByTagName("li");
  var savedItems = [];
  var totalValue = 0; // Variável para armazenar a soma total dos valores

  for (var i = 0; i < items.length; i++) {
    var itemName = items[i].querySelector(".item-name").textContent;
    var itemValue = items[i].querySelector(".item-value").textContent;
    var itemQuantity = items[i].querySelector(".item-quantity").textContent;

    savedItems.push(
      "Item: " +
        itemName +
        " | Quantidade: " +
        itemQuantity +
        " | Valor: " +
        itemValue
    );

    var value = parseFloat(itemValue.slice(2)); // Extrai o valor numérico do texto "R$ X.XX"
    totalValue += value; // Adiciona o valor ao totalValue
  }

  savedItems.push("Total: R$ " + totalValue.toFixed(2)); // Adiciona a soma total ao array savedItems

  Swal.fire({
    title: "Lista Salva:",
    html: savedItems.join("<br>"),
    icon: "info",
  });
}

function sendText(text) {
  Swal.fire({
    title: "Lista Salva:",
    text: text,
    icon: "info",
  }).then((result) => {
    sendListToClass(text); // Adiciona a chamada para a função sendListToClass() aqui
  });
}
