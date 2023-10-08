import Head from 'next/head';
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Clinic Landing Page</title>
        {/* Add Bootstrap CSS link */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
      </Head>

      {/* Clinic Name and Image Section */}
      <section className="container m-5 p-5">
        <div className="row pb-5">
          <div className="col-md-6">
            <h1 className='text-size-200'>Clinic</h1>
            <h2>
              Convenient healthcare at your
              fingertips.
            </h2>
          </div>
          <div className="col-md-6">
            {/* <Image
              src="/doctors.jpeg" // Replace with your image path
              alt="Clinic Image"
              width={650}
              height={400}
              className='rounded '
            /> */}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id='about' className="bg-light py-5">
        <div className="container py-5">
        <h2 className='text-primary pb-3'><strong>About Us</strong></h2>
          <div className="row">
            <div className="bg-light card col-md-6 border-0 shadow" >
              <div className="card-body">
              <h5 className="card-title text-primary">XClinics</h5>
              <p className="card-text">
              We proudly introduce <strong>Egypt's pioneering virtual clinic</strong>, providing convenient online doctor consultations. 
              Farewell to lengthy commutes to the clinics, and say hello to <strong>immediate healthcare access at the touch of a button</strong>. 
              We stand ready to address all your medical requirements, particularly during urgent situations.
              </p>
            </div>
            </div>
            <div className="col-md-6">
              {/* Image here! */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-primary p-5">
        <h2 className='text-light pb-3 text-center'>
          <strong>Our Services</strong>
        </h2>
        <div className='cotainer'>
        <div className="row">
            <div className="col-md-6">
            <div className="card" >
              <div className="card-body">
              <h5 className="card-title text-primary">Online Appointments</h5>
              <h6 className="card-subtitle mb-2 text-muted">Hate the clinic commute? We've got you!</h6>
              <p className="card-text">Say goodbye to unnecessary trips to clinics, with XClinic you can now have video-calls with your doctors for regular checkups!</p>
            </div>
            </div>
            <br />
            </div>
            <div className="col-md-6">
            <div className="card" >
              <div className="card-body">
              <h5 className="card-title text-primary">Medical Emergencies!</h5>
              <h6 className="card-subtitle mb-2 text-muted">Got a time-sensitive medical emmergency?</h6>
              <p className="card-text">Our specialized doctors are available 24/7 to accomodate for any medical emergencies and walk you through handling them.</p>
            </div>
            </div>
            <br />
            </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="card" >
              <div className="card-body">
              <h5 className="card-title text-primary">Virtual Diagnosis</h5>
              <h6 className="card-subtitle mb-2 text-muted">Feeling unwell and need a quick diagnosis? </h6>
              <p className="card-text">No more guessing! Get a full diagnosis and prescription for your symptoms from proffesionals, at the click of a button!</p>
            </div>
            </div>
            <br />
            </div>
            <div className="col-md-6">
            <div className="card" >
              <div className="card-body">
              <h5 className="card-title text-primary">Chronic Disease Management</h5>
              <h6 className="card-subtitle mb-2 text-muted">Need frequent checkups? Your health is our top priority!</h6>
              <p className="card-text">Chronical illnesses made a easier with our frequent and prioritized management services.</p>
            </div>
            </div>
            <br />
            </div>
        </div>
        </div>
      </section>

      {/* Testimonial Section (with Bootstrap Carousel) */}
      <section className="bg-light py-5">
        <div className="container">
          <h2>Testimonials</h2>
            {/* Testimonial carousel here */}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container p-5 ">
      <h2 className="text-center py-3">Get to know our success, but in numbers..</h2>
      <div className="row pb-3">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>5000+</h2>
            <h4>Happy Patients</h4>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>400+</h2>
            <h4>Doctors</h4>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>30+</h2>
            <h4>Affiliate Hospitals</h4>
          </div>
        </div>
      </div>
    </section>


      {/* Sign Up Section */}
      <section className="bg-light py-5" >
        <div className="container text-center">
          <h2>
            Sign up and never worry about your
            healthcare again!
          </h2>
          <a
            href="#"
            className="btn btn-primary text-light mt-3 p-3"
          >
            <strong >
            Sign Up Now
            </strong>
          </a>
        </div>
      </section>

      {/* Add Bootstrap JavaScript and jQuery links */}
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
};

export default LandingPage;
