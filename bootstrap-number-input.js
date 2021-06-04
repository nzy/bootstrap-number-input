/*!
 * bootstrap-number-input v5.0 (https://github.com/nzy/bootstrap-number-input)
 * Copyright 2021 Constantine Zykov, <iweb@inbox.ru>
 * Licensed under Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.html)
 */
(function ( $ ) {

	$.fn.bootstrapNumber = function( options ) {

		var settings = $.extend({
			upClass: 'outline-secondary',
			downClass: 'outline-secondary',
			upText: '+',
			downText: '-',
			center: true
			}, options );

		return this.each(function(e) {
			var self = $(this);
			var clone = self.clone(true, true);

			var min = self.attr('min');
			var max = self.attr('max');
			var step = parseInt(self.attr('step')) || 1;

			function setText(n) {
				if (isNaN(n)) {
					return false;
				}

				if(min && n < min)
					n = min;
				else if(max && n > max)
					n = max;

				clone.focus().val(n);
				clone.trigger('change');
				return true;
			}

			var group = $("<div class='input-group'></div>");
			var down = $("<button type='button'>" + settings.downText + "</button>").attr('class', 'btn btn-' + settings.downClass).click(function() {
				setText(parseInt(clone.val() || clone.attr('value')) - step);
			});
			var up = $("<button type='button'>" + settings.upText + "</button>").attr('class', 'btn btn-' + settings.upClass).click(function() {
				setText(parseInt(clone.val() || clone.attr('value')) + step);
			});
			down.appendTo(group);
			clone.appendTo(group);
			if(clone && settings.center) {
				clone.css('text-align', 'center');
			}
			up.appendTo(group);

			// remove spins from original
			clone.prop('type', 'text').keydown(function(e) {
				if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
					(e.keyCode === 65 && e.ctrlKey === true) ||
					(e.keyCode >= 35 && e.keyCode <= 39)) {
					return;
				}
				if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault();
				}

				var c = String.fromCharCode(e.which);
				var n = parseInt(clone.val() + c);

				if ((min && n < min) || (max && n > max)) {
					e.preventDefault();
				}
			});

			self.replaceWith(group);
		});
	};
} ( jQuery ));
