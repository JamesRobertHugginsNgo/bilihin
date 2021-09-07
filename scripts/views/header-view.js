const HeaderView = Backbone.View.extend({
	className: 'pt-2',

	render({ cancelFragment = '' } = {}) {
		this.$el.html(`
			<div class="container">
				<div class="row align-items-center">
					<div class="col">
						<h1 style="font-family: 'Abel', sans-serif;">
							<a href="#" class="text-decoration-none text-white">
								<i class="bi bi-cart4"></i>
								bilihin
							</a>
						</h1>
					</div>

					<div class="col-auto">
						<div class="mb-2">
							<a href="#items/new?cancel=${cancelFragment}" class="btn btn-outline-light">
								<i class="bi bi-plus-lg d-none d-sm-inline"></i>
								Add
							</a>
						</div>
					</div>
				</div>
			</div>
		`);

		return this;
	}
});
