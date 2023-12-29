const express =require('express');
const router =express.Router();
const passport = require('passport');



const homeController = require('../controllers/home_controller');
const siginController = require('../controllers/sigin-in_controller');


router.get('/',siginController.sigin);
router.get('/users/sigin',siginController.sigin);
router.get('/users/signup',siginController.signup);
//router.post('/',siginController.session);
router.post('/users/create',siginController.create);
router.get('/home',passport.checkAuthentication,homeController.home);
//adding new student
router.post('/users/createStudent',passport.checkAuthentication,homeController.createStudent);

//delete student 

router.get('/users/removeStudent/:id',passport.checkAuthentication,homeController.deleteStudent);

//company page

router.get('/users/comapany/:id',homeController.company);

// add students to company
router.post('/users/addstudents',passport.checkAuthentication,homeController.addStudent);

router.post('/users/company/removeStudent/:id',homeController.removeCompanyStudent);

router.post('/users/company/update/:companyid/:index',homeController.update);

//interviews page

router.get('/users/interview',homeController.interview);
//interviews create
router.post('/users/createInterview',homeController.interviewCreate);

//delete company
 router.get('/users/removecompany/:id',homeController.removecompany);



// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sigin'},
), siginController.session);

router.get('/users/logout',siginController.destroySession);

//generate csv

router.get('/downloadCsv', homeController.download);


module.exports =router;