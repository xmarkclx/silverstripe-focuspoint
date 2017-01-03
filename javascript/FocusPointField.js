(function($) {
	$.entwine('ss', function($){

		$('.focuspoint-field .grid').entwine({

			getCoordField: function(axis) {
				var fieldSelector = "input[name='Focus" + axis.toUpperCase() + "']";
				return this.closest('.focuspoint-fieldgroup').find(fieldSelector);
			},
			getCoord: function(axis) {
				// International formats may use a comma instead of period
				var grid = $(this);
				coord = grid.getCoordField(axis).val();
				return parseFloat(coord.replace(',','.'));
			},
			updateGrid: function() {
				var grid = $(this);

				// Get coordinates from text fields
				var focusX = grid.getCoord('x');
				var focusY = grid.getCoord('y');

				// Calculate background positions
				var backgroundWH = 605; // Width and height of square grid background image are the same
				var bgOffset = Math.floor(-backgroundWH/2);
				var fieldW = grid.width();
				var fieldH = grid.height();
				var leftBG = bgOffset+((focusX/2 +.5)*fieldW);
				var topBG = bgOffset+((-focusY/2 +.5)*fieldH);

				// Line up crosshairs with click position
				grid.css('background-position',leftBG+'px '+topBG+'px');
			},
			onclick: function(e) {
				var grid = $(this);
				var fieldW = grid.width();
				var fieldH = grid.height();

				// Calculate FocusPoint coordinates
				var offsetX = e.pageX - grid.offset().left;
				var offsetY = e.pageY - grid.offset().top;
				var focusX = (offsetX/fieldW - .5)*2;
				var focusY = (offsetY/fieldH - .5)*-2;
				// console.log('FocusX: '+focusX+' FocusY: '+focusY);

				// Pass coordinates to form fields
				// ToDo: Do we need to use comma depending on locale?
				this.getCoordField('x').val(focusX);
				this.getCoordField('y').val(focusY);

				// Update focus point grid
				this.updateGrid();

			},
			onadd: function() {
				// Position focus grid on form field
				var grid = $(this);
				grid.updateGrid();
				// May not have worked - try again after image loads
				grid.prev('img').load(function(){
					grid.updateGrid();
				});
			}

		});
	});
}(jQuery));
