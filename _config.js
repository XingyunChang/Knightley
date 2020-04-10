var ids = {
    google: {
      clientID: '554282804378-pj78q5caq189083jpqurs5p3sglse6cl.apps.googleusercontent.com',
      clientSecret: '2YdXpbJWtSqbRXI1Uwq-YaFJ',
      callbackURL: "http://127.0.0.1:3000/google/auth/google/callback"
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
  