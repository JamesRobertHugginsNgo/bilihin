$(() => {
	console.log('DOCUMENT READY');

	const collection = new ItemCollection();
	collection.fetch();

	const headerView = new HeaderView().render();
	$('body > header').empty().append(headerView.$el);

	$('body > footer').empty().append(new FooterView().render().$el);

	const $main = $('body > main');

	let mainView = new LoadingView().render();
	$main.append(mainView.$el);

	new (Router.extend({
		routes: {
			'': 'routeHome',
			'categories': 'routeCategories',
			'categories/:category': 'routeCategory',
			'items/:item': 'routeItem',
			'*notFound': 'routeNotFound'
		},

		routeHome() {
			this.navigate('categories', { trigger: true });
		},

		routeCategories() {
			console.log('ROUTE CATEGORIES');

			headerView.render({ cancelFragment: 'categories' });

			mainView.remove();
			mainView = new CategoriesView({ collection }).on('remove', () => {
				// TODO
			}).render();
			$main.append(mainView.$el);

			document.title = 'Categories - Bilihin';
		},

		routeCategory(category) {
			console.log('ROUTE CATEGORY');

			headerView.render({ cancelFragment: `categories/${category}` });

			mainView.remove();
			mainView = new CategoryView({
				collection: new ItemCollection(collection.where({ category }))
			}).on('remove', () => {
				// TODO
			}).render({ category });
			$main.append(mainView.$el);

			document.title = `${category} - Category - Bilihin`;
		},

		routeItem(item, query) {
			console.log('ROUTE ITEM');

			const cancelFragment = this.parseQuery(query).cancel;
			headerView.render({ cancelFragment });

			console.log('CANCEL FRAGMENT', cancelFragment);

			const model = collection.get(item) || new ItemModel();

			mainView.remove();
			mainView = new ItemView({ model }).on('delete', () => {
				// TODO
			}).on('save', () => {
				model.save();
				if (!collection.get(model.id)) {
					collection.add(model);
				}
				this.navigate(cancelFragment, { trigger: true });
			}).render({ categories: Object.keys(collection.getCategories()), cancelFragment });
			$main.append(mainView.$el);

			document.title = `${item} - Item - Bilihin`;
		},

		routeNotFound() {
			console.log('ROUTE NOT FOUND');

			headerView.render();

			mainView.remove();
			mainView = new NotFoundView().render();
			$main.append(mainView.$el);
		}
	}));

	Backbone.history.start();
});
