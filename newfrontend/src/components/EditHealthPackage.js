const {
  updateHealthPackage,
} = require("@/app/redux/actions/healthPackagesActions");
const {
  updateHealthPackageReducer,
} = require("@/app/redux/reducers/healthPackagesReducer");
const { Card, TextInput, Button } = require("@tremor/react");
const { useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");

function EditHealthPackageModal({
  children,
  visible,
  setVisible,
  data,
  setData,
  setId,
  setShowCall,
}) {
  console.log(data);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: data?.name,
    doctorDiscount: data?.doctorDiscount,
    familyMemberSubDiscount: data?.familyMemberSubDiscount,
    medicineDiscount: data?.medicineDiscount,
    price: data?.price,
  });
  console.log(data);
  console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
    // console.log(formData);
  };
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    // Dispatch register action with form data
    dispatch(updateHealthPackage(data._id, formData));
    setVisible(false);
    setShowCall(true);
    setFormData({
      name: data?.name,
      doctorDiscount: data?.doctorDiscount,
      familyMemberSubDiscount: data?.familyMemberSubDiscount,
      medicineDiscount: data?.medicineDiscount,
      price: data?.price,
    });
    //setShowCallout(true)
    // Clear form fields
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vmax",
          top: 0,
          left: 0,
          background: "rgba(0,0,0,0.75)",
          zIndex: 49,
          display: visible ? "block" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "500px",
            minHeight: "500px",
            zIndex: 50,
          }}
        >
          <Card className="flex flex-col flex-1 grow">
            <div
              role="button"
              onClick={() => {
                setVisible(false);
                setId(null);
                setFormData(null);
                console.log(formData);
                setData(null);
              }}
              className="ms-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Health Package
            </h2>
            <div className="flex flex-row w-100"></div>
            {children}
            <TextInput
              onChange={handleChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5"
              type="name"
              placeholder={data?.name}
              // placeholder="Package Name"
              name="name"
              required
              //   error={
              //     createError && formData.name===""
              //   }
              //   errorMessage={
              //     createError && formData.name==="" &&
              //     "Please enter a package name"
              //   }
            />
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="number"
              placeholder={data?.doctorDiscount}
              // placeholder="Doctor Session Discount"
              onChange={handleChange}
              name="doctorDiscount"
              required
              //   error={
              //     createError && formData.doctorDiscount===""
              //   }
              //   errorMessage={
              //     createError && formData.doctorDiscount==="" &&
              //     "Please enter a doctor session discount"
              //   }
            />
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="number"
              placeholder={data?.familyMemberSubDiscount}
              // placeholder="Subscription Discount"
              onChange={handleChange}
              name="familyMemberSubDiscount"
              required
              //   error={
              //     createError && formData.familyMemberSubDiscount===""
              //   }
              //   errorMessage={
              //     createError && formData.familyMemberSubDiscount==="" &&
              //     "Please enter a family member subscription discount"
              //   }
            />
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="number"
              placeholder={data?.medicineDiscount}
              // placeholder="Medicine Discount"
              onChange={handleChange}
              name="medicineDiscount"
              maxLength={3}
              required
              //   error={
              //     createError && formData.medicineDiscount===""
              //   }
              //   errorMessage={
              //     createError && formData.medicineDiscount==="" &&
              //     "Please enter a medicine discount"
              //   }
            />
            <TextInput
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-5"
              type="number"
              placeholder={data?.price}
              // placeholder="Price"
              onChange={handleChange}
              name="price"
              required
              //   error={
              //     createError && formData.price===""
              //   }
              //   errorMessage={
              //     createError && formData.price==="" &&
              //     "Please enter a price"
              //   }
            />
            <Button
              //   loading={createLoading}
              onClick={handleSubmit}
              className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="ml-3">Submit</span>
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

module.exports = {
  EditHealthPackageModal,
};
