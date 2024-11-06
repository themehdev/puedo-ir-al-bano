const StudentVue = require("studentvue.js");

(() => {
	const DATABASE_URL =
		"https://studentvue-sign-out-default-rtdb.firebaseio.com/index.json";

	// const auth =
	// 	localStorage.getItem("vnjneoijfononsdonsofowiejfondsofnsofsdofijnm") ===
	// 		"fun" &&
	// 	localStorage.getItem("sdfokjfnkjnwkeijdcjoisjfijknnskjdfh9o2093urd") ===
	// 		"untrue" &&
	// 	localStorage.getItem("kvjkniuu49hj0923uroovojwofi2039ruoxvjohf0r9f") ===
	// 		"true" &&
	// 	localStorage.getItem("auth") === "true";
	// if (auth !== true) {
	// 	window.location.replace("./noauth.html");
	// 	return;
	// }

	const EMAIL_ENDING = "@wvhs.wlwv.k12.or.us";
	const SYNERGY_API_URL = "https://synergy-parstuvue.wlwv.k12.or.us";

	async function addPerson(username, password) {
		if (!username.includes(EMAIL_ENDING)) {
			username += EMAIL_ENDING;
		}

		return await StudentVue.login(SYNERGY_API_URL, username, password).then(
			async (client) => {
				return await client
					.getStudentInfo()
					.then(async function (studentData) {
						console.log(studentData);
						return JSON.parse(studentData).StudentInfo;
					});
			}
		);
	}

	document
		.getElementById("studentvue")
		.addEventListener("submit", async function (e) {
			console.log("yay");
			e.preventDefault();
			// Get form values
			var username = "candriam"; //document.getElementById("username").value;
			var password = "P416455"; //document.getElementById("password").value;

			let data = await fetch(DATABASE_URL);
			if (data.ok) {
				data = await data.json();
				console.log(data);
			}

			const JSdata = await addPerson(username, password);

			console.log(data);
			const dataToSend = {
				ID: JSdata.PermID,
				Name: JSdata.FormattedName,
				//Email: JSdata.EMail,
				//Photo: JSdata.Photo,
			};

			if (dataToSend in data) {
				for (let i = 0; i < data.length; i++) {
					if (data[i].ID === dataToSend.ID) {
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
								"/outs/" +
								String(data[i].outs.length),
							reqData
						);
						//window.location.assign("/out.html?dbID=" + i);
						return;
					}
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
			await fetch(DATABASE_URL, reqData);
			//window.location.assign("/out.html?dbID=" + data.length - 1);
		});
})();
