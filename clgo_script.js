// fatce("data.json")
// .then(function(response){
//   return response.json();
// })
// .then(function(data){
//   let dataName = document.querySelectorAll(".dataItem");
//   let out = "";
//   for(let i of data){
//     out+=`
//     <div class="name ancorTag">${i.collegeName}</div>
//         <a href="${i.link}" class="text-decoration-none ancorTag">Click Here</a>
//     `;
//     dataName.innerHTML= out;
//   }
// })
let http = new XMLHttpRequest();

http.open("get", "data.json", true);

http.send();

http.onload = function () {
	if (this.readyState == 4 && this.status == 200) {
		let products = JSON.parse(this.responseText);

		let output = "";
		for (const i of products) {
			output += `

             <div class="dataItem d-flex  justify-content-between border my-2 p-2 collegeName">
             <div class="name ancorTag px-4">${i.collegeName}</div>
             <div class="name ancorTag text-start">${i.address}</div>

            <a href="${i.link}" class="text-decoration-none ancorTag px-4">Website</a>
            </div>
             `;
		}
		document.querySelector(".date_item").innerHTML = output;
	}
};
