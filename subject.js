// first Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("firstSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.firstSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
        
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("firstSemesterLab");
    let output = "";
    // Iterate over the data and display subject names
    data.firstSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
           
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// secound Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("secoundSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.secoundSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
           
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("secoundSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.secoundSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
      <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
      <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
      </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// Third Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("thirdSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.thirdSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("thirdSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.thirdSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
      </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// fourth Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fourthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.fourthSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fourthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.fourthSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
      <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
      <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
      </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// five Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fifthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.fifthSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("fifthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.fifthSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
      <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
      <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
    
      </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// six Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("sixthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.sixthSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
           
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("sixthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.sixthSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
      <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
      <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
     
      </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------

// seven Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("seventhSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.seventhSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
                  <div class="subject my-2 shadow-sm ">
                  <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
                  <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
                  <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
                  <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
                 
                  </div>
                  `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("seventhSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.seventhSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
           
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
// eight Semester
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("eighthSemesterTheory");
    let output = "";
    // Iterate over the data and display subject names
    data.eightSemester.forEach(function (semester) {
      semester.theory.forEach(function (subject) {
        output += `
            <div class="subject my-2 shadow-sm ">
            <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
            <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
            <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
            <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
            
            </div>
            `;
        subjectList.innerHTML = output;
      });
    });
  });
fetch("subject.json") // Load the JSON file
  .then((response) => response.json()) // Parse the JSON data
  .then((data) => {
    const subjectList = document.getElementById("eighthSemesterlab");
    let output = "";
    // Iterate over the data and display subject names
    data.eightSemester.forEach(function (semester) {
      semester.lab.forEach(function (subject) {
        output += `
      <div class="subject my-2 shadow-sm ">
      <a href="#" class="name btn  my-2 shadow-sm fs-4 fw-light">${subject.subjectName}</a>
      <a href="${subject.link01}" class="name btn  my-2 shadow-sm button_link">Chapter QB</a>
      <a href="${subject.link02}" class="name btn button_link my-2 shadow-sm">Previous QB</a>
      <a href="${subject.link03}" class="name btn  my-2 shadow-sm button_link">Note</a>
     
      </div>
      `;
        subjectList.innerHTML = output;
      });
    });
  });

// ---------------------------------------------------------------
