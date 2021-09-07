const StorageModel = Backbone.Model.extend({
	fetch() {
		this.set(this.parse(localStorage.getItem(this.id)));

		return this;
	},

	save(attributes = {}) {
		function uuidv4() {
			return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
				(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
			);
		}

		if (this.isNew()) {
			do {
				attributes[this.idAttribute] = uuidv4();
			} while(localStorage.getItem(attributes[this.idAttribute]));
		}

		const data = Object.assign(this.toJSON(), attributes);
		const id = data[this.idAttribute];

		delete data[this.idAttribute];
		localStorage.setItem(id, JSON.stringify(data));

		const response = this.parse(localStorage.getItem(id));
		response[this.idAttribute] = id;
		this.set(response);

		return this;
	},

	destroy() {
		localStorage.removeItem(this.id);
		this.clear();

		return this;
	},

	parse(response = {}) {
		if (typeof response === 'string') {
			response = JSON.parse(response);
		}

		return Backbone.Model.prototype.parse.call(this, response);
	}
});
