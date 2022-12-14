'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  Only original js, not bootstrap  */

var menu = document.getElementById('menu');
var mainContent = document.getElementById('main-content');
var footerHeight = document.getElementById('footer').clientHeight;

mainContent.style.minHeight = window.innerHeight - footerHeight - 120 + 'px';

var getStyle = function getStyle(e, styleName) {
	var styleValue = "";
	if (document.defaultView && document.defaultView.getComputedStyle) {
		styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
	} else if (e.currentStyle) {
		styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
			return p1.toUpperCase();
		});
		styleValue = e.currentStyle[styleName];
	}
	return styleValue;
};

function showAlertCopy() {
	$('#copy-alert').fadeIn('slow');
}

function hideAlertCopy() {
	$('#copy-alert').fadeOut('slow');
}

function CopyToClipboard(containerId) {
	if (document.selection) {
		var range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(containerId));
		range.select().createTextRange();
		document.execCommand("Copy");
	} else if (window.getSelection) {
		var _range = document.createRange();
		_range.selectNode(document.getElementById(containerId));
		window.getSelection().addRange(_range);
		document.execCommand("Copy");
		showAlertCopy();
		setTimeout(hideAlertCopy, 3000);
	}
}

var Accordion = function () {
	function Accordion(element, options) {
		var _this = this;

		_classCallCheck(this, Accordion);

		/* Initialize the HTML-elements  */
		this.init(element);

		/* Initialize options */
		this.initProp(options);

		var _loop = function _loop(i) {

			/* Take the button and give it an ID */
			var accBtn = _this.accBlocks[i].querySelector('.acc-btn');
			accBtn.dataId = i;

			/* Set the animation time (taken from options, if specified) */
			if (_this.propTransition) {
				accBtn.nextElementSibling.style.transition = _this.propTransition + 's';
			}

			/* Add a listener that animates the content on click */
			var self = _this;
			accBtn.addEventListener('click', function () {
				self.propCollapse ? self.slideCollapse(accBtn) : self.slideToggle(accBtn);
			});
		};

		for (var i = 0; i < this.accBlocks.length; i++) {
			_loop(i);
		}
	}

	_createClass(Accordion, [{
		key: 'slideToggle',
		value: function slideToggle(btn) {
			var accContent = btn.nextElementSibling;

			if (accContent.style.maxHeight) {
				accContent.style.maxHeight = null;
			} else {
				accContent.style.maxHeight = accContent.scrollHeight + 'px';
			}
		}
	}, {
		key: 'slideCollapse',
		value: function slideCollapse(btn) {
			if (btn.dataId != this.lastOpened) {
				this.accBlocks[this.lastOpened].querySelector('.acc-content').style.maxHeight = null;
				this.lastOpened = btn.dataId;
			}

			this.slideToggle(btn);
		}
	}, {
		key: 'init',
		value: function init(el) {
			this.accordion = el.querySelector('.accordion');
			this.accBlocks = this.accordion.getElementsByClassName('acc-block');
		}
	}, {
		key: 'initProp',
		value: function initProp(opt) {
			if (opt) {
				if (opt.collapse === true) {
					this.lastOpened = 0;
					this.propCollapse = true;
				}

				if (typeof opt.transition === 'number' && opt.transition > 0) {
					this.propTransition = opt.transition;
				}
			}
		}
	}]);

	return Accordion;
}();

window.onload = function () {
	if (document.getElementById('modes-block') !== null) {
		new Accordion(document.getElementById('modes-block'), {
			collapse: true,
			transition: 0.3
		});
	}

	if (document.getElementById('shop-server-block') !== null) {
		new Accordion(document.getElementById('shop-server-block'), {
			collapse: true,
			transition: 0.3
		});
	}

	if (document.getElementById('shop-filter') !== null) {
		new Accordion(document.getElementById('shop-filter'), {
			collapse: false,
			transition: 0.3
		});
	}
};

if (document.getElementById('input-datepicker') !== null) {
	$('#input-datepicker').mask('99.99');
}

if (document.getElementById("server-stat") !== null) {
	var ctxL = document.getElementById("server-stat").getContext('2d');
	var myLineChart = new Chart(ctxL, {
		type: 'line',
		data: {
			labels: ["????????????", "??????????????", "????????????", "??????????????", "????????", "????????????", "??????"],
			datasets: [{
				label: "???????????????????? ??????????????",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: [28, 48, 40, 19, 86, 27, 90]
			}]
		},
		options: {
			responsive: true
		}
	});
}