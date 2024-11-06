(async () => {
	const DATABASE_URL =
		"https://studentvue-sign-out-default-rtdb.firebaseio.com/index";
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

	const urlParams = new URLSearchParams(window.location.search);
	const dbID = urlParams.get("dbID");
	var data;
	var queue = urlParams.get("queue") ? urlParams.get("queue") : [];
	console.log(queue);
	var nextIndex;
	data = await fetch(DATABASE_URL + ".json").then((data) => {
		return data.json();
	});
	document.getElementById("out").textContent = data[dbID].Name;

	document.getElementById("studentForm").addEventListener("submit", (e) => {
		e.preventDefault();
		const index = data.findIndex((i) => {
			return document.getElementById("studentID").value == i.ID;
		});
		if (index == dbID) {
			return;
		}
		// Add student to queue
		if (queue.length == 0) {
			nextIndex = data.findIndex((i) => {
				return document.getElementById("studentID").value == i.ID;
			});
		}
		queue.push(data[index]);
		document.getElementById("next").innerHTML = queue[0].Name + " is next";
	});

	document.getElementById("back").addEventListener("click", async () => {
		const dataToSend = {
			in: Date.now(),
			out: data[dbID].outs[data[dbID].outs.length - 1].out,
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
				String(dbID) +
				"/outs/" +
				String(data[dbID].outs.length - 1) +
				".json",
			reqData
		);

		if (queue.length == 0) {
			window.location.replace("./index.html");
			return;
		}

		const dataToSend2 = {
			out: Date.now(),
		};

		const reqData2 = {
			method: "PUT",
			body: JSON.stringify(dataToSend2),
			headers: {
				"Content-Type": "application/json",
			},
		};

		await fetch(
			DATABASE_URL +
				"/" +
				String(nextIndex) +
				"/outs/" +
				String(data[nextIndex].outs ? data[nextIndex].outs.length : 0) +
				".json",
			reqData2
		);

		queue.shift();

		window.location.replace(
			"./out.html?dbID=" + nextIndex + "&queue=" + queue
		);
	});
})();
