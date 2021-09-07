const CategoryView = Backbone.View.extend({
	className: 'pt-3',

	events: {
		['input input[type="checkbox"][data-id]'](event) {
			const $checkbox = $(event.currentTarget);
			this.collection.get($checkbox.attr('data-id')).save({ checked: $checkbox.prop('checked') });
		},

		['click .btn-remove']() {
			this.trigger('remove');
		}
	},

	render({ category = '' }) {
		this.$el.html(`
			<div class="container">
				<div class="mb-3">
					<a href="#categories">
						<i class="bi bi-chevron-left d-none d-sm-inline"></i>
						Back
					</a>
				</div>

				<h2>${category}</h2>

				<div class="row justify-content-between">
					<div class="col-12 col-md-reset">
						<ol class="list-group mb-3">
							${this.collection.reduce((acc, cur) => {
								return acc + `
									<li class="list-group-item">
										<div class="row">
											<div class="col-auto text-muted">
												<input type="checkbox"${cur.get('checked') ? ' checked' : ''} class="form-check-input" data-id="${cur.id}">
											</div>

											<div class="col">
												<div class="row">
													<div class="col-12 col-md-auto">
														${cur.get('name')}
													</div>

													<div class="col-12 col-md-auto text-muted">
													${cur.get('notes')}
													</div>
												</div>
											</div>

											<div class="col-auto">
												<a href="#items/${cur.id}?cancel=categories/${category}">
													<i class="bi bi-pencil d-none d-sm-inline"></i>
													Edit
												</a>
											</div>
										</div>
									</li>
								`;
							}, '')}
						</ol>
					</div>

					<div class="col-12 col-md-auto">
						<div class="mb-3">
							<button type="button" class="btn btn-danger btn-remove">
								<i class="bi bi-x-lg d-none d-sm-inline"></i>
								Remove Checked
							</button>
						</div>
					</div>
				</div>
			</div>
		`);

		return this;
	}
});
