var backlogcount = 0;

function BacklogItem(title) {
    var self = this;
	self.id = backlogcount++;
    self.title = ko.observable(title);
}

var ProductViewmodel = function() {
	var self = this;

	self.backlog = ko.observableArray();
	self.defaultbacklogitem = new BacklogItem("");
	self.backlogitem = ko.mapping.fromJS(self.defaultbacklogitem);
	self.selectedBacklogItem = null;

	self.SaveBacklog = function() {
		if(self.backlogitem.id() == "") {
			self.backlog.push(new BacklogItem(self.backlogitem.title()));
		}
		else {
			self.backlog.replace(self.selectedBacklogItem, new BacklogItem(self.backlogitem.title()));
		}
	};

	self.SelectBacklog = function(item) {
		self.selectedBacklogItem = item;
		ko.mapping.fromJS(item, self.backlogitem);
	};

	self.backlogMoved = function(arg) {
		console.log(arg);
		/*
		parseInt("1J", 36)
		55
		x=55; x.toString(36)
		*/
	}
}

var productViewmodel = new ProductViewmodel();
ko.applyBindings(productViewmodel);

productViewmodel.backlog([
	new BacklogItem("Item 1"),
	new BacklogItem("Item 2"),
	new BacklogItem("Item 3"),
	new BacklogItem("Item 4")
]);

function StringBetweenStrings(before, after) {
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
TestInsertOrderString();

