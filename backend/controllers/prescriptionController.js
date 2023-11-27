const handlerFactory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const Prescription = require("../models/prescriptionModel");
const PDFDocument = require('pdfkit');




exports.createPrescription = handlerFactory.createOne(Prescription);
exports.updatePrescription = handlerFactory.updateOne(Prescription);

exports.downloadPrescription = catchAsync(async (req, res, next) => {
    try {
        const prescriptionId = req.params.id;
        const prescription = await Prescription.findById(prescriptionId).populate('patient doctor');

        if (!prescription) {
            return res.status(404).json({ error: 'Prescription not found' });
        }

        const pdfDoc = new PDFDocument();
        const filename = `prescription_${prescriptionId}.pdf`;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        pdfDoc.pipe(res);

        
        pdfDoc.text(`Prescription Date: ${prescription.prescriptionDate}`);

      
        prescription.medicines.forEach((medicine, index) => {
            pdfDoc.text(`Medicine ${index + 1}: ${medicine.medicine}`);
            pdfDoc.text(`Dosage: ${medicine.dosage}`);
            pdfDoc.text(`Frequency: ${medicine.frequency}`);
            pdfDoc.text(`Start Date: ${medicine.startDate}`);
            pdfDoc.text(`End Date: ${medicine.endDate || 'N/A'}`);
            pdfDoc.moveDown(); 
        });

        pdfDoc.text(`Instructions: ${prescription.instructions || 'N/A'}`);
        pdfDoc.text(`Filled/Unfilled: ${prescription.filled_unfilled ? 'Filled' : 'Unfilled'}`);

        pdfDoc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
