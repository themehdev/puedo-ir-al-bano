(async function () {
	const DATABASE_URL =
		"https://studentvue-sign-out-default-rtdb.firebaseio.com/index";
	let data;
	if (window.localStorage.getItem("valid") !== true) {
		window.location.assign("/noauth.html");
		return;
	}

	document
		.getElementById("studentForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			data = await fetch(DATABASE_URL).then((response) =>
				response.json()
			);
			const studentID = document.getElementById("studentID").value;
			for (var i = 0; i < data.length; i++) {
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
						DATABASE_URL + "/" + String(i) + "/outs.json",
						reqData
					);
					window.location.assign("/out?dbID=" + i);
					return;
				}
			}
			//missspell flash first time button, add thing under it
		});
})();
