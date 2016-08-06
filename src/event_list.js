/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function EventList(calendar) {
	this.calendar = calendar;
	this.domObj = null;
	this.itemContainer = null;
	this.dateLabel = null;
	this.dayLabel = null;

	this.renderInto = function (parentId) {
		var that = this;
		var parentObj = $(parentId);
		this.domObj = parentObj.createChild("div", {
				"class" : "list"
			});

		var bodyDiv = this.domObj.createChild("div", {
				"class" : "body"
			});
		//left div
		var listBackground = bodyDiv.createChild("div", {
				"class" : "list-background"
			});

		this.dateLabel = listBackground.createChild("div", {
				"class" : "date"
			});
		this.dayLabel = listBackground.createChild("div", {
				"class" : "day"
			});

		//right div
		var listContainer = bodyDiv.createChild("div", {
				"class" : "list-container"
			});

		this.itemContainer = listContainer.createChild("div", {
				"class" : "item-container"
			});

		//toolbar
		var toolbar = this.domObj.createChild("div", {
				"class" : "toolbar-footer"
			});

		var addButton = toolbar.createChild("div", {
				"class" : "add-button",
			}, "Add +");
		addButton.onclick = function () {
			var data = new EventData();
			data.year = that.calendar.dateEx.year;
			data.month = that.calendar.dateEx.month;
			data.date = that.calendar.dateEx.date;
			data.color = 0;
			var row = new EventRow(data);
			row.renderInto(that.itemContainer);
		};

		var backButton = toolbar.createChild("div", {
				"class" : "back-button"
			}, "&lt; back");
		backButton.onclick = function () {
			that.calendar.unselectDate();
		};
	};

	this.setShowing = function (show) {
		if (show) {
			this.domObj.removeClassName("hidden");
			this.dateLabel.innerHTML = this.calendar.dateEx.date;
			this.dayLabel.innerHTML = this.calendar.dateEx.getLoneDayName();
		} else {
			this.domObj.addClassName("hidden");
		}
	};

	this.setDailyData = function (array) {
		//remove all old ones
		while (this.itemContainer.childNodes.length > 0) {
			this.itemContainer.removeChild(this.itemContainer.childNodes[0]);
		}

		if (array.length == 0) {
			this.itemContainer.createChild("div", {
				"class" : "item-line no-item"
			}, "[No Events]");
		} else {
			for (var i = 0; i < array.length; i++) {
				var itemData = array[i];

				var row = new EventRow(itemData);
				row.renderInto(this.itemContainer);
			}
		}
	};
}
