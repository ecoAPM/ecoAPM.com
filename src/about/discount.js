const discounts = document.querySelectorAll('li.task-list-item');

function updateDiscount() {
	const checked = Array.from(discounts).map(getCheckbox).filter(c => c.checked);
	const discount = checked.length * 5;
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
