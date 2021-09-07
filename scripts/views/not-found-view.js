const NotFoundView = Backbone.View.extend({
	className: 'pt-3',

	render() {
		this.$el.html(`
			<div class="container">
				<h2>Page Not Found</h2>

				<div class="row align-items-center">
					<div class="col">
						<p>We could not find the page you were looking for.</p>

						<p>
							<a href="#categories" class="btn btn-primary">
								Back
							</a>
						</p>
					</div>
				</div>
			</div>
		`);

		return this;
	}
});
