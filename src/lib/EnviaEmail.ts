
export interface CadastroProps{

    usuario: string
    senha: string
}



class EnviaEmail {

    async enviaCadastro({usuario, senha} : CadastroProps){
                
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            from: {
                        email : "crm@7msolution.io"
                    },

            personalizations: [
                {
                    to:[
                        {
                            "email": usuario
                        }
                   ],

                   dynamic_template_data :{
                    "usuario" : usuario,
                    "senha" : senha
                   } 

                }
            ],

            template_id : "d-3a3b865f9c894a78bd2c838e16652ffc"
                
        };


        (async () => {
            try {
              await sgMail.send(msg);
            } catch (error) {
              console.error(error);
          
              if (error.response) {
                console.error(error.response.body)
              }
            }
          })();

    }

}

export  {EnviaEmail}