Element.prototype.addClass = function (className) {
	if (!this.classList.contains(className)) {
		this.classList.add(className);
	}
};

Element.prototype.removeClass = function (className) {
	if (this.classList.contains(className)) {
		this.classList.remove(className);
	}
};

Array.prototype.first = function () {
	return this[0];
}

Array.prototype.last = function () {
	return this[this.length - 1];
}

function getValues (dvalues, unit = 1) {
	let values = [];
	if (dvalues.indexOf("[") > -1) {
		const start = parseInt(dvalues.substring(1, dvalues.indexOf("-")));
		const end = parseInt(dvalues.substring(dvalues.indexOf("-") + 1, dvalues.length));
		for (let i = start; i <= end; i+=unit) {
			values.push(i);
		}
	} else {
		values = inputslider.dataset.values.split(',')
	}
	return values;
}

document.querySelectorAll('.inputslider').forEach(
	(inputslider) => {
		let unit = 1;
		if (inputslider.dataset.unit) {
			unit = parseInt(inputslider.dataset.unit);
		}
		let values = getValues(inputslider.dataset.values, unit);
		
		let value = parseFloat(inputslider.dataset.value),
			min = parseFloat(values.first()),
			max = parseFloat(values.last()),
			input = inputslider.querySelector('input'),
			area = inputslider.querySelector('.area'),
			knob = inputslider.querySelector('.knob'),
			fill = inputslider.querySelector('.fill');
		

		values.forEach(
			(value, i) => {
				values[i] = value = parseFloat(value);

				let span = document.createElement('span');
				span.innerText = value;
				span.setAttribute('data-value', value);

				if (i == 0) {
					span.addClass('selected');
					input.value = value;
				}

				span.style.left = gsap.utils.mapRange(min, max, 0, 100, value) + '%';

				inputslider.querySelector('.values').appendChild(span);
			}
		);

		Draggable.create(knob, {
			type: 'x',
			edgeResistance: 1,
			bounds: area,
			throwProps: false,
			onDrag: function () {
				handleInputslider(this, false, unit);
			},
			onDragEnd: function () {
				handleInputslider(this, false, unit);
			}
		}
		);
	}
);

function handleInputslider(instance, snap, unit) {
	let inputslider = instance.target.closest('.inputslider'),
		fill = inputslider.querySelector('.fill'),
		values = getValues(inputslider.dataset.values, unit),
		min = parseFloat(values.first()),
		max = parseFloat(values.last()),
		xPercent = gsap.utils.mapRange(0, instance.maxX, 0, 100, instance.x),
		relativeValue = gsap.utils.mapRange(0, instance.maxX, min, max, instance.x),
		finalValue = gsap.utils.snap(values, relativeValue),
		snapX = gsap.utils.mapRange(min, max, 0, instance.maxX, finalValue),
		fillWidth = gsap.utils.mapRange(0, instance.maxX, 0, 100, snapX);

	if (snap) {
		gsap.to(instance.target, { duration: .2, x: snapX });
		gsap.to(fill, { duration: .2, width: fillWidth + '%' });
	} else {
		values.forEach(
			(value, i) => {
				values[i] = parseFloat(value);
			}
		);

		fill.style.width = xPercent + '%';

		inputslider.querySelectorAll('.values span').forEach(
			(span) => {
				if (parseFloat(span.dataset.value) == finalValue) {
					span.addClass('selected');
				} else {
					span.removeClass('selected');
				}
			}
		);

		inputslider.querySelector('input').value = finalValue;
	}
}