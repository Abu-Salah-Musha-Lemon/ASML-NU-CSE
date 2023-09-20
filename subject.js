let http = new XMLHttpRequest();
http.open("get", "subject.json", true);

http.send();

http.onload = function () {
	if (this.readyState == 4 && this.status == 200) {
		let products = JSON.parse(this.responseText);
		let Pitem = this.response.products;
        let pitem = p

		let output = "";
		for (const i of products) {
			output += `

			<div class="subject my-2 shadow-sm ">
			<a href="#" class="name btn btn-primary my-2 shadow-none">${i.fitstSemester[0].theory.subjectName}</a>
			<a href="${i.fitstSemester.theory[i].link}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
			<a href="${i.fitstSemester.theory[i].link02}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
			<a href="${i.fitstSemester.theory[i].link03}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
		</div>
             `;
			 console.log(i);
		}
		document.querySelector(".subject").innerHTML = output;
	}
};
