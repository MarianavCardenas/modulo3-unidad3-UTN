var express = require('express');
var router = express.Router();
var nodemailer = require ('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post ('/', async(req,res,next) =>{

  console.log(req.body) //estoy capturando datos?

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'cardenasmarianav.89@gmail.com',
    subject: 'Contacto desde la wed ENERGIA (proyecto final)',
    html: nombre + apellido + " Se contacto a traves de la pagina web, solicita mas info a este correo: " +
    email + " .<br> Ademas, hizo el siguiente comentario: " + mensaje + ".<br> Su telefono es " + telefono
  } // cierra var obj

  var transporter = nodemailer.createTransport ({
    host : process.env. SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }

  }) //cierra transporter

  var info = await transporter.sendMail(obj);
  res.render ('index', {message: 'MENSAJE ENVIADO',});
}
); //cierra peticion del POST

module.exports = router;
