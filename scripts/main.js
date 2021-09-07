$(() => {
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
			headerView.render({ cancelFragment: 'categories' });

			mainView.remove();
			mainView = new CategoriesView({ collection });
			mainView.on('remove', () => {
				collection.where({ checked: true }).forEach((model) => {
					collection.remove(model);
					model.destroy();
				});
				mainView.render()
			});
			mainView.render();
			$main.append(mainView.$el);

			document.title = 'Categories - Bilihin';
		},

		routeCategory(category) {
			headerView.render({ cancelFragment: `categories/${category}` });

			const categoryCollection = new ItemCollection(collection.where({ category }));

			mainView.remove();
			mainView = new CategoryView({ collection: categoryCollection });
			mainView.on('remove', () => {
				collection.where({ category, checked: true }).forEach((model) => {
					collection.remove(model);
					categoryCollection.remove(model);
					model.destroy();
				});
				mainView.render({ category });
			});
			mainView.render({ category });
			$main.append(mainView.$el);

			document.title = `${category} - Category - Bilihin`;
		},

		routeItem(item, query) {
			const cancelFragment = this.parseQuery(query).cancel;
			headerView.render({ cancelFragment });

			const model = collection.get(item) || new ItemModel();

			mainView.remove();
			mainView = new ItemView({ model }).on('delete', () => {
				collection.remove(model);
				model.destroy();
				this.navigate(cancelFragment, { trigger: true });
			});
			mainView.on('save', () => {
				model.save();
				if (!collection.get(model.id)) {
					collection.add(model);
				}
				this.navigate(`categories/${model.get('category')}`, { trigger: true });
			});
			mainView.render({ categories: Object.keys(collection.getCategories()), cancelFragment });
			$main.append(mainView.$el);

			document.title = `${item} - Item - Bilihin`;
		},

		routeNotFound() {
			headerView.render();

			mainView.remove();
			mainView = new NotFoundView().render();
			$main.append(mainView.$el);
		}
	}));

	Backbone.history.start();
});
