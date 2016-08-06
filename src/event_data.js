/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function EventData() {
	this.year = null;
	this.month = null;
	this.date = null;
	this.color = null;
	this.text = null;
	this.recurrence = null;
}

EventData.prototype.toArray = function() {
	var obj = new Array(this.year, this.month, this.date, this.color, this.text, this.recurrence);
	return obj;
};

EventData.prototype.fromArray = function(dataArray) {
	this.year = dataArray[0];
	this.month = dataArray[1];
	this.date = dataArray[2];
	this.color = dataArray[3];
	this.text = dataArray[4];
	this.recurrence = dataArray[5];
};

EventData.prototype.getColorCode = function() {
	return Consts.getColor(this.color);
};

EventData.prototype.hasText = function() {
	return this.text != null;
};

var Recurrences = {
	None: 'N',
	Weekly : 'W',
	Monthly : 'W',
	Yearly : 'Y'
};