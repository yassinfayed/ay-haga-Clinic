"use client"
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>XClinics</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
      </Head>
      <Navbar/>

      {/* Clinic Name and Image Section */}
      <section className="container m-5 p-5">
        <div className="row pb-5">
          <div className="col-md-9 slide-top">
            <h1 className='text-size-200 text-primary'>XClinics</h1>
            <h2>
              Convenient healthcare at your
              fingertips.
            </h2>
          </div>
          <div className="col-md-3 slide-top">
          <Image src='/doctor-phone.PNG' height={450} width={267} className='rounded'/>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id='about' className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
            <Image src='/happy-patient.jpg' height={328} width={500} className='rounded shadow'/>
            </div>
            <div className='col-md-6'>
            <h2 className='text-primary pb-3'><strong>About Us</strong></h2>
            <div className="bg-light card border-0 shadow " >
              <div className="card-body">
              <h5 className="card-title text-primary">XClinics</h5>
              <p className="card-text">
              We proudly introduce <strong>Egypt's pioneering virtual clinic</strong>, providing convenient online doctor consultations. 
              Farewell to lengthy commutes to the clinics, and say hello to <strong>immediate healthcare access at the touch of a button</strong>. 
              We stand ready to address all your medical requirements, particularly during urgent situations.
              </p>
            </div>
            </div>
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
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/appointment.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
                Online Appointments</h5>
              <h6 className="card-subtitle mb-2 text-muted">Hate the clinic commute? We've got you!</h6>
              <p className="card-text">Say goodbye to unnecessary trips to clinics, with XClinic you can now have video-calls with your doctors for regular checkups!</p>
            </div>
            </div>
            <br />
            </div>
            <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/emergency.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
                Medical Emergencies!</h5>
              <h6 className="card-subtitle mb-2 text-muted">Got a time-sensitive medical emmergency?</h6>
              <p className="card-text">Our specialized doctors are available 24/7 to accomodate for any medical emergencies and walk you through handling them.</p>
            </div>
            </div>
            <br />
            </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/diagnosis.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
              Virtual Diagnosis</h5>
              <h6 className="card-subtitle mb-2 text-muted">Feeling unwell and need a quick diagnosis? </h6>
              <p className="card-text">No more guessing! Get a full diagnosis and prescription for your symptoms from proffesionals, at the click of a button!</p>
            </div>
            </div>
            <br />
            </div>
            <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/heartbeat.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
                Chronic Disease Management</h5>
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
        <h2 className="text-center text-primary pb-4">
          <strong>Testimonials</strong>
        </h2>
        <div className="row">
          <div className="col-md-8 mx-auto ">
            <div id="testimonialCarousel" className="carousel slide" data-ride="carousel">
              <ul className="carousel-indicators d-flex flex-row justify-content-center align-items-center text-center me-auto">
                <li className="active col-md-1 align-self-center" data-target="#testimonialCarousel" data-slide-to="0"></li>
                <li className="col-md-1 align-self-center" data-target="#testimonialCarousel" data-slide-to="1"></li>
                <li className="col-md-1 align-self-center" data-target="#testimonialCarousel" data-slide-to="2"></li>
              </ul>
              <div className="carousel-inner">
                <div className="carousel-item card-height active">
                  <div className="card border-0 shadow p-5 relative-div mt-5">
                    <div className="card-body mx-4 ">
                  <Image src='/John-Doe.jpg' height={100} width={100} className='absolute-testimonial-image rounded-circle bg-white shadow'/>
                      <h5 className="card-title text-primary">
                        <strong>John Doe</strong>
                      </h5>
                      <p className="card-subtitle">Happy Patient</p>
                      <hr className='w-75'/>
                      <p className="card-text">
                      "XClinics has made healthcare so convenient. I can now consult with my doctor from the comfort of my home. It's a game-changer!"                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item card-height">
                  <div className="card border-0 shadow p-5 relative-div mt-5">
                    <div className="card-body mx-4">
                    <Image src='/Jane-Smith.jpg' height={100} width={100} className='absolute-testimonial-image rounded-circle bg-white shadow'/>
                      <h5 className="card-title text-primary">
                        <strong>Jane Smith</strong>
                      </h5>
                      <p className="card-subtitle">Satisfied Patient</p>
                      <hr className='w-75'/>
                      <p className="card-text">
                      "As a busy college professor, XClinics saved me so much time!! No more waiting rooms or commutes. Made my life a whole lot easier, I highly recommend it."                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item card-height">
                  <div className="card border-0 shadow p-5 relative-div mt-5">
                    <div className="card-body mx-4">
                    <Image src='/David-Johnson.jpg' height={100} width={100} className='absolute-testimonial-image rounded-circle bg-white shadow'/>
                      <h5 className="card-title text-primary">
                        <strong>David Johnson</strong>
                      </h5>
                      <p className="card-subtitle text-muted">Another Happy Patient</p>
                      <hr className='w-75'/>
                      <p className="card-text">
                      "I was skeptical about virtual diagnoses, but the doctors at XClinics have been incredibly accurate. It's like having a doctor in your pocket."                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#testimonialCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon bg-primary rounded-circle" aria-hidden="true"></span>
              </a>
              <a className="carousel-control-next" href="#testimonialCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon bg-primary rounded-circle" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Statistics Section */}
      <section className="container p-5 ">
      <h2 className="text-center py-3"><strong>Get to know our success, but in numbers..</strong></h2>
      <hr className='w-75 mx-auto'/>
      <div className="row pb-3 my-5">
        <div className="col-md-3 d-flex align-items-center justify-content-center mx-auto">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>5000+</h2>
            <h4>Happy Patients</h4>
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center mx-auto mt-5">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>400+</h2>
            <h4>Specialized Doctors</h4>
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center mx-auto">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>30+</h2>
            <h4>Affiliate Hospitals</h4>
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-start justify-content-center mx-auto mt-5">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>20+</h2>
            <h4>Partner Countries</h4>
          </div>
        </div>
      </div>
    </section>


      {/* Sign Up Section */}
      <section className="bg-light py-5" >
        <div className="container text-center">
          <h2 className='py-3'>
            <strong>
            Sign up and never worry about your
            healthcare again!
            </strong>
          </h2>
            <div className="">
              <a
              href="/guest/Register"
              className="btn btn-primary text-light mt-3 p-3 px-4">
              <strong>Sign Up Now</strong>
              </a>
            </div>
        </div>
      </section>
      <Footer/>
      {/* Add Bootstrap JavaScript and jQuery links */}
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
};

export default LandingPage;
