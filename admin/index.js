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

	var data;

	var timeLength;

	function sortChange(sort, time) {
		var millisInDay = 86400000;

		switch (time.toLowerCase()) {
			case "day":
				timeLength = millisInDay;
				break;
			case "week":
				timeLength = millisInDay * 7;
				break;
			case "month":
				timeLength = millisInDay * 7 * 4;
				break;
			case "year":
				timeLength =
					Date.now() - new Date("August 27, 2024 00:00:00").valueOf();
				break;
			default:
				console.log("uh-oh first");
		}

		switch (sort.toLowerCase()) {
			case "out right now":
				makeSortedTable((a, b) => {
					return Boolean(a.outs[a.outs.length - 1].in) ? 1 : -1;
				});
				break;
			case "times out":
				makeSortedTable((a, b) => {
					return Math.sign(a.outs.length - b.outs.length);
				});
				break;
			case "average time out":
				makeSortedTable((a, b) => {
					var atotalTime = 0;
					for (var j = 0; j < a.outs.length; j++) {
						if (!a.outs[j].in) {
							break;
						}
						atotalTime += a.outs[j].in - a.outs[j].out;
					}
					var aavgTime = atotalTime / a.outs.length;
					var btotalTime = 0;
					for (var j = 0; j < b.outs.length; j++) {
						if (!b.outs[j].in) {
							break;
						}
						btotalTime += b.outs[j].in - b.outs[j].out;
					}
					var bavgTime = btotalTime / b.outs.length;

					return Math.sign(aavgTime - bavgTime);
				});
				break;
			case "maximum time out":
				makeSortedTable((a, b) => {
					var amaxTime = -1;
					for (var j = 0; j < a.outs.length; j++) {
						if (!a.outs[j].in) {
							break;
						}
						amaxTime = Math.max(
							amaxTime,
							a.outs[j].in - a.outs[j].out
						);
					}
					var bmaxTime = -1;
					for (var j = 0; j < b.outs.length; j++) {
						if (!b.outs[j].in) {
							break;
						}
						bmaxTime = Math.max(
							bmaxTime,
							b.outs[j].in - b.outs[j].out
						);
					}

					return Math.sign(amaxTime - bmaxTime);
				});
				break;
			case "minimum time out":
				makeSortedTable((a, b) => {
					var aminTime = Number.MAX_SAFE_INTEGER;
					for (var j = 0; j < a.outs.length; j++) {
						if (!a.outs[j].in) {
							break;
						}
						aminTime = Math.min(
							aminTime,
							a.outs[j].in - a.outs[j].out
						);
					}
					var bminTime = -1;
					for (var j = 0; j < b.outs.length; j++) {
						if (!b.outs[j].in) {
							break;
						}
						bminTime = Math.min(
							bminTime,
							b.outs[j].in - b.outs[j].out
						);
					}

					return Math.sign(aminTime - bminTime);
				});
				break;
			case "total time out":
				makeSortedTable((a, b) => {
					var atotalTime = 0;
					for (var j = 0; j < a.outs.length; j++) {
						if (!a.outs[j].in) {
							break;
						}
						atotalTime += a.outs[j].in - a.outs[j].out;
					}

					var btotalTime = 0;
					for (var j = 0; j < b.outs.length; j++) {
						if (!b.outs[j].in) {
							break;
						}
						btotalTime += b.outs[j].in - b.outs[j].out;
					}

					return Math.sign(atotalTime - btotalTime);
				});
				break;
			default:
				console.log("uh-oh");
		}
	}

	function makeSortedTable(withFunc) {
		var dataFromTime = [];
		for (var i = 0; i < data.length; i++) {
			dataFromTime.push({ ID: data[i].ID, Name: data[i].Name, outs: [] });
			if (!data[i].outs) {
				continue;
			}
			for (var j = 0; j < data[i].outs.length; j++) {
				if (data[i].outs[j].out >= Date.now() - timeLength) {
					dataFromTime[i].outs.push(data[i].outs[j]);
				}
			}
		}
		var sortedData = dataFromTime.sort(withFunc);
		var table = document.getElementById("studentTable");
		table.innerHTML = `<table id="studentTable">
			<tr>
				<td>Name</td>
				<td>Student ID</td>
				<td>Is Out</td>
				<td>Times Out</td>
				<td>Average Time Out</td>
				<td>Longest Time Out</td>
				<td>Shortest Time Out</td>
				<td>Total Time Out</td>
			</tr>
		</table>`;
		for (var i = 0; i < sortedData.length; i++) {
			var row = table.insertRow(i + 1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			var cell7 = row.insertCell(6);
			var cell8 = row.insertCell(7);
			cell1.innerHTML = sortedData[i].Name;
			cell2.innerHTML = sortedData[i].ID;
			if (sortedData[i].outs.length == 0) {
				cell3.innerHTML = "false";
				cell4.innerHTML = "0";
				cell5.innerHTML = "No times out";
				cell6.innerHTML = "No times out";
				cell7.innerHTML = "No times out";
				cell8.innerHTML = "No times out";
				continue;
			}
			cell3.innerHTML = !Boolean(
				sortedData[i].outs[sortedData[i].outs.length - 1].in
			);
			cell4.innerHTML = sortedData[i].outs.length;
			var minTime = Number.MAX_SAFE_INTEGER;
			var maxTime = -1;
			var totalTime = 0;
			for (var j = 0; j < sortedData[i].outs.length; j++) {
				if (!sortedData[i].outs[j].in) {
					break;
				}
				totalTime +=
					sortedData[i].outs[j].in - sortedData[i].outs[j].out;
				minTime = Math.min(
					minTime,
					sortedData[i].outs[j].in - sortedData[i].outs[j].out
				);
				maxTime = Math.max(
					maxTime,
					sortedData[i].outs[j].in - sortedData[i].outs[j].out
				);
			}
			var avgTime = totalTime / sortedData[i].outs.length;
			// Add out button

			cell5.innerHTML =
				String(Math.floor(avgTime / 60000)) +
				":" +
				String(Math.round(avgTime / 1000) % 60);
			cell6.innerHTML =
				String(Math.floor(maxTime / 60000)) +
				":" +
				String(Math.round(avgTime / 1000) % 60);
			cell7.innerHTML =
				String(Math.floor(minTime / 60000)) +
				":" +
				String(Math.round(avgTime / 1000) % 60);
			cell8.innerHTML =
				String(Math.floor(totalTime / 60000)) +
				":" +
				String(Math.round(avgTime / 1000) % 60);
		}
	}

	async function sortChanged() {
		console.log("changing");
		data = await fetch(DATABASE_URL + ".json").then((data) => {
			return data.json();
		});
		sortChange(
			document.getElementById("sortValues").value,
			document.getElementById("sortTimes").value
		);
	}

	sortChanged();

	document
		.getElementById("sortValues")
		.addEventListener("change", sortChanged);
	document
		.getElementById("sortTimes")
		.addEventListener("change", sortChanged);

	setInterval(sortChanged, 30000);
})();
