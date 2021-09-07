const FooterView = Backbone.View.extend({
	className: 'pt-3',

	render() {
		this.$el.html(`
			<div class="container">
				<div class="row">
					<div class="col">
						<p>FOOTER</p>
					</div>
				</div>
			</div>
		`);

		return this;
	}
});
