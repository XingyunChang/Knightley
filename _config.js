var ids = {
    google: {
      clientID: 'get_your_own',
      clientSecret: 'get_your_own',
      callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    },
    linkedin: {
      clientID: '8614wjdt1j00zv',
      clientSecret: 'GEPK2Gp3KtoiOJdC',
      callbackURL: "http://127.0.0.1:3000/link/auth/linkedin/callback",
    },
    facebook: {
      consumerKey: 'get_your_own',
      consumerSecret: 'get_your_own',
      callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
    }
  };
  
  module.exports = ids;
  