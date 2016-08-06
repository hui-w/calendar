/** 
* @author Wang, Hui (huiwang@qlike.com) 
* @repo https://github.com/hui-w/js-calendar
* @licence MIT 
*/ 
function EventRow(data) {
	this.data = data;
	this.newColor = data.color;
	this.wrapper = null;

	this.tableDisplay = null;
	this.tableEdit = null;

	this.tdDisplayText = null;
	this.tdEditColor = null;
	this.objColor = null;
	this.objText = null;

	this.objColorSelect = null;
}

EventRow.prototype.renderInto = function (parent) {
	var that = this;
	this.wrapper = parent.createChild("div", {
			"class" : "item-line"
		});

	//Display line
	this.tableDisplay = this.wrapper.createChild("table");
	var displayTR = this.tableDisplay.createChild("tr");
	this.tdDisplayPushpin = displayTR.createChild("td", {
			"class" : "display-color"
		});
	this.tdDisplayText = displayTR.createChild("td", {
			"class" : "display-text"
		});
	var buttonDisplay = displayTR.createChild("td", {
			"class" : "display-tool"
		});

	var btnEdit = buttonDisplay.createChild("div", {
			"class" : "edit",
			"title" : "edit"
		});
	btnEdit.onclick = function () {
		that.beginEdit();
	};
	var btnDel = buttonDisplay.createChild("div", {
			"class" : "delete",
			"title" : "delete"
		});
	btnDel.onclick = function () {
		if (window.confirm("Sure to delete?")) {
			that.wrapper.parentNode.removeChild(that.wrapper);
		}
	};

	//Edit form
	this.tableEdit = this.wrapper.createChild("table");
	var formTR = this.tableEdit.createChild("tr");
	var tdEditColor = formTR.createChild("td", {
			"class" : "edit-color"
		});
	var tdEditText = formTR.createChild("td", {
			"class" : "edit-text"
		});
	var formButton = formTR.createChild("td", {
			"class" : "edit-tool"
		});

	//color select
	this.objColor = tdEditColor.createChild("div", {
			"class" : "color-select"
		});
	this.objColorSelect = tdEditColor.createChild("div", {
			"class" : "color-option-container hidden"
		});
	for (var i = 0; i < Consts.Colors.length; i++) {
		var option = this.objColorSelect.createChild("div", {
				"class" : "color-option-item",
				"style" : "background-color: #" + Consts.getColor(i)
			});
		option.setAttribute("data-color", i);
		option.onclick = function () {
			var parent = this.parentNode;

			//highlight current; hide parent
			for (var i = 0; i < parent.childNodes.length; i++) {
				parent.childNodes[i].removeClassName("color-option-selected");
			}
			this.addClassName("color-option-selected");
			parent.addClassName("hidden");

			//Temporary save new color
			that.newColor = this.attributes["data-color"].value;
			that.objColor.setAttribute("style", "background-color: #" + Consts.getColor(that.newColor));
		};
	}
	this.objColor.onclick = function () {
		that.objColorSelect.toggleClassName("hidden");
	};

	this.objText = tdEditText.createChild("input", {
			"type" : "text",
			"class" : "input"
		});
	var btnSave = formButton.createChild("div", {
			"class" : "check",
			"title" : "save"
		});
	btnSave.onclick = function () {
		that.data.color = that.newColor;
		that.data.text = that.objText.value;
		that.endEdit();
	};
	var btnCancel = formButton.createChild("div", {
			"class" : "back",
			"title" : "back"
		});
	btnCancel.onclick = function () {
		if (!that.data.hasText()) {
			//remove self
			that.wrapper.parentNode.removeChild(that.wrapper);
		} else {
			that.endEdit();
		}
	};

	//Switch status
	if (!this.data.hasText()) {
		this.beginEdit();
	} else {
		this.endEdit();
	}
};

EventRow.prototype.updateData = function () {
	//for display
	this.tdDisplayPushpin.setAttribute("style", "background-color: #" + this.data.getColorCode());
	this.tdDisplayText.innerHTML = this.data.text;
	this.objColor.setAttribute("style", "background-color: #" + this.data.getColorCode());
	this.objText.value = this.data.text;

	//color select
	var parent = this.objColorSelect;
	for (var i = 0; i < parent.childNodes.length; i++) {
		var child = parent.childNodes[i];
		if (i == this.data.color) {
			child.addClassName("color-option-selected");
		} else {
			child.removeClassName("color-option-selected");
		}
	}
}

EventRow.prototype.beginEdit = function () {
	this.tableDisplay.addClassName("hidden");
	this.tableEdit.removeClassName("hidden");

	this.updateData();
};

EventRow.prototype.endEdit = function () {
	this.tableDisplay.removeClassName("hidden");
	this.tableEdit.addClassName("hidden");

	//hide color options
	if (!this.objColorSelect.hasClassName("hidden")) {
		this.objColorSelect.addClassName("hidden");
	}

	this.updateData();
};
