/**
 * Contact Controller
 * Handles contact page display
 */

exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
};

