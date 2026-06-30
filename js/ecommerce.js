let Costs = {
    product: ["", 0],
    design: ["", 0],
    embroidery: ["Embroidery", 0],
    logo: ["Logo", 0],
};
let TotalCost = 0;

let Total = document.querySelector(".total");
let PaymentText = document.querySelector(".payment-text");

function calculateTotal() {
    TotalCost = 0;

    let CostsValues = Object.values(Costs);
    for (let i = 0; i < CostsValues.length; i++) {
        const Cost = CostsValues[i][1];
        TotalCost += parseFloat(Cost.toFixed(2));
    }
    Total.innerHTML = `Your Cart: RM ${TotalCost.toFixed(2)}`;
    PaymentText.innerHTML = `Please Pay: <strong>RM ${TotalCost.toFixed(2)}</strong>`;
}

let ProductsRadioInputs = document.querySelectorAll("input[type=radio]");

for (let i = 0; i < ProductsRadioInputs.length; i++) {
    const ProductRadioInput = ProductsRadioInputs[i];
    ProductRadioInput.addEventListener("change", (e) => {
        Costs.product[0] = ProductRadioInput.getAttribute("data-name");
        Costs.product[1] = parseInt(ProductRadioInput.getAttribute("data-cost"));
        calculateTotal();
    });
}

let Designs = document.querySelectorAll(".design");
let DesignsDropdownMenu = document.getElementById("design-select");

for (let i = 0; i < Designs.length; i++) {
    const Design = Designs[i];
    if (Design.classList.contains("disabled")) {
        continue;
    }
    Design.addEventListener("click", (e) => {
        let DesignValue = Design.getAttribute("data-value");
        DesignsDropdownMenu.value = DesignValue;
        DesignsDropdownMenuChange();
    });
}

let LastDesign;
function DesignsDropdownMenuChange(e) {
    let Design = document.querySelector(`.design[data-value=${DesignsDropdownMenu.value}]`);
    if (LastDesign) {
        LastDesign.classList.remove("selected");
    }
    Design.classList.add("selected");
    LastDesign = Design;

    Costs.design[0] = Design.getAttribute("data-name");
    Costs.design[1] = parseInt(Design.getAttribute("data-cost"));
    calculateTotal();
}

DesignsDropdownMenu.addEventListener("change", DesignsDropdownMenuChange);

let Embroidery = document.getElementById("embroidery");
Embroidery.addEventListener("change", (e) => {
    if (Embroidery.checked) {
        Costs.embroidery[1] = parseInt(Embroidery.getAttribute("data-cost"));
    } else {
        Costs.embroidery[1] = 0;
    }
    calculateTotal();
});

let Logo = document.getElementById("logo");
Logo.addEventListener("change", (e) => {
    if (Logo.checked) {
        Costs.logo[1] = parseInt(Logo.getAttribute("data-cost"));
    } else {
        Costs.logo[1] = 0;
    }
    calculateTotal();
});

let Table = document.querySelector("table");
function totalPayment() {
    let Product = document.querySelector("input[name=product]:checked");
    let Design = document.querySelector("select").value;

    if (Product && Design != "") {
        if (Logo.checked && document.querySelector("#logo-file").value == "") {
            alert("You chose personal logo but didn't choose any image for logo!");
            return;
        }
    } else {
        alert("You didn't choose any shirt or design!");
        return;
    }

    Table.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Price</th>
    </tr>`;

    let DiscountApplied = false;
    if (TotalCost > 150) {
        DiscountApplied = true;
    }

    let CostsValues = Object.values(Costs);

    for (let i = 0; i < CostsValues.length; i++) {
        const Price = CostsValues[i][1];
        const Name = CostsValues[i][0];

        if (Price != 0) {
            let row = Table.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            cell1.innerHTML = Name;
            cell2.innerHTML = `RM ${Price.toFixed(2)}`;
        }
    }

    let NewTotalCost = TotalCost;
    if (DiscountApplied) {
        let discount = (NewTotalCost * 10) / 100;

        let discountRow = Table.insertRow();
        let discountCell1 = discountRow.insertCell(0);
        let discountCell2 = discountRow.insertCell(1);

        discountCell1.innerHTML = "Discount 10%";
        discountCell2.innerHTML = `RM -${discount.toFixed(2)}`;

        NewTotalCost = NewTotalCost - discount;
        alert(
            `Congratulations! You are eligible for 10% (RM -${discount.toFixed(2)}) discount! Your total for payment is: RM ${NewTotalCost.toFixed(2)}`,
        );
    } else {
        alert(`Thank you for the purchase! Your total for payment is: RM ${NewTotalCost.toFixed(2)}`);
    }
    let row = Table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    row.classList.add("sum");
    cell1.innerHTML = "Total";
    cell2.innerHTML = `RM ${NewTotalCost.toFixed(2)}`;
}
