import Controller from '../controller.js'
// const passport = require("passport");

class RegisterController extends Controller {
  showRegsitrationForm(req, res) {
    res.send("Login Form")
  }

//   async register(req, res, next) {

//     let { name, family, email, password, confirmPassword } = req.body;

//     if(name == '' || family == '' || email == '' || password == '' || confirmPassword == ''  ) {
//       return this.alertAndBack(req, res, {
//         title: 'لطفا تمامی مقدارهای خواسته شده را وارد نمایید.',
//         type: 'error',
//         toast: true
//       });
//     }

//     if(password !== confirmPassword ) {
//       return this.alertAndBack(req, res, {
//         title: 'مقدار رمزعبور با تاییدیه آن تطابق ندارد.',
//         type: 'error',
//         toast: true
//       });
//     }

//     if (!this.emailValidator(email)) {
//       return this.alertAndBack(req, res, {
//         position: "center",
//         type: "error",
//         title: "لطفا یک ایمیل معتبر را وارد کنید.",
//         showConfirmButton: false,
//         toast: true,
//         timer: 4000,
//       });
//     }

//     passport.authenticate("local.register", async (err, newUser) => {

//         if (! newUser) {
//           return this.alertAndBack(req, res, {
//               title: 'چنین کاربری با این ایمیل در فروشگاه عضو میباشد.',
//               type: 'error',
//               toast: true
//           });
//         }

//         this.alert(req, {
//             title: 'شما هم اکنون در سایت عضو هستید و میتوانید به حساب کاربری خود وارد شوید ...',
//             type: 'success',
//             toast: true
//         });
//         res.redirect('/auth/login');

//       })(req, res, next);
//   }
}

export default new RegisterController();