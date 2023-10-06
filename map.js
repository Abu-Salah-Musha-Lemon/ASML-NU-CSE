// Assuming your JSON data is stored in a variable named 'data'

function printSubjectInfo(data) {
  // Iterate through each semester
  for (const semester in data) {
    if (data.hasOwnProperty(semester)) {
      console.log(`Semester: ${semester}`);
      const subjects = data[semester][0].theory;

      // Iterate through each subject in the current semester
      subjects.forEach((subject, index) => {
        console.log(`Subject ${index + 1}: ${subject.subjectName}`);
        console.log(`Links:`);

        // Iterate through each link in the subject
        for (const link in subject) {
          if (subject.hasOwnProperty(link) && link !== 'subjectName') {
            console.log(`${link}: ${subject[link]}`);
          }
        }

        console.log('---');
      });
    }
  }
}

// Call the function with your JSON data
printSubjectInfo('subject.json');
