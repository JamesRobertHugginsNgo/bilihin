const StorageCollection = Backbone.Collection.extend({
	model: StorageModel,

	fetch() {
		const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

		const idAttribute = this.model.prototype.idAttribute;
		const length = sessionStorage.length;
		for (let index = 0; index < length; index++) {
			const id = sessionStorage.key(index);
			if (uuidRegExp.test(id)) {
				this.add(new this.model({ [idAttribute]: id }).fetch());
			}
		}
	},
});
