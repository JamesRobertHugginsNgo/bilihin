const ItemView = Backbone.View.extend({
	className: 'pt-3',

	events: {
		['click .btn-delete']() {
			this.trigger('delete');
		},

		['click .btn-cancel']() {
			// TODO
		},

		['click .btn-save']() {
			const category = this.model.get('category')
			if (!category) {
				this.model.set('category', 'Other');
			}

			this.trigger('save');
		}
	},

	render({ categories = [], cancelFragment = '' } = {}) {
		const commonItems = [
			{ name: 'Apple', category: 'Produce' }
		]

		const names = commonItems.map((item) => item.name).sort();
		categories = categories.concat(commonItems.map((item) => item.category))
			.filter((value, index, array) => value && array.indexOf(value) === index).sort();

		this.$el.html(`
			<div class="container">
				<h2 class="mb-3">${this.model.isNew() ? 'New' : 'Edit'} Item</h2>

				<div class="row">
					<div class="col col-sm-6 col-md-4">
						<div class="mb-3">
							<label for="itemQuantity" class="form-label">Quantity</label>
							<input type="text" class="form-control" id="itemQuantity" value="${this.model.get('quantity') || ''}">
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col col-md-8">
						<div class="mb-3">
							<label for="itemName" class="form-label">Name</label>
							<input type="text" class="form-control" list="nameDatalist" id="itemName" value="${this.model.get('name') || ''}">
							<datalist id="nameDatalist">
								${names.map((name) => `<option value="${name}">`).join('')}
							</datalist>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col col-md-8">
						<div class="mb-3">
							<label for="itemCategory" class="form-label">Category</label>
							<input type="text" class="form-control" list="categoryDatalist" id="itemCategory" value="${this.model.get('category') || ''}">
							<datalist id="categoryDatalist">
								${categories.map((category) => `<option value="${category}">`).join('')}
							</datalist>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<div class="mb-3">
							<label for="itemNotes" class="form-label">Notes</label>
							<textarea class="form-control" id="itemNotes">${this.model.get('notes') || ''}</textarea>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<div class="mb-3">
							${this.model.isNew() ? '' : `
								<button type="button" class="btn btn-danger btn-delete">
									<i class="bi bi-x-lg d-none d-sm-inline"></i>
									Delete
								</button>
							`}
						</div>
					</div>

					<div class="col-auto">
						<div class="mb-3">
							<a href="#${cancelFragment}" class="btn btn-secondary btn-cancel">
								<i class="bi bi-chevron-left d-none d-sm-inline"></i>
								Cancel
							</a>

							<button type="button" class="btn btn-primary btn-save">
								<i class="bi bi-save d-none d-sm-inline"></i>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		`);

		const $itemQuantity = $('#itemQuantity', this.$el);
		$itemQuantity.on('input', () => this.model.set('quantity', $itemQuantity.val()));
		this.listenTo(this.model, 'change:quantity', () => $itemQuantity.val(this.model.get('quantity') || ''));

		const $itemName = $('#itemName', this.$el);
		$itemName.on('input', () => this.model.set('name', $itemName.val()));
		this.listenTo(this.model, 'change:name', () => $itemName.val(this.model.get('name') || ''));

		const $itemCategory = $('#itemCategory', this.$el);
		$itemCategory.on('input', () => this.model.set('category', $itemCategory.val()));
		this.listenTo(this.model, 'change:category', () => $itemCategory.val(this.model.get('category') || ''));

		const $itemNotes = $('#itemNotes', this.$el);
		$itemNotes.on('input', () => this.model.set('notes', $itemNotes.val()));
		this.listenTo(this.model, 'change:notes', () => $itemNotes.val(this.model.get('notes') || ''));

		return this;
	}
});
