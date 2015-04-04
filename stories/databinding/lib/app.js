
function c2f(c) {
	return 9/5 * c + 32;
}

function f2c(f) {
    return 5/9 * (f - 32);
}


//namespace
var app = {};

//controller
app.controller = function() {
	this.celsius = m.prop(0);
	this.fahrenheit = function (v) {
		if (!arguments.length) {
			return c2f(this.celsius());
		} else {
			this.celsius(f2c(v));
		}
	}.bind(this);
};

//view
app.view = function(ctrl) {
	return [
		m('label', {class:"celsius-wrap"}, [
			m('input', {
				type: "number",
				class: "celsius",
				value: ctrl.celsius(),
				oninput: m.withAttr("value", ctrl.celsius),
			}),
			"°C",
		]),
		m('span', {class: "arrows"}, "⇄"),
		m('label', {class:"fahrenheit-wrap"}, [
			m('input', {
				type: "number",
				class: "fahrenheit",
				value: ctrl.fahrenheit(),
				oninput: m.withAttr("value", ctrl.fahrenheit),
			}),
			"°F",
		]),
	];
};

//initialize
m.module(document.getElementById("app"), app);
