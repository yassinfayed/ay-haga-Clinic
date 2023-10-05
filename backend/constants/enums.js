const enums = {
    STATUS: {
      ACTIVE: 'ACTIVE',
      INACTIVE: 'INACTIVE',
      PENDING: 'PENDING'
    },
    ROLE: {
      ADMIN: 'administrator',
      PATIENT: 'patient',
      DOCTOR: 'doctor'
    },
    CATEGORY: {
      TECH: 'TECHNOLOGY',
      SPORTS: 'SPORTS',
      MUSIC: 'MUSIC'
    }
  };
  
  module.exports = enums;

  // this is an example, to use it. Just require it and write enums.STATUS.ACTIVE for example
  