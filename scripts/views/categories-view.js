const CategoriesView = Backbone.View.extend({
	className: 'pt-3',

	events: {
		['click .btn-remove']() {
			this.trigger('remove');
		}
	},

	render() {
		const categories = this.collection.getCategories();
		this.$el.html(`
			<div class="container">
				<h2>Categories</h2>

				<div class="row justify-content-between">
					<div class="col-12 col-md-reset">
						<ol class="list-group mb-3">
							${Object.keys(categories).sort().reduce((acc, cur) => {
								const { total, checked } = categories[cur];
								return acc + `
									<a href="#categories/${cur}" class="list-group-item">
										<span class="row">
											<span class="col">
												${cur}
											</span>

											<span class="col-auto text-muted">
												${checked} / ${total}
											</span>

											<span class="col-auto d-none d-sm-block">
												<i class="bi bi-chevron-right"></i>
											</span>
										</span>
									</a>
								`;
							}, '')}
						</ol>
					</div>

					<div class="col-12 col-md-auto">
						<div class="mb-3">
							<button type="button" class="btn btn-danger btn-remove">
								<i class="bi bi-x-lg d-none d-sm-inline"></i>
								Remove Completed
							</button>
						</div>
					</div>
				</div>
			</div>
		`);

		return this;
	}
});
