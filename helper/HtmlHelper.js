
module.exports = {

	replaceDash: (value) => {

		let htmlDash = '&#8211;';

		if (value.indexOf(htmlDash).length != -1)
			return value.replace('&#8211;', '-');
		else
			return value;
	}
};