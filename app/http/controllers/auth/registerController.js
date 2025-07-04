import Controller from '../controller.js'

class RegisterController extends Controller {
  showRegsitrationForm(req, res) {
    res.send("Login Form")
  }
}

export default new RegisterController();