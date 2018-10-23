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
}

var productViewmodel = new ProductViewmodel();
ko.applyBindings(productViewmodel);

productViewmodel.backlog([
	new BacklogItem("Item 1"),
	new BacklogItem("Item 2"),
	new BacklogItem("Item 3"),
	new BacklogItem("Item 4")
]);
