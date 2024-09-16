const StudentVue = require("studentvue.js");
//import StudentVue from "studentvue.js";
(async function () {
	const EMAIL_ENDING = "@wvhs.wlwv.k12.or.us";
	const SYNERGY_API_URL = "https://synergy-parstuvue.wlwv.k12.or.us";
	const DATABASE_URL =
		"https://studentvue-sign-out-default-rtdb.firebaseio.com/index.json";

	async function addPerson(username, password) {
		username += EMAIL_ENDING;
		let data = await fetch(DATABASE_URL);
		if (data.ok) {
			data = await data.json();
			console.log(data);
		}

		return await StudentVue.login(SYNERGY_API_URL, username, password).then(
			async (client) => {
				return await client
					.getStudentInfo()
					.then(async function (studentData) {
						//console.log(studentData);
						const JSdata = JSON.parse(studentData).StudentInfo;
						const dataToSend = {
							ID: JSdata.PermID,
							Name: JSdata.FormattedName,
							//Email: JSdata.EMail,
							//Photo: JSdata.Photo,
						};
						if (dataToSend in data) {
							if (data[i].ID === studentID) {
								const dataToSend = {
									time: new Date(Date.now()).toString(),
								};
								const reqData = {
									method: "PUT",
									body: JSON.stringify(dataToSend),
									headers: {
										"Content-Type": "application/json",
									},
								};
								await fetch(
									DATABASE_URL +
										"/" +
										String(i) +
										"/outs.json",
									reqData
								);
								window.location.assign("/out?dbID=" + i);
								return;
							}
						}
						data.push(dataToSend);
						//console.log(dataToSend);
						//return dataToSend;
						const reqData = {
							method: "PUT",
							body: JSON.stringify(data),
							headers: {
								"Content-Type": "application/json",
							},
						};
						fetch(DATABASE_URL, reqData);
						return data.length - 1;
					});
			}
		);
	}

	stuff = await addPerson("candriam", "P416455");

	console.log(stuff);
})();
