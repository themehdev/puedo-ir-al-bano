(async () => {
	const DATABASE_URL =
		"https://studentvue-sign-out-default-rtdb.firebaseio.com/index";
	let data;
	const auth =
		localStorage.getItem("vnjneoijfononsdonsofowiejfondsofnsofsdofijnm") ===
			"fun" &&
		localStorage.getItem("sdfokjfnkjnwkeijdcjoisjfijknnskjdfh9o2093urd") ===
			"untrue" &&
		localStorage.getItem("kvjkniuu49hj0923uroovojwofi2039ruoxvjohf0r9f") ===
			"true" &&
		localStorage.getItem("auth") === "true";

	if (auth !== true) {
		window.location.replace("./noauth.html");
		return;
	}

	document
		.getElementById("studentForm")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			console.log("getting");
			data = await fetch(DATABASE_URL + ".json").then((response) =>
				response.json()
			);
			console.log("received");
			const studentID = Number(
				document.getElementById("studentID").value
			);
			for (var i = 0; i < data.length; i++) {
				if (data[i].ID === studentID) {
					const dataToSend = {
						out: Date.now(),
					};
					console.log("found");
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
							String(data[i].outs ? data[i].outs.length : 0) +
							".json",
						reqData
					);
					console.log("sent");
					window.location.assign("./out.html?dbID=" + i + "&queue=");
					return;
				}
			}
			//missspell flash first time button, add thing under it
		});
})();
