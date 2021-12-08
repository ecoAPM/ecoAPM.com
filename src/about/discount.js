const discounts = document.querySelectorAll('li.task-list-item');

function updateDiscount() {
	const checked = Array.from(discounts).map(getCheckbox).filter(c => c.checked);
	const rate = Math.pow(0.9, checked.length) * 10000;
	const discount = Math.round(10000 - rate) / 100;
	const calculated = document.getElementById('calculated');
	calculated.innerText = `Calculated Discount: ${discount}%`;
}

function getCheckbox(list_item) {
	return list_item.querySelector('input[type="checkbox"]');
}

function setupDiscount(list_item) {
	list_item.innerHTML = '<label>' + list_item.innerHTML + '</label>';

	const checkbox = getCheckbox(list_item);
	checkbox.removeAttribute('disabled');
	checkbox.onchange = updateDiscount;
}

discounts.forEach(setupDiscount);
document.onreadystatechange = updateDiscount;
