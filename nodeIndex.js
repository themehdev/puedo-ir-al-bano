import StudentVue from "studentvue.js";

var addPerson;

(async function () {
	const EMAIL_ENDING = "@wvhs.wlwv.k12.or.us";
	const SYNERGY_API_URL = "https://synergy-parstuvue.wlwv.k12.or.us";

	async function addPerson(username, password) {
		if (!EMAIL_ENDING in username) {
			username += EMAIL_ENDING;
		}

		return await StudentVue.login(SYNERGY_API_URL, username, password).then(
			async (client) => {
				return await client
					.getStudentInfo()
					.then(async function (studentData) {
						//console.log(studentData);
						return JSON.parse(studentData).StudentInfo;
					});
			}
		);
	}
})();

module.exports = { addPerson };

export { addPerson };
