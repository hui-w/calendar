/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function CalendarHeader(calendar) {
	this.calendar = calendar;
	this.monthLabel = null;
	this.yearLabel = null;
	this.renderInto = function (container) {
		var that = this;
		var domObj = container.createChild("div", {
				"class" : "header"
			});
		var table1 = domObj.createChild("table", {
				"style" : "float: left"
			});
		var tr1 = table1.createChild("tr");
		var td1_1 = tr1.createChild("td");
		var td1_2 = tr1.createChild("td");
		var td1_3 = tr1.createChild("td");

		var table2 = domObj.createChild("table", {
				"style" : "float: right"
			});
		var tr2 = table2.createChild("tr");
		var td2_1 = tr2.createChild("td");
		var td2_2 = tr2.createChild("td");
		var td2_3 = tr2.createChild("td");

		var btnPrevMonth = new ArrowButton(td1_1, "left", function () {
				that.calendar.previousMonth();
			});
		this.monthLabel = td1_2.createChild("div", {}, this.calendar.getMonthName());
		var btnNextMonth = new ArrowButton(td1_3, "right", function () {
				that.calendar.nextMonth();
			});

		var btnPrevYear = new ArrowButton(td2_1, "left", function () {
				that.calendar.previousYear();
			});
		this.yearLabel = td2_2.createChild("div", {}, this.calendar.dateEx.year);
		var btnNextYear = new ArrowButton(td2_3, "right", function () {
				that.calendar.nextYear();
			});
	};

	this.refresh = function () {
		this.monthLabel.innerHTML = this.calendar.getMonthName();
		this.yearLabel.innerHTML = this.calendar.dateEx.year;
	};
}

function ArrowButton(container, direction, clickHandler) {
	this.renderInto = function (container) {
		var that = this;
		var btn = container.createChild("div", {
				"class" : "arrow " + direction
			});
		container.onmouseover = function () {
			btn.addClassName(direction + "Hover");
		};
		container.onmouseout = function () {
			btn.removeClassName(direction + "Hover");
		};
		container.onclick = function () {
			if (typeof clickHandler == "function") {
				clickHandler();
			}
			btn.removeClassName(direction + "Hover");	//remove hover for touch devices
		};
	}

	this.renderInto(container);
}
