const mongoose = require("mongoose");
const StudentInterview = require('../models/student');

const Interview = require('../models/interviews');

module.exports.home = async function (req, res) {
    try {
        const data = await StudentInterview.find({});
        
        // // Loop through each document and log the batch
        // data.forEach(document => {
        //     console.log(document);
           
        //         console.log(`Batch: ${document.name}, College: ${document.college}, Status: ${document.interviews[1].companyName}`);
          
        // });

        return res.render('index', { title: 'home',data:data });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }

    
};

module.exports.interview = async function (req, res) {
  try {
      const data = await Interview.find({});
    

      return res.render('interview', { title: 'interview',data:data });
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
  }

  
};


//create interview

module.exports.interviewCreate =async (req,res)=>{
    
    
  const newcompany =new Interview(req.body);

  newcompany.save()
  .then(savedcompany => {
    console.log('student added :', savedcompany);
  })
  .catch(error => {
    console.error('Error adding student:', error);
  });
  

  return res.redirect("back");

}
//remove company

module.exports.removecompany =async (req,res)=>{
  console.log(req.params.id);
 Interview.deleteOne({_id:req.params.id}).then((succed)=>{
    console.log("student deleted");
  }).catch((err)=>{
    console.log('error in deleting',err);
  })
  return res.redirect('back');
}

//create student

module.exports.createStudent = async (req,res)=>{
    
    
    const newStudent =new StudentInterview(req.body);

    newStudent.save()
    .then(savedStudent => {
      console.log('student added :', savedStudent);
    })
    .catch(error => {
      console.error('Error adding student:', error);
    });
    

    return res.redirect("back");

}

//delete student record

module.exports.deleteStudent = async (req,res)=>{
 
  StudentInterview.deleteOne({_id:req.params.id}).then((succed)=>{
    console.log("student deleted");
  }).catch((err)=>{
    console.log('error in deleting',err);
  })
  return res.redirect('back');
}


//company page

module.exports.company =async (req,res)=>{
   Interview.findById(req.params.id).then((data)=>{

    StudentInterview.find({}).then((student)=>{
      return res.render('company',{title:'comapny',data:data,student:student});

    }).catch((err)=>{

      console.log("error")
      return res.render('company',{title:'comapny',data:data});

    })
    
  })
}

//addig student to interview

module.exports.addStudent = async (req, res) => {
  try {
      const interview = await Interview.findById(req.body.company);
      const student = await StudentInterview.findById(req.body.name);
      

      if (interview && student) {
        const newStudentData = {
          studentId: student._id,
          name: student.name,  
          result: req.body.status,
      };
     
console.log("student added to interview")
          interview.students.push(newStudentData);
          await interview.save();

          
         return res.redirect('back');
      } else {
          res.status(404).json({ error: 'Interview or student not found' });
      }
  } catch (error) {
      console.error('Error adding student to interview:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//remove student from interview

module.exports.removeCompanyStudent =async (req,res)=>{
  const interview = await Interview.findById(req.params.id);
  
  try {
    interview.students.splice(req.body.index,1);
    interview.save();
  } catch (err) {
    console.log('error in deeleting student from company',err);
    
  }
 
  
  return res.redirect('back');
}

module.exports.update =async (req,res)=>{
  const company = await Interview.findById(req.params.companyid);

  company.students[req.params.index].result = req.body.result;

  if(req.body.result== 'PASS'){

    var student = await StudentInterview.findById(company.students[req.params.index].studentId);
    
    student.status = 'placed';
    student.save();
    
  }

  company.save();
  return res.redirect('back');
}


module.exports.download = async (req, res) => {
  try {
    const interviews = await Interview.find().populate('students');

    // Create a CSV string with headers
    let csvData = 'Student id,student name,student college,student status,DSA Final Score,WebD Final Score,React Final Score,interview date,interview company,interview student result\n';

    // Use Promise.all to handle asynchronous calls in parallel
    await Promise.all(interviews.map(async interview => {
      await Promise.all(interview.students.map(async student => {

        
        const studentInfo = await StudentInterview.findById(student.studentId);
        

        // Append data to CSV string
        csvData += `${student.studentId},${student.name},${studentInfo.college},${studentInfo.status},${studentInfo.dsaFinalScore},${studentInfo.webDFinalScore},${studentInfo.reactFinalScore},${interview.date},${interview.companyName},${student.result}\n`;
      }));
    }));

    // Set the response headers for CSV file download
    res.setHeader('Content-disposition', 'attachment; filename=student_data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error student does not exists in the Database' });
  }
};
