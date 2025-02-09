let itemId = 1; // ID incremental

document.getElementById("showFormBtn").addEventListener("click", showForm);

function showForm() {
  Swal.fire({
    title: "Adicionar Item",
    html: `
      <input type="text" id="item" placeholder="Digite um Item" class="swal2-input fs-5">
      <input type="number" id="valor" min="0.50" step="any" placeholder="Insira o Valor (R$)" class="swal2-input fs-5">
      <input type="number" id="quantidade" min="1" placeholder="Insira a Quantidade" class="swal2-input fs-5">
    `,
    showCancelButton: true,
    confirmButtonText: "Adicionar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const newItem = Swal.getPopup().querySelector("#item").value;
      const newValue = parseFloat(
        Swal.getPopup().querySelector("#valor").value
      );
      const quantity = parseInt(
        Swal.getPopup().querySelector("#quantidade").value
      );

      if (!newItem || isNaN(newValue) || quantity <= 0) {
        Swal.showValidationMessage("Preencha todos os campos corretamente.");
        return false;
      }

      addItem(newItem, newValue, quantity);
    },
  });
}

function addItem(newItem, newValue, quantity) {
  let table = document.getElementById("itemTable");
  let row = table.insertRow();

  row.innerHTML = `
        <td scope="row">${itemId}</td>
        <td>${newItem}</td>
        <td>R$ ${newValue.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>R$ ${(newValue * quantity).toFixed(2)}</td>
        <td><button class="btn btn-danger py-1" id="removeBtn">Remover</button></td>
    `;

  row.querySelector("#removeBtn").addEventListener("click", () => {
    removeItem(row, newValue * quantity);
  });

  updateTotalValue(newValue * quantity);
  itemId++;
  saveItems();
}

function removeItem(row, value) {
  row.remove();
  updateTotalValue(-value);
  saveItems();
}


function updateTotalValue(value) {
  let totalValueSpan = document.getElementById("totalValue");
  let currentValue = parseFloat(totalValueSpan.textContent.slice(2)) || 0;
  totalValueSpan.textContent = `R$ ${(currentValue + value).toFixed(2)}`;
}

function saveItems() {
  let items = [];
  document.querySelectorAll("#itemTable tr").forEach((row) => {
    let cells = row.getElementsByTagName("td");
    if (cells.length > 0) {
      items.push({
        id: cells[0].textContent,
        name: cells[1].textContent,
        value: cells[2].textContent,
        quantity: cells[3].textContent,
        total: cells[4].textContent,
      });
    }
  });
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

window.onload = function () {
  let storedItems = JSON.parse(localStorage.getItem("shoppingList"));
  if (storedItems) {
    storedItems.forEach((item) => {
      addItem(
        item.name,
        parseFloat(item.value.slice(2)),
        parseInt(item.quantity)
      );
    });
  }
};

function openTextBox() {
  Swal.fire({
    title: "Digite o Nome da Lista",
    input: "text",
    inputPlaceholder: "Nome da Lista",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Salvar",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, digite um nome para a lista!";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      saveList(result.value);
    }
  });
}

function saveList(listName) {
  let section = document.querySelector("section.container");
  let table = document.getElementById("itemTable");
  let totalValue = document.getElementById("totalValue").textContent;

  if (table.rows.length === 0) {
    Swal.fire({
      title: "Atenção",
      text: "Adicione itens antes de salvar a lista.",
      icon: "warning",
    });
    return;
  }

  let newSection = document.createElement("div");
  newSection.innerHTML = `
    <h4>${listName}</h4>
    <table class="table table-responsive table-sm table-hover">
      <thead>
        <tr>
          <th class="px-2">#</th>
          <th>Item</th>
          <th>Valor</th>
          <th>Quantidade</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${Array.from(table.rows)
          .map(
            (row) => `
              <tr>
                <td class="px-2">${row.cells[0].textContent}</td>
                <td>${row.cells[1].textContent}</td>
                <td>${row.cells[2].textContent}</td>
                <td>${row.cells[3].textContent}</td>
                <td>${row.cells[4].textContent}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td class="px-2" colspan="4"><b>Total</b></td>
          <td><b>${totalValue}<b></td>
        </tr>
      </tfoot>
    </table>
  `;

  section.appendChild(newSection);

  document.getElementById("itemTable").innerHTML = "";
  document.getElementById("totalValue").textContent = "R$ 0.00";
  itemId = 1;

  Swal.fire({
    title: "Sucesso",
    text: "Lista salva com sucesso!",
    icon: "success"
  });
}
