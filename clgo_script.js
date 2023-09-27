let http = new XMLHttpRequest();

http.open("get", "data.json", true);

http.send();

http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);

    let output = "";
    for (const i of products) {
      output += `
			<tr class="collegeName ">
      <td class="name ancorTag">${i.collegeName}</td>
      <td class="name ancorTag">${i.seats}</td>
      <td class="name ancorTag">${i.address}</td>
      <td><a href="${i.link}" class="text-decoration-none ancorTag">Website</a></td>
    </tr>
             `;
    }
    document.querySelector(".date_item").innerHTML = output;
  }
};


            //  <div class="dataItem d-flex  justify-content-between border my-2 p-2 collegeName">
            //  <div class="name ancorTag px-4 ">${i.collegeName}</div>
            //  <div class="name ancorTag px-4">${i.seats}</div>
            //  <div class="name ancorTag text-start">${i.address}</div>

            // <a href="${i.link}" class="text-decoration-none ancorTag px-4">Website</a>
            // </div>
						// <tr>