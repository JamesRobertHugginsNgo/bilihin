const ItemCollection = StorageCollection.extend({
	model: ItemModel,

	getCategories() {
		return this.reduce((acc, cur) => {
			const category = cur.get('category') || 'Other';

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
