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
          <td class="name anchorTag">${i.id}</td>
          <td class="name anchorTag">${i.collegeName}</td>
          <td class="name anchorTag">${i.seats}</td>
          <td class="name anchorTag">${i.address}</td>
          <td><a href="${i.Website}" class="text-decoration-none anchorTag"  target="_blank" rel="noopener noreferrer">Website</a></td>
      </tr>
             `;
    }
    document.querySelector(".date_item").innerHTML = output;
  }
};



