// first Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("firstSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.firstSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow_subject mx-2 rounded ">
              <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
              <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
              <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
              <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("firstSemesterLab");
    let output = "";
    // Iterate over the data and display subject names
    data.firstSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
          <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
          <a href="${subject.link01}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// second Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("secoundSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.secondSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
            <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
            <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("secoundSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.secondSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// Third Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("thirdSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.thirdSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
            <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
            <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("thirdSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.thirdSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
              <div class="subject my-2 shadow_subject mx-2 rounded ">
                <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
                <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
              </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// fourth Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fourthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.fourthSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
            <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
            <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fourthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.fourthSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// five Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fifthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.fifthSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
        <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
        <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
        <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
        <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
      </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });

fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fifthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.fifthSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// six Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("sixthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.sixthSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
        <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
        <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
        <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
        <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
      </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("sixthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.sixthSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------

// seven Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("seventhSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.seventhSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
              <div class="subject my-2 shadow_subject mx-2 rounded ">
                  <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
                  <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
                  <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
                  <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
              </div>
                  `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("seventhSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.seventhSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// eight Semester
fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("eighthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.eightSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow_subject mx-2 rounded ">
              <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
              <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Chapter QB</a>
              <a href="${subject.link02}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Previous QB</a>
              <a href="${subject.link03}" class="name btn rounded  button_link"     target="_blank" rel="noopener noreferrer">Notes</a>
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });

fetch("./json/subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("eighthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.eightSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
        <div class="subject my-2 shadow_subject mx-2 rounded ">
            <a href="#" class=" subject_link shadow_subject m-2  fs-4 fw-light py-2 shadow-none ">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn rounded  button_link "     target="_blank" rel="noopener noreferrer">Notes</a>
        </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------