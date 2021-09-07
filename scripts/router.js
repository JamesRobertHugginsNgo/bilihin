const Router = Backbone.Router.extend({
	parseQuery(query = '') {
		if (!query) {
			return {};
		}

		return query.split('&').reduce((acc, cur) => {
			const [name, value] = cur.split('=');
			acc[name] = value;
			return acc;
		}, {});
	}
});
