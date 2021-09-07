const Router = Backbone.Router.extend({
	parseQuery(query) {
		return query.split('&').reduce((acc, cur) => {
			const [name, value] = cur.split('=');
			acc[name] = value;
			return acc;
		}, {});
	}
});
