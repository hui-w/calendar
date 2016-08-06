/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function CalendarBody(calendar) {
	this.calendar = calendar;
	this.table = null;
	this.eventContainers = null;
	this.selectedTD = null;
	this.monthlyData = [];
	
	this.renderInto = function (container) {
		//create the table
		this.table = container.createChild("table", {
				"class" :
				"monthTable"
			});

		//render the week days
		this.renderDays(this.table);

		//render the dates
		this.renderDates(this.table);
	};

	this.setShowing = function (show) {
		if (show) {
			this.table.removeClassName("hidden");
		} else {
			this.table.addClassName("hidden");
		}
	};

	this.refresh = function () {
		while (this.table.childNodes.length > 1) {
			//remove all rows except the weekday names
			this.table.removeChild(this.table.childNodes[1]);
		}

		//render the dates
		this.renderDates(this.table);
	};

	this.renderDays = function (table) {
		var tr = table.createChild("tr");
		for (var i = 0; i <= 6; i++) {
			var td = tr.createChild("th", {
					"class" : (i == 0 || i == 6) ? "weekend" : "workday"
				});
			td.innerHTML = Consts.DayNames[i];
		}
	};

	this.renderDates = function (table) {
		var that = this;
		this.selectedTD = null;
		var now = new Date();
		var thisMonthIdx = now.getMonth();
		var today = now.getDate();
		var thisYear = now.getFullYear();

		var tr = table.createChild("tr");
		var firstDate = new Date();
		firstDate.setFullYear(this.calendar.dateEx.year, this.calendar.dateEx.month - 1, 1);
		//console.log(firstDate);
		var firstDayPadding = firstDate.getDay();

		//previous month
		for (var i = 0; i < firstDayPadding; i++) {
			var td = tr.createChild("td", {
					"class" : "previousMonth"
				});
			var div = td.createChild("div", {
					"class" : "dateContainer"
				});
		}

		//this month
		var dayOfWeek = firstDayPadding;
		this.eventContainers = []; //clear array
		for (var i = 0; i < this.calendar.getDaysCount(); i++) {
			var date = i + 1;
			var className = "";
			if (this.calendar.dateEx.year == thisYear && this.calendar.dateEx.month == (thisMonthIdx + 1) && (i + 1) == today) {
				className = "today";
			} else if (dayOfWeek == 0 || dayOfWeek == 6) {
				className = "weekend";
			} else {
				className = "workday";
			}

			var td = tr.createChild("td", {
					"class" : className
				});
			td.setAttribute("data-date", date);
			var div = td.createChild("div", {
					"class" : "dateContainer"
				});
			var dateLabel = div.createChild("div", {
					"class" : "date-label"
				}, date);
			var eventContainer = div.createChild("div", {
					"class" : "event-container"
				});
			eventContainer.setAttribute("data-eventsCount", 0);
			eventContainer.setAttribute("data-eventsColor", 0);
			this.eventContainers.push(eventContainer);

			td.onmouseover = function () {
				this.addClassName("hover");
			}
			td.onmouseout = function () {
				this.removeClassName("hover");
			}
			td.onclick = function () {
				//remove the old highlight
				if (that.selectedTD != null) {
					that.selectedTD.removeClassName("selected");
				}

				//highlight selected
				that.selectedTD = this;
				this.addClassName("selected");

				var selectedDate = this.attributes["data-date"].value;
				that.calendar.selectDate(selectedDate);
			};

			//create a new tr for next month
			if (dayOfWeek == 6) {
				tr = table.createChild("tr");
				dayOfWeek = 0;
			} else {
				dayOfWeek++;
			}
		}

		//next month
		if (dayOfWeek != 0) {
			for (var i = 0; i < 7 - dayOfWeek; i++) {
				var td = tr.createChild("td", {
						"class" : "nextMonth"
					});
				var div = td.createChild("div", {
						"class" : "dateContainer"
					});
			}
		}
	};

	this.unselectTD = function () {
		if (this.selectedTD != null) {
			this.selectedTD.removeClassName("selected");
		}
	};
	
	this.setMonthlyData = function(array) {
		this.monthlyData = array;
		for (var i = 0; i < array.length; i++) {
			var eventData = array[i];
			var eventContainer = this.eventContainers[eventData.date - 1];
			var count = eventContainer.attributes["data-eventsCount"].value;
			count++;
			eventContainer.setAttribute("data-eventsCount", count);
			eventContainer.setAttribute("data-eventsColor", eventData.color);
		}
		
		//render the pushpins
		for(var i = 0; i< this.eventContainers.length; i++) {
			var eventContainer = this.eventContainers[i];
			var count = eventContainer.attributes["data-eventsCount"].value;
			if(count > 0) {
				var color = eventContainer.attributes["data-eventsColor"].value;
				eventContainer.createChild("div", {
					"class" : "pushpin",
					"style" : "background-color: #" + Consts.getColor(color)
				}, count > 1 ? count : "");
			}
		}
	};
	
	this.getMonthlyData = function() {
		return this.monthlyData;
	};
}
