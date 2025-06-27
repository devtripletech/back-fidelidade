import axios from "axios";


//sendMessage();


class EnviaTxt {

        async sendMessageWhats(to: string, message: string) {

          const API_URL ="https://evolution.7msolution.io/message/sendText/Tesste";
          const API_KEY = "vB6jtTgDAAcsKEZu1InFatl7eOzJE8QB";
          console.log(to)
          console.log(message)

          const send_mensagem = {
            "number":to ,"text": message
            }
            console.log(send_mensagem)
          try {
            const response = await axios.post(`${API_URL}`, {
            "number":to,"text": message
            }, {
              headers: {apikey: 'vB6jtTgDAAcsKEZu1InFatl7eOzJE8QB', 'Content-Type': 'application/json'},
            });
            
            console.log('Mensagem enviada:', response.data);
          } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
              console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
            } else {
              console.error('Erro desconhecido:', error);
            }
          }
        }
}

export { EnviaTxt }