const ItemCollection = StorageCollection.extend({
	model: ItemModel,

	getCategories() {
		console.log(this.toJSON());

		return this.reduce((acc, cur) => {
			const category = cur.get('category');

			if (!acc[category]) {
				acc[category] = { total: 0, checked: 0 }
			}

			acc[category].total = acc[category].total + 1;

			if (cur.get('checked')) {
				acc[category].checked = acc[category].checked + 1;
			}

			return acc;
		}, {});
	}
});
