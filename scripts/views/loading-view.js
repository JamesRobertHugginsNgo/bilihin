const LoadingView = Backbone.View.extend({
	className: 'pt-3',

	render() {
		this.$el.html(`
			<div class="container">
				<div class="row align-items-center">
					<div class="col">
						<p>Loading...</p>
					</div>
				</div>
			</div>
		`);

		return this;
	}
});
