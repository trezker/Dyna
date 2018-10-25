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

function InsertOrderString(array, index) {
	var midpoint = 19;
	if(array.length == 0) {
		return midpoint.toString(36);
	}
	if(index == 0) {
		var orderAfter = array[0];
		var high = parseInt(orderAfter.charAt(orderAfter.length-1), 36);
		var middle = Math.floor(high / 2);
		return middle.toString(36);
	}
}

function assertEqual(a, b) {
	console.assert(a == b, {a, b});
}

function TestInsertOrderString() {
	assertEqual(InsertOrderString([], 0), "j");
	assertEqual(InsertOrderString(["j"], 0), "9");
}
TestInsertOrderString();
