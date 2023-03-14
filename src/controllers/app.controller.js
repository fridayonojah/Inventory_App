// Thiis controller is for rendering common
// files

class App {
  getLogin = async (req, res) => {
    res.render('login')
  }

  resetPassword = async (req, res) => {
    res.render('forgot_password')
  }
}
module.exports = new App()
