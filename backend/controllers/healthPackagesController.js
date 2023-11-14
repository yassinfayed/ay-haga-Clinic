const handlerFactory = require('./handlerFactory');
const HealthPackage = require('../models/healthPackages');
const catchAsync = require('../utils/catchAsync');
const Patient = require('../models/patientModel');
const FamilyMembers = require('../models/familyMembersModel');

exports.createHealthPackage = handlerFactory.createOne(HealthPackage);

exports.getHealthPackage = handlerFactory.getOne(HealthPackage);

exports.updateHealthPackage = handlerFactory.updateOne(HealthPackage);

exports.deleteHealthPackage = handlerFactory.deleteOne(HealthPackage);

exports.getAllHealthPackage = catchAsync(async(req,res,next)=> {
    if(req.user.role === 'administrator') {
        handlerFactory.getAll(HealthPackage)(req, res, next);

        return;
    }
    const healthPackages = await HealthPackage.find({});
    const patient =  await Patient.findOne({user: req.user._id}).populate('package').exec()

    if(patient.package && (patient.subscriptionStatus ==='subscribed' || (patient.subscriptionStatus ==='cancelled' && patient.cancellationDate < Date.now()))) {
    // for all health packages, pkg.price = pkg.price - patient.package.discount*pkg.price
        healthPackages.forEach(pkg => {
            pkg.price = pkg.price - ((patient.package.familyMemberSubDiscount * pkg.price)/100);
        });
       
    }
    else {
        const familyMembers = await FamilyMembers.find({
            $or: [
                { patientId: patient._id},
                { linkedPatientId: patient._id }
            ]
        }).populate('patientId').populate('linkedPatientId').exec();
        let pkgFound;
        for (const familyMember of familyMembers) {
            if (familyMember.patientId?.package) {
                pkgFound= familyMember.patientId.package;
            }
            if (familyMember.linkedPatientId?.package) {
              pkgFound = familyMember.linkedPatientId?.package;
            }
        }
        if(pkgFound) {
            const pkgFM = await HealthPackage.findOne( {_id: pkgFound})
            healthPackages.forEach(pkg => {
                pkg.price = pkg.price - (( pkgFM.familyMemberSubDiscount * pkg.price)/100);
            });
                
        }
    }

    res.status(200).json({
        message: "success",
        data : {
            data: healthPackages
        }
    })
})

