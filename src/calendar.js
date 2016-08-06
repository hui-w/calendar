/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function Calendar(year, month) {
	this.dateEx = new DateEx(year, month, 0);
	this.header = new CalendarHeader(this);
	this.body = new CalendarBody(this);
	this.list = new EventList(this);
	this.onDateChange = null;
	this.onMonthChange = null;

	this.renderInto = function (parentId) {
		var parentObj = $(parentId);
		var domObj = parentObj.createChild("div", {
				"class" : "calendar"
			});

		if (this.dateEx.month <= 0 || this.dateEx.month >= 12) {
			domObj.innerHTML = "Invalid Month";
			return;
		}

		//render the header
		this.header.renderInto(domObj);

		//render the calendar
		this.body.renderInto(domObj);

		//render the list
		this.list.renderInto(domObj);

		if (typeof this.onMonthChange == "function") {
			this.onMonthChange();
		}
	};

	this.previousMonth = function () {
		if (this.dateEx.month == 1) {
			this.dateEx.month = 12;
			this.dateEx.year--;
		} else {
			this.dateEx.month--;
		}
		this.header.refresh();
		this.body.refresh();

		if (typeof this.onMonthChange == "function") {
			this.onMonthChange();
		}
	};

	this.nextMonth = function () {
		if (this.dateEx.month == 12) {
			this.dateEx.month = 1;
			this.dateEx.year++;
		} else {
			this.dateEx.month++;
		}
		this.header.refresh();
		this.body.refresh();

		if (typeof this.onMonthChange == "function") {
			this.onMonthChange();
		}
	};

	this.previousYear = function () {
		this.dateEx.year--;
		this.header.refresh();
		this.body.refresh();

		if (typeof this.onMonthChange == "function") {
			this.onMonthChange();
		}
	};

	this.nextYear = function () {
		this.dateEx.year++;
		this.header.refresh();
		this.body.refresh();

		if (typeof this.onMonthChange == "function") {
			this.onMonthChange();
		}
	};

	this.selectDate = function (date) {
		this.dateEx.date = date;
		if (typeof this.onDateChange == "function") {
			this.onDateChange();
		}
	};

	this.unselectDate = function () {
		this.dateEx.date = 0;
		this.body.unselectTD();
		if (typeof this.onDateChange == "function") {
			this.onDateChange();
		}
	};

	this.getMonthName = function () {
		return Consts.MonthNames[this.dateEx.month - 1];
	};

	this.getDaysCount = function () {
		if (this.dateEx.month != 2) {
			return Consts.TotalDays[this.dateEx.month - 1];
		} else {
			if ((this.dateEx.year % 100 != 0) && (this.dateEx.year % 4 == 0) || (this.dateEx.year % 400 == 0)) {
				return 29;
			} else {
				return 28;
			}
		}
	};

	this.showList = function (show) {
		this.body.setShowing(!show);
		this.list.setShowing(show);
	};
	
	this.setMonthlyData = function(array) {
		this.body.setMonthlyData(array);
	};
	
	this.getMonthlyData = function() {
		return this.body.getMonthlyData();
	};
	
	this.setDailyData = function(array) {
		this.list.setDailyData(array);
	};
}

var Consts = {
	MonthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	TotalDays : [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	DayNames : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
	LoneDayNames : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	Colors : ["ff3300", "00ff00", "0099cc", "FA8072", "6A5ACD", "ffA500"],
	
	getColor : function(i) {
		return Consts.Colors[i % Consts.Colors.length];
	}
};

function DateEx(year, month, date) {
	this.year = year;
	this.month = month;
	this.date = date;

	this.getYMString = function () {
		return this.year + "-" + this.month;
	};

	this.getYMDString = function () {
		return this.getYMString() + "-" + this.date;
	};

	this.getMonthName = function () {
		return Consts.MonthNames[this.month - 1];
	};

	this.getDateString = function () {
		return this.getMonthName() + " " + this.date + ", " + this.year;
	};

	this.getMonthString = function () {
		return this.getMonthName() + ", " + this.year;
	};

	this.getDay = function () {
		var d = new Date();
		d.setFullYear(this.year, this.month - 1, this.date);
		return d.getDay();
	};

	this.getLoneDayName = function () {
		return Consts.LoneDayNames[this.getDay()];
	};
}

DateEx.today = function () {
	var date = new Date();
	return new DateEx(date.getFullYear(), date.getMonth() + 1, date.getDate());
};