/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
var dataArray = null;

function downloadData() {}

var init = function () {
	//check html5 support
	if (!checkhHtml5()) {
		document.write("Your browser doesn't support HTML5");
		return;
	}

	//render the toolbar
	renderToolbar();

	//download data
	var timestamp = (new Date()).valueOf();
	var objAjax = new Ajax();
	objAjax.getResponse("dummy_data.json?ts=" + timestamp, onDataDownloaded, null)
};

function onDataDownloaded(txt) {
	var dataObj = JSON.parse(txt);
	var dataRow = dataObj.events;
	var dataArray = [];
	for (var i = 0; i < dataRow.length; i++) {
		var item = new EventData();
		item.fromArray(dataRow[i]);
		dataArray.push(item);
	}

	//init calendar and list
	var dateEx = DateEx.today();
	var calendar = new Calendar(dateEx.year, dateEx.month);

	calendar.onDateChange = function () {
		if (calendar.dateEx.date == 0) {
			//month selected, click on the back button
			this.showList(false);
		} else {
			//date selected, click on the date
			this.showList(true);

			//Load the daily data and show
			var monthlyData = this.getMonthlyData();
			var array = [];
			for (var i = 0; i < monthlyData.length; i++) {
				var item = monthlyData[i];
				if (item.date == calendar.dateEx.date) {
					array.push(item);
				}
			}
			this.setDailyData(array);
		}
	};

	calendar.onMonthChange = function () {
		//on loaded || switch the month of year
		this.showList(false);

		//Load the monthly data and show
		var array = [];
		for (var i = 0; i < dataArray.length; i++) {
			var item = dataArray[i];
			if (item.year == calendar.dateEx.year && item.month == calendar.dateEx.month) {
				array.push(item);
			}
		}
		this.setMonthlyData(array);
	};
	calendar.renderInto("calendarContainer");
}

function renderToolbar() {
	var container = $("toolbar");
	/*
	container.createChild("span", null, "[Toolbar: ");
	container.createChild("a", {
		"id" : "btnRefreshApp",
		"href" : "javascript: updateAppCache()"
	}, "Update App Cache");
	container.createChild("span", null, "]");
	*/
	container.createChild("div", null, "Switch to Dec, 2013 to view the sample data.");
}

function updateAppCache() {
	console.log("Updateing application cache...");
	var appCache = window.applicationCache;
	appCache.update(); // Attempt to update the user’s cache.
}

window.applicationCache.addEventListener("updateready", function (e) {
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		// Browser downloaded a new app cache.
		// Swap it in and reload the page to get the new hotness.
		window.applicationCache.swapCache();
		if (confirm("A new version of this site is available.Load it ? ")) {
			window.location.reload();
		}
	} else {
		// Manifest didn’t changed. Nothing new to server.
	}
}, false);

if (window.addEventListener) {
	window.addEventListener("load", init, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", init);
}

document.onselectstart = function () {
	return (false);
};
