var backlogcount = 0;

function BacklogItem(title) {
    var self = this;
	self.id = backlogcount++;
    self.title = ko.observable(title);
    self.order = ko.observable();
}

var ProductViewmodel = function() {
	var self = this;

	self.backlog = ko.observableArray();
	self.defaultbacklogitem = new BacklogItem("");
	self.backlogitem = ko.mapping.fromJS(self.defaultbacklogitem);
	self.selectedBacklogItem = null;

	self.AddBacklog = function(item) {
		var before = "0";
		if(self.backlog().length > 0)
			before = self.backlog()[self.backlog().length-1].order();
		item.order(StringBetweenStrings(before, "z"));
		self.backlog.push(item);
	}

	self.SaveBacklog = function() {
		if(self.backlogitem.id() == "") {
			self.AddBacklog(new BacklogItem(self.backlogitem.title()));
		}
		else {
			self.backlog.replace(self.selectedBacklogItem, new BacklogItem(self.backlogitem.title()));
		}
	};

	self.SelectBacklog = function(item) {
		console.log("select");
		self.selectedBacklogItem = item;
		ko.mapping.fromJS(item, self.backlogitem);
	};

	self.backlogMoved = function(arg) {
		console.log(arg);
		var before = "0";
		var after = "z";
		if(self.backlog().length > 0 && arg.targetIndex > 0)
			before = self.backlog()[arg.targetIndex-1].order();
		if(self.backlog().length > 0 && arg.targetIndex < self.backlog().length-1)
			after = self.backlog()[arg.targetIndex+1].order();
		arg.item.order(StringBetweenStrings(before, after));
	}
}

var productViewmodel = new ProductViewmodel();
ko.applyBindings(productViewmodel);

productViewmodel.AddBacklog(new BacklogItem("Item 1"));
productViewmodel.AddBacklog(new BacklogItem("Item 2"));
productViewmodel.AddBacklog(new BacklogItem("Item 3"));
productViewmodel.AddBacklog(new BacklogItem("Item 4"));

function StringBetweenStrings(before, after) {
	console.log(before + "/" + after);
	var paddedBefore = before.padEnd(after.length|1, "0");
	var paddedAfter = after.padEnd(before.length|1, "z");

	var between = "";
	for (var i = 0; i < paddedBefore.length; i++) {
		var valueBefore = parseInt(paddedBefore.charAt(i), 36);
		var valueAfter = parseInt(paddedAfter.charAt(i), 36);
		var difference = valueAfter - valueBefore;
		var valueBetween = valueBefore + Math.floor(difference / 2);
		between += valueBetween.toString(36);
		if(difference > 1) {
			break;
		}
		if(difference == 1 && i == paddedBefore.length-1) {
			between += "h";
		}
	}
	return between;
}

function assertEqual(a, b) {
	console.assert(a == b, {a, b});
}

function TestInsertOrderString() {
	assertEqual(StringBetweenStrings("", ""), "h");
	assertEqual(StringBetweenStrings("h", ""), "q");
	assertEqual(StringBetweenStrings("", "h"), "8");
	assertEqual(StringBetweenStrings("", "1"), "0h");
	assertEqual(StringBetweenStrings("y", ""), "yh");
	assertEqual(StringBetweenStrings("", "y"), "h");
	assertEqual(StringBetweenStrings("3", "7"), "5");
	assertEqual(StringBetweenStrings("6", "7"), "6h");
	assertEqual(StringBetweenStrings("65", "76"), "65h");
	assertEqual(StringBetweenStrings("65", "86"), "7");
}
//TestInsertOrderString();

