function displaySubjectNames() {
    fetch('data_2.json') // Load the JSON file
        .then(response => response.json()) // Parse the JSON data
        .then(data => {
            const subjectList = document.getElementById('subjectList');
            let output =""
            // Iterate over the data and display subject names
            data.firstSemester.forEach(function (semester) {
                semester.theory.forEach(function (subject) {
                    output+=`
                    <div class="subject my-2 shadow-sm ">
										<a href="#" class="name btn btn-primary my-2 shadow-none">${subject.subjectName}</a>
										<a href="${subject.link}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
										<a href="${subject.link01}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
										<a href="${subject.link02}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
										<a href="${subject.link03}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
										</div>
                    `
                    subjectList.innerHTML = output;
                });

                semester.lab.forEach(function (subject) {
									output+=`
									<div class="subject my-2 shadow-sm ">
									<a href="#" class="name btn btn-primary my-2 shadow-none">${subject.subjectName}</a>
									<a href="${subject.link}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
									<a href="${subject.link01}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
									<a href="${subject.link02}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
									<a href="${subject.link03}" class="name btn btn-primary my-2 shadow-none">NU Question Bank</a>
									</div>
									`
									subjectList.innerHTML = output;
                });
            });
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
}

// Call the function to display subject names
displaySubjectNames();

